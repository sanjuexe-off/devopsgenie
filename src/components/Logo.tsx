
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="w-8 h-8 rounded-md bg-devopsgenie-primary flex items-center justify-center">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-white"
      >
        <path d="M21 9V8a2 2 0 0 0-2-2h-6L9 2H5a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h7" />
        <path d="M16 22h4a2 2 0 0 0 2-2v-8" />
        <path d="M18 15h-5" />
        <path d="M18 18h-5" />
        <path d="M9 18H4" />
        <path d="M9 15H4" />
        <path d="M9 12H4" />
        <path d="M9 9H4" />
      </svg>
    </div>
  );
};

export default Logo;
