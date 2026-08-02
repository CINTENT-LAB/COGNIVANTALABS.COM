export const ANALYTICS_EVENT_NAMES = [
  "playground_open",
  "ask_cogni_open",
  "api_access_click",
  "developer_docs_click",
  "pricing_cta_click",
  "contact_start",
  "contact_submit_success",
  "contact_submit_error",
  "investor_contact_click",
  "product_view",
  "product_external_click",
  "research_article_view",
  "blog_article_view",
  "faq_expand",
  "download_click",
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENT_NAMES)[number];

type SafeAnalyticsParams = Partial<{
  action: string;
  category: string;
  content_type: string;
  form_type: string;
  product: string;
  status: string;
}>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const allowedParamKeys = new Set<keyof SafeAnalyticsParams>([
  "action",
  "category",
  "content_type",
  "form_type",
  "product",
  "status",
]);

const safeValue = /^[a-z0-9][a-z0-9_-]{0,63}$/i;

/** Pushes only allow-listed, non-identifying values to the GTM dataLayer. */
export function trackAnalyticsEvent(
  event: AnalyticsEventName,
  params: SafeAnalyticsParams = {},
): void {
  if (typeof window === "undefined") return;

  const dataLayer = (window.dataLayer ??= []);
  const safeParams = Object.fromEntries(
    Object.entries(params).filter(
      ([key, value]) =>
        allowedParamKeys.has(key as keyof SafeAnalyticsParams) &&
        typeof value === "string" &&
        safeValue.test(value),
    ),
  );

  dataLayer.push({ event, ...safeParams });
}
