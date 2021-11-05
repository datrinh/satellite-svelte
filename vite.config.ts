import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import legacy from "@vitejs/plugin-legacy";

// Vite currently only used for dev because it can't handle multi builds
// Alternative: Microfrontends

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    legacy({
      targets: ["ie >= 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "src/styles/_variables.scss";',
      },
    },
  },
});
