import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": "https://prms-backend-rrdo.onrender.com/",
      // "/api": "http://localhost:5000",
    },
  },
});
