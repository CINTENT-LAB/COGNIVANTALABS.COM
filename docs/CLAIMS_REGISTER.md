# Public Claims and Content Evidence Register

Status: **Scaffold — no entries approved yet**

Source: `Cognivanta_Public_Claims_Evidence_Register_Template_v1.0.docx` (22 July 2026),
per `Cognivanta_CINTENT_Final_CR_Register_v3.0` CR-16 (Public claims and evidence
governance).

## Governance rule

A public claim may be published only when its evidence, owner, approved wording,
scope, verification date, and review status are recorded below. The existence of a
draft, code comment, presentation, or prior webpage does not itself verify the claim.

No unsupported customer, revenue, benchmark, patent, compliance, certification,
accuracy, savings, or deployment claim may be published on `cognivantalabs.com` or
`cintent.tech` until it has a row here with status `Verified` or `Qualified`.

## Status definitions

| Status | Definition |
| --- | --- |
| Verified | Evidence reviewed; exact approved wording may publish. |
| Qualified | Evidence supports a narrower or caveated wording. |
| Pending owner review | Evidence exists but wording or scope is not approved. |
| Evidence required | No sufficient evidence supplied. |
| Internal only | May be used in internal material, not public. |
| Remove | Unsupported, expired, misleading, or superseded. |
| Superseded | Replaced by a newer verified claim. |

## Register

| Claim ID | Category | Proposed public claim | Evidence/source | Owner | Status | Approved wording | Verified | Review |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CLM-001 | Company identity | "Cognivanta Labs Pvt. Ltd.", CIN U86900UP2025PTC236604, GSTIN 09AANCC2670G1ZH | Already published in site footer; presumed sourced from official incorporation/GST filings | Ron | Qualified | Use exactly as filed; confirm CIN/GSTIN against the actual certificate before reuse on /media or /investors | 22 Jul 2026 (pulled from live footer, not independently verified against source document) | — |
| CLM-002 | Team credentials | Rajesh bio: "a deterministic, explainable cognitive engine with no generative LLM, running under 500ms at under $0.0001 per query" (live on /about) | None recorded | Ron | Evidence required | — | | |
| CLM-003 | Pilots / deployment | Specific pilot claims previously on homepage ("7 pilot platforms", "processing real contracts, real bookings, real operational constraints") | None recorded | Ron | Evidence required | Softened to general "domain pilots" language on homepage 22 Jul 2026 pending real evidence | | |
| CLM-004 | Team / advisors | "40+ patents across the advisory board", named partners (HKSTP, Avnet, element14), "15+ years of deep-tech operating experience" (was on homepage) | None recorded | Ron | Evidence required | Removed from homepage 22 Jul 2026 pending real evidence | | |
| CLM-005 | | | | | Evidence required | | | |
| CLM-006 | | | | | Evidence required | | | |
| CLM-007 | | | | | Evidence required | | | |
| CLM-008 | | | | | Evidence required | | | |
| CLM-009 | | | | | Evidence required | | | |
| CLM-010 | | | | | Evidence required | | | |
| CLM-011 | | | | | Evidence required | | | |
| CLM-012 | | | | | Evidence required | | | |

Add new rows (CLM-013, CLM-014, ...) as new claims are proposed. Do not delete a row;
set its status to `Remove` or `Superseded` instead, so the history stays auditable.

## Required claim categories

- Company identity, ownership, incorporation, location, and contact details.
- CINTENT definition, capabilities, architecture, and maturity.
- API counts, performance, latency, accuracy, and availability.
- Customers, partners, pilots, deployments, and case-study outcomes.
- Revenue, traction, fundraising, market size, pipeline, and forecasts.
- Patents, publications, benchmarks, certifications, and compliance.
- Team roles, education, former employers, awards, and patent counts.
- Product/application status, domains, pricing, and access.
- Research status and publication type.
- ROI, savings, satisfaction, time reduction, and confidence metrics.

## Evidence quality hierarchy

1. Signed or independently verifiable primary record.
2. Audited financial, legal, certification, or official filing record.
3. Approved customer/pilot report with methodology and permission.
4. Versioned internal technical report with named owner and reproducible data.
5. Approved executive statement with explicit scope and qualification.
6. Unverified draft, presentation, email, or recollection — insufficient for
   definitive public wording.

## Publication workflow

1. Content author proposes the exact claim and page placement (adds a row here).
2. Evidence owner attaches the source and measurement context.
3. Reviewer (Ron / owner) assigns Verified, Qualified, Pending, Evidence required,
   Internal only, Remove, or Superseded.
4. Approved wording is copied into this register; the live page must not paraphrase
   into a stronger claim than what's approved here.
5. Structured data, metadata, `llms.txt`, and public JSON use only approved wording.
6. Review date triggers revalidation or automatic removal/qualification.

## Known open items pulled off the live site during CR-3 (22 July 2026)

These were found already published on the homepage without an evidence-register
entry, and were softened to qualitative, non-specific language pending your input.
They still need real rows above before any number/name goes back in:

- Advisor patent count ("40+ patents") — removed from Trust section. Needs a real
  count and owner sign-off, or leave qualitative.
- Named strategic partners (HKSTP, Avnet, element14) — removed from Trust section.
  Needs confirmation these partnerships exist and are approved for public mention.
- Named pilot products presented as processing "real contracts, real bookings" —
  softened to a general "domain pilots" statement. Needs each pilot's actual maturity
  status (see CR-4 / applications pages) before specifics go back in.
- "94% confidence" / "98%" figures in the illustrative contract-review example —
  removed; the section is now labeled "Illustrative example" rather than "Real
  example," consistent with CR-Ask-COGNI's rule against arbitrary confidence
  percentages.

## CR-0 / CR-1 / CR-2a / CR-2b build notes (22 July 2026)

- Added `src/server/leadCapture.ts` — a shared TanStack Start server function
  (`submitLead`) used by every form on the site. It validates, rate-limits,
  de-dupes, and forwards to `process.env.LEAD_WEBHOOK_URL` if set; otherwise it
  logs server-side and tells the visitor honestly that routing isn't fully
  wired yet. Set `LEAD_WEBHOOK_URL` on Hostinger to activate real delivery.
- Rewired `/contact` off its fake client-only "Sent" button onto that backend.
- Rebuilt the header nav (`src/components/site/Header.tsx`) around
  change_scope.md Section 3, but deliberately left out Partners and Customers
  as top-level items — those don't have real destinations yet, and the CR-1
  exclusion says no dead links. Also dropped the standalone "Pilots" and
  "Resources" nav entries to keep the bar from overflowing; Pilots is still
  reachable from Solutions (/applications) and the footer.
- Added `/investors` (CR-2b) and `/media` (CR-2a). Both intentionally avoid
  restating unverified numbers (market size, funding, pilot outcome metrics,
  patent counts) and link out to where the real state of each thing lives
  (`/pilots`, `/cognites`, `/platform`) instead.
## CR-4 evidence-governed solution profiles (22 July 2026)

- Found the same "illustrative demo dressed as a real, precisely-measured
  result" pattern already fixed on the homepage repeated on `/platform`
  ("Real example" + "94% confidence" + "98%") and `/enterprise` ("87%
  confidence... 4 constraints evaluated"). Relabeled both as illustrative and
  removed the invented precision, consistent with CR-Ask-COGNI's rule against
  arbitrary confidence percentages.
- `/about` claimed "backed by patent-holding advisors" — no advisor bio in
  `src/data/team.ts` actually states a patent. Softened to "deep-tech
  operators and research advisors" pending real evidence (same open item as
  CLM-004).
- `/pilots` listed CHAXU as "Aerial autonomy · Production Ready" with no
  supporting structure elsewhere. Pulled "Production Ready" out of the label
  and instead added an explicit, structured maturity badge to every pilot
  card (Research pilot / Deployment pilot / Enterprise pilot), reusing the
  categorization language the page already had. If CHAXU is genuinely
  production-ready, that's a stronger, more specific claim than "deployment
  pilot" — confirm and I'll upgrade its badge and add a CLM row for it.

## CR-5 team publication governance (22 July 2026)

- Added `ownerApproved` / `publicationStatus` fields to `TeamMember` in
  `src/data/team.ts`, plus a `publishedTeam` export that filters on both —
  matching CR-5's acceptance criteria exactly ("Profile displays only when
  ownerApproved and publicationStatus=Published"). All 10 existing profiles
  were set to approved/published since they're already live on `/about`
  today; any new hire or bio edit should default to
  `ownerApproved: false, publicationStatus: "draft"` until you sign off.
  `about.tsx`, `investors.tsx`, and `media.tsx` now all import
  `publishedTeam` instead of the raw list.
- Softened Rajesh's bio in the same pass: removed "running under 500ms at
  under $0.0001 per query" (CLM-002, still evidence-required) since I was
  already touching this exact file for the governance fields.
- **Found and fixed a navigation bug of my own making**: on `/investors`,
  `/media`, and the homepage Trust section, I'd written "team profiles are
  published on the Cognites page" — but `/cognites` on this site is actually
  the partner/customer/employee sign-in hub (built earlier in this project),
  not a team-bio page. The real team/leadership/advisor bios live on
  `/about`. Fixed all three links to point there instead. Worth noting for
  later CR-1 work: change_scope.md's nav spec describes "Cognites" as a
  What-is-a-Cognite/Leadership/Advisors/Join hub, which doesn't match what
  `/cognites` actually does on this site today (a login gateway). I left
  `/cognites` as-is rather than repurpose an existing working flow without
  your sign-off — flagging it here instead.

## CR-7 research hub review (22 July 2026)

- Reviewed `src/components/research/ResearchPage.tsx` (the `/research` route)
  against CR-7's exclusions. It already avoids everything CR-7 warns about —
  no peer-review labels, no patent/benchmark listings, and the evaluation
  section explicitly says "these are evaluation questions, not published
  performance claims." No changes made; this page is a good template for how
  the rest of the site should read.
- Gap, not fixed: CR-7 also wants actual "working papers" / "architecture
  notes" listed as artifacts with publication type, author, date, and review
  status. None exist yet, so none are listed — correct per evidence
  governance, but worth knowing this is still an empty deliverable, not a
  completed one.

## CR-13 footer rebuild (22 July 2026)

- Rebuilt `src/components/site/Footer.tsx`: verified every link resolves to a
  real route, anchor, or live external destination (checked `research-hub.
  cognivantalabs.com` — it's a real deployed site). Split "Trust & support"
  into "Legal & trust" and added Privacy/Terms links.
- Added `/privacy` and `/terms` — both `noindex`, both banner-marked
  "Draft — not yet reviewed by legal counsel," structural placeholders only
  (no invented data-retention periods, jurisdictions, or compliance claims).
  These need real legal drafting before the draft banner comes off.
- Added a real newsletter signup wired to the CR-0 backend (`formType:
  "newsletter"`), with an explicit opt-in checkbox rather than an implied one.
- **Registered office address**: CR-13 asks for one in the footer. We don't
  have a real street address on file anywhere in this repo, so rather than
  invent one, the footer now says "registered office address pending
  publication." Send the real one and it goes in immediately — this is the
  one CR-13 deliverable still open.
- Added a third footer CTA, "Partner with us" → `/contact`, and kept
  Investor/Media routed through their dedicated pages. Left out a Status page
  link (no such page exists yet) and Careers (CR-9, not built).

## CR-6 / productContent.ts evidence audit (22 July 2026)

While starting CR-6 (dynamic vertical solutions experience), found that
`src/data/productContent.ts` — the per-product one-pager data used across all
~10 CINTENT products — had the same fabricated-stat and fabricated-testimonial
pattern already fixed elsewhere on the site. Treated this as a CR-4/CR-16
extension and fixed all instances found:

- **shunyai**: stats trimmed from 4 invented figures ("97.8% STT Accuracy",
  "245ms Response Time", "99.9% System Uptime") down to the one that matches
  the overview ("42 Indian Languages"), marked `(target)` since it's forward-
  looking. `closingNote`'s "~10% better quality and performance versus major
  commercial speech systems" benchmark claim removed pending real,
  methodology-backed evidence.
- **blisstrail**: removed 3 fabricated stats ("10K+ Active Travelers", "99%
  Prediction Accuracy", "₹50Cr+ Savings Generated" — a specific financial
  savings claim with no source). Removed all 3 named testimonials (Priya
  Sharma / Rajesh Kumar / Sneha Patel) — generic stock-testimonial pattern
  with specific invented savings figures, no evidence on file. `closingNote`
  now notes testimonials will publish once real, permissioned reviews exist.
- **nyaynetra**: removed both stats ("150+ Trusted by Many", "15 Legal
  Innovators" — vague, unverifiable vanity metrics) and the single named
  testimonial ("Adv. Sunil Awasthi") — no evidence on file.
- **health-hub**: removed the broken `gallery` image
  (`cognivantalabs.com/diagrams/chaxu-architecture.svg` — confirmed via
  `web_fetch` to 404 and silently serve the homepage HTML instead of an
  image). Trimmed stats to the one that matches the overview ("4,500+
  Healthcare APIs", relabeled "(catalog scope)"); removed "30% Faster Care
  Decisions" and "94% Guideline Compliance" (no evidence). Removed both named
  clinician testimonials (no evidence). Rewrote all 3 FAQ answers, which
  previously stated "FDA clearance in progress," an unqualified
  HIPAA-compliant-infrastructure claim, and a specific "4-8 weeks" EHR
  integration timeline with named vendors (Epic, Cerner, Medidata) as settled
  fact — all three are now explicit "not yet obtained / not yet completed /
  design intent, not a compliance claim" statements, with the pre-launch
  caveat folded into each answer directly instead of left only in the
  closing note.
- **cwos**: removed 3 fabricated scale stats ("10M+ Assets Analyzed Daily",
  "100K+ Strategies Backtested", "1B+ Data Points Processed") that directly
  contradicted the product's own closingNote ("Currently in demonstration and
  pilot deployment phase"); kept "24/7 AI-Powered Monitoring" as lower-risk
  descriptive language. Also softened the "Quant strategy engine" feature
  description, which repeated the same "100,000+ strategies" figure as prose.
  Left real pricing tiers and the existing SEBI-registration FAQ disclaimer
  untouched — pricing is a commercial decision, not a fabricated claim, and
  the SEBI answer was already honest.
- **No changes needed**: chaxu (structural counts like "513 Cataloged APIs"
  match the homepage's own established claim — low risk), ikshana, cobots,
  awcs, askcogni, cogni-doc (all already use explicit "early access" / "pilot
  stage" / "provider-neutral preview" framing). externovate's stats ("15+
  Countries", "8 Core Modules") were left as-is as low-risk structural counts
  — worth a second look later if time allows.

## CR-6 dynamic vertical solutions experience (22 July 2026)

- Fixed two broken external assets in `src/routes/applications.tsx` found via
  `web_fetch` verification: the `ecosystem.html` external link and the
  `autonomous-control.svg` diagram image both 404'd and silently served the
  live homepage HTML instead (confirmed same failure pattern as health-hub's
  gallery image above). Replaced both with real internal navigation to
  `/platform`.
- Added the "Priority Domains, In Depth" section to `/applications`, scoped to
  the 3 domains marked `tier: "deployment"` on `/pilots` (CHAXU/aerial,
  Cognitive Cobots/robotics, AWCS/assistive mobility) — the most mature pilots
  today, per `-CR-SCOPE.md`'s guidance to scope CR-6 to "2-3 most mature
  verticals first" rather than build all seven with invented data. Each
  profile uses Problem / Intervention / Integration architecture / Governance
  / Deployment model, sourced directly from the already-vetted copy in
  `src/data/productContent.ts` (the same `overview`/`closingNote` fields
  covered by the evidence audit above) — no new numbers introduced.
- **Deliberately did not build the ROI calculator or per-vertical outcome
  metrics** that `-CR-SCOPE.md` itself flags as the CR's biggest fabrication
  risk ("input your cost, we'll tell you your savings" implies a validated
  savings model we don't have; "Pilot showed 22% reduction..." style results
  don't exist for any vertical yet). Replaced with an explicit "On value and
  ROI" note stating plainly that no calculator or outcome percentage will be
  published until real, measured pilot data exists to calibrate one, and
  routing interested visitors to a "Book a proof-of-concept workshop" CTA
  instead. This is a real, intentional gap — flagging here rather than
  quietly shipping a guess-dressed-as-math.
- Not built (deferred, same reasoning): full pages for the remaining
  research/enterprise-tier verticals (finance, legal beyond NyayNetra,
  healthcare beyond Health Hub, govt) — `/applications` already covers these
  at the domain-overview level; dedicated deep-dive pages for each would need
  the same real pilot evidence this section intentionally doesn't have yet.

## Live governance gap found and fixed on /about (22 July 2026)

While starting CR-8, found `src/routes/about.tsx` still had a live
"Strategic Partners" section naming HKSTP, Avnet, and element14 with specific
roles ("APAC gateway," "Silicon & hardware," "Engineering network") under the
heading "Global reach, from day one." This is the exact same unverified
named-partnership claim already flagged as CLM-004 and removed from the
homepage during CR-3 — it just hadn't been caught on /about too. Removed the
section and the underlying `partners` array. Needs a real row in the register
above (confirming these partnerships exist and are approved for public
mention) before anything like this goes back up anywhere on the site.

## CR-8 / CR-9 / CR-10 / CR-11 / CR-12 / CR-Ask-COGNI (22 July 2026)

Continuing the CR sequence per "move on with sequence without asking."
Referenced `-CR-SCOPE.md` (the original scoping brief) for each CR's exact
requirements and pre-flagged fabrication risks.

- **CR-8 (`/roadmap`)**: Promoted the existing, already-published 2026→2030
  roadmap from `/about` (AI Accelerators, Custom AI Chips, Edge AI, Quantum
  Integration) to its own page, per the brief's own guidance ("small if
  promoting existing content"). No new dated milestones or certifications
  introduced — `-CR-SCOPE.md` explicitly warned against inventing
  quarter-level commitments like "FDA/ISO certification by Q3," and none were
  added. Linked from `/about`'s roadmap section and the footer/nav.
- **CR-9 (`/careers`)**: Built as an honest holding page, not a full careers
  portal — no invented tech-stack callout, no fabricated job listings, no ATS
  integration (none connected). States plainly that there are no public
  openings today and offers a real CR-0-backed interest-registration form
  (`formType: "careers"`, added to `LeadFormType`). Real tech stack, real open
  roles, and an ATS account (Lever/Greenhouse) remain open items requiring
  Ron's input, per the brief's own "depends on you" note for this CR.
- **CR-12 (`/architecture`)**: Built reusing only already-vetted content —
  the same 4-layer model (Perception/Cognitive/Decision/Action), the 6-item
  real API surface (`/intent /context /memory /reason /orchestrate /govern`),
  and deployment surfaces already live on `/platform`, plus the canonical
  7-stage lifecycle (`Intent → Context → Reason → Decide → Act → Learn →
  Refined Intent Understanding`) already declared in `src/routes/index.tsx`.
  No new architecture claims introduced.
- **CR-10 (interactive lifecycle strip)**: Made the homepage's lifecycle
  strip interactive — each stage now has a hover tooltip with real detail
  (sourced from the same /architecture content) and the strip links through
  to `/architecture`. Deliberately did NOT use the brief's suggested tooltip
  copy ("Proprietary Graph-Neural Network reasoning," "RPA integration") —
  nothing in this codebase confirms CINTENT's reasoning layer is actually a
  graph neural network, and inventing that claim on a page CTOs will
  scrutinize was exactly the risk `-CR-SCOPE.md` flagged. Used only real,
  already-published terms instead. **Not built**: the "auto-replay demo
  button" — lower priority than the tooltip/CTA work and deferred for now.
- **CR-11 (clickable capability cards)**: Made `/platform`'s 6 capability
  cards expand in place on click, each revealing which real architecture
  layer or API endpoint it maps to. **Not wired**: click analytics — no
  analytics provider (GA4/Plausible/PostHog) is installed on this site, and
  installing one has real privacy-policy implications (the still-open
  `/privacy` draft-banner item from CR-13). This is an open item requiring
  Ron to pick a provider before it can be wired up honestly.
- **CR-Ask-COGNI**: Added a preset-scenario picker to the persistent COGNI
  launcher, using real Cognivanta domains/products (NyayNetra legal research,
  Health Hub care pathways, CHAXU mission tasking, CWOS investment research)
  instead of the brief's generic placeholder scenarios ("Healthcare Triage,
  Financial Fraud Check, Supply Chain Delay") which don't match this
  company's actual pilot set. Added "Request API access" and "Integrate
  CINTENT" CTAs to the panel. **Deliberately did not add** the suggested
  confidence-score meter: `CogniLauncher.tsx`'s own doc comment confirms the
  panel hands off to the external playground rather than running any
  inference itself, so there is no real signal to attach a percentage to —
  displaying one would be the same fabricated-precision pattern already
  removed from `/platform` and `/enterprise` during CR-4.

All six of these CRs are now considered structurally complete; remaining gaps
are explicitly listed above and depend on real inputs from Ron, not further
build work.

**Naming inconsistency found, not fixed (flagging for sign-off)**: while
building CR-10/CR-12, found three different names for what's meant to be the
same cognitive loop concept, live in three different places:
`src/routes/index.tsx`'s `lifecycleStages` and the footer both use the
canonical 7/6-stage `Intent → Context → Reason → Decide → Act → Learn
(→ Refined Intent Understanding)`, but `src/routes/platform.tsx`'s
`CognitiveLoopSection` still uses an older 5-stage `Sensing → Understanding →
Decision → Action → Learning` naming for what appears to be the same idea.
I used the canonical Intent/Context/Reason/Decide/Act/Learn naming for the
new `/architecture` page and the CR-10 tooltip work (matching the homepage,
which is more prominent and more recently built), but did not rewrite
`CognitiveLoopSection`'s already-published copy without your sign-off, since
that's an existing section rather than something I'm building fresh. Worth
reconciling these to one name before this gets noticed by someone reading
both pages closely.

- **Action needed before build verification**: `src/routeTree.gen.ts` is
  auto-generated by the TanStack Router vite plugin and hasn't been
  regenerated in this sandbox (rollup native binary mismatch blocks running
  vite here — the same sandbox limitation flagged earlier in this project).
  Running `npm run dev` or `npm run build` locally once will regenerate it and
  register every route added in this session (`/investors`, `/media`,
  `/roadmap`, `/careers`, `/architecture`) — do that before `tsc --noEmit`.
