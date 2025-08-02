// ESLint configuration for the TCS AI Club x DUK Portal
// This file configures code linting and quality checks for the project

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Ignore build output directory
  { ignores: ["dist"] },
  
  // Main configuration for TypeScript and React files
  {
    // Extend recommended configurations
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    
    // Apply to TypeScript and TSX files
    files: ["**/*.{ts,tsx}"],
    
    // Language options for modern JavaScript/TypeScript
    languageOptions: {
      ecmaVersion: 2020,        // Use ES2020 features
      globals: globals.browser,  // Browser globals (window, document, etc.)
    },
    
    // Plugins for React-specific linting
    plugins: {
      "react-hooks": reactHooks,      // Enforce React Hooks rules
      "react-refresh": reactRefresh,   // Support for React Fast Refresh
    },
    
    // Custom rules configuration
    rules: {
      // Apply recommended React Hooks rules
      ...reactHooks.configs.recommended.rules,
      
      // Allow constant exports for React Fast Refresh
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      
      // Disable unused variables check (can be noisy during development)
      "@typescript-eslint/no-unused-vars": "off",
    },
  }
);
