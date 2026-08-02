import type { ReactElement } from "react";
import { GOOGLE_TAG_MANAGER_ID } from "@/lib/google-tag-manager";

export function GoogleTagManagerNoscript(): ReactElement {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GOOGLE_TAG_MANAGER_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
