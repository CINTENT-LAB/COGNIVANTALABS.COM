# Lighthouse Evidence

Audit date: 2026-08-03

No Lighthouse run is claimed. Lighthouse is not installed in the repository and no authorized browser automation session was available during closure.

The production crawl verified HTTP status, metadata, headers, same-origin resource references, sitemap parity, and zero broken resource responses. It did not measure LCP, CLS, FCP, TBT/INP, or browser console output.

Required future check: run Lighthouse in an authorized browser against `/`, `/platform`, `/products`, `/products/cwos`, `/research`, `/blog`, and `/contact` at representative mobile and desktop viewports, then attach the JSON/HTML results to the release record.
