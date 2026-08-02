# Final Architecture Inventory

Audit date: 2026-08-03
Production URL: https://cognivantalabs.com
Source commit: `db10cb38c6043f9234d5453189a7edce683bbe1d`

## Runtime and build

- Framework: TanStack Start with TanStack Router, React 19, Tailwind CSS v4, and Vite 7.
- Package manager: npm, with `package-lock.json` and `npm ci` in CI.
- Routing: file-based route modules under `src/routes/`, with generated `src/routeTree.gen.ts`.
- Rendering: prerendered static route directories with `autoSubfolderIndex`; build output is `dist/client`.
- Build command: `npm run build`.
- Source maps: disabled by `vite.config.ts` (`build.sourcemap: false`).

## Public delivery

- Metadata: centralized `src/data/seo-metadata.json`, read through `src/lib/seo-metadata.ts` and applied by `src/routes/__root.tsx`.
- Sitemap: maintained at `public/sitemap.xml`; robots policy at `public/robots.txt`.
- Redirects and 404: Apache rules in `public/.htaccess`; genuine unknown paths use `/404.html` and no SPA catch-all.
- Security headers: `public/_headers` for static hosts and matching Apache `Header` directives in `.htaccess`.
- Analytics: one website-side Google Tag Manager container (`GTM-W2SGX7Z8`); GA4 and Microsoft Clarity are account-side tags. No direct GA4 or Clarity snippets are shipped.
- Forms: client-side lead/form flows in `src/server/leadCapture.ts` and route hooks; production form submission was not performed during the non-destructive audit.

## Deployment

- GitHub repository: `https://github.com/CINTENT-LAB/COGNIVANTALABS.COM.git`.
- Source branch: `master`.
- Workflow: `.github/workflows/deploy-hostinger-static.yml`, `Publish Hostinger static artifact`.
- Workflow trigger: manual `workflow_dispatch` on `master`.
- Artifact branch: `hostinger-production`.
- Hostinger document root: contents of the artifact branch, equivalent to `dist/client`.
- Verified artifact commit: `6c1dff08226d700a1407b1bab2f4a9bda5307808`, generated from source commit `db10cb38c6043f9234d5453189a7edce683bbe1d`.

## Public route classes

- 32 indexable sitemap routes.
- 2 intentional noindex utility routes: `/cognites/login` and `/cognites/mycogni`.
- 1 noindex custom error document: `/404.html`.
- Product portfolio: 12 product routes, linked from `/products`.
- External integrations include approved product/application links, research hub links, fonts, Blogger/Medium publication media where applicable, and analytics destinations through GTM.

## Evidence

- `reports/final-production-crawl.json`
- `reports/final-build-artifact-audit.md`
- `reports/final-route-inventory.md`
- `reports/final-acceptance-matrix.md`
