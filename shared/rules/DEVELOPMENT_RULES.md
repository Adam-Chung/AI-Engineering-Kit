# Development Rules

## Principles

Prioritize correctness, readability, simplicity, and maintainability.

Follow the existing architecture and conventions unless changing them provides a clear benefit.

Apply SOLID, DRY, KISS, and YAGNI according to the context rather than as
absolute rules. When adding an abstraction, identify the concrete duplication,
variation, boundary, or risk that justifies it.

Do not introduce abstractions or architectural layers without a demonstrated need.

## Design and Structure

Give each module, class, and function a clear responsibility.

Prefer high cohesion and low coupling.

Prefer composition when it produces clearer ownership and lower coupling.

Keep functions focused and use guard clauses when they improve readability.

## Naming

Use names that express domain meaning and intent.

Avoid unclear abbreviations, but allow terms that are standard in the project or domain.

Use consistent terminology throughout the codebase.

## Comments

Add a language-appropriate documentation comment above every method, including
non-public methods. Describe the method's purpose and document parameters,
return values, exceptions, side effects, or important constraints when they
apply.

Add inline comments within implementations where they help explain intent,
important steps, business rules, edge cases, or non-obvious logic.

Use comments to explain intent, constraints, trade-offs, or non-obvious behavior.

Do not restate behavior that is already clear from the code.

Keep comments accurate when the code changes.

## Error Handling

Validate inputs and assumptions at appropriate system boundaries.

Fail early when the operation cannot recover safely.

Do not silently ignore exceptions.

Preserve the original cause and provide useful error context without exposing sensitive information.

## Testing

Add or update tests for behavior changed by the implementation.

Cover relevant success paths, boundary conditions, and failure cases.

Use integration tests when behavior crosses important system boundaries.

Run the relevant available checks before considering the change complete.

## Change Discipline

Make the smallest coherent change that fully solves the problem.

Preserve unrelated user changes and avoid unnecessary rewrites.

Refactor only when it supports the task, reduces meaningful risk, or provides clear maintainability value.

Report relevant limitations, verification results, and remaining risks.
