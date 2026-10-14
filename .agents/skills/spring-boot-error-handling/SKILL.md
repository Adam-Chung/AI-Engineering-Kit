---
name: spring-boot-error-handling
description: Designing a unified RFC 9457 (Problem Details) error response format for a Spring Boot API — ProblemType/ProblemCode/ProblemDetail layering and a global exception handler. Use when setting up API error handling for a new Spring Boot project, adding a new error case, or reviewing how a Controller throws/handles exceptions.
---

# Spring Boot Error Handling (RFC 9457)

A layered error-response design so every endpoint returns the same JSON
shape for errors, and Controllers never hand-assemble error responses.

## Layering

```text
Exception thrown → CommonExceptionHandler (@ControllerAdvice)
                  → builds ProblemDetail from ProblemType + ProblemCode
                  → ResponseEntity<ProblemDetail> to the client
```

1. **`ProblemType`** — the error *classification*: HTTP status, a type URI,
   a human title. One `ProblemType` = one HTTP status + one title, but many
   `ProblemCode`s can share it.
2. **`ProblemCode`** — the specific error code + a message template (can
   include `{parameter}` placeholders). Always points at one `ProblemType`.
3. **`ProblemDetail`** — the actual response body: assembles type/title/
   status/detail, plus extension fields (`code`, `trackingId`, per-field
   `errors`, `context`).
4. **`CommonExceptionHandler`** (`@ControllerAdvice`) — intercepts
   exceptions globally and converts them to `ProblemDetail`.

This split matters because it lets many distinct error codes share one
HTTP status + classification, so the frontend can `switch` on `type` once
and handle a whole category of errors the same way, instead of growing a
special case per code.

## Minimal Implementation

```java
public interface ProblemType {
    URI getType();
    Integer getStatus();
    String getTitle();
}

public enum CommonProblemType implements ProblemType {
    BAD_REQUEST(URI.create("https://api.example.com/problems/bad-request"), 400, "Bad Request"),
    NOT_FOUND(URI.create("https://api.example.com/problems/not-found"), 404, "Not Found"),
    INTERNAL_SERVER_ERROR(URI.create("https://api.example.com/problems/internal-server-error"), 500, "Internal Server Error");
    // ...
}

public interface ProblemCode {
    ProblemType getProblemType();
    String getCode();
    String getDetail(); // may contain {parameterName} placeholders
}

public enum CommonProblemCode implements ProblemCode {
    RESOURCE_NOT_FOUND(CommonProblemType.NOT_FOUND, "RESOURCE_NOT_FOUND", "Resource {resourceType} with ID {id} not found"),
    UNEXPECTED_ERROR(CommonProblemType.INTERNAL_SERVER_ERROR, "UNEXPECTED_ERROR", "An unexpected error occurred: {message}");
    // ...
}
```

Response shape (RFC 9457 required fields + extensions):

```json
{
    "type": "https://api.example.com/problems/not-found",
    "title": "Not Found",
    "status": 404,
    "detail": "Resource User with ID 123 not found",
    "instance": "/api/v1/users/123",
    "code": "RESOURCE_NOT_FOUND",
    "trackingId": "abc-123-def-456",
    "errors": [{ "detail": "Email format is invalid", "pointer": "/email" }],
    "context": { "fieldName": "email" }
}
```

`type`/`title`/`status` are RFC 9457-required; `detail`/`instance` are
recommended; `code`/`trackingId`/`errors`/`context` are project extensions
for programmatic handling, cross-service tracing, and validation detail.

## Usage in a Controller

```java
@GetMapping("/api/v1/users/{id}")
public ResponseEntity<UserResponse> getUser(@PathVariable String id) {
    User user = userService.findById(id);
    if (user == null) {
        throw ProblemDetailException.of(
            ProblemDetailUtils.resourceNotFoundWithId("User", id));
    }
    return ResponseEntity.ok(UserResponse.from(user));
}
```

Controllers only ever throw — never build a `ResponseEntity` for an error
case by hand. That's the entire point of centralizing this in
`CommonExceptionHandler`.

## Best Practices

- Set `trackingId` in MDC at the request entry point (a Filter or
  Interceptor) so every log line for a request can be correlated, even
  across services.
- Keep all `ProblemCode`s in one or a few enums — scattering ad hoc error
  codes across the codebase causes duplication and drift.
- When using a message template, make sure the parameter names match the
  `context` map's keys exactly — a mismatch leaves a literal
  `{placeholder}` in the response.
- Prefer reusing an existing `ProblemType` over adding a new one for
  something that's semantically the same category — fewer types means
  fewer branches the frontend has to special-case.

## Checklist

- [ ] Controllers only throw exceptions; no hand-built error `ResponseEntity`
- [ ] New error code added to an existing `ProblemCode` enum, not a new class
- [ ] `type`/`title`/`status`/`detail` present on every error response
- [ ] `trackingId` set at request entry for cross-service correlation
- [ ] Message template `{parameters}` match the `context` map keys exactly

## Reference

[RFC 9457: Problem Details for HTTP APIs](https://datatracker.ietf.org/doc/html/rfc9457)
