---
name: write-git-commit-message
description: Generate, optimize, or review accurate English Git commit messages from repository evidence. Use when the user asks for a commit message, wants to improve or translate one, is preparing to commit staged changes, or needs Conventional Commits type, scope, subject, body, breaking-change, or trailer guidance.
---

# Write Git Commit Messages

## Gather evidence

1. Confirm the owning repository with `git rev-parse --show-toplevel`.
2. Read `git status --short` and inspect `git diff --cached` when changes are staged.
3. If nothing is staged and the user only wants a suggestion, inspect the relevant working-tree diff without staging it.
4. Read recent subjects with `git log -10 --format=%s` to identify repository style.
5. Base the message on the actual diff, not only the conversation summary or filenames.

If the diff contains unrelated concerns, recommend separate commits and provide one message per coherent change. Do not hide mixed scope behind a vague subject.

Before finalizing a message, scan the diff itself for credentials, API keys, tokens, connection strings, private keys, or personal data (see the workspace's Git Upload Safety rule in `shared/AI_COLLABORATION.md`). If anything sensitive is staged, flag it to the user instead of proceeding, even if the user only asked for a commit message.

## Choose the format

Follow the repository's established format when it is clear. Otherwise use Conventional Commits:

```text
type(optional-scope): imperative English summary
```

Choose the narrowest accurate type:

- `feat`: user-visible capability
- `fix`: defect correction
- `refactor`: behavior-preserving structural change
- `perf`: performance improvement
- `test`: test-only change
- `docs`: documentation-only change
- `build`: build system or dependency change
- `ci`: CI workflow change
- `chore`: maintenance not covered above
- `revert`: revert an earlier commit

Use a scope only when it adds durable meaning. Do not use a file or ticket name as scope merely because it is available.

## Write the subject

- Always write Git commit messages in English.
- Describe the outcome or behavior change, not the editing activity.
- Use imperative mood: `add`, `prevent`, `support`, `remove`, `align`.
- Keep the subject concise, ideally at most 72 characters.
- Use sentence fragments without a trailing period.
- Avoid vague verbs such as `update`, `change`, `improve`, or `fix stuff` when a precise verb is available.
- Do not claim a feature, fix, migration, test result, or compatibility guarantee that the diff does not establish.
- Do not translate a Chinese draft literally; rewrite it as natural technical English.

## Add body and trailers only when useful

Add a body when the reason, trade-off, migration, or user impact is not clear from the subject. Explain why the change exists and any important operational consequence; do not narrate every modified file.

Use `type(scope)!:` and a `BREAKING CHANGE:` footer when existing consumers must change. Preserve verified issue references and co-author trailers exactly. Never invent tickets, test results, or trailers.

## Return the result

Return one recommended message first in a code block. Add at most two alternatives only when the diff genuinely supports different emphasis. Briefly explain type or scope choices when they may be non-obvious.

Do not run `git commit`, stage files, amend history, or push unless the user explicitly requests that action.

## Examples

```text
feat(search): query stocks only after Enter is pressed
```

```text
fix(finmind): fall back to token after anonymous quota exhaustion
```

```text
build: add Render deployment configuration
```

```text
feat(ai): generate web-grounded investment suggestions

Use Groq Compound search results to create and cache stock-specific
suggestions while keeping API credentials on the backend.
```
