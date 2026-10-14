# Knowledge Base Categories

Use exactly these five top-level categories. Do not create another top-level
category without the user's explicit approval.

## Backend

Backend languages, frameworks, databases, code review, coding style, naming,
and backend engineering practices.

Examples:

- `Backend/Java.md`
- `Backend/Spring Boot.md`
- `Backend/Database.md`
- `Backend/Code Quality.md`

Keep Java-specific naming or style in `Java.md`. Move language-independent
backend review or naming guidance to `Code Quality.md` only after enough
content exists to justify a separate file.

## Frontend

Frontend frameworks, UI implementation, browser behavior, state management,
and frontend engineering practices.

Example: `Frontend/Angular.md`.

## Architecture

Reusable architectural models and system-level trade-offs that apply beyond a
single implementation incident.

Examples:

- `Architecture/Software Architecture.md`
- `Architecture/Distributed Systems.md`
- `Architecture/System Design.md`

## Implementation

Concrete implementation lessons, platform limits, debugging outcomes,
integration constraints, and operational failure handling.

Start with `Implementation/Implementation.md`. Keep different lessons as
sections in that file until there is enough cohesive content to justify a
technology-specific file.

## Books

Book-specific notes that preserve the author's structure or require book
assets. A book may keep its own subfolder, main Markdown note, images, and
diagrams.

If a book insight becomes a reusable interview concept, summarize it in the
appropriate Backend, Frontend, or Architecture file rather than moving or
duplicating the full book discussion.

## Routing Boundaries

Use the knowledge's purpose, not just its technology name:

- Java Generics -> `Backend/Java.md`
- Java class naming -> initially `Backend/Java.md`
- Angular Signals -> `Frontend/Angular.md`
- Distributed transaction model -> `Architecture/Distributed Systems.md`
- A Cloudflare Workers subrequest failure and mitigation ->
  `Implementation/Implementation.md`
- An author's explanation of replication -> the relevant book note
- A concise, reusable replication interview summary ->
  `Architecture/Distributed Systems.md`
