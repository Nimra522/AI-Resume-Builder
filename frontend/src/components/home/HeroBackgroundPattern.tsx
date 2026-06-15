import React from 'react';

export const HeroBackgroundPattern: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-100">
      <svg
        className="h-full w-full"
        viewBox="0 0 900 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lineGlow" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <g stroke="url(#lineGlow)" strokeWidth="1.8" strokeLinecap="round">
          <path d="M-40 120C150 40 330 60 470 150S740 260 940 170" />
          <path d="M-20 220C180 130 350 150 500 240S760 360 940 270" />
          <path d="M60 320C250 240 420 260 560 340S780 430 940 350" />
          <path d="M140 420C300 340 470 350 620 430S820 520 940 440" />
        </g>

        <g fill="#6366f1" fillOpacity="0.16">
          <circle cx="190" cy="110" r="4.5" />
          <circle cx="360" cy="210" r="4" />
          <circle cx="540" cy="150" r="4.5" />
          <circle cx="680" cy="270" r="4" />
          <circle cx="450" cy="385" r="4.5" />
        </g>
      </svg>
    </div>
  );
};
