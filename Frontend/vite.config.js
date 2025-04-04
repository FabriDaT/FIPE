import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import "./src/index.css";`,
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://fipe-zqv6.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
