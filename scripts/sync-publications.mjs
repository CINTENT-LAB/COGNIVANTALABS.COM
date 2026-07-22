#!/usr/bin/env node
/**
 * Sync the governed publication registry from the CINTENT.tech repo into a
 * generated, validated copy in this repo (src/data/publications.generated.json).
 *
 * This exists because cognivantalabs.com and cintent.tech are separate repos
 * (not a shared pnpm workspace), so they cannot both import one TypeScript
 * package at build time. Per project governance, this repo must not hand-
 * maintain a second, independently-drifting publication list. Instead, this
 * script re-reads the single source of truth --
 *   <CINTENT.TECH>/packages/content/src/registry/publications.json
 * -- re-validates it against the same governance rules enforced there, and
 * writes a synchronized copy here. The generated file is committed to this
 * repo so production builds do not depend on the sibling repo being present
 * (e.g. in a CI/Hostinger build that only checks out this repo). Re-run this
 * script (and commit the result) whenever the CINTENT.tech registry changes.
 *
 * Usage:
 *   node scripts/sync-publications.mjs [pathToCintentRepo]
 *   CINTENT_REPO_PATH=/path/to/CINTENT.TECH node scripts/sync-publications.mjs
 *
 * If no path is given, it tries a sibling-folder default (both repos checked
 * out next to each other on the same machine) and fails with a clear message
 * -- it does NOT invent or fall back to guessed data.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

const candidatePaths = [
  process.argv[2],
  process.env.CINTENT_REPO_PATH,
  resolve(repoRoot, "..", "..", "CINTENT.TECH"),
  resolve(repoRoot, "..", "CINTENT.TECH"),
].filter(Boolean);

const registryRelativePath = "packages/content/src/registry/publications.json";
const bloggerPostsRelativePath = "packages/content/src/registry/blogger-posts.json";

let sourceRepoPath = null;
for (const candidate of candidatePaths) {
  if (candidate && existsSync(resolve(candidate, registryRelativePath))) {
    sourceRepoPath = resolve(candidate);
    break;
  }
}

if (!sourceRepoPath) {
  console.error(
    "sync-publications: could not find the CINTENT.tech repo (looked for " +
      `${registryRelativePath} under: ${candidatePaths.join(", ") || "(no candidates)"}).\n` +
      "Pass the repo path explicitly: node scripts/sync-publications.mjs /path/to/CINTENT.TECH\n" +
      "The last generated copy at src/data/publications.generated.json was left unchanged.",
  );
  process.exit(1);
}

const registryPath = resolve(sourceRepoPath, registryRelativePath);
const publications = JSON.parse(readFileSync(registryPath, "utf8"));

const bloggerPostsPath = resolve(sourceRepoPath, bloggerPostsRelativePath);
const bloggerPosts = existsSync(bloggerPostsPath)
  ? JSON.parse(readFileSync(bloggerPostsPath, "utf8"))
  : [];

// --- Governance validation (mirrors packages/content/test/publications.test.mjs) ---
const errors = [];

const REQUIRED_FIELDS = [
  "id",
  "slug",
  "title",
  "summary",
  "contentType",
  "publisher",
  "author",
  "sourceUrl",
  "canonicalUrl",
  "publishedAt",
  "updatedAt",
  "categories",
  "tags",
  "featured",
  "external",
  "publicationStatus",
  "ownerApproved",
  "image",
  "imageAlt",
  "relatedPublicationIds",
];

const byId = new Map(publications.map((publication) => [publication.id, publication]));

for (const publication of publications) {
  for (const field of REQUIRED_FIELDS) {
    if (!Object.prototype.hasOwnProperty.call(publication, field)) {
      errors.push(`${publication.id ?? "(unknown id)"} is missing required field "${field}"`);
    }
  }
}

const sourceUrls = publications.map((publication) => publication.sourceUrl);
if (new Set(sourceUrls).size !== sourceUrls.length) {
  errors.push("duplicate sourceUrl values found in the registry");
}

const ids = publications.map((publication) => publication.id);
if (new Set(ids).size !== ids.length) {
  errors.push("duplicate id values found in the registry");
}

const cognitiveAiPlatformsMatches = publications.filter((publication) =>
  publication.title.startsWith("Cognitive AI Platforms: The Next Frontier"),
);
if (cognitiveAiPlatformsMatches.length !== 1) {
  errors.push(
    `expected exactly one "Cognitive AI Platforms" entry, found ${cognitiveAiPlatformsMatches.length}`,
  );
}

const politicalConsultingMatches = publications.filter((publication) =>
  /political consulting/i.test(publication.title),
);
if (politicalConsultingMatches.length !== 0) {
  errors.push("a political-consulting publication is present and must be removed");
}

for (const publication of publications) {
  for (const url of [publication.sourceUrl, publication.canonicalUrl]) {
    if (/blogger\.com\/blog\/(post|pages)\/(edit|new)/i.test(url)) {
      errors.push(`${publication.id} exposes a Blogger administration URL: ${url}`);
    }
  }
}

for (const publication of publications) {
  if (publication.ownerApproved !== true || publication.publicationStatus !== "Published") {
    errors.push(
      `${publication.id} is not owner-approved and Published -- it must not be synced to a public site`,
    );
  }
}

const featured = publications.filter((publication) => publication.featured);
if (featured.length !== 4) {
  errors.push(`expected exactly 4 featured publications, found ${featured.length}`);
}

for (const publication of publications) {
  for (const relatedId of publication.relatedPublicationIds) {
    if (!byId.has(relatedId)) {
      errors.push(`${publication.id} references a relatedPublicationId "${relatedId}" that does not exist`);
    }
  }
}

if (errors.length > 0) {
  console.error("sync-publications: governance validation failed, nothing was written:\n");
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

// --- Write the generated, validated copy ---
const outputPath = resolve(repoRoot, "src/data/publications.generated.json");
const generatedAt = new Date().toISOString();
const output = {
  generatedAt,
  sourceRepo: sourceRepoPath,
  publications,
};
writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");

console.log(
  `sync-publications: wrote ${publications.length} publication(s) (${featured.length} featured) ` +
    `to src/data/publications.generated.json from ${sourceRepoPath}`,
);

// Also mirror the local-discussion-thread map used by the CINTENT.tech site,
// so this site could offer the same link if it ever builds an equivalent
// discussion feature. Not required today; written for parity/documentation.
const discussionByCanonicalUrl = Object.fromEntries(
  bloggerPosts
    .filter((post) => post.discussionEnabled && post.discussionUrl && post.canonicalUrl)
    .map((post) => [post.canonicalUrl, post.discussionUrl]),
);
if (Object.keys(discussionByCanonicalUrl).length > 0) {
  writeFileSync(
    resolve(repoRoot, "src/data/publications-discussion-links.generated.json"),
    `${JSON.stringify(discussionByCanonicalUrl, null, 2)}\n`,
    "utf8",
  );
}
