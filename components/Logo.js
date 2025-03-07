import React from 'react';

export default function Logo({ size = 'medium', light = false, className = '' }) {
  // Size variants with larger options for hero display
  const sizes = {
    small: {
      container: 'h-10',
      space: 'text-base px-2 py-1',
      seven: 'text-base px-2 py-1 ml-1.5',
      tagline: 'text-[0.6rem] tracking-wider'
    },
    medium: {
      container: 'h-14',
      space: 'text-xl px-3 py-1.5',
      seven: 'text-xl px-3 py-1.5 ml-2',
      tagline: 'text-sm tracking-wider'
    },
    large: {
      container: 'h-20',
      space: 'text-2xl px-4 py-2', 
      seven: 'text-2xl px-4 py-2 ml-2.5',
      tagline: 'text-base tracking-wider'
    },
    // Added hero size for extreme large display in hero section
    hero: {
      container: 'h-36',
      space: 'text-5xl md:text-6xl px-6 py-3',
      seven: 'text-5xl md:text-6xl px-6 py-3 ml-3',
      tagline: 'text-xl tracking-widest mt-2'
    }
  };
  
  // Get correct size class
  const sizeClass = sizes[size] || sizes.medium;
  
  // Set color mode
  const colorMode = light ? {
    space: 'bg-black text-white',
    seven: 'bg-white text-black',
    tagline: 'text-white/80'
  } : {
    space: 'bg-white text-black',
    seven: 'bg-black text-white',
    tagline: 'text-black/80'
  };
  
  return (
    <div className={`flex flex-col items-start ${sizeClass.container} ${className}`}>
      <div className="flex items-center">
        <span className={`font-bold ${colorMode.space} ${sizeClass.space}`}>
          SPACE
        </span>
        <span className={`font-bold ${colorMode.seven} ${sizeClass.seven}`}>
          SEVEN
        </span>
      </div>
      <span className={`${colorMode.tagline} ${sizeClass.tagline} font-light`}>
        THE FITNESS CLUB
      </span>
    </div>
  );
} 