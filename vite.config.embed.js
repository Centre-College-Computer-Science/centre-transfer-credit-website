//<reference types="vitest" />
//<reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
  

  // https://vitejs.dev/config/
  export default defineConfig({
      base: '/centre-transfer-credit-website/',
      plugins: [react(), viteSingleFile()],
      assetsInclude: "**/*.csv",
      test: {
        globals : true,
        environment: 'jsdom',
        css: true,
        setupFiles: './tests/setup.js',
      },
      build: {
        rollupOptions: {
          input: {
            embed: './embed.html',
          },
        }
      }
  });
  
