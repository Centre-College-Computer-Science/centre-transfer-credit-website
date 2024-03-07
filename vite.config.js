//<reference types="vitest" />
//<reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
  
  // https://vitejs.dev/config/
  export default defineConfig({
      base: '/centre-transfer-credit-website/',
      plugins: [react()],
      assetsInclude: "**/*.csv",
      test: {
        globals : true,
        environment: 'jsdom',
        css: true,
        setupFiles: './tests/setup.js',
      },
  });
  