// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    server: {
      port: 5000,
      host: "0.0.0.0",
      strictPort: true,
      allowedHosts: true,
    },
    build: {
      // Modern target — smaller output, no legacy polyfills
      target: "esnext",
      // Split CSS per chunk so non-critical CSS loads lazily
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          // Vendor chunk splitting — stable hashes for long-term caching
          manualChunks(id) {
            if (!id.includes("node_modules")) return;
            // React runtime — tiny, always needed, cache forever
            if (id.includes("/react/") || id.includes("/react-dom/") || id.includes("/scheduler/")) {
              return "vendor-react";
            }
            // Recharts + D3 — only used on pages that render charts
            if (id.includes("recharts") || id.includes("/d3-") || id.includes("d3/")) {
              return "vendor-charts";
            }
            // Lucide icon tree — large but tree-shakeable; separate chunk avoids re-parsing
            if (id.includes("lucide-react")) {
              return "vendor-icons";
            }
            // TanStack core libraries
            if (id.includes("@tanstack/")) {
              return "vendor-tanstack";
            }
            // Radix UI primitives
            if (id.includes("@radix-ui/")) {
              return "vendor-radix";
            }
          },
        },
      },
    },
  },
});
