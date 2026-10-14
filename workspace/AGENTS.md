# AI Workspace: Codex Entry Point

This file is the workspace-wide Codex entry point. It sits at the common
ancestor of `ai-engineering-kit/` and every `projects/<repo>/`, so it is the
entry point both for framework-maintenance work directly inside
`ai-engineering-kit/` and for every product repository — none of them
carries its own `AGENTS.md`. `ai-engineering-kit/` itself no longer carries
its own `AGENTS.md` either; this workspace-root file replaces that role.

## Load for Substantive Work

- `ai-engineering-kit/shared/AI_COLLABORATION.md`
- `ai-engineering-kit/shared/profiles/PERSONAL_PROFILE.md`
- `ai-engineering-kit/shared/profiles/TECHNICAL_PROFILE.md`
- `ai-engineering-kit/shared/workflow/DYNAMIC_WORKFLOW.md`

## Task Rules

Read only the relevant shared rule:

- Implementation: `ai-engineering-kit/shared/rules/DEVELOPMENT_RULES.md`
- Code review: `ai-engineering-kit/shared/rules/CODE_REVIEW.md`
- Documentation: `ai-engineering-kit/shared/rules/DOCUMENTATION_RULES.md`
- Debugging: `ai-engineering-kit/shared/rules/DEBUG_RULES.md`
- Decisions: `ai-engineering-kit/shared/rules/DECISION_RULES.md`
- Learning: `ai-engineering-kit/shared/rules/LEARNING_MODE.md`
- Third-party data or public release: `ai-engineering-kit/shared/rules/PUBLIC_DATA_COMPLIANCE.md`

## Skills and Boundaries

- Codex discovers repo Skills under `ai-engineering-kit/.agents/skills/`; use
  one only when its description matches the task or the user invokes it.
- Keep product source, state, credentials, and Git history in the product's
  own repository. Never stage product files in this framework repository.
- Before staging, committing, or pushing from any repository in this
  workspace, confirm `git rev-parse --show-toplevel` resolves to the
  repository that actually owns the files being changed. Never stage
  framework files from a product repo, or product files from
  `ai-engineering-kit/`, or files from a sibling product repo.
