# Cognivanta Labs Brand Asset Inventory

Status: **Prepared for deployment**

The approved source identity was supplied in the Cognivanta Research logo kit.
The large logo-kit collage files are source references only and are not copied
into the website repository.

## Source files used

- `Logo Kit.png` - supplied brand direction and dark-background references.
- `Logo Kit-1.png` - supplied light-background, social-icon, and favicon references.
- `New Logo-1.png` - supplied clean master used for the production marks.

## Generated production assets

All generated assets are under `public/brand/` and are copied to
`dist/client/brand/` by the production build.

| Asset                                    |  Dimensions | Purpose                                  |
| ---------------------------------------- | ----------: | ---------------------------------------- |
| `cognivanta-labs-logo-dark.png`          | 1071 x 1191 | Full approved mark for dark backgrounds  |
| `cognivanta-labs-logo-light.png`         | 1071 x 1191 | Full approved mark for light backgrounds |
| `cognivanta-labs-logo-compact-dark.png`  |   811 x 232 | Header and footer wordmark               |
| `cognivanta-labs-logo-compact-light.png` |   811 x 232 | Light-background compact wordmark        |
| `cognivanta-symbol.png`                  |   512 x 512 | Standalone cognitive symbol              |
| `cognivanta-symbol.webp`                 |   512 x 512 | WebP symbol variant                      |
| `cognivanta-social-dark.png`             |   512 x 512 | Dark social icon                         |
| `cognivanta-social-light.png`            |   512 x 512 | Light social icon                        |
| `favicon-16x16.png`                      |     16 x 16 | Small browser favicon                    |
| `favicon-32x32.png`                      |     32 x 32 | Browser favicon                          |
| `favicon-48x48.png`                      |     48 x 48 | Browser favicon                          |
| `apple-touch-icon.png`                   |   180 x 180 | Apple touch icon                         |
| `icon-192.png`                           |   192 x 192 | PWA icon                                 |
| `icon-512.png`                           |   512 x 512 | PWA icon                                 |
| `icon-maskable.png`                      |   512 x 512 | Maskable PWA icon                        |
| `og-cognivanta-labs.png`                 |  1200 x 630 | Open Graph and Twitter image             |

`public/favicon.ico` contains 16, 32, and 48 pixel favicon sizes.

## Website locations updated

- Root metadata and Organization/WebSite structured data.
- Desktop, mobile, and sticky header through the shared `Header` component.
- Shared footer.
- Media and press asset catalogue.
- Static 404 page.
- Web manifest, favicon, Apple touch icon, and PWA icons.
- Open Graph and Twitter metadata.

Product marks remain separate. CINTENT, CHAXU, Shunya AI, Health Hub, CWOS,
NyayNetra, BlissTrail, Ask COGNI, Externovate, IKSHANA, AWCS, BYOBOT, and
Cognitive Cobots were not replaced by the Cognivanta Labs corporate mark.

## Validation

- Full production build: passed.
- Typecheck: passed.
- Full lint: passed with two existing Fast Refresh warnings and no errors.
- SEO audit: passed with 32 sitemap routes, 35 HTML files, and 3 noindex routes.
- Publication tests: 13 passed.
- Local static preview: new assets returned HTTP 200 with image MIME types.
- Unknown local route: returned HTTP 404.
- Rendered homepage: absolute canonical, new OG/Twitter image, new compact logo,
  and no obsolete Cognivanta logo references.

## Deployment note

The source repository is ready for the existing Hostinger artifact workflow.
Production remains unverified until Hostinger serves the updated
`hostinger-production` artifact and the live URLs are crawled again.
