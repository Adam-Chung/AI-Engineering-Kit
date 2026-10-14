# AI Workspace: Claude Entry Point

This file is the workspace-wide Claude entry point. It sits at the common
ancestor of `ai-engineering-kit/` and every `projects/<repo>/`, so it loads
regardless of which one is the active working directory.

@ai-engineering-kit/shared/AI_COLLABORATION.md
@ai-engineering-kit/shared/profiles/PERSONAL_PROFILE.md
@ai-engineering-kit/shared/profiles/TECHNICAL_PROFILE.md
@ai-engineering-kit/shared/workflow/DYNAMIC_WORKFLOW.md

## Rules and Skills

- Load only the task-relevant document under `ai-engineering-kit/shared/rules/`.
- Reuse the workflow and references in
  `ai-engineering-kit/.agents/skills/<name>/SKILL.md` when the request matches
  that Skill. These are shared artifacts; do not duplicate their content here
  or inside a product repo.

## Boundaries

- `projects/<repo>/` are independent product repositories. Each owns its own
  source, `PROJECT_CONTEXT.md`, `docs/agent/`, Git history, and release
  decisions. None of them carries its own `CLAUDE.md`/`AGENTS.md` — this file
  is their entry point too, found via the ancestor-directory walk.
- `ai-engineering-kit/` owns reusable governance, Skills, validators, and
  templates, and is versioned in its own Git repository. Do not add product
  files there. `ai-engineering-kit/` itself no longer carries its own
  `CLAUDE.md`; this workspace-root file replaces that role for framework
  maintenance work too.
- Before staging, committing, or pushing from any repository in this
  workspace, confirm `git rev-parse --show-toplevel` resolves to the
  repository that actually owns the files being changed. Never stage
  framework files from a product repo, or product files from
  `ai-engineering-kit/`, or files from a sibling product repo.
