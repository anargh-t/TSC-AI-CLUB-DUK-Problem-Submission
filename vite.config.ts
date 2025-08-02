import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Vite configuration for the TCS AI Club x DUK Portal
// This file configures the build tool and development server
export default defineConfig(({ mode }) => ({
  // Development server configuration
  server: {
    // Allow connections from any IP address (useful for network access)
    host: "::",
    // Port for the development server
    port: 8080,
  },
  
  // Plugins configuration
  plugins: [
    // React plugin with SWC for faster compilation
    react(),
  ],
  
  // Module resolution configuration
  resolve: {
    alias: {
      // Enable @ imports to point to src directory
      // Usage: import Component from "@/components/Component"
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
