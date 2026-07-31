# Google Indexing Remediation Audit — 31 July 2026

## Executive summary

The static production artifact was audited after canonical, sitemap, legacy-route, and Hostinger fallback corrections. The audit covers 32 sitemap routes and 35 prerendered HTML documents.

## Root causes found

- Canonical tags were emitted as relative paths rather than absolute production URLs.
- The sitemap omitted several public prerendered routes.
- Hostinger .htaccess rewrote unknown paths to the homepage, creating soft 404s.
- Privacy and Terms pages were accidentally marked noindex.

## Remediation

- Every indexable route now self-canonicalizes to https://cognivantalabs.com.
- Sitemap entries are absolute, unique, public, prerendered, and free of legacy HTML routes.
- Known equivalent legacy routes use exact server-side 301 redirects; obsolete template routes remain genuine 404s.
- The universal SPA fallback was removed and a branded 404 document is configured.
- Login/MyCogni utility routes remain intentionally noindex; they are excluded from the sitemap.
- Robots continues to allow public crawling and points to the canonical sitemap.

## Legacy route treatment

- `/shop-left-sidebar.html` → 404 (obsolete or no verified equivalent)
- `/projects.html` → 404 (obsolete or no verified equivalent)
- `/pricing-plan.html` → 301 `/pricing`
- `/faq.html` → 404 (obsolete or no verified equivalent)
- `/services.html` → 404 (obsolete or no verified equivalent)
- `/login.html` → 404 (obsolete or no verified equivalent)
- `/contact.html` → 301 `/contact`
- `/index-2.html` → 404 (obsolete or no verified equivalent)
- `/posts-by-author.html` → 301 `/blog`
- `/posts-by-category.html` → 301 `/blog`
- `/posts-by-date.html` → 301 `/blog`
- `/register.html` → 404 (obsolete or no verified equivalent)
- `/shop-grid.html` → 404 (obsolete or no verified equivalent)
- `/product-single.html` → 404 (obsolete or no verified equivalent)
- `/posts-by-tag.html` → 301 `/blog`
- `/wishlist.html` → 404 (obsolete or no verified equivalent)
- `/privacy-policy.html` → 301 `/privacy`
- `/blog-single-left-sidebar.html` → 404 (obsolete or no verified equivalent)
- `/about-us.html` → 301 `/about`
- `/terms-conditions.html` → 301 `/terms`

## Validation results

- SEO audit: **PASS**
- Sitemap routes: **32**
- Prerendered HTML files: **35**
- Intentional noindex routes: **/cognites/login, /cognites/mycogni**
- Sitemap errors: **0**
- Internal-link errors: **0**

## Production verification status

The pre-change production check showed unknown URLs returning 200 because of the old SPA fallback. Code changes are local until the committed branch is deployed; post-deployment HTTP checks remain required.

## Search Console actions after deployment

1. Submit or refresh https://cognivantalabs.com/sitemap.xml.
2. Inspect representative canonical pages and the corrected legacy equivalents.
3. Validate fixes for noindex and duplicate-canonical issues after Google recrawls.
4. Do not request indexing for obsolete 404 URLs.
5. Request indexing only for strategically important public pages.
6. Re-export the Page Indexing report after validation.
