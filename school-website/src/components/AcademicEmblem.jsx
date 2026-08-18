import React, { forwardRef } from 'react';

// Outer Radial Halo with Triangles pushed away from core
export const AcademicHalo = forwardRef((props, ref) => {
  return (
    <svg
      ref={ref}
      viewBox="0 0 200 200"
      className="absolute inset-0 w-full h-full pointer-events-none"
      {...props}
    >
      <defs>
        <radialGradient id="haloGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Orbit Track */}
      <circle
        cx="100"
        cy="100"
        r="82"
        fill="none"
        stroke="#10B981"
        strokeWidth="1"
        strokeDasharray="4 6"
        className="opacity-30"
      />

      {/* Outward Triangles */}
      <g className="origin-center" style={{ transformOrigin: "100px 100px" }}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
          <g key={index} transform={`rotate(${angle} 100 100)`}>
            <polygon
              points="100,10 94,24 106,24"
              fill="#34D399"
              className="opacity-80"
            />
            <circle cx="100" cy="4" r="2" fill="#6EE7B7" className="opacity-90" />
          </g>
        ))}
      </g>
    </svg>
  );
});

AcademicHalo.displayName = "AcademicHalo";

// Central Core Emblem housing the official School Logo
export const CoreEmblem = forwardRef(({ logoSrc = "/img/logoschool.png", className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`relative z-10 flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full bg-emerald-950/80 border border-emerald-400/50 shadow-[0_0_35px_rgba(16,185,129,0.35)] backdrop-blur-md p-3 overflow-hidden ${className}`}
      {...props}
    >
      <img
        src={logoSrc}
        alt="ZDSPGC Official Logo"
        className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(52,211,153,0.4)]"
      />
    </div>
  );
});

CoreEmblem.displayName = "CoreEmblem";