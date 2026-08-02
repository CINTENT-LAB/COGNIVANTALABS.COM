# RC-1 Release Checklist

## Verified

- [x] `master` source is clean and synchronized.
- [x] Build passes and outputs `dist/client`.
- [x] Artifact branch is generated from the source release commit.
- [x] GitHub Actions Hostinger publication run succeeded.
- [x] 32 sitemap routes return 200 in production.
- [x] Sitemap and robots return 200 and use the apex HTTPS URL.
- [x] Legacy redirects and genuine 404 routes are verified.
- [x] No source maps, environment files, archives, source files, or secrets are in the artifact.
- [x] Security headers and CSP are verified live.
- [x] GTM website-side marker, no direct GA4/Clarity, privacy copy, and masking are verified.
- [x] Product, publication, branding, and artifact reports are committed.

## Authorized owner follow-up

- [ ] Submit or refresh sitemap in Google Search Console.
- [ ] Submit or refresh sitemap in Bing Webmaster Tools.
- [ ] Configure and publish the GA4 GTM tag with approved consent trigger.
- [ ] Configure and publish the Clarity GTM tag with approved consent trigger.
- [ ] Verify GA4 Realtime and Clarity sessions/masking.
- [ ] Run Lighthouse and axe at mobile and desktop breakpoints.
- [ ] Review production forms without submitting live data, or use an approved test mode.

## Reopen gate

Reopen the release only for a confirmed production defect, security/privacy finding, deployment issue, or approved product change. Do not treat future content, product, API, commercial, or analytics account work as part of RC-1.
