// Main entry point for the React application
// This file bootstraps the React app and mounts it to the DOM

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create a React root and render the App component
// The root element with id "root" is defined in index.html
createRoot(document.getElementById("root")!).render(<App />);
