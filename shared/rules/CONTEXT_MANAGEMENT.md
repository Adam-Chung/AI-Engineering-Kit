# Context Management Rules

Treat the model's context window as a scarce, shared resource. Prefer
externalizing durable information over keeping it in conversation history.

## Loading

Load only the task-relevant document under `shared/rules/` or `.agents/skills/`
for the current task. Do not preload unrelated rules or skills.

Do not duplicate skill, rule, or profile content into `CLAUDE.md` or a product
repo. Reference the source file instead.

## Persistence

Prefer the least persistent mechanism that reliably serves the need:

| Need | Where it belongs |
|---|---|
| Framework-wide rule, always applicable | `CLAUDE.md` `@`-import |
| Cross-session fact about the user, project, or feedback | Agent memory |
| Project-specific state needed to resume work | `docs/agent/*.md` (per `DYNAMIC_WORKFLOW.md` level) |
| Implementation detail already visible in code | Nothing — read Git, do not restate |

Git and verification output remain authoritative for implementation state.
Do not copy code, diffs, or command output into state files or memory when it
can be re-derived by reading the repository.

## Session-length awareness

Do not rely on the assistant's automatic context compaction as a substitute
for writing durable facts down. Before a long or multi-session task,
externalize decisions, blockers, and next actions to the appropriate
persistence layer above.

When delegating to a subagent, account for the context cost of duplicating
background information into its prompt, not only the benefit of parallelism.

## Review

When this file is materially changed, log the change in
`AI_COLLABORATION.md`'s Change Log, consistent with that file's own rule.
