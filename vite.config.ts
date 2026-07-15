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
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
  ],
});
