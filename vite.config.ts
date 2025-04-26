  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react-swc";
  import path from "path";
  import { componentTagger } from "lovable-tagger";

  export default defineConfig(({ mode }) => ({
    server: {
      host: "::",
      port: 8080,
      proxy: {
        '/api': 'http://localhost:5000',
        "/api/images/generate": {
          target: "https://api.studio.nebius.com/v1/",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""), // Remove '/api' part from the path
        },
      },
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }));
  
  
