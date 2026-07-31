# Cognivanta Labs Security Hardening Audit

Date: 2026-07-31  
Production: https://cognivantalabs.com  
Hosting: Hostinger Apache static hosting  
Deployment output: `dist/client`

## Executive Summary

The production static site was hardened without changing DNS, redesigning the
site, or adding a new service. Source security changes were committed and
pushed, the complete `dist/client` artifact was published to the established
`hostinger-production` branch, and the live production checks passed.

Production security hardening is verified. Public-content copy controls remain deterrents rather than absolute protection.

Google Search Console is not being declared clear. Revalidation and recrawling
remain pending with Google.

## Baseline Before Editing

| Item                      | Baseline                                                                                                         |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Source commit before work | `e948d19b13b210baaf08d02f24ffa013743b1155`                                                                       |
| Branch                    | `master`                                                                                                         |
| Framework                 | TanStack Start/Router, React 19, Vite 7, Tailwind CSS v4                                                         |
| Runtime mode              | Static prerendered client artifact for Hostinger; `dist/server` is not published                                 |
| Public output             | `dist/client`                                                                                                    |
| Existing backend          | `src/server/leadCapture.ts` exists in source, but no server runtime is included in the static Hostinger artifact |
| Authentication            | `/cognites/login` is a static noindex shell; MyCogni is an external HCM handoff                                  |
| Existing deployment       | Manual GitHub Actions workflow publishing `dist/client` to `hostinger-production`                                |
| Baseline dependency audit | `npm audit --omit=dev`: 0 vulnerabilities                                                                        |
| Baseline gaps             | No enforced CSP, and `/_headers` was publicly reachable before this work                                         |

## Threat Model and Scope

The review covered:

- public HTML, CSS, JavaScript, images, fonts, manifests, robots, and sitemap;
- Hostinger Apache redirects, file disclosure, directory indexes, and headers;
- static route and external-handoff boundaries;
- contact/demo lead handling present in source;
- source maps, environment files, repository/config files, backups, logs, and
  deployment metadata;
- clickjacking, cross-origin loading, form abuse, casual asset copying, and
  information disclosure.

The repository is a static public-site deployment. It does not contain a
deployed authenticated API, database route, session service, or public proxy.
The source-side lead handler is therefore documented as a server-runtime
boundary rather than represented as an active backend on the static site.

## Source and Artifact Commits

| Artifact                           | Commit                                                                  |
| ---------------------------------- | ----------------------------------------------------------------------- |
| Source hardening commit            | `9038272` - `fix(security): harden production access and public assets` |
| Source follow-up audit-test commit | `2fbe9cc86ef320ae320a533c8429ca634aac7e8b`                              |
| Hostinger static artifact          | `5dedb627070beeb84a0a22cfb549668093a0b961`                              |

The exact requested hardening commit is `9038272`. The follow-up source commit
only made the production audit correctly verify Hostinger's observed two-step
`http://www` to HTTPS canonical redirect chain.

## Secret and Sensitive-Data Audit

- Git-tracked source and generated client output were scanned for high-confidence
  private-key, cloud-key, GitHub-token, and API-key patterns.
- No secrets were found in the source or public artifact.
- `.env` and `.env.*` are ignored while `.env.example`, if added later, remains
  eligible for tracking.
- No service-role credential, password, private key, authorization header, or
  administrative browser credential is shipped to the client.
- `dist/client` contains no source maps, `sourceMappingURL` markers, local
  filesystem paths, Blogger administration URLs, or development URLs in HTML or
  CSS.
- No credential values were printed in this report.

## Backend, API, and Access-Control Findings

There is no deployed first-party API in the Hostinger static artifact. The
source inventory found the following server-side lead handler boundary:

| Endpoint/boundary                           | Method                                                         | Public/auth                                                 | Input controls                                                                                                            | Rate limit                                                          | CSRF/session                                                                                           | Output exposure                                                         |
| ------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| `src/server/leadCapture.ts` server function | POST-style handler when a supported server runtime is deployed | Public form submission; no authenticated session is trusted | Form-type and field allow-list, type checks, email format, consent, root-relative source path, per-field limits, honeypot | In-memory email plus form-type window; not a distributed/IP limiter | No cookie-authenticated state mutation is present in the static artifact; no local session is accepted | Safe user-facing errors; operational logs contain ticket/form type only |
| External HCM handoff `/cognites/mycogni`    | GET redirect                                                   | External application boundary                               | No user payload accepted by the static site                                                                               | Hostinger/static boundary                                           | Local site does not create or accept sessions                                                          | 302 to the approved external HCM application                            |

The lead handler additionally rejects unknown fields and unsupported form types,
deduplicates recent submissions, accepts only HTTPS webhook URLs, and applies an
8-second outbound timeout. Since Hostinger is serving `dist/client`, the source
handler is not presented as an active production form-processing service. An
approved server runtime and provider-side controls are still required before
public lead delivery is represented as active.

## Input Validation and Form Abuse Controls

Implemented in `src/server/leadCapture.ts`:

- strict object and field allow-lists;
- supported form-type allow-list;
- required name, email, and consent validation;
- maximum lengths for name, email, organisation, interest, message, honeypot,
  and source path;
- root-relative source paths only;
- honeypot rejection;
- duplicate suppression;
- in-memory rate limiting by email and form type;
- HTTPS-only webhook validation;
- 8-second outbound timeout;
- safe errors without stack traces or PII logs.

No production form submission was performed because the static deployment does
not include an approved server runtime and a real submission could deliver
personal data. The browser form controls remain present and no success claim is
made for a submission that has not been delivered.

## Authentication and Sessions

`/cognites/login` is a static noindex page and does not authenticate users or
issue cookies. `/cognites/mycogni` is an external HCM handoff. No local cookie,
JWT, password-reset flow, OAuth secret, or session store was found in the
published static surface. Local authentication hardening is therefore not
applicable to this artifact; the HCM provider remains responsible for its own
authenticated session controls.

## Source Maps and Code Exposure

- `vite.config.ts` explicitly sets `build.sourcemap: false`.
- The deployed artifact contains no `.map` files or `sourceMappingURL` values.
- Representative source-map requests return 403 or 404 rather than source.
- No source, repository, TypeScript, environment, or report directory is
  published through the static route surface.
- No blanket JavaScript obfuscation was added.

## Apache and Sensitive-File Hardening

`public/.htaccess` now:

- disables directory indexes;
- blocks dotfiles while preserving `.well-known`;
- blocks environment, package, README, config, source-map, backup, archive,
  database, log, and key extensions;
- blocks the supplemental `_headers` deployment metadata file;
- keeps the custom 404 and existing legacy redirects;
- keeps cache policy by resource class;
- normalizes the canonical HTTPS hostname where Apache receives the request.

Live sensitive-path evidence after deployment:

| Path                            | Production status | Result      |
| ------------------------------- | ----------------: | ----------- |
| `/.git/HEAD`                    |               403 | blocked     |
| `/.env`                         |               403 | blocked     |
| `/.env.production`              |               403 | blocked     |
| `/package.json`                 |               403 | blocked     |
| `/package-lock.json`            |               403 | blocked     |
| `/README.md`                    |               403 | blocked     |
| `/vite.config.ts`               |               403 | blocked     |
| `/src/`                         |               404 | absent      |
| `/reports/`                     |               404 | absent      |
| `/assets/index.js.map`          |               403 | blocked     |
| `/backup.zip`                   |               403 | blocked     |
| `/database.sql`                 |               403 | blocked     |
| `/error.log`                    |               403 | blocked     |
| `/access.log`                   |               403 | blocked     |
| `/_headers`                     |               403 | blocked     |
| `/security-audit-invalid-route` |               404 | genuine 404 |

No directory listing was observed.

## Security Headers and CSP

The production response for `/` returned `200 text/html` with:

```text
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline'; script-src-attr 'none'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src-attr 'unsafe-inline'; img-src 'self' data: blob: https://assets.zyrosite.com https://cwos.cognivantalabs.com https://shunya-ai.space https://images.unsplash.com https://blogger.googleusercontent.com https://miro.medium.com; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self'; frame-src 'none'; media-src 'self' https: data:; manifest-src 'self'; worker-src 'self' blob:; upgrade-insecure-requests
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
X-Frame-Options: DENY
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Cache-Control: no-cache
```

The CSP origin inventory covers local assets, Google Fonts, the existing public
image/CDN sources, and no third-party script or frame origins. `connect-src`
remains self-only because no external browser API is used by the published
static site. `frame-src 'none'` and `frame-ancestors 'none'` protect against
embedding and clickjacking.

The policy retains `unsafe-inline` for the current TanStack prerender and React
inline-style/hydration output. `unsafe-eval` is not allowed. Nonce/hash-based
script and style hardening is a future architecture change, not a safe
last-minute static deployment change.

## CORS, Caching, and Transport

- No credentialed wildcard CORS response was found.
- HTML, XML, text, and manifest responses are `no-cache`.
- Fingerprinted CSS, JavaScript, fonts, and media are immutable for one year.
- HSTS is enabled for the apex only; `includeSubDomains` and `preload` were not
  added because all subdomains were not verified in this task.
- `http://cognivantalabs.com` redirects directly to the HTTPS apex.
- `http://www.cognivantalabs.com` receives Hostinger's HTTPS hop and then
  redirects to the HTTPS apex.
- `https://www.cognivantalabs.com` redirects to the HTTPS apex.
- No mixed-content URL was found in rendered HTML or CSS.

## Copy Deterrence and Media

The reusable `protected-visual` class is applied only to the header/footer logo
images. Those images are non-selectable and non-draggable, and the relevant
`img` elements are marked `draggable=false`.

Body text, legal copy, forms, FAQs, code, keyboard shortcuts, screen-reader
content, and normal images remain selectable and accessible. No right-click,
Ctrl+C, Cmd+C, developer-tools, or global keyboard restriction was added.

Public browser-delivered resources remain inspectable. Casual-copy controls are
deterrents only. Screenshots cannot be reliably blocked on a public website.
Confidential CINTENT logic must remain server-side or behind authenticated
access.

## Copyright and Legal Position

The Terms page now states that normal linking is permitted but reproduction,
republishing, scraping, model training, and commercial exploitation of site
content, marks, logos, diagrams, and media require written permission. The
existing footer ownership and trademark treatment were preserved.

## Dependency and Supply-Chain Results

```text
npm audit --omit=dev
found 0 vulnerabilities
info 0, low 0, moderate 0, high 0, critical 0
```

No dependency upgrade was introduced for this hardening pass.

## Validation Results

| Check                                   | Result                                                                               |
| --------------------------------------- | ------------------------------------------------------------------------------------ |
| Prettier check                          | Pass                                                                                 |
| `git diff --check`                      | Pass                                                                                 |
| `npm run lint`                          | Pass; 2 pre-existing Fast Refresh warnings in `badge.tsx` and `button.tsx`, 0 errors |
| `npx tsc --noEmit --pretty false`       | Pass                                                                                 |
| `npm test`                              | Pass; 13 tests                                                                       |
| `npm run test:seo`                      | Pass; 32 sitemap routes, 35 HTML files, 3 noindex routes                             |
| `npm run test:publications`             | Pass; 13 tests                                                                       |
| `npm run test:security`                 | Pass; local artifact, 0 failures                                                     |
| `npm run test:security -- --production` | Pass; live production, 0 failures                                                    |
| `npm run build`                         | Pass; 34 prerendered pages, `dist/client` output                                     |
| `npm run test:e2e:production`           | Pass; 32 routes, 114 resources, 0 failures                                           |
| `npm audit --omit=dev`                  | Pass; 0 vulnerabilities                                                              |

Browser automation, Lighthouse, and axe are not installed in this repository.
The production E2E audit is HTTP/static and non-destructive; visual viewport,
keyboard, console, and Core Web Vitals checks remain manual owner follow-up.

## Production Evidence

The complete route-by-route production table is recorded in:
`reports/e2e-production-audit-2026-07-31.md`.

That audit verifies 32 sitemap routes as HTTP 200, self-canonical metadata,
indexing metadata, internal-link reachability, 35 generated HTML documents,
the `/faq.html` 301 to `/research#faqs`, the intentional noindex routes, all
legacy redirect/404 probes, robots and sitemap responses, and 114 same-origin
resources with zero failures.

Representative live routes after deployment:

| URL                             | Status | Notes                                          |
| ------------------------------- | -----: | ---------------------------------------------- |
| `/`                             |    200 | canonical public home                          |
| `/platform`                     |    200 | public route                                   |
| `/products`                     |    200 | public route                                   |
| `/research`                     |    200 | public route with FAQ anchor                   |
| `/contact`                      |    200 | form shell; no production submission performed |
| `/cognites/login`               |    200 | intentional noindex static shell               |
| `/cognites/mycogni`             |    302 | external HCM handoff                           |
| `/faq.html`                     |    301 | redirects to `/research#faqs`                  |
| `/security-audit-invalid-route` |    404 | genuine unknown-route response                 |

## Manual Hostinger Actions

These controls were not claimed as enabled because they require the authorized
Hostinger owner account:

1. Confirm hPanel MFA is enabled for every administrator.
2. Keep GitHub MFA enabled and use least-privilege deployment access.
3. Keep Git deployment or SFTP as the deployment path; disable plain FTP if it
   is not required.
4. Enable and verify Hostinger WAF/CDN/bot protection and retain Googlebot and
   required asset access.
5. Enable malware scanning and review access/error logs for denied probes.
6. Enable automatic backups and test restoration on a schedule.
7. Purge Hostinger/CDN cache only when a release requires it; do not purge or
   change DNS for this hardening task.
8. Verify file permissions and deployment-user scope after the next Hostinger
   sync.
9. Verify every active subdomain over HTTPS before considering
   `includeSubDomains` or HSTS preload.
10. If forms are to become active, deploy the approved server runtime/provider
    separately and configure provider-side IP/rate/WAF controls without putting
    private credentials in the frontend.

## Acceptance Gate

The security hardening gate is **passed for the verified static production
surface**. The static-site boundary means a deployed protected backend route is
not applicable; the source lead handler has server-side validation controls but
requires an approved server runtime before it can process live public forms.

Production security hardening is verified. Public-content copy controls remain deterrents rather than absolute protection.

Google Search Console status is not asserted as cleared. Google revalidation
and recrawling remain pending.
