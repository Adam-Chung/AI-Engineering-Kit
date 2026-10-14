---
name: explain-codebase
description: Explain an unfamiliar module, service, or repository's architecture, design patterns, component relationships, and key methods before the user modifies or reviews it. Use when the user asks to understand, get oriented in, walk through, or learn an existing codebase, module, or file they have not worked with before, or asks what a piece of code does and why it is structured that way.
disable-model-invocation: true
---

# Explain Codebase

Read-only orientation for someone about to work in code they did not write.
Build understanding grounded in what is actually in the repository, not a
generic description of the technology involved.

## Workflow

1. Establish scope: which module, service, or file(s), and why (about to
   modify it, review it, or just learning the area). If the scope is
   unclear, ask before scanning broadly.
2. Preflight: check for the target repository's `PROJECT_CONTEXT.md` and
   `docs/agent/CURRENT_STATUS.md` / `DECISIONS.md`, and the nearest
   `README.md`. Read them first so the explanation aligns with already
   recorded facts and decisions instead of re-deriving them from scratch.
   State plainly what is missing rather than inventing it.
3. Locate the module: entry points, directory boundaries, and how it is
   wired into the rest of the system (routes, dependency injection, event
   subscriptions, configuration).
4. Identify its architectural role: which layer it belongs to, which design
   pattern(s) it uses (service, repository, state machine, strategy,
   event-driven, etc.), and how that compares to sibling modules in the
   same codebase.
5. Map key relationships: what calls into this code, what it calls out to,
   and what data or contract crosses each boundary.
6. Walk through the methods or classes that carry the substantive logic —
   skip trivial getters/setters and boilerplate.
7. Add a short Mermaid diagram (class, sequence, or flow — whichever best
   shows what was found) only when it clarifies structure that prose alone
   would not.
8. Summarize: architectural position, pattern(s) in use, key relationships,
   and anything that looks like a deviation from surrounding conventions
   worth flagging before the user changes it.

## Guardrails

- Read-only: do not modify files while explaining them.
- Do not claim a pattern or relationship that was not actually read in the
  code; state uncertainty instead of guessing.
- Match depth to need: a short orientation for a quick look, a fuller
  walkthrough before a non-trivial change or review.
- If the module is large enough, or spans enough files, that a full scan
  would flood the conversation, delegate instead of dumping the whole scan
  inline: use the `architect` role template
  (`ai-engineering-kit/.claude/agents/architect.md`) for cross-module
  analysis, or the `planner` role template
  (`ai-engineering-kit/.claude/agents/planner.md`) for a broader
  readiness/risk pass — see `shared/workflow/DYNAMIC_WORKFLOW.md` for how to
  read and apply those templates.

## Completion Criteria

- The user can state, in their own words, where this code sits
  architecturally and how it connects to its neighbors.
- Every claim traces to a specific file:line the user could verify.
- Any recorded project decision relevant to the explained area (from
  `docs/agent/DECISIONS.md`, if present) is surfaced, not silently omitted.
