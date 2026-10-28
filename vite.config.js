import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Preserve the original repository's public/ files without publishing its old CV.
export default defineConfig({ plugins: [react()], publicDir: "static" });
