# Detailed Knowledge File Template

Use this as a shape, not a mandatory form. Omit optional blocks that add no
explanatory value.

```markdown
---
tags: [<category>, <technology>, interview]
updated: YYYY-MM-DD
---

# <Technology or Problem Family>

> Optional one-line statement describing this file's scope.

## <Knowledge Point>

#technology #concept #interview/core

> **重點：** Use one or two sentences to state the section's core meaning,
> decision, or relationship without merely repeating the heading.

Then explain the relevant
purpose, mechanism, flow, decision criteria, trade-offs, limitations, and
failure modes. Use paragraphs and bullets according to the relationship between
ideas; no fixed bullet count applies.

### <Mechanism or Subtopic>

> **重點：** Summarize what this mechanism does and why it matters in one or
> two sentences.

Explain how the concept works. Add a minimal example, comparison table, code,
Mermaid diagram, or image when it makes the knowledge materially easier to
understand.

**易錯點**

- Add consequential misunderstandings, operational traps, or misleading
  simplifications.

**關聯**

- [[File#Related heading]]

## References

- [Official source](https://example.com)
```

## Required Elements

Each knowledge point needs:

1. a descriptive heading;
2. 2–5 useful inline tags;
3. a one- or two-sentence `> **重點：**` summary directly below the heading
   and any tag line;
4. a clear definition or conclusion; and
5. enough explanation to understand how and when the concept applies.

`易錯點`, `關聯`, code, tables, diagrams, references, and status markers are
conditional. Add them only when they improve accuracy or retrieval.

## Depth and Structure Rules

- Use one H1 for the file topic, H2 for major knowledge points, H3 for mechanisms
  or subtopics, and H4 only when necessary. Do not skip heading levels.
- Add a `重點` summary below every H2/H3 heading and any tag line. It should
  explain the key concept or judgment, not restate the title.
- Explain specialized terms and named solutions on first meaningful use; do not
  leave them as unexplained keyword lists.
- Keep derivations, examples, and case context when they clarify the mechanism
  or a decision, but remove conversation residue and unrelated history.
- Prefer Mermaid for flows, sequences, states, and relationships; use tables for
  exact comparisons and images for visual structures that prose cannot explain
  efficiently.
- Split a page when size or mixed subject boundaries make navigation difficult,
  not merely because the note is detailed.
- Notion content may be migrated into this vault. Merge it into the appropriate
  section rather than creating a separate `深入閱讀` area by default.
- Mark unverified reasoning inline with #status/hypothesis and one sentence
  explaining the uncertainty.

## Tag Example

```markdown
## HashMap

#java #collections #hashmap #interview/core
```

Use consistent lowercase tags. Do not tag every noun.

## Precise Link Example

```markdown
**關聯**

- [[Java#Red-Black Tree]] — HashMap bucket treeification uses this structure.
```

Tags group related knowledge; heading links explain a specific relationship.
