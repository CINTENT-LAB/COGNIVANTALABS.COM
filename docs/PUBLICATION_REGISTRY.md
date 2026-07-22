# Publication registry (synced copy)

Status: built 22 July 2026, structurally complete, pending owner review before
commit/deployment.

This repo's Blog page (`src/routes/blog.tsx`) reads from
`src/data/publications.ts`, a typed wrapper around
`src/data/publications.generated.json`. That JSON file is **generated**, not
hand-written -- see `scripts/sync-publications.mjs`.

## Why a generated copy, not a second hard-coded list

Before this change, `src/data/blog.ts` was an independently hand-maintained
array of publications, separate from the equivalent list kept in the
CINTENT.tech repo. The two could drift, and did: this file carried a
"Political Consulting, A New Avenue @LARGE!" item that has no place in either
public catalogue, and titles/summaries for shared articles (e.g. "Cognitive
AI Platforms: The Next Frontier in Artificial Intelligence") were entered
separately in each repo.

cognivantalabs.com and cintent.tech are separate repositories, not a shared
pnpm workspace, so they cannot both import one TypeScript package the way
packages inside a single monorepo can. Per project governance ("do not
maintain two conflicting hard-coded publication lists; use a shared registry
or generated synchronized copies with validation"), this repo instead:

1. Treats `<CINTENT.TECH>/packages/content/src/registry/publications.json` as
   the single source of truth.
2. Runs `npm run sync:publications` to re-read that file, re-validate it
   against the same governance rules enforced in the CINTENT.tech repo, and
   write the validated result to `src/data/publications.generated.json`.
3. Commits the generated file, so production builds (including a CI/Hostinger
   build that only checks out this repo) do not depend on the sibling repo
   being present at build time.

Re-run `npm run sync:publications` (and commit the result) whenever the
CINTENT.tech registry changes. The script refuses to write anything if
validation fails, and refuses to guess a repo path if it can't find one --
see `scripts/sync-publications.mjs` for the exact search order
(`CINTENT_REPO_PATH` env var, an explicit CLI argument, then a sibling-folder
default of `../../CINTENT.TECH` relative to this repo, which matches how both
repos are actually laid out on the owner's machine).

`src/data/blog.ts` (the old hard-coded list) has been retired to a thin
compatibility shim that derives its exports from the new registry, in case
anything still imports it. Nothing in this repo does as of this change --
new publications should be added to the CINTENT.tech registry, not here.

## Governance rules enforced

Enforced by `scripts/sync-publications.mjs` (before it will write anything)
and re-checked by `npm run test:publications`
(`scripts/validate-publications.test.mjs`, Node's built-in test runner -- this
repo has no vitest/jest devDependency, so no new dependency was introduced):

- Every record has all 19 required fields.
- No duplicate `sourceUrl` or `id` values.
- Exactly one "Cognitive AI Platforms" record.
- No "Political Consulting" record.
- No Blogger administration URL ever appears as a `sourceUrl` or
  `canonicalUrl`.
- Every synced record is `ownerApproved === true` and
  `publicationStatus === "Published"`.
- Exactly 4 publications are featured.
- Every `relatedPublicationIds` reference resolves to a real record; the
  criminal-profiling LinkedIn post and the SSRN paper on the same subject are
  linked to each other in both directions.
- The new "Cognitive AI → Trust → Faith → Truth" article is present and
  Published.

## What still needs owner review before commit/deployment

Same open items as the CINTENT.tech side (see that repo's
`docs/content/PUBLICATION_REGISTRY.md`), since the data originates there:

- Author names attributed as "Cognivanta Labs" on LinkedIn posts without a
  personal author slug in the URL.
- The SSRN paper's author (its abstract page did not return readable
  metadata on the last fetch attempt).
- Exact publish time for "From Generative AI to Cognitive AI" (date-level
  precision only).

## Known gap: no test runner in this repo

This repo has no vitest/jest/playwright devDependency installed, and this
environment could not run `npm install` to add one (registry access was
blocked). `npm run test:publications` covers registry-level governance using
only Node's built-in test runner. It does not cover component-level UI
behavior (rendered filter interactions, mobile viewport layout, keyboard
navigation, rendered JSON-LD validity) the way the equivalent CINTENT.tech
Playwright suite could. Adding a UI test runner (e.g. Vitest + Testing
Library, or Playwright, consistent with what's already used in the
CINTENT.tech repo) is recommended as a follow-up once `npm install` is
available.
