# Security Policy

This repository is the log0 marketing and documentation website
(**https://log0.in**). It is lower-risk than the product itself, but we still
want to hear about any security issues.

## Reporting a vulnerability

**Please do not report security issues through public GitHub issues, pull
requests, or discussions.**

Instead, report privately by email to **ashmitgupta.official@outlook.com**. If possible,
include a description of the issue and its impact, the affected page or route,
steps to reproduce, and any suggested remediation.

We will acknowledge your report and coordinate a disclosure timeline with you.
Please give us a reasonable window to fix the issue before public disclosure.
We're grateful for responsible disclosure and will credit reporters who wish to
be acknowledged.

## Scope

Issues we especially want to hear about:

- cross-site scripting (XSS) or content injection in pages or docs rendering,
- open redirects,
- server-side request forgery (SSRF) or abuse of any server route (e.g. the
  AI-search or GitHub-backed content routes),
- leakage of server-side secrets such as `GITHUB_APP_PRIVATE_KEY` (only
  server-side; it must never reach the browser).

## Out of scope

- Vulnerabilities in the log0 product itself belong in the `log0-services` or
  `log0-console` security process (same email is fine).
- Automated scanner output without a demonstrated, exploitable impact.

## Supported versions

Security fixes target the `main` branch. Please test against the latest `main`
before reporting.
