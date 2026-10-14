---
name: capture-development-knowledge
description: Convert Notion excerpts, GPT discussions, debugging lessons, code-review feedback, or newly learned concepts into concise, interview-oriented notes in engineering-knowledge/. Use when the user asks to record, organize, or add development knowledge. Without an explicit request to write, ask for consent first.
---

# Capture Development Knowledge

Maintain the interview review knowledge base in the `engineering-knowledge/`
repository beside `ai-engineering-kit/` under the active workspace root. Resolve
the actual workspace path at runtime; never hardcode a user profile directory.

The vault is the concise review layer. Detailed explanations, learning history,
and long examples stay in Notion or their original source unless the user asks
otherwise.

## Consent Gate

- An explicit request to record, organize, or add knowledge authorizes the
  write.
- If something merely looks worth recording, ask one short question first.
- Never write to the vault only because the content appears useful.

## Workflow

1. Extract the reusable conclusion rather than copying the conversation or
   project incident.
2. Generalize project-specific identifiers unless the platform or product is
   essential to the lesson.
3. Read [references/category-taxonomy.md](references/category-taxonomy.md) and
   select one of the five fixed top-level categories.
4. Search the target file and nearby files by heading, tags, and keywords.
   Merge with an existing section whenever possible.
5. Verify technical claims against official documentation, a specification,
   source code, tests, or clearly identified experience. Do not turn GPT output
   into an unqualified fact.
6. Write or update the smallest cohesive topic file using
   [references/note-template.md](references/note-template.md).
7. Add a few useful inline tags and precise Obsidian heading links when they
   materially connect knowledge.
8. Report the file and section that changed.

## File Granularity

Prefer one file per stable technology or problem family and one section per
knowledge point.

- Good: `Backend/Java.md`, with sections for Generics, HashMap, Concurrency,
  JVM, and Java I/O.
- Good: `Implementation/Implementation.md`, while implementation lessons are
  still few and cohesive.
- Avoid one file per small concept.
- Avoid one giant file for unrelated technologies.

Create a new file only when no cohesive existing file fits, or when the current
file can no longer be scanned quickly because it crosses distinct domains.
Do not create empty folders, placeholder notes, chapter MOCs, or reciprocal
link-maintenance files.

## Writing Standard

- Default to Traditional Chinese; preserve code identifiers and established
  English technical terms.
- Lead with the interview-relevant conclusion.
- A normal knowledge point contains 3–7 one-line bullets.
- Keep only definitions, mechanisms, decision rules, important boundaries, and
  common traps worth recalling before an interview.
- Add `**易錯點**`, a comparison table, diagram, or minimal code only when it
  materially improves understanding. None is mandatory.
- Do not add a Notion or deep-reading section unless the user explicitly asks.
- Do not repeat detailed tutorials, long derivations, or full project history.
- Keep uncertain content visible with #status/hypothesis and one short reason.

## Tags and Links

Place 2–5 inline Obsidian tags directly below the relevant heading. Prefer:

- technology: #java, #angular, #cloudflare-workers
- domain: #collections, #concurrency, #naming
- interview priority: #interview/core, #interview/follow-up
- uncertainty only when needed: #status/hypothesis

Write tags as plain Markdown text. Never wrap a tag line or individual tag in
backticks because inline code prevents Obsidian from indexing it as a tag.

Tags support discovery across files. Use heading links for precise conceptual
relationships, for example `[[Java#HashMap]]`. Add a `**關聯**` block only when
the relationship helps review; do not force bidirectional links everywhere.

## Evidence

Use this priority: official documentation or specification, authoritative
source code, framework documentation, established best practice, direct
experience, then explicitly marked hypothesis. Keep references compact, usually
in a file-level `References` section rather than repeating them after every
knowledge point.

## Completion Check

- The content is concise enough for interview review.
- The target category and file are cohesive.
- Existing knowledge was merged instead of duplicated.
- Important technical boundaries remain accurate after compression.
- Tags are useful rather than exhaustive.
- Heading links resolve to real files and sections.
- Detailed source material was not copied into the vault unnecessarily.
