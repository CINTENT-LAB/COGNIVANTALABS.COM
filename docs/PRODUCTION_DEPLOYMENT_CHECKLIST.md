# Production Deployment Checklist

Use this checklist only after the owner approves the release.

## Release owner

- [ ] Review `docs/DEPLOYMENT_READINESS_AUDIT.md` and approve the exact release state.
- [ ] Confirm the approved hosting target and its build/runtime mode.
- [ ] Deploy the repository from the approved release state.
- [ ] Publish the generated client output from `dist/client` when using a static host, or use the host's documented TanStack Start SSR deployment path.
- [ ] Confirm `robots.txt`, `sitemap.xml`, and `_headers` are publicly served.
- [ ] Confirm the publicly served `/sitemap.xml` is the generated `dist/client/sitemap.xml`, not a separately edited copy.
- [ ] Confirm HTTPS is active before enabling HSTS.

## DNS and domain

- [ ] Configure the approved `cognivantalabs.com` DNS records at the DNS owner.
- [ ] Confirm the apex domain and `www` policy, including one canonical redirect policy.
- [ ] Confirm TLS certificate coverage, renewal, and HTTPS redirect behavior.
- [ ] Do not change DNS from this repository workflow.

## Google Search Console

- [ ] Verify the domain property in Google Search Console using the authorized DNS owner.
- [ ] Submit `https://cognivantalabs.com/sitemap.xml`.
- [ ] Run Google’s Rich Results Test and URL Inspection for the home page; confirm the Organization/WebSite markup and canonical URL.
- [ ] Inspect the home page, `/platform`, `/applications`, `/research`, `/developers`, `/products`, and `/blog`.
- [ ] Confirm the selected canonical URLs and that login/workspace handoffs are not indexed.
- [ ] Review HTTPS, manual actions, security issues, page indexing, and Core Web Vitals after data is available.
- [ ] Request recrawl only after final content, legal, and DNS approval.

## Post-deployment smoke test

- [ ] Check public routes return expected status codes.
- [ ] Check navigation, external product handoffs, forms, and Ask COGNI preview behavior.
- [ ] Check mobile layout, keyboard focus, reduced-motion behavior, and no horizontal overflow.
- [ ] Run Lighthouse/PageSpeed on home, platform, products, research, developers, and blog.
- [ ] Confirm no production credentials, live AI provider, payment, or billing integration is enabled.

Deployment remains approval-gated. No deployment or DNS changes were performed
as part of this audit.
