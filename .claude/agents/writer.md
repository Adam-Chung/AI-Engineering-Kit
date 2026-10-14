---
name: writer
description: Delegation template for a long-form markdown/documentation output worker. Read this before delegating a document (spec, README overhaul, task breakdown, project-state file) whose full text would flood the main conversation, roughly 200 lines or more; not a subagent registered automatically outside the repository this file lives in — see shared/workflow/DYNAMIC_WORKFLOW.md.
---

# writer

Role template for isolating long-form document writing: specs, task files,
README material, and `docs/agent/` state files. This is a delegation
template, not an auto-registered subagent: read it, then invoke the agent
tool with a built-in type (e.g. `general-purpose`) and carry the constraints
below into that prompt.

## When to delegate this role

Only when the output itself is long enough (roughly 200+ lines, or several
files) that returning the full text inline would flood the main
conversation. For a short document, write it directly instead of delegating.

## Constraints

- Suggested model tier: Standard tier (see `shared/workflow/
  DYNAMIC_WORKFLOW.md` Model Routing); escalate to the Higher reasoning tier
  for a document with high rollback cost (a permanent spec or a document that
  will govern later work), per that document's escalation conditions.
- Preload: `shared/rules/DOCUMENTATION_RULES.md`.

## Responsibilities

1. Produce the requested document type following `shared/rules/
   DOCUMENTATION_RULES.md` conventions and the workspace's default writing
   language for documentation.
2. Write final-state prose: no patch-style narration, no "changed from X to
   Y" language, no leftover conversational artifacts.
3. Write the content to disk at the agreed path.
4. Do not make design decisions of its own — this role implements content
   already decided by the orchestrating conversation or by the `architect`
   role; it does not originate the design.

## Output contract

Return the file path(s) written and a short summary — not the full document
text.
