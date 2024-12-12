import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../backend/public", // Construir el frontend en la carpeta del backend
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000", // Proxy para evitar problemas de CORS
    },
  },
});
