// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Vercel sets VERCEL=1 in its build container. Only then do we switch nitro's
// target, so Lovable keeps building for its own cloudflare-module default and
// nothing changes for local builds. Set VERCEL=1 locally to rehearse the real
// Vercel build.
const onVercel = !!process.env.VERCEL;

export default defineConfig({
  ...(onVercel ? { nitro: { preset: "vercel" } } : {}),

  // Outside the Lovable sandbox the shared config only *defaults* the dev server to
  // 8080, so anything set here wins. We pin 8081 to stay clear of the CuspAI product
  // app, which owns 8080. strictPort makes a clash fail loudly instead of drifting
  // to a random port. Inside the sandbox 8080 is still forced, as Lovable requires.
  vite: {
    server: { port: 8081, strictPort: true },
    preview: { port: 8081, strictPort: true },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
