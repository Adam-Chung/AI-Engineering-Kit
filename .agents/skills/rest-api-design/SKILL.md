---
name: rest-api-design
description: REST resource and URL design, HTTP method/status semantics, and the PATCH nullable-field tri-state problem, for a solo-developer backend. Use when designing a new API endpoint, naming a route, choosing an HTTP method or status code, or reviewing whether an endpoint should exist at all.
---

# REST API Design

A decision-first guide: before designing a new endpoint, work through
"Is a new endpoint really needed" and "Is this REST-shaped" before jumping
to routes.

## Decision Order

When adding an endpoint, prefer approaches in this order and only drop to
the next one when the current one genuinely doesn't fit:

1. **Existing pattern** — does an endpoint already in this codebase do
   almost this? Match its shape instead of inventing a new one.
2. **RESTful resource** — `GET`/`POST`/`PUT`/`PATCH`/`DELETE` on a noun URL.
3. **Query parameters on the existing resource** — a missing filter/sort/
   page option is not a reason for a new endpoint.
4. **A resource action sub-path** — `POST /resource/{id}/action` when the
   operation clearly acts on one existing resource (`confirmStock`,
   `archive`, `cancel`).
5. **A genuinely independent endpoint** — only when the above don't fit:
   a read-only projection that aggregates multiple resources, or a batch/
   orchestration task that isn't "an action on one resource."

Before adding a whole new read-model endpoint, ask: has chaining the
existing endpoints from the frontend actually caused a measurable problem
(extra round trips, N+1 queries, real latency)? If the only reason is
"it'd be more convenient for this one screen," encapsulate that combination
in the frontend's own API-client layer instead of adding a backend
endpoint — screen-shaped endpoints have to be edited every time the screen
changes; resource-shaped endpoints don't.

## URL and Naming

```text
✅ GET    /api/inboundDelivery              # list
✅ GET    /api/inboundDelivery/{id}         # single, by id
✅ POST   /api/inboundDelivery              # create
✅ PATCH  /api/inboundDelivery/{id}         # partial update
✅ DELETE /api/inboundDelivery/{id}         # delete

❌ GET  /api/getInboundDelivery       # REST expresses verbs via HTTP method, not the URL
❌ POST /api/inboundDelivery/create   # every action needing its own verb route → endpoint explosion
❌ GET  /api/inboundDelivery/delete/{id}   # GET must have no side effects (crawler-triggerable)
```

- URLs are nouns only; the HTTP method carries the verb.
- Use one singular route and distinguish "get one" vs "query many" by the
  presence of `{id}` — don't maintain both `/stock/{id}` and a separate
  `/stocks` for the collection.
- Sub-resources in the URL must actually belong to the parent's domain. If a
  resource crosses into another domain, put it in the request body instead
  of the path: `POST /inboundDelivery/{id}/confirmStock` with
  `{ "lpn": "LPN001" }` in the body, not
  `/inboundDelivery/{id}/licensePlateNumber/{lpn}/confirmStock`.

## HTTP Status Codes

| Method | Success | Common failure | Notes |
|---|---|---|---|
| GET | `200` | `400`, `404` | 404 = resource not found |
| POST | `201 Created` (with `Location` header) | `400`, `409`, `422` | 409 = already exists, 422 = validation failed |
| PUT | `200` or `204` | `400`, `404`, `422` | full replace |
| PATCH | `200` or `204` | `400`, `404`, `422` | partial update |
| DELETE | `204 No Content` | `400`, `404` | |

## PATCH: the Nullable-Field Tri-State Problem

A `PATCH` body needs to distinguish three states, but plain Java types
collapse two of them into the same `null`:

| JSON payload | Java (native type) | Intended meaning |
|---|---|---|
| key absent | `null` | don't update this field |
| `"field": null` | `null` | clear this field |
| `"field": "value"` | `"value"` | set this field |

If none of your fields ever need "clear to null" semantics, a plain DTO
with `!= null` checks is enough — `null` unambiguously means "don't touch
this field." Only reach for a tri-state wrapper type (e.g.
`JsonNullable<T>`) when a field genuinely needs an explicit "clear" case;
otherwise it's needless ceremony.

```java
// Fine when no field needs "clear to null"
public class PatchRequest {
    private Boolean isReleased;   // null = don't update; true/false = set
    private String priority;      // null = don't update; value = set
}
```

## Response Design

- Never return an Entity directly from a Controller — it exposes DB
  structure/relationships and blocks independent API versioning. Map to a
  DTO/Response record.
- Collection responses: pick one consistent envelope shape (`value` +
  count + next-page info, or whatever convention you start with) and reuse
  it everywhere — a different pagination shape per endpoint forces every
  consumer to write a bespoke parser.
- Time fields: ISO-8601 always (`Instant`/`LocalDate` — see the
  `spring-boot-time-handling` skill). Never raw epoch millis or a
  locale-formatted string.
- Error responses: see the `spring-boot-error-handling` skill (RFC 9457
  Problem Details).

## Anti-Patterns

```text
❌ POST /api/inboundDelivery/{no}/confirmStockByLpn
✅ POST /api/inboundDelivery/{no}/confirmStock   (lpn in body — same endpoint, more flexible)

❌ Both /stock/{id} and /stocks?scanNo=...
✅ /stock/{id} for one, /stock?filter=... for many — one route to remember

❌ One backend endpoint per frontend screen/button
✅ Endpoints model resources; screen-specific combinations live in the
   frontend's own API-client layer
```

## Checklist

- [ ] Existing endpoint + a query parameter can't already satisfy this —
      a new endpoint is actually needed
- [ ] URL is nouns only; verbs live in the HTTP method or an action sub-path
- [ ] Sub-resource in the path truly belongs to the parent's domain
- [ ] Correct status code for the method and outcome
- [ ] PATCH nullable fields: is "clear to null" actually needed, or is a
      plain `!= null` check enough?
- [ ] Response is a DTO, not the Entity
