import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ["react-datepicker", "react-datepicker/dist/react-datepicker.css"],
  },
  server: {
    proxy: {
      "/api": {
        target: "https://prms-backend-rrdo.onrender.com/",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
