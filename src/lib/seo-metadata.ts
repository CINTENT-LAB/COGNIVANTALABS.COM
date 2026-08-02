import metadataMap from "@/data/seo-metadata.json";

export type SeoMetadata = {
  title: string;
  description: string;
  robots?: string;
  canonical: string;
};

const SITE_URL = "https://cognivantalabs.com";
const fallbackMetadata = {
  title: "Page not found | Cognivanta Labs",
  description: "The requested Cognivanta Labs page could not be found.",
  robots: "noindex, nofollow",
};

function normalizePath(pathname: string) {
  const path = pathname.split(/[?#]/, 1)[0] || "/";
  if (path === "/") return "/";
  return path.replace(/\/+$/, "") || "/";
}

export function getSeoMetadata(pathname: string): SeoMetadata {
  const route = normalizePath(pathname);
  const entry = metadataMap[route as keyof typeof metadataMap] ?? fallbackMetadata;

  return {
    ...entry,
    canonical: `${SITE_URL}${route === "/" ? "/" : route}`,
  };
}

export { SITE_URL };
