# Cognivanta Labs Deployment Readiness Audit

Status: **Ready for owner approval and deployment preparation**

Scope: public Cognivanta Labs website at `https://cognivantalabs.com`.

This audit prepares the repository for launch. It does not deploy, change DNS,
verify Google Search Console ownership, or activate external production services.

## Verified in the repository

- Authored-source formatting: `npx prettier --check src docs package.json vite.config.ts` passes.
- TypeScript: `npx tsc --noEmit --pretty false` passes.
- Production build: `npm run build` passes.
- Repository-wide lint: `npm run lint` passes with two existing Fast Refresh warnings
  in shared UI primitives and no errors.
- The 25 sitemap URLs plus `robots.txt` return HTTP `200` in the local preview.
- Every sitemap URL has a title, meta description, and canonical link in the rendered HTML.
- Each indexable route emits exactly one canonical link; nested product and Cognites routes do
  not inherit duplicate parent canonicals.
- Each public route emits a route-specific Open Graph URL, and rendered public images include
  alternative text.
- The repository-root `sitemap.xml` and the public source `public/sitemap.xml` contain the
  same 25 canonical URLs; the latter is copied to the deployed site root.
- `public/robots.txt` is copied to `dist/client/robots.txt`.
- `public/sitemap.xml` is copied to `dist/client/sitemap.xml`.
- `public/_headers` is copied to `dist/client/_headers`.
- The sitemap contains 25 canonical Cognivanta Labs URLs and excludes auth/workspace handoff routes.
- The home page includes Organization and WebSite JSON-LD.
- Organization, favicon, manifest, header, and social-image assets are self-contained in
  the deployment output; no legacy `/assets/...` URL is required for core brand metadata.
- The partner/customer login route is `noindex, nofollow`.
- The MyCogni handoff route remains `noindex, nofollow`.
- The hero slideshow only keeps the current and next slide in the DOM and preloads the next image.
- No private Blogger management URL or sharing-tracker query was found in the public blog source.
- No unit, E2E, accessibility, or performance test script is configured in `package.json`;
  the owner checklist therefore includes those deployment-stage checks.

## SEO implementation

- Per-route titles, descriptions, and canonical links exist across the public route set.
- Open Graph and Twitter metadata are present globally and on key routes.
- `robots.txt` points crawlers to the sitemap.
- The sitemap contains only same-site public URLs intended for indexing.
- Organization structured data identifies Cognivanta Labs, its public URL, logo, and verified social profiles.
- Auth and workspace handoff pages are excluded from the sitemap and carry `noindex` metadata.
- The site currently publishes one English canonical experience. `hreflang` annotations are not
  added until approved translated or regional URL variants exist.

Google Search Console cannot be completed by repository changes alone. After the
owner points the approved domain at the deployment, the owner must verify the
domain property, submit `/sitemap.xml`, inspect the home page and key product
pages, and review indexing, HTTPS, manual actions, and Core Web Vitals reports.
The owner should also run the Rich Results Test against the home page and confirm
that the Organization/WebSite markup represents the approved public business details.

## Security and privacy posture

The static deployment artifact includes baseline headers for content-type
sniffing protection, referrer control, permissions policy, clickjacking
protection, HSTS, and immutable caching of hashed assets. If the approved host
does not consume `_headers`, the equivalent headers must be configured in that
host's control plane.

The contact and login flows remain preview-only in this repository. They do not
claim that a message was delivered or that account data was stored. No live AI
provider, payment provider, billing system, or Search Console API credential is
activated by this website package.

## Remaining risk

The repository-wide lint command now completes with no errors; two existing Fast
Refresh warnings remain in shared UI primitives. The production build also
reports a large JavaScript chunk warning; the build succeeds, but production
Core Web Vitals must be confirmed with PageSpeed Insights and Search Console
after deployment.
