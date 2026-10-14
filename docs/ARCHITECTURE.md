# Framework Architecture

## Ownership

| Area | Owner | Purpose |
|---|---|---|
| `shared/` | Cross-tool | Canonical governance, profiles, workflow, and task rules |
| `.agents/skills/` | Codex-native, reusable | Discoverable Skills with references and evals |
| `.claude/` | Claude-native | Only Claude-specific behavior that cannot be shared |
| `templates/` | Cross-tool | Files copied into a product repository when needed |
| `.claude/agents/` | Claude-native | Role-based delegation templates (preload list, model-tier hint, output contract); see Skill Trigger Types and `shared/workflow/DYNAMIC_WORKFLOW.md` for how they are consumed |
| `validators/` and `evals/` | Framework | Deterministic structure checks (Node canonical, PowerShell wrapper) and routing cases |
| `.github/workflows/` and `.githooks/` | Framework | CI and optional local pre-commit invocation of the validator |
| `VERSION` | Framework | Current framework version |

## Skill Trigger Types

Every Skill under `.agents/skills/` falls into one of three trigger types. State
the type in the Skill's own documentation or commit message when it is not
obvious from its `description`; do not add a formal frontmatter field for it
unless a consuming tool requires one.

| Type | Trigger | Typical use |
|---|---|---|
| Rule | Loaded in the background by `CLAUDE.md` / `AGENTS.md` guidance ("load the task-relevant document") whenever a matching file or task is open; no explicit call | `shared/rules/*.md` — coding, review, debug, and documentation conventions |
| Suggest | The model recognizes intent from the conversation and proposes starting the Skill; the user confirms scope before it runs | Multi-step or moderately costly Skills where the model should offer, not silently execute |
| Command | Only used when explicitly requested; appropriate for `disable-model-invocation: true` | Single well-defined tasks or read-only analyses, e.g. `write-git-commit-message` |

This taxonomy is descriptive, not a new mechanism: `shared/rules/*.md` already
behaves as Rule-type through `CLAUDE.md`'s existing instruction, and Skills
already choose Suggest vs. Command through their `description` wording and the
optional `disable-model-invocation` field. Use it when authoring a new Skill to
decide which of the two fields it needs, not to retrofit existing Skills.

## Adapter Model

`AGENTS.md` and `CLAUDE.md` live one level above this repository, at the
workspace root — not inside `ai-engineering-kit/` itself. This single pair is
the entry point for every consumer: framework-maintenance work done directly
on `ai-engineering-kit/`, and every product repository under
`projects/<repo>/`. No product repository carries its own copy; the
workspace root is their common ancestor directory, so Claude Code / Codex
resolve it regardless of which repository is the active working directory.
These files are not framework-versioned artifacts and are not tracked by
this repository's Git history.

This model assumes the AI tool's memory-file discovery walks up the
directory tree across the boundary between a product repository's own Git
repository and the workspace root. Verify this holds for each tool actually
in use; if a tool only reads memory files from inside the repository it was
opened in, a product repository under `projects/<repo>/` will have no
adapter at all under this model.

## Git Boundary Rule

The framework repository must never track a product repository. A product
repository must never track framework Git metadata, shared credentials, or
another product repository. Verify `git rev-parse --show-toplevel` before any
stage, commit, or push.
