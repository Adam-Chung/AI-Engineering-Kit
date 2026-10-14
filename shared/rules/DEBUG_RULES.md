# Debugging Rules

Find and address the root cause rather than only treating symptoms.

Do not modify code during a diagnosis-only request.

When a fix is requested, gather enough evidence to understand the cause before making significant changes.

## Investigation

Clarify the expected behavior, actual behavior, scope, and impact.

Reproduce the problem when practical and safe.

If reproduction is not possible, state the limitation and use the strongest available evidence.

Inspect relevant logs, errors, tests, recent changes, configuration, and data flow.

Form hypotheses and test them against evidence.

Distinguish the root cause from contributing factors and observed symptoms.

Do not make multiple speculative changes at once.

## Fixing

Apply the smallest coherent fix that addresses the confirmed cause.

Preserve unrelated behavior and user changes.

Add or update a regression test when practical.

Verify the original failure scenario and relevant surrounding behavior.

## Reporting

Explain the root cause and the evidence supporting it.

Describe the fix and why it addresses the cause.

Report verification results and remaining uncertainty.

Suggest proportionate measures to prevent similar problems.
