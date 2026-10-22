# Security Policy

## Public Security Boundary

This repository is the source-available public version of AI Engineering Kit.
Production state is excluded, including credentials, personal profiles, local
workspace state, Private publication controls, and deployment-specific
material.

This repository is not a deployment-ready security template. Adopters remain
responsible for reviewing authentication, authorization, secret management,
data handling, dependency risk, logging, infrastructure, and deployment
controls for their own environments.

## Reporting a Vulnerability

Use GitHub's security-advisory reporting channel for security vulnerabilities.
Do not open an issue containing a credential, personal data, exploit details,
or a sensitive URL. If the advisory channel is unavailable, contact the
repository owner through their GitHub profile without including sensitive
details in the first message.

Include the affected component, reproduction conditions, potential impact, and
the smallest safe proof of concept. Allow time for investigation before public
disclosure.

If a credential may have been exposed, revoke or rotate it first. Removing a
value from the latest commit does not remove it from retained Git history,
caches, logs, releases, or artifacts.

## Supported Scope

Security reports may cover collaboration rules, Skills, agent templates,
validators, evals, workspace adapters, and GitHub Actions included in this
repository.
