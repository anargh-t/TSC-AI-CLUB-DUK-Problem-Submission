import { Link } from "react-router-dom";
import { Lightbulb, Users, Brain } from "lucide-react";

const Hero = () => {
  const features = [
    {
      icon: Lightbulb,
      title: "Innovation Focus",
      description: "AI, ML, Data Science, Computer Vision, NLP, and IoT solutions"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Industry-academic partnership for real-world problem solving"
    },
    {
      icon: Brain,
      title: "Expert Network",
      description: "Access to TCS expertise and DUK's research capabilities"
    }
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-black/70"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx="50%" cy="50%"><stop offset="0%" stop-color="%23000"/><stop offset="100%" stop-color="%23000"/></radialGradient><pattern id="b" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="%2300f" opacity="0.3"/></pattern></defs><rect width="100%" height="100%" fill="url(%23a)"/><rect width="100%" height="100%" fill="url(%23b)"/></svg>')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Network lines overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          TCS AI Club x DUK
        </h1>
        <h2 className="text-2xl md:text-3xl text-white/80 mb-12 font-light">
          Submit Your AI Problem Statement
        </h2>
        
        <Link 
          to="/submit"
          className="inline-block bg-white text-black rounded-full px-8 py-4 text-lg font-semibold shadow-2xl hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 mb-16"
        >
          Get Started
        </Link>

        {/* Feature Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-purple-500/20 text-purple-300 mb-4">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
              <p className="text-sm text-white/70 max-w-xs mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero; 