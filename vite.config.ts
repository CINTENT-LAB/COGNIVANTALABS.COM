import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

// NOTE: the original Lovable project used @lovable.dev/vite-tanstack-config,
// an internal wrapper not available outside Lovable. This config recreates
// the same plugin set (TanStack Start + React + Tailwind v4 + tsconfig
// paths) directly so the app builds standalone.
export default defineConfig({
  build: {
    // Static production output must never publish source maps.
    sourcemap: false,
  },
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
      prerender: {
        enabled: true,
        autoSubfolderIndex: true,
        autoStaticPathsDiscovery: true,
        // Route discovery already covers the file-based route tree. Crawling
        // every href/src in prerendered HTML treats public binary assets as
        // pages and can rewrite PNG responses as UTF-8 text in dist/client.
        crawlLinks: false,
        concurrency: 8,
        failOnError: true,
      },
    }),
    react(),
  ],
});
