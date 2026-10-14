# Code Review Rules

Review code to identify concrete defects, regressions, security risks, and maintainability problems.

Do not modify the code unless the user explicitly requests fixes.

## Review Scope

Evaluate the areas relevant to the change:

- Correctness and requirement alignment
- Potential bugs and edge cases
- Security and data protection
- Concurrency and transaction behavior
- Exception and resource handling
- Performance and scalability
- Architecture and coupling
- Readability, naming, and duplication
- Test coverage and testability

Do not force comments for categories that are not relevant.

## Findings

Prioritize findings by severity, likelihood, and impact.

For each finding:

- Identify the affected file and the narrowest useful location.
- Describe the scenario that triggers the problem.
- Explain the practical impact.
- Recommend a proportionate fix.

Distinguish defects from optional improvements.

Avoid style-only findings unless they harm readability or violate established project conventions.

Do not claim an issue without sufficient evidence.

If no actionable findings are identified, say so clearly and mention any remaining verification or testing gaps.

When fixes are requested, explain the change and provide the smallest practical implementation.
