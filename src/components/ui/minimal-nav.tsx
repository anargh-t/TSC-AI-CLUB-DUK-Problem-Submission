import { Link } from "react-router-dom";
import Logo from "./logo";

const MinimalNav = () => {
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden sm:flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 sm:py-6 absolute top-0 left-0 right-0 z-50">
        <Link to="/" className="flex-shrink-0">
          <Logo />
        </Link>
        
        <Link 
          to="/submit" 
          className="bg-white text-black rounded-full px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold shadow-lg hover:bg-gray-200 transition-colors duration-200 whitespace-nowrap"
        >
          Submit Problem
        </Link>
      </nav>

      {/* Mobile Navigation - Centered Logo */}
      <nav className="sm:hidden flex justify-center items-center px-4 py-4 absolute top-0 left-0 right-0 z-50">
        <Link to="/" className="flex-shrink-0">
          <Logo />
        </Link>
      </nav>

      {/* Mobile Fixed Submit Button */}
      <div className="sm:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <Link 
          to="/submit" 
          className="bg-white text-black rounded-full px-6 py-3 text-base font-semibold shadow-lg hover:bg-gray-200 transition-colors duration-200 whitespace-nowrap"
        >
          Submit Problem
        </Link>
      </div>
    </>
  );
};

export default MinimalNav; 