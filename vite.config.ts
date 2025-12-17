import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react(), tailwindcss()],
  build: {
    // Performance optimizations
    target: "esnext",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info"],
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunking for better caching
          if (id.includes("node_modules")) {
            // React vendor chunk
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("scheduler")
            ) {
              return "react";
            }
            // Animation vendor chunk
            if (id.includes("animejs")) {
              return "animation";
            }
            // Swiper vendor chunk
            if (id.includes("swiper")) {
              return "swiper";
            }
            // i18n vendor chunk
            if (id.includes("i18next") || id.includes("react-i18next")) {
              return "i18n";
            }
            // Icons vendor chunk
            if (id.includes("lucide-react")) {
              return "icons";
            }
            // Lenis smooth scroll
            if (id.includes("lenis")) {
              return "lenis";
            }
            // Other vendor packages
            return "vendor";
          }
        },
        // Asset naming for better caching
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return `assets/[name]-[hash][extname]`;
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          } else if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    sourcemap: false,
  },

  // Optimize deps
  optimizeDeps: {
    include: ["react", "react-dom", "react-i18next", "i18next", "lenis"],
    exclude: ["lucide-react"],
  },
});
