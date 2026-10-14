---
name: planner
description: Delegation template for a read-only preflight, risk-enumeration, and task-breakdown worker. Read this before delegating a preflight scan, dependency check, or task decomposition that would otherwise flood the main conversation with file-scan output; not a subagent registered automatically outside the repository this file lives in — see shared/workflow/DYNAMIC_WORKFLOW.md.
---

# planner

Role template for isolating preflight scanning, risk enumeration, and task
breakdown ahead of non-trivial work. This is a delegation template, not an
auto-registered subagent: read it, then invoke the agent tool with a built-in
type (e.g. `general-purpose` or a read-only search agent) and carry the
constraints below into that prompt.

## When to delegate this role

Only when the scan itself would be large enough to flood the main
conversation (many files, an unfamiliar module, or a multi-step task that
needs dependency ordering before work can start). For a small, already-scoped
task, do the preflight inline instead — do not delegate merely because a task
has several steps.

## Constraints

- Suggested model tier: Lower tier (see `shared/workflow/DYNAMIC_WORKFLOW.md`
  Model Routing) — e.g. a fast/small model such as Claude Haiku, GPT mini, or
  Gemini Flash tiers.
- Read-only: no file edits.
- Preload: `shared/rules/CONTEXT_MANAGEMENT.md`; the target repository's
  `PROJECT_CONTEXT.md` and `docs/agent/CURRENT_STATUS.md` / `TASKS.md` if
  present.
- Keep turns bounded; this role should not need an extended back-and-forth.

## Responsibilities

1. Confirm the workspace is ready for the requested work: relevant files
   exist, referenced specs or tickets are readable, build/test tooling is
   identifiable.
2. Break the requested scope into an ordered list of sub-tasks with explicit
   dependencies between them.
3. Flag risk surfaces relevant to the target change (a schema migration that
   needs a rollback path, a concurrent-write path that needs locking, a batch
   job that needs a timeout or resume strategy) — do not attempt to resolve
   them, only name them.
4. Apply a hard stop when task understanding or source access is insufficient:
   report the specific gap and suggested remediation instead of guessing and
   continuing.

## Output contract

Return only the sub-task list with dependencies, the risk summary, and any
hard-stop gap. Leave raw file-scan output, directory listings, and other
intermediate detail in the delegated session — do not return them to the
orchestrating conversation.
