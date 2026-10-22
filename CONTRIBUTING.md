# Contributing

## Public Issues

Public Issues are accepted for reproducible bugs, unclear instructions,
missing test coverage, documentation gaps, and focused improvement
suggestions.

Before submitting an issue:

1. Check the existing issues and current documentation.
2. Include the affected file, expected behavior, actual behavior, and a minimal
   reproduction when possible.
3. Remove credentials, personal data, customer information, internal URLs, and
   confidential configuration.

## Pull Requests and Accepted Work

Public Pull Requests are not accepted directly. The repository license permits
private personal modifications but does not grant redistribution rights, so do
not publish a modified copy or open a code pull request without prior written
permission from the repository owner.

When a Public Issue or suggestion is accepted, the repository owner implements
and reviews the change in the Private source repository. The Public version is
then regenerated only after its export, policy, and validation gates pass.
Public changes never synchronize back into the Private source automatically.

Pull requests submitted without prior written permission may be closed without
review.

For local validation, run:

```shell
node validators/validate-framework.js
node validators/validate-public.js
```
