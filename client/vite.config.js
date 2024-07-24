import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const proxy_target = `${env.PROXY}`;
  return {
    server: {
      proxy: {
        "/api": {
          target: proxy_target,
          changeOrigin: true,
          secure: true,
        },
      },
    },
    plugins: [react()],
  };
});
