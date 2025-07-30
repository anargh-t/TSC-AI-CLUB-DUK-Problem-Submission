import { Link } from "react-router-dom";
import Logo from "./logo";

const MinimalNav = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-6 absolute top-0 left-0 right-0 z-50">
      <Link to="/">
        <Logo />
      </Link>
      
      <Link 
        to="/submit" 
        className="bg-white text-black rounded-full px-6 py-2 font-semibold shadow-lg hover:bg-gray-200 transition-colors duration-200"
      >
        Submit Problem
      </Link>
    </nav>
  );
};

export default MinimalNav; 