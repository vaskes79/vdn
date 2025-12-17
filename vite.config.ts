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
});
