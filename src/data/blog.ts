/**
 * @deprecated This hard-coded list has been retired. The Blog page
 * (src/routes/blog.tsx) now reads directly from src/data/publications.ts,
 * which wraps the generated, governed registry synced from CINTENT.tech
 * (see scripts/sync-publications.mjs and docs/PUBLICATION_REGISTRY.md).
 *
 * This file is kept only as a compatibility shim in case any other code
 * still imports `blogEntries` / `BlogEntry`. Nothing in this repo does as of
 * this change -- do not add new hard-coded publication entries here. Add or
 * change publications in the CINTENT.tech registry and re-run
 * `npm run sync:publications` instead.
 */
import { contentTypeLabel, publishedPublications } from "./publications";

export type BlogEntry = {
  id: string;
  title: string;
  summary: string;
  source: string;
  category: string;
  format: "Article" | "Post" | "Research paper" | "Visual publication";
  href: string;
  external: true;
};

export const blogEntries: BlogEntry[] = publishedPublications.map((publication) => ({
  id: publication.id,
  title: publication.title,
  summary: publication.summary,
  source: publication.publisher,
  category: publication.categories[0] ?? "Uncategorized",
  format: contentTypeLabel(publication.contentType) as BlogEntry["format"],
  href: publication.sourceUrl,
  external: true,
}));
