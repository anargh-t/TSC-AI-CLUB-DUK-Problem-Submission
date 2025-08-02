// Home page component - Landing page of the TCS AI Club x DUK Portal
// Displays the main navigation and hero section

import MinimalNav from "@/components/ui/minimal-nav";
import Hero from "@/components/ui/hero";

const Home = () => {
  return (
    // Main container with full height and dark background
    <div className="min-h-screen bg-black relative">
      {/* Navigation component - Provides site navigation */}
      <MinimalNav />
      {/* Hero component - Main landing section with call-to-action */}
      <Hero />
    </div>
  );
};

export default Home; 