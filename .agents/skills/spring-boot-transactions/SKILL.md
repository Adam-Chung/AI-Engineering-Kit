---
name: spring-boot-transactions
description: Correct @Transactional usage in Spring Boot — same-class-call proxy trap, readOnly/rollbackFor requirements, and try-catch placement pitfalls. Use when writing, reviewing, or debugging a @Transactional method, or diagnosing a rollback that didn't happen or a commit that shouldn't have.
---

# Spring Boot Transactions

`@Transactional` is AOP-proxy-based, which makes it behave in ways that
don't match a naive reading of the annotation. These three pitfalls account
for most "why didn't this roll back" bugs.

## Pitfall 1: Same-Class Calls Bypass the Proxy

Spring's `@Transactional` works by wrapping the bean in a proxy. A call from
inside the same class (`this.otherMethod()`) never goes through the proxy,
so the inner method's `@Transactional` annotation is silently ignored.

```java
@Service
public class OrderService {
    public void outer() {
        this.inner(); // ❌ bypasses the proxy — inner's @Transactional does nothing
    }

    @Transactional(rollbackFor = Throwable.class)
    public void inner() { ... }
}
```

Fix: put `inner()` in a different Spring bean and inject it, so the call
goes through the proxy.

## Pitfall 2: Always Set `rollbackFor` and `readOnly` Explicitly

Spring only rolls back on unchecked exceptions by default — a checked
exception or an `Error` will still commit unless you say otherwise.

```java
// ✅ Write operations
@Transactional(rollbackFor = Throwable.class)
public User createUser(CreateUserRequest request) { ... }

// ✅ Read-only operations — lets Hibernate skip dirty-checking snapshot
// comparison, reducing memory and flush overhead
@Transactional(readOnly = true, noRollbackFor = Throwable.class)
public Optional<User> findUserById(Long id) { ... }

// ❌ No rollbackFor — a checked exception thrown here commits anyway
@Transactional
public void processOrders(List<Long> orderIds) { ... }
```

## Pitfall 3: try-catch Position Decides Whether Rollback Happens

The proxy only marks a transaction rollback-only when an exception
**escapes the proxied method boundary**. Where you catch the exception
changes the outcome:

```java
// Scenario 1: catch inside the same method — commits normally
@Transactional(rollbackFor = Throwable.class)
public void doWork() {
    try {
        riskyOperation();      // throws
    } catch (Exception ex) {
        handleError();         // ✅ writes so far will commit
    }
}

// Scenario 2: cross-class proxy call, caught in the outer method —
// rollback-only was already marked by the inner proxy; the outer catch
// cannot undo it
@Transactional(rollbackFor = Throwable.class)
public void outerMethod() {
    try {
        innerService.innerMethod(); // throws through its own proxy → marks rollback-only
    } catch (Exception ex) {
        handleError();              // ❌ too late — commit throws UnexpectedRollbackException
    }
}
```

Fix for scenario 2: either catch inside `innerMethod()` itself, or give it
`@Transactional(propagation = Propagation.REQUIRES_NEW)` so it commits or
rolls back independently of the caller.

## Quick Reference

| Situation | Behavior |
|---|---|
| Same-class call to a `@Transactional` method | Annotation ignored — no new transaction, no proxy |
| Cross-class call, outer already in a transaction | Inner joins the outer transaction (default `REQUIRED`) |
| Exception caught inside the same proxied method | Transaction still commits |
| Exception caught by the *caller* of a proxied method that threw | Rollback-only was already set — catching it does not save the commit |

## Checklist

- [ ] Every `@Transactional` write method specifies `rollbackFor = Throwable.class`
- [ ] Every `@Transactional` read-only method specifies `readOnly = true, noRollbackFor = Throwable.class`
- [ ] No same-class call relies on an inner method's own `@Transactional`
- [ ] Any try-catch around a cross-class transactional call either lets the
      exception propagate, or the inner method uses `REQUIRES_NEW` if partial
      commit is intentional
