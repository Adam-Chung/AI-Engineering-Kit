# Concise Knowledge File Template

Use this as a shape, not a mandatory form. Omit optional blocks that add no
review value.

```markdown
---
tags: [<category>, <technology>, interview]
updated: YYYY-MM-DD
---

# <Technology or Problem Family>

> Optional one-line statement describing this file's review scope.

## <Knowledge Point>

#technology #concept #interview/core

- Three to seven concise, standalone points.
- Preserve the mechanism or boundary that makes the fact correct.
- Keep each bullet focused on one idea.

**易錯點**

- Add only consequential misunderstandings or interview traps.

**關聯**

- [[File#Related heading]]

## References

- [Official source](https://example.com)
```

## Required Elements

Each knowledge point needs only:

1. a descriptive heading;
2. 2–5 useful inline tags; and
3. concise core bullets.

`易錯點`, `關聯`, code, tables, diagrams, references, and status markers are
conditional. Add them only when they improve accuracy or retrieval.

## Compression Rules

- Prefer 3–7 bullets per knowledge point.
- Prefer one sentence per bullet.
- Keep a small code example only when prose would be less clear.
- Move long derivations, tutorials, case history, and extensive examples out of
  this vault.
- Do not add a `深入閱讀` or Notion section unless the user asks.
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
