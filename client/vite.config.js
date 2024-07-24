import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: `${import.meta.env.PROXY}`,
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [react()],
});
