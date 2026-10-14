---
name: debug-spring-boot
description: Diagnose Spring Boot, Spring Data JPA, Hibernate, transaction, dependency-injection, configuration, startup, and test failures using reproducible evidence. Use for Java Spring applications when the user asks to investigate an exception, incorrect runtime behavior, failed startup, failing test, persistence bug, or root cause. Do not use for feature implementation without a reported failure, generic Java tutoring, or non-Spring systems.
---

# Debug Spring Boot

Diagnose from observable behavior to a supported root cause. Preserve the
difference between diagnosis and implementation: do not change code unless the
user requests a fix or the request clearly includes one.

## Workflow

1. Establish expected behavior, actual behavior, scope, impact, and the narrowest
   reproducible command or request.
2. Read the applicable workspace debugging rule and project context. Inspect the
   build tool, Spring Boot version, active profiles, recent changes, and relevant
   code before forming a strong conclusion.
3. Capture the complete exception chain. Start with the first application-owned
   frame and the deepest relevant `Caused by`; do not assume the final log line
   is the root cause.
4. Form one or more falsifiable hypotheses. For each hypothesis, state what
   evidence would confirm or reject it.
5. Run the smallest safe check that distinguishes the hypotheses. Reproduce the
   failure when practical; otherwise use tests, logs, configuration, and data
   flow as evidence and state the limitation.
6. Identify the root cause, contributing factors, and symptoms separately.
7. If a fix is requested, make the smallest coherent change, add or update a
   regression test, and rerun the original failing scenario plus relevant
   surrounding checks.
8. Report the result as: conclusion, evidence, fix if any, verification, and
   remaining uncertainty.

## Investigation Routing

- For startup, bean wiring, profiles, properties, or auto-configuration, read
  [references/startup-and-configuration.md](references/startup-and-configuration.md).
- For JPA, Hibernate, transactions, lazy loading, SQL, or repository behavior,
  read [references/persistence-and-transactions.md](references/persistence-and-transactions.md).
- For test-only failures, first compare test slices, profiles, mocks, database,
  transaction boundaries, and runtime configuration with production behavior.

## Guardrails

- Do not make multiple speculative changes at once.
- Do not hide an exception, weaken validation, or broaden a transaction merely
  to make the symptom disappear.
- Do not claim reproduction or verification unless the corresponding command or
  scenario actually ran.
- Preserve the original exception cause and avoid logging secrets or sensitive
  configuration.
- Prefer project-provided Gradle or Maven wrappers and targeted tests before
  wider suites.

## Completion Criteria

- The reported cause is supported by a reproducible failure or the strongest
  available evidence.
- Alternative plausible causes are rejected or recorded as uncertainty.
- A requested fix has a regression check covering the original scenario.
- The final report states exactly what was and was not verified.
