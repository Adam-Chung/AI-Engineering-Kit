# Persistence and Transaction Diagnostics

Use this reference for Spring Data JPA, Hibernate, SQL, entity state, repository,
and transaction-boundary failures.

## Inspection Order

1. Identify the service boundary, repository call, entity state, and active
   transaction at the failure point.
2. Inspect the entity mapping, ownership side, cascade behavior, fetch strategy,
   nullability, and database constraint involved.
3. Compare generated SQL and bound parameters with the intended operation.
4. Confirm whether an exception is translated, caught, or causes rollback.
5. Reproduce against the closest relevant database; record differences when a
   test database is not behaviorally equivalent.

## Common Evidence Patterns

| Evidence | Investigate |
|---|---|
| `LazyInitializationException` | Access outside transaction/session, DTO boundary, fetch plan |
| `TransactionRequiredException` | Missing transaction boundary or operation outside managed context |
| `UnexpectedRollbackException` | Inner exception marked rollback-only and was caught or obscured |
| Constraint violation | Actual constraint, flush timing, input and mapping mismatch |
| N+1 queries | Access pattern, fetch join, entity graph, batch configuration |
| Detached entity error | Entity lifecycle, identifier state, cascade and `persist` versus `merge` |

## Controls

- Do not solve lazy loading by globally switching relationships to eager fetch.
- Do not add broad cascade operations without confirming aggregate ownership.
- Do not add `REQUIRES_NEW` or widen `@Transactional` merely to suppress a
  rollback symptom.
- Force a flush in regression tests when the database error otherwise occurs
  after the assertion boundary.
- Include concurrency or isolation checks when the behavior depends on multiple
  transactions.
