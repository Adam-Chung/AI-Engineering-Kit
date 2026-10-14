# Public Data and Release Compliance Rules

Use these rules for software that retrieves third-party websites, feeds, APIs,
forums, social content, or other public data, and for repositories being
prepared for public release.

## Access and Authorization

- Check the current Terms of Service, API or feed license, `robots.txt`,
  copyright, database rights, privacy obligations, and commercial-use
  restrictions for every material source.
- Prefer documented official APIs and published RSS or Atom feeds over webpage
  scraping.
- Treat public accessibility and `robots.txt` as access signals, not legal
  authorization.
- Never bypass authentication, paywalls, CAPTCHAs, IP blocks, rate limits, or
  other technical restrictions.
- Default-disable automated access when a source disallows it or authorization
  is uncertain. Record confirmed authorization before enabling an exception.

## Runtime Safeguards

- Use conservative per-origin rate limits, bounded retries, caching where
  useful, an identifiable User-Agent when appropriate, and `Retry-After`
  support.
- Stop on blocking or access denial; do not disguise or rotate access to evade
  restrictions.
- Collect, retain, transmit, and publish only the minimum necessary data.
- Review generated content and logs for copyright, attribution, privacy, and
  re-identification risk.

## Public Release

- Before publication, scan the current tree, full Git history, branches, tags,
  Actions logs, artifacts, releases, issues, and workflow metadata for secrets,
  personal data, recipient identities, internal URLs, and sensitive operational
  details.
- Document actual sources, attribution, safeguards, intended lawful use,
  retention behavior, material limitations, and features requiring separate
  authorization.
- Include a responsible-use notice when relevant, but do not treat a disclaimer
  as a substitute for technical controls or legal compliance.
- Do not select an open-source license for the user. Obtain the user's license
  choice when one is needed; public visibility alone does not grant reuse
  rights.

## Stop Conditions

Stop and request qualified legal review for commercial, high-volume, legally
ambiguous, or high-risk use. Do not claim that the project is lawful when the
available evidence cannot establish that conclusion.
