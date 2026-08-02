# GTM, GA4 and Microsoft Clarity Setup

This document describes the account-side configuration for the Cognivanta Labs
corporate website. The website source owns one Google Tag Manager container
bootstrap in the shared root shell. GA4 and Microsoft Clarity must be created
and published inside that container; their vendor snippets are intentionally not
embedded in the website source.

## Identifiers

| System             | Identifier     |
| ------------------ | -------------- |
| Google Tag Manager | `GTM-W2SGX7Z8` |
| Google Analytics 4 | `G-CB7M3C0J0Y` |
| Microsoft Clarity  | `xw2pj86era`   |

## Consent boundary

There is no cookie-consent banner or consent-management platform in this
repository. The existing lead-form consent check is consent to be contacted,
not analytics consent. Do not publish analytics tags until the approved
analytics-consent mechanism and privacy review are complete. Once an approved
analytics-consent trigger exists, use it for both tags. Do not infer analytics
consent from a lead-form submission.

## GA4 tag

- **Name:** `Google Analytics 4 - Cognivanta Labs`
- **Tag type:** Google tag
- **Tag ID:** `G-CB7M3C0J0Y`
- **Trigger:** `Initialization - All Pages` only after the approved analytics
  consent trigger is available. If Initialization is unavailable, use `All
Pages` with the same consent requirement.
- **Event parameters:** use only the non-identifying values documented by the
  site analytics helper. Do not forward form values, query text, ticket IDs,
  emails, names, or other user-provided content.

## Microsoft Clarity tag

- **Name:** `Microsoft Clarity - Cognivanta Labs`
- **Tag type:** Custom HTML
- **Trigger:** `All Pages` only after the approved analytics consent trigger is
  available.
- **Project ID:** `xw2pj86era`

Approved Custom HTML:

```html
<script type="text/javascript">
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", "xw2pj86era");
</script>
```

Clarity masking attributes are present on contact, careers, investor, media,
pricing, login, newsletter, and private Ask COGNI inputs. Do not remove them
from sensitive fields. Public headings, navigation, product copy, pricing
labels, FAQs, and research content are not masked.

## GTM Preview and Tag Assistant

1. Open the GTM workspace for the Cognivanta Labs container.
2. Select **Preview** and connect to `https://cognivantalabs.com/`.
3. Verify the container loads once and that no duplicate container appears in
   the event timeline.
4. Exercise the consent flow when it is available and verify GA4 and Clarity
   remain blocked before analytics consent.
5. Verify the GA4 tag fires once after consent and uses measurement ID
   `G-CB7M3C0J0Y`.
6. Verify the Clarity tag fires once after consent and uses project ID
   `xw2pj86era`.
7. Inspect the data layer and confirm no user-provided values are present.
8. Repeat on `/platform`, `/products`, `/research`, and `/contact`.

## Publish and live verification

1. Submit the preview for review.
2. Publish the container only after the consent, privacy, and masking checks
   pass.
3. In GA4, open **Realtime** and confirm an approved test visit appears after
   consent.
4. In Clarity, confirm the project receives an approved test visit and that
   sensitive input values are masked.
5. Record the published container version in the deployment record.

Account access was not available during repository implementation, so tag
creation, preview, publication, GA4 Realtime, and Clarity verification remain
manual account-side steps.
