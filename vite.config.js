import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/tankebobler/", // SKAL matche dit repository navn
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
