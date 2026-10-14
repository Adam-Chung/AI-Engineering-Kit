---
name: spring-boot-time-handling
description: Choosing the right Java time type for Entity/DTO fields, database columns, and JSON in a Spring Boot project. Use when adding, reviewing, or debugging a date/time field, timestamp, or timezone-related bug.
---

# Spring Boot Time Handling

A narrow but high-value rule: picking the wrong time type is one of the
easiest ways to ship a bug that only shows up when the server's timezone
differs from the developer's laptop (e.g. `Asia/Taipei` locally vs `UTC` in a
container).

## The Rule

Entity and DTO date/time fields use exactly one of two types:

- **`Instant`** — for a *point in time* (event timestamp, expiration,
  audit fields like `createdAt`/`updatedAt`)
- **`LocalDate`** — for a *calendar date* with no time-of-day component
  (schedule date, delivery date, birthdate)

`ZonedDateTime`, `LocalDateTime`, `java.util.Date`, and `Calendar` are
prohibited on Entities and DTOs.

```java
// ✅
@Entity
public class OrderEntity {
    @Column(name = "SHIPPED_AT")
    private Instant shippedAt;              // point in time

    @Column(name = "SCHEDULED_SHIP_DATE")
    private LocalDate scheduledShipDate;    // calendar date, no time-of-day
}

// ❌ — these types are prohibited on Entity/DTO
private ZonedDateTime startTime;   // carries IANA timezone rules; DB round-trip loses info
private LocalDateTime eventTime;   // no timezone; different JVM timezones yield different results
private Date createTime;           // legacy, not thread-safe, complex timezone handling
```

## Why Not the Alternatives

- **`LocalDateTime`**: carries no timezone. When persisted, the JDBC/JPA
  driver implicitly applies the JVM's timezone — a value written from a
  laptop in `Asia/Taipei` and read back in a `UTC` container silently
  disagrees.
- **`ZonedDateTime`**: carries full IANA timezone + DST rules, which bloats
  serialized payloads, and most databases only store an offset (not a zone
  name) — so a round trip through the DB loses the zone information anyway.
- **`OffsetDateTime`**: unnecessary if everything is stored in UTC — the
  offset is redundant noise once the database's convention is "always UTC."
- **`java.util.Date` / `Calendar`**: legacy, mutable, not thread-safe, fully
  superseded by `java.time`.

If you need local-time semantics (e.g. "8am in the user's timezone"), store
`Instant` plus a separate `timeZone: String` field rather than reaching for
`ZonedDateTime`.

## During Calculations, Not Storage

`ZonedDateTime`, `LocalDate`, `LocalTime`, and `LocalDateTime` are fine as
**method-local variables** for date arithmetic or timezone conversion — no
serialization is involved mid-calculation. Convert the result back to
`Instant` (or `LocalDate`) before storing.

```java
public Instant getTodayMidnight(ZoneId timezone) {
    LocalDate today = LocalDate.now(timezone);
    return today.atStartOfDay(timezone).toInstant();
}
```

Always pass the timezone explicitly — never rely on the JVM's default
timezone for a calculation whose result gets persisted or shown to a user in
a different timezone.

## JSON Serialization

With Jackson's `jackson-datatype-jsr310` module (bundled by default in
recent Spring Boot), no custom serializers are needed:

| Type | Default JSON | Example |
|---|---|---|
| `Instant` | ISO-8601 UTC | `"2024-02-02T08:07:23.400Z"` |
| `LocalDate` | ISO-8601 | `"2024-02-02"` |

## Checklist

- [ ] New date/time field: is it a moment (`Instant`) or a calendar date
      (`LocalDate`)? Decide by what the data means, not by field name suffix.
- [ ] No `ZonedDateTime`/`LocalDateTime`/`Date`/`Calendar` on an Entity or DTO
- [ ] Any calculation that touches a timezone passes it explicitly, never the
      JVM default
- [ ] Calculation results are converted back to `Instant`/`LocalDate` before
      being persisted or returned
