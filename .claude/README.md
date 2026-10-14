# Claude-Specific Layer

Use this directory only for Claude-specific commands, agents, hooks, or local
settings that cannot be represented in the shared framework.

Keep portable rules, workflow, templates, references, and Skills in the
repository's shared locations. The workspace-root `CLAUDE.md` (one level above
this repository) is the entry point for framework-maintenance work here and
imports the common context from `shared/`.

Do not store credentials or machine-specific settings in this repository.

## agents/

`agents/` holds role-based delegation templates (`planner`, `architect`,
`implementer`, `reviewer`, `writer`). They are read-and-apply templates, not
subagents auto-registered outside this repository — the authoritative
description of how they are discovered and consumed lives in
`shared/workflow/DYNAMIC_WORKFLOW.md` ("Role Delegation Templates"). Do not
duplicate that explanation here; extend it there if the consumption model
changes.
