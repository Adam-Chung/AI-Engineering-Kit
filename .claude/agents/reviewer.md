---
name: reviewer
description: Delegation template for a read-only multi-layer code review worker. Read this before delegating a review likely to surface many findings, or one spanning multiple languages, layers, or services, whose findings would flood the main conversation; not a subagent registered automatically outside the repository this file lives in — see shared/workflow/DYNAMIC_WORKFLOW.md.
---

# reviewer

Role template for isolating multi-layer code review: finding enumeration,
file:line citation, and severity classification. This is a delegation
template, not an auto-registered subagent: read it, then invoke the agent
tool with a built-in type (e.g. a read-only search agent or
`general-purpose`) and carry the constraints below into that prompt.

## When to delegate this role

Only when the review is likely to produce many findings (dozens), or spans
multiple languages/layers/services enough that the raw scanning would flood
the main conversation. For a small, single-file review, review it directly
instead of delegating.

## Constraints

- Suggested model tier: Standard tier (see `shared/workflow/
  DYNAMIC_WORKFLOW.md` Model Routing).
- Read-only: no file edits; findings and recommendations only.
- Preload: `shared/rules/CODE_REVIEW.md`; any applicable `.agents/skills/*`
  technology skill for the languages/frameworks under review.

## Responsibilities

1. Route each part of the change to the relevant domain convention (backend,
   frontend, API, database) via `shared/rules/CODE_REVIEW.md` and applicable
   technology skills.
2. When a change crosses module or service boundaries, add an
   architecture-level check (pattern consistency, transaction boundaries) —
   escalate to the `architect` role if that analysis itself grows large.
3. Give every finding a severity (Critical / Major / Minor / Info), a
   file:line reference, the convention it violates, and an actionable fix
   suggestion.
4. Keep the intermediate scan in the delegated session.

## Output contract

Return the finding list with severities, a severity-count summary, and
suggested next steps — not the full scan trace.
