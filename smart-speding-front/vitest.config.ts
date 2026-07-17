import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// Dedicated Vitest config. We intentionally do NOT load the `reactRouter()`
// Vite plugin here: in framework mode it takes over the module graph and is
// incompatible with Vitest's transform pipeline. Component/route tests rely on
// `createRoutesStub` / plain RTL render instead.
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Native Vite resolution for the `~/*` alias defined in tsconfig.json.
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    include: ["app/**/*.{test,spec}.{ts,tsx}"],
    css: true,
  },
});
