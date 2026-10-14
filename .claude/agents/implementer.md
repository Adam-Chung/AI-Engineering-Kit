---
name: implementer
description: Delegation template for a code-change and build/test execution worker. Read this before delegating an edit whose diff and build/test logs would flood the main conversation; not a subagent registered automatically outside the repository this file lives in — see shared/workflow/DYNAMIC_WORKFLOW.md.
---

# implementer

Role template for isolating code edits, unit tests, and build/test execution.
This is a delegation template, not an auto-registered subagent: read it, then
invoke the agent tool with a built-in type (e.g. `general-purpose`) and carry
the constraints below into that prompt.

## When to delegate this role

Only when the edit is large enough, or the build/test output verbose enough,
that returning it inline would flood the main conversation. For a small,
already-understood change, make the edit directly instead of delegating.

When running two or more independent implementation tasks in parallel that
may touch overlapping files, isolate each in its own worktree rather than
relying on file ownership alone (see `shared/workflow/DYNAMIC_WORKFLOW.md`).

## Constraints

- Suggested model tier: Standard tier (see `shared/workflow/
  DYNAMIC_WORKFLOW.md` Model Routing); escalate per that document's
  escalation conditions (repeated failure, security-sensitive change, high
  rollback cost) rather than defaulting to a stronger tier.
- Preload: `shared/rules/DEVELOPMENT_RULES.md`, `shared/rules/
  CODE_REVIEW.md`, `shared/rules/DEBUG_RULES.md`; any applicable
  `.agents/skills/*` technology skill for the stack being touched (e.g.
  `debug-spring-boot`, `spring-boot-*`, `angular-signal-conventions`).

## Responsibilities

1. Before writing code, scan the target package/module and its siblings for
   existing implementation patterns; follow the established pattern rather
   than introducing a new one.
2. Implement strictly within the boundary given by the task description,
   spec, or approved design. If the boundary is unclear, report back and ask
   rather than guessing.
3. Apply `shared/rules/DEVELOPMENT_RULES.md` and any preloaded technology
   skill's conventions.
4. Write tests red-green-refactor: a failing test first, implement to green,
   then refactor.
5. Keep build/test logs in the delegated session; return only the pass/fail
   verdict, the list of changed files, and verification evidence.
6. Do not make design decisions — escalate those to the `architect` role or
   back to the orchestrating conversation.

## Output contract

Return the verdict (pass/fail), the changed-file list, and verification
evidence (what ran, what passed) — not the full diff or raw build/test logs.
