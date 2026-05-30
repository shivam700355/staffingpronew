import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const dimensions = {
    sm: { logo: 'h-7 w-7', text: 'text-lg' },
    md: { logo: 'h-10 w-10', text: 'text-2xl' },
    lg: { logo: 'h-14 w-14', text: 'text-3xl' }
  }[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`} id="staffingpro-brand-logo">
      {/* SVG rendering custom corporate human figure vector */}
      <svg
        className={`${dimensions.logo} select-none transition-transform duration-300 hover:scale-105`}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Navy Rounded Head */}
        <circle cx="80" cy="38" r="23" fill="#1B2B5E" />
        
        {/* Navy Left Suit Wing */}
        <path
          d="M61 68C32 74 2.5 106 18 124C27 134.5 48.5 146.5 50.5 137C51 135 48.5 119.5 44 110.5C39.5 101.5 31.5 91 38 88.5C44.5 86 52 90 62.5 110.5C73 131 82.5 136 84.5 125.5C86.5 115 76.5 88 71.5 75.5C69 69.5 65.5 67 61 68Z"
          fill="#1B2B5E"
        />

        {/* Green Right Suit Wing */}
        <path
          d="M93.3 67C118 73.1 143 100.3 130 116C122.3 125 104 135.2 102.3 127.2C101.9 125.5 104 112.3 107.8 104.6C111.6 97 118.5 88 113 85.9C107.5 83.8 101 87.2 92 104.6C83 122 75 126.3 73.3 117.3C71.6 108.4 80.1 84.4 84.4 73.7C86.5 68.6 89.5 66.5 93.3 67Z"
          fill="#6ABF45"
        />

        {/* Green Necktie Vector Element */}
        <path
          d="M75.5 76L73 100L80.5 116L88 100L85.5 76H75.5Z"
          fill="#6ABF45"
        />
      </svg>
      {showText && (
        <span className={`font-sans font-bold tracking-tight text-sp-navy ${dimensions.text}`}>
          Staffing<span className="text-sp-green">Pro</span>
        </span>
      )}
    </div>
  );
}
