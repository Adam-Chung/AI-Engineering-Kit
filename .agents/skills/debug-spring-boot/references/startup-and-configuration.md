# Startup and Configuration Diagnostics

Use this reference for Spring application startup, dependency injection,
profiles, properties, and auto-configuration failures.

## Inspection Order

1. Read the complete failure analysis and nested exception chain.
2. Identify the first application-owned bean or configuration class involved.
3. Confirm the active profile and the effective property sources.
4. Check whether the failing bean is explicitly declared, component-scanned, or
   supplied by auto-configuration.
5. Inspect conditional configuration and dependency versions before adding a
   new bean or exclusion.

## Common Evidence Patterns

| Evidence | Investigate |
|---|---|
| `NoSuchBeanDefinitionException` | Component scan boundary, conditional bean, qualifier, test slice |
| `NoUniqueBeanDefinitionException` | Multiple candidates, `@Primary`, qualifier consistency |
| `BeanCurrentlyInCreationException` | Constructor or indirect circular dependency |
| `ConfigurationPropertiesBindException` | Effective property name, type conversion, validation, profile |
| `NoClassDefFoundError` or `NoSuchMethodError` | Runtime dependency conflict or incompatible versions |
| Condition evaluation mismatch | Auto-configuration report and missing prerequisite |

## Controls

- Prefer constructor injection when examining dependency completeness.
- Do not add `@Lazy`, `@Primary`, exclusions, or fallback defaults until the
  intended ownership and selection rule is confirmed.
- Treat secrets and environment-specific values as sensitive; report names and
  sources without exposing values.
- Compare IDE and command-line classpaths when the failure occurs in only one.
