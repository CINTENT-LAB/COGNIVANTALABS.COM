# Final Analytics Audit

Audit date: 2026-08-03

## Website-side

- GTM container: `GTM-W2SGX7Z8`.
- Generated output: 32 head container loads and 32 noscript loads across the indexable public pages.
- Direct GA4 script: absent.
- Direct Clarity script: absent.
- GA4 measurement ID configured for GTM account-side use: `G-CB7M3C0J0Y`.
- Microsoft Clarity project configured for GTM account-side use: `xw2pj86era`.
- Analytics helper uses an allow-list and excludes personal form values from event parameters.
- Sensitive form fields carry Clarity masking attributes.
- Privacy copy documents GTM/GA4/Clarity processing and the current absence of a consent-management platform.
- Live CSP includes GTM, Google Analytics, and Clarity origins.

Website-side status: **PASS**.

## Account-side

GTM account configuration, Preview, published container version, GA4 Realtime events, and Clarity session evidence were not accessible from this checkout. They remain:

**WEBSITE-SIDE READY**
**ACCOUNT-SIDE VERIFICATION PENDING**

Do not treat GA4 or Clarity as fully operational until observed account evidence exists and the approved consent behavior is confirmed.
