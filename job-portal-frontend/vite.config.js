import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600, // optional silence
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@mui")) return "mui"; // ① all Material UI
            if (id.includes("react")) return "react"; // ② react / react-dom
            return "vendor"; // ③ the rest
          }
        },
      },
    },
  },
});
