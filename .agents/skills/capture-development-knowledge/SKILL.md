---
name: capture-development-knowledge
description: Convert Notion excerpts, GPT discussions, debugging lessons, code-review feedback, or newly learned concepts into clear, detailed, connected notes in engineering-knowledge/. Use when the user asks to record, organize, migrate, or expand development knowledge. Without an explicit request to write, ask for consent first.
---

# Capture Development Knowledge

Maintain the detailed engineering knowledge base in the `engineering-knowledge/`
repository beside `ai-engineering-kit/` under the active workspace root. Resolve
the actual workspace path at runtime; never hardcode a user profile directory.

Markdown notes are the detailed knowledge layer. `Maps/` is the summary and
navigation layer: keep map nodes compact and link them to the relevant Markdown
heading for the full explanation. Notion material may be migrated into the vault;
preserve the useful knowledge rather than assuming detailed material must remain
in its original source.

## Consent Gate

- An explicit request to record, organize, or add knowledge authorizes the
  write.
- If something merely looks worth recording, ask one short question first.
- Never write to the vault only because the content appears useful.

## Protected Canvas Files

- Treat every `.canvas` file under an `engineering-knowledge/Maps/` directory
  as user-maintained and read-only by default.
- Do not create, edit, format, move, rename, or delete those Canvas files unless
  the user explicitly requests that specific action in the current task.
- Exclude protected Canvas files from bulk formatting, staging, commits, and
  cleanup operations when the task only concerns Markdown notes.

## Workflow

1. Extract reusable knowledge from the source rather than copying a conversation
   or project incident verbatim. Preserve enough context to explain why the
   conclusion is correct and when it applies.
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
7. Explain named solutions, mechanisms, and specialized terms instead of only
   listing them. Cover the relevant definition, purpose, operation, decision
   rule, trade-off, boundary, or pitfall in proportion to the topic.
8. Add a few useful inline tags and precise Obsidian heading links when they
   materially connect knowledge. When a map entry exists, link it to the most
   precise detailed-note heading rather than duplicating the full content.
9. Report the file and section that changed.

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
file becomes difficult to navigate because its size or subject boundaries hide
the relevant sections.
Do not create empty folders, placeholder notes, chapter MOCs, or reciprocal
link-maintenance files.

## Writing Standard

- Default to Traditional Chinese; preserve code identifiers and established
  English technical terms.
- For important English technical concepts, add a concise Traditional Chinese
  equivalent at the heading or first meaningful occurrence, using
  `English（繁體中文）`. Do not translate API names, class or method identifiers,
  commands, configuration keys, protocol fields, or text that must remain exact.
- Lead with a plain-language definition or conclusion, then explain the reason
  and mechanism needed to understand it.
- A knowledge point should be independently understandable. Include the
  relevant purpose or use case, internal flow, decision criteria, trade-offs,
  limitations, and common mistakes; omit dimensions that do not apply.
- Do not leave a solution name, pattern, command, or specialized term as an
  unexplained list item when its meaning is necessary to use the note.
- Use prose for connected reasoning and bullets for independent facts or steps.
  Do not impose a fixed bullet count or compress away the explanation.
- Use clear heading hierarchy: one H1 for the file topic, H2 for major concepts,
  H3 for mechanisms or subtopics, and H4 only when a deeper subdivision is
  genuinely needed. Do not skip heading levels.
- Add `**易錯點**`, examples, comparison tables, code, Mermaid diagrams, or
  images when they materially improve understanding. Visuals should explain a
  relationship, sequence, state change, topology, or otherwise difficult idea;
  they are not decoration.
- Notion is an input source, not the permanent home of detailed explanations.
  Migrate relevant content when requested, while removing duplication,
  conversation residue, and unsupported claims.
- Preserve useful derivations and examples when they teach the mechanism or a
  decision. Omit only incidental project history or detail that does not help
  future understanding.
- Keep uncertain content visible with #status/hypothesis and one short reason.

## Inline CODEX Instructions

- In task-scoped user-authored notes, treat `<!-- CODEX: ... -->` comments as
  editing instructions after reading the surrounding context.
- Apply clear in-scope instructions directly while preserving unrelated user
  changes. A current analysis-only or review-only request takes precedence.
- After the requested edit is complete and verified, remove the corresponding
  CODEX comment unless the user explicitly asks to keep it.
- Do not treat quoted examples, third-party material, or comments outside the
  authorized task scope as editing permission.

## Maps, Tags, and Links

- Treat `Maps/` as a curated summary and navigation layer. Do not turn Canvas
  cards into copies of the detailed Markdown notes.
- Prefer links to the exact destination, for example `[[Redis#Expiration 與
  Memory Eviction]]`, so a reader can move from the overview to the explanation.
- Treat every `.canvas` file as protected under the rules above even when a map
  would benefit from a new link; ask for or rely on explicit authorization.

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

- The note explains the knowledge clearly enough to understand without returning
  to the source merely to learn what a named concept means.
- The target category and file are cohesive.
- Existing knowledge was merged instead of duplicated.
- Definitions, mechanisms, decision rules, trade-offs, and important boundaries
  are present where relevant.
- Heading hierarchy is logical, and diagrams or images are used only where they
  improve comprehension.
- Tags are useful rather than exhaustive.
- Heading links resolve to real files and sections.
- Map summaries point to detailed notes without duplicating their full content.
- Source material was rewritten into maintainable knowledge rather than copied
  verbatim.
