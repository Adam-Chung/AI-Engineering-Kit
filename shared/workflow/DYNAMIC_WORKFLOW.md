# Dynamic Development Workflow

## Purpose

Use a reliable Harness Engineering foundation with an outer Loop Engineering cycle. The workflow adapts to current evidence while retaining explicit safety, verification, ownership, and stopping controls.

## Project State

Use the lightest workflow level that reliably controls the work:

| Level | Use when | Required persistent state |
|---|---|---|
| Lightweight | Bounded, low-risk work expected to finish in one session | None; keep acceptance checks in the active task |
| Standard | Multiple related files, moderate ambiguity, or useful cross-session continuity | `CURRENT_STATUS.md` and `TASKS.md` |
| Full | Cross-cutting or high-risk work, multi-agent coordination, architectural decisions, or handoff | All relevant files below |

Escalate the level when scope, risk, coordination, or continuity needs grow.
Do not initialize state files merely to satisfy ceremony.

Standard and full projects keep their state in `docs/agent/`:

- `CURRENT_STATUS.md`: current objective, evidence, blockers, and next action
- `TASKS.md`: task ownership, dependencies, status, and acceptance criteria
- `DECISIONS.md`: durable technical decisions and their evidence
- `HANDOFF.md`: concise resume instructions for unfinished work

Initialize only the files required by the selected level from
`templates/project-agent-state/`. Replace placeholders only with confirmed
information.

Git and verification output are authoritative for implementation state. State documents provide coordination and resumption context; they do not override the repository.

## Outer Loop

Run the following cycle for each meaningful unit of work:

1. **Observe**: read project context and state, inspect relevant code and Git state, and collect current evidence.
2. **Plan**: select the smallest safe next action and define its acceptance check.
3. **Act**: perform the action directly or delegate a bounded, independent task.
4. **Verify**: run the relevant tests, checks, review, or artifact inspection.
5. **Record**: update confirmed progress, evidence, decisions, blockers, and ownership.
6. **Adapt**: complete, continue, replan, retry, escalate, or stop based on evidence.

The plan is revisable. Do not continue a stale sequence after its assumptions have been disproved.

## Harness Controls

Before execution, establish controls proportional to the task risk:

- allowed tools and write scope
- required context and project instructions
- model tier and escalation conditions
- acceptance criteria and verification commands
- operations requiring human approval
- retry limit and recovery approach
- completion, escalation, and stop conditions

Never use an autonomous loop without a bounded objective and explicit termination rules.

## Model Routing

Use the least costly model tier that can complete the task reliably. Route by task characteristics rather than always selecting the strongest available model.

| Task characteristics | Default tier |
|---|---|
| Mechanical, bounded, low-risk, and easy to verify | Lower tier |
| Moderate reasoning, several related files, or some ambiguity | Standard tier |
| Architectural, ambiguous, high-risk, cross-cutting, or difficult to verify | Higher reasoning tier |

Examples suitable for a lower tier include formatting, focused searches, simple documentation updates, mechanical transformations, and running predefined checks. Higher reasoning is appropriate for architecture, unclear requirements, complex debugging, security-sensitive changes, and integration decisions with broad consequences.

Escalate to a stronger tier when one or more of these conditions occurs:

- repeated failure without useful new evidence
- contradictions remain unresolved after inspection
- the task expands beyond its original bounded scope
- verification is weak relative to the consequence of an error
- a decision has high rollback cost or broad system impact

Do not escalate merely because a task is long. Prefer decomposition, better context, or deterministic tools when those address the difficulty more directly. Record material routing or escalation decisions when they affect cost, risk, or handoff.

## Multi-Agent Coordination

- Use the primary agent by default. Multi-agent execution must have a concrete expected benefit that exceeds its coordination and token costs.
- The orchestrating agent owns the objective, decomposition, integration, and final verification.
- Delegate only bounded tasks that can progress independently.
- Assign one owner to each active task.
- Avoid concurrent edits to the same files or responsibility area.
- Use direct messages for time-sensitive coordination.
- Persist confirmed shared facts and results in the project state files.
- Treat a subagent report as evidence to inspect, not automatic proof of completion.
- Delegate at most one layer deep: an orchestrating agent may delegate to a sub-agent, but that sub-agent must not itself delegate to another agent. Decompose further work back into the orchestrating agent instead of letting delegation chains form.
- When a delegated task hits a blocker (conflicting requirements, missing authorization, an unresolved risk), stop that task explicitly and record the evidence rather than silently choosing a side and continuing. Surface it at the next checkpoint through the Human gate transition below.

Delegate when at least one of these conditions applies:

- two or more substantial tasks are independent and can make useful progress in parallel
- a bounded specialist investigation would materially reduce uncertainty
- an isolated reviewer is justified by the change risk
- the primary agent is blocked while another independent task can still progress

Keep the work with the primary agent when it is small, sequential, tightly coupled to current context, likely to touch the same files, or faster to execute than to explain and integrate. Do not delegate merely to create apparent parallelism.

Before delegating, define the task boundary, allowed files or systems, expected output, acceptance criteria, and ownership. After delegation, include integration and independent verification in the cost assessment.

Choose foreground or background execution based on whether the next step depends on the result: run in the foreground when you cannot proceed without the outcome; run in the background when the work can proceed in parallel and the result is only needed later. When running in the background, wait for the completion notification instead of polling or fabricating an interim result. When two or more independent tasks may touch overlapping files, isolate each in its own worktree rather than relying on ownership discipline alone.

### Role Delegation Templates

`ai-engineering-kit/.claude/agents/*.md` defines reusable role templates
(`planner`, `architect`, `implementer`, `reviewer`, `writer`) — each states when
the role is worth delegating to, its suggested model tier from the routing
table above, the rules it should read first, and the output contract it must
return. These are templates to read and apply, not subagents registered
automatically in every repository: a tool's native subagent discovery
typically only covers the repository it was opened in, so a role defined here
will not appear as a selectable agent type when working inside
`projects/<repo>/`. Before delegating role-shaped work in any repository, read
the matching template, then invoke the agent tool with the closest built-in
type (e.g. `general-purpose` or a read-only search agent) and fold the
template's preload list, model-tier hint, and output contract into that
prompt.

## Transitions

Choose the next transition using this order:

| Condition | Transition |
|---|---|
| Acceptance criteria satisfied with evidence | Complete |
| Failure is understood and safely recoverable | Revise and verify again |
| Current assumptions are invalid | Re-observe and replan |
| Independent work is available | Delegate with ownership and acceptance criteria |
| Requirement, authority, or high-risk decision is missing | Human gate |
| Retry limit, safety boundary, or useful progress limit is reached | Stop and escalate |

Do not repeat the same failed action without new evidence or a changed hypothesis.

## Completion and Handoff

Work is complete only when the acceptance criteria are satisfied and the stated verification has run successfully. If verification cannot run, record the limitation and do not claim a verified result.

Before pausing unfinished standard work, update its active state files. Before
pausing unfinished full work or handing work to another owner, update
`CURRENT_STATUS.md`, `TASKS.md`, and `HANDOFF.md` so the next agent can resume
from a concrete action without relying on chat history.
