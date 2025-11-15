import { defineConfig } from "vite";
import svgr from "@vitejs/plugin-react";
import react from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
});
