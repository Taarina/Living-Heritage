import React from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = ({ onScrollToContent }) => {
  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src="https://customer-assets.emergentagent.com/job_archival-spaces/artifacts/gqytg1r1_image.png"
          alt="Rajwada Palace View"
          fetchPriority="high"
          className="w-full h-full object-cover vintage-photo"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>
      
      <div className="relative z-10 text-center text-white px-6 space-y-8 max-w-4xl fade-in-fast">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-none" style={{ textShadow: '2px 2px 12px rgba(0,0,0,0.5)' }}>
          Living Heritage
        </h1>
        
        <p className="text-lg md:text-xl tracking-wider opacity-90" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.5)' }}>
          An Open Digital Archive of Rajwada & Lal Bagh, Indore
        </p>
        
        <p className="text-base md:text-lg tracking-widest opacity-90 handwritten text-xl" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.5)' }}>
          Architecture • Objects • Memory
        </p>
      </div>
      
      <button
        onClick={onScrollToContent}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-white transition-fast"
        aria-label="Scroll to content"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default HeroSection;
