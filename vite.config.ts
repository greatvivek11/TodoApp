import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	resolve: {
		alias: {
			"@": "/src",
		},
	},
	plugins: [
		react(),
		federation({
			name: "todoApp",
			filename: "remoteEntry.js",
			exposes: {
				"./Main": "./src/main.jsx",
			},
			shared: ["react", "react-dom"],
		}),
	],
	build: {
		target: "esnext",
	},
	esbuild: {
		target: "esnext",
	},
	optimizeDeps: {
		esbuildOptions: {
			target: "esnext",
		},
	},
});
