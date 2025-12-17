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

          // Остальные node_modules (включая react-player и его зависимости) в vendor
          // Это позволяет Vite автоматически управлять порядком загрузки модулей
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
