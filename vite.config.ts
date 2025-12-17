import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@db": path.resolve(__dirname, "./src/db"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React и React DOM в отдельный чанк
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
            return "react-vendor";
          }

          // react-player и все его зависимости в один чанк
          // Это предотвращает проблемы с порядком инициализации модулей
          if (
            id.includes("node_modules/react-player") ||
            id.includes("node_modules/hls.js") ||
            id.includes("node_modules/hls-video-element") ||
            id.includes("node_modules/dashjs") ||
            id.includes("node_modules/dash-video-element")
          ) {
            return "react-player";
          }

          // lodash в отдельный чанк (большая библиотека)
          if (id.includes("node_modules/lodash")) {
            return "lodash";
          }

          // Zustand в отдельный чанк
          if (id.includes("node_modules/zustand")) {
            return "zustand";
          }

          // Dexie в отдельный чанк
          if (id.includes("node_modules/dexie")) {
            return "dexie";
          }

          // Radix UI компоненты в отдельный чанк
          if (id.includes("node_modules/@radix-ui")) {
            return "radix-ui";
          }

          // Остальные node_modules в vendor
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
