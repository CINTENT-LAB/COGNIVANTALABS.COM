# Hostinger Static Deployment

This repository is the source repository. Hostinger must not serve the `master`
branch directly from `public_html` because that branch contains TypeScript,
source assets, and build configuration rather than browser-ready HTML.

## Build output

The production build is generated at:

```text
dist/client
```

It contains the root `index.html`, prerendered route directories, public assets,
`robots.txt`, `sitemap.xml`, and `.htaccess`. Only the contents of this directory
belong in the document root.

## GitHub workflow

Run the manual workflow:

```text
Actions -> Publish Hostinger static artifact -> Run workflow
```

The workflow runs the repository checks, builds the static artifact, verifies
that it contains no source or environment files, and publishes only the
contents of `dist/client` to the `hostinger-production` branch. It does not
rewrite `master`.

## Hostinger Git configuration

In Hostinger, configure the domain's Git deployment to use:

```text
Repository: CINTENT-LAB/COGNIVANTALABS.COM
Branch: hostinger-production
Install path: the document root for cognivantalabs.com
```

The install path must resolve to the directory Hostinger serves as
`public_html`. Do not configure `master`, and do not set an install path that
creates `public_html/dist/client`; the artifact branch already has the correct
files at its root.

After Hostinger syncs the branch, verify that `public_html/index.html` exists
and that `public_html/.htaccess`, `public_html/robots.txt`, and
`public_html/sitemap.xml` are present. Do not delete or replace folders used by
other subdomains.

## Current approval gate

This workflow is intentionally manual. It must not be run until the owner has
approved the current website content and supplied the final legal pages for
`/privacy`, `/terms`, and `/cookies`. Those routes currently return 404 in the
source application and are therefore a launch blocker.

No Hostinger, DNS, or production action is performed by this repository change.
