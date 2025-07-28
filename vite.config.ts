import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/SelCorreiaArt/",  // <-- add this line
  plugins: [react()],
  server: {
    host: true,
  },
});
