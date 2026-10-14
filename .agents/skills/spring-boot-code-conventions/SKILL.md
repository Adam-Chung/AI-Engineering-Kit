---
name: spring-boot-code-conventions
description: General Java/Spring Boot code style for solo-developer projects — naming, null safety, class member ordering, collections/streams, and logging. Use when writing or reviewing Java classes, methods, or services outside of Entity/DTO naming (see spring-boot-naming-conventions for that) and outside of time fields or @Transactional methods (see the dedicated skills for those).
---

# Spring Boot Code Conventions

Distilled from a team-scale Java style guide down to what a solo developer
actually needs day to day. Skipped on purpose: multi-reviewer checklists,
proprietary framework patterns (state machines, Saga, custom event-bus
plumbing) tied to one specific codebase, and anything that only pays off at
team scale.

## Naming

| Identifier | Rule | Example |
|---|---|---|
| Class / Interface | UpperCamelCase | `UserService`, `UserRepository` |
| Method / Variable / Parameter | lowerCamelCase | `getUserName()`, `userId` |
| Constant / Enum constant | CONSTANT_CASE | `MAX_RETRY_COUNT` |
| Package | all lowercase, no underscores | `com.example.service` |

Treat abbreviations as regular words — only the first letter capitalized:
`httpClient`, `xmlParser`, `urlBuilder` — never `HTTPClient` or `XMLParser`.

Always annotate parameters whose names matter after compilation:

```java
// Repository
List<Item> getItems(@Param("facility") String facility);

// Controller
@GetMapping("/users/{userId}")
public User getUser(@PathVariable("userId") String userId) {}
```

Without `@Param`/`@PathVariable(name = ...)`, parameter names can be lost
after compilation and binding silently fails or misbinds.

## Null Safety

```java
// ✅ Constant first — avoids NPE when the variable is null
if ("ACTIVE".equals(status)) { ... }

// ✅ Optional chain instead of manual null checks
Optional.ofNullable(user).map(User::getName).orElse("");

// ❌ Possible NPE
if (status.equals("ACTIVE")) { ... }
```

- `Optional<T>` return types: never wrap a method that already returns
  `Optional` in another `Optional.of(...)` — `repository.findById(id)`
  already returns `Optional<User>`.
- Methods returning collections return an empty collection, never `null` —
  callers should not have to null-check before iterating.

## Class Member Ordering

Readers should see a class's constants, dependencies, and construction shape
before entering its business logic. Build a stable header, then group the
method area by concern (not by a blanket public-before-private split):

1. Constants (`static final`)
2. Static fields / static init
3. Dependency fields (constructor-injected, `final`)
4. Constructor
5. Nested types (records, enums, inner classes)
6. Static factory / helper methods
7. Lifecycle methods (`@PostConstruct`, `@PreDestroy`, then class-owned
   `initialize()`/`close()`)
8. Method sections grouped by feature or workflow — entry methods first,
   private helpers kept close to the flow they support, not pushed to the
   bottom of the file
9. `toXxx()` / `toString()` at the end of their owning type

Skip a block entirely if the class doesn't use it — don't keep empty
placeholders just to preserve the order. Keep same-name overloads adjacent;
don't let unrelated members split them. When adding a new method, return it
to the section it belongs with — don't habitually append to the end of the
file.

## Dependency Injection

Constructor injection only — makes dependencies explicit, immutable
(`final`), and trivially mockable in unit tests without a Spring container.

```java
// ✅
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
}

// ❌ Field injection — hides required dependencies, needs a container to test
@Autowired
private UserRepository userRepository;
```

## Collections and Streams

```java
// ✅ Immutable result, modern Java
List<String> names = users.stream().map(User::getName).toList();

// ✅ Specify initial capacity when the size is known — avoids repeated
// array copying and rehashing
List<String> list = new ArrayList<>(expectedSize);

// ✅ Return empty, not null
return Collections.emptyList();

// ❌ Missing generics — loses compile-time type safety
List list = new ArrayList();
```

Avoid side effects inside stream pipelines (`.forEach(x -> externalList.add(x))`);
prefer `.map()`/`.collect()`/`.toList()` that return a new collection.

## Logging

```java
// ✅
log.info("Creating user: {}", user.getUsername());

// ❌ String concatenation runs even when the log level is disabled
log.info("Creating user: " + user.getUsername());

// ❌ Never log secrets, even at debug level — log files get shipped to
// external systems (ELK, etc.) and debug can get flipped on in prod
log.debug("Password: {}", user.getPassword());
```

## What's Deliberately Left Out

- Proprietary state-machine / event-bus / distributed-lock frameworks tied to
  one company's codebase — port the *pattern* (explicit state transitions,
  decoupled events) if useful, not the specific API.
- Multi-reviewer code review checklists — not useful without reviewers.
- Anything framed as an org-wide checklist rather than a rule you'd actually
  apply while writing code solo.
