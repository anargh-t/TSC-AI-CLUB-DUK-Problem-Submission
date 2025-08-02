// Main App component - Root component that wraps the entire application
// Provides global context providers and routing configuration

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Submit from "./pages/Submit";

// Create a new QueryClient instance for React Query
// This manages server state and caching throughout the app
const queryClient = new QueryClient();

const App = () => (
  // QueryClientProvider - Provides React Query context to all child components
  <QueryClientProvider client={queryClient}>
    {/* TooltipProvider - Enables tooltip functionality across the app */}
    <TooltipProvider>
      {/* Toast notifications - Provides user feedback for actions */}
      <Toaster />
      <Sonner />
      
      {/* BrowserRouter - Enables client-side routing */}
      <BrowserRouter>
        {/* Routes - Defines the application's routing structure */}
        <Routes>
          {/* Home page - Landing page of the application */}
          <Route path="/" element={<Home />} />
          {/* Submit page - Problem submission form */}
          <Route path="/submit" element={<Submit />} />
          {/* Catch-all route - Redirects to home for unknown routes */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App; 