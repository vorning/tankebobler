import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/tankebobler/", // ændre fra "/" til dit repository navn
  plugins: [react()],
});
