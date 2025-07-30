import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className, size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl", 
    lg: "text-2xl"
  };

  const imageSizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24", 
    lg: "w-32 h-32"
  };

  return (
    <div className={cn("flex items-center space-x-4", className)}>
      {/* TCS AI Club Logo */}
      <a 
        href="https://aiclub-425152380784.us-central1.run.app/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:opacity-80 transition-opacity duration-200"
      >
        <img 
          src="/tcs_ai_club_logo.png" 
          alt="TCS AI Club" 
          className={cn("object-contain cursor-pointer", imageSizeClasses[size])}
        />
      </a>
      
      {/* Partnership Separator */}
      <div className="w-px h-10 bg-white/20" />
      
      {/* DUK Logo */}
      <a 
        href="https://duk.ac.in/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:opacity-80 transition-opacity duration-200"
      >
        <img 
          src="/duk_logo.png" 
          alt="Digital University Kerala" 
          className={cn("object-contain cursor-pointer", imageSizeClasses[size])}
        />
      </a>
    </div>
  );
};

export default Logo; 