---
name: spring-boot-naming-conventions
description: Class-naming conventions for Java/Spring Boot backend projects in this workspace (JPA entities, external API DTOs). Use when creating, reviewing, or renaming a JPA @Entity class or a record/class that models an external API's request or response payload.
---

# Spring Boot Naming Conventions

Confirmed with the user (stock-analysis-back-end, DEC-075): class names alone
should tell you whether a type is a database-mapped entity or a raw external
API payload, without having to open the file or check which package it lives
in.

## Rule

- A class annotated `@Entity` ends with `Entity` (`Stock` → `StockEntity`,
  `StockHealthProfile` → `StockHealthProfileEntity`).
- A class that models an external API's request or response payload (a
  third-party service's JSON shape, typically deserialized straight from an
  HTTP client) ends with `Dto` — camelCase, not `DTO`
  (`FinMindDividend` → `FinMindDividendDto`).

Apply this to every new class as it's created — don't wait for a batch
cleanup. When touching an existing class that violates the rule, ask the user
before renaming it as a drive-by change; renames ripple through every
reference and are worth calling out even when mechanical.

## What NOT to rename

The suffix reflects the role the class actually plays, not merely which
package it sits in:

- `@MappedSuperclass` base classes (e.g. an `Auditable` base with
  `createdAt`/`updatedAt`) are not themselves entities — leave unsuffixed.
- `@Embeddable` composite-key/value classes (e.g. a `StockYearId` used as an
  `@EmbeddedId`) are not independent entities — leave unsuffixed.
- Enums stay unsuffixed regardless of which package they live in.
- Internal computed-result value objects (a service's own return type, not an
  external API's payload shape) are not DTOs in this sense — don't suffix them
  `Dto` on the strength of this rule alone. If a project has its own
  convention for those (e.g. a `Row` suffix), follow that project's existing
  pattern instead, or ask before introducing a new one.

## Renaming an existing class safely

Renaming a widely-referenced class by hand is error-prone — a naive find/replace on the bare
class name will corrupt substrings (`Stock` → `StockEntity` must not touch
`StockDividend` or `StockRepository`). When renaming existing classes:

1. `git mv` the file to its new name first, so history is preserved.
2. Do a single word-boundary-safe pass (e.g. `\b(OldName)\b` in a script, not
   a plain string replace) across every `.java` file in both `src/main` and
   `src/test`, mapping each old name straight to its new one in one pass —
   don't do the renames one-by-one in separate passes, since an earlier
   rename's output can accidentally match a later rule.
3. Check for `@Query`/JPQL string literals that reference the entity's Java
   class name by name (not just the `@Table` name) — those need the query
   text updated too, or an explicit `@Entity(name = "...")` added to preserve
   the old JPQL name.
4. Grep for the old name afterward to confirm zero leftover references, then
   `mvn compile`, `mvn test-compile`, and the full test suite before treating
   the rename as done.
