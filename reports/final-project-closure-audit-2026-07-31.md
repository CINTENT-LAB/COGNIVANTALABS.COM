# Cognivanta Labs Final Project Closure Audit

Date: 2026-07-31  
Production: https://cognivantalabs.com  
Repository: https://github.com/CINTENT-LAB/COGNIVANTALABS.COM.git  
Hosting: Hostinger Apache static hosting  
Deployment output: `dist/client`

## Closure Status

The Cognivanta Labs public website implementation and verified static
production hardening scope are complete. The project is closed for the
implemented release scope. No new product functionality, domain, service,
DNS change, or backend activation is included in this closure.

Production security hardening is verified. Public-content copy controls remain deterrents rather than absolute protection.

Google Search Console revalidation and recrawling remain pending. This report
does not claim that Google Search Console is cleared.

## Release Identity

| Item | Value |
| --- | --- |
| Source branch | `master` |
| Source commit before final evidence refresh | `bc33b570c290e2a9b6f99819784c987a3e88c854` |
| Security implementation commit | `9038272` - `fix(security): harden production access and public assets` |
| Final source commit | `9f11fb79cc3972f1c37ad0916b1d1e648597f58b` |
| Hostinger artifact commit | `5dedb627070beeb84a0a22cfb549668093a0b961` |
| Working tree | Clean |
| GitHub `origin/master` | Matches final source commit |

## Production Evidence

- 32 sitemap routes returned HTTP 200.
- 35 generated HTML documents were inspected.
- 114 same-origin resources were checked with zero failures.
- Valid public routes, canonical URLs, robots metadata, sitemap inclusion,
  internal links, and FAQ destination were verified.
- `/faq.html` returns the intentional 301 redirect to `/research#faqs`.
- `/cognites/mycogni` returns the intentional 302 external HCM handoff.
- Unknown routes return genuine 404 responses.
- HTTP and `www` normalization resolve to the HTTPS apex.

## Security Verification

- CSP, HSTS, `nosniff`, Referrer-Policy, Permissions-Policy, X-Frame-Options,
  COOP, CORP, and cache headers are active on verified HTML responses.
- No `unsafe-eval` is permitted by CSP.
- No public source maps or `sourceMappingURL` markers exist.
- No `.env`, `.git`, source, reports, package, backup, database, log, key, or
  archive files are exposed.
- Directory indexes are disabled.
- No credentialed wildcard CORS response was found.
- `npm audit --omit=dev` reports 0 vulnerabilities.
- Selected logo visuals use scoped non-selectable and non-draggable deterrence.
  Body copy, legal content, forms, FAQs, code, and keyboard access remain
  selectable and accessible.

Sensitive-path results were 403 or 404 for `.git`, environment files,
configuration files, source directories, reports, source maps, backups,
database files, logs, and `_headers`.

## Forms and Backend Boundary

The source lead handler contains field and form-type allow-lists, bounded input,
email and consent validation, honeypot protection, duplicate suppression,
in-memory rate limiting, HTTPS-only webhook validation, an eight-second timeout,
and PII-free operational logging.

Hostinger is serving the static `dist/client` artifact, so the source server
runtime is not active in this deployment. No production form submission was
performed and no live delivery claim is made.

## Validation Record

| Check | Result |
| --- | --- |
| Production build | Passed; 34 prerendered pages |
| Typecheck | Passed |
| Lint | Passed; 0 errors, 2 existing Fast Refresh warnings |
| Unit/publication tests | Passed; 13 tests |
| SEO audit | Passed; 32 sitemap routes |
| Local security audit | Passed |
| Production security audit | Passed; 0 failures |
| Production E2E audit | Passed; 32 routes, 114 resources |
| Dependency audit | Passed; 0 vulnerabilities |
| Scoped formatting check | Passed |

Browser automation, Lighthouse, and axe were not available in the repository.
Manual visual, keyboard, screen-reader, and Core Web Vitals review remains an
owner follow-up rather than an automated completion claim.

## Remaining Owner Actions

1. Keep Hostinger and GitHub MFA enabled.
2. Confirm Hostinger WAF/CDN and bot protection, without blocking Googlebot or
   required assets.
3. Confirm malware scanning, access-log review, automatic backups, and restore
   testing.
4. Prefer Git deployment or SFTP and disable plain FTP when not required.
5. Review file and deployment-user permissions.
6. Do not add HSTS `includeSubDomains` or `preload` until every active
   subdomain is independently verified.
7. Revalidate affected URLs in Google Search Console after Google recrawls.
8. Use a safe non-delivery test mode before activating any production lead
   routing runtime.

## Closure Decision

Implementation, repository synchronization, deployment artifact publication,
and live static production verification are complete. The remaining items are
account-owner operations, Google revalidation, and optional future runtime
activation. They do not reopen this implemented website project.
