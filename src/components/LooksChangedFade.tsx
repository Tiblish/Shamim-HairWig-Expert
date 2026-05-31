"use client";
import React, { useState, useEffect } from "react";

interface CaseImage {
  url?: string;
  label: string;
  style: any;
}

interface LooksChangedFadeProps {
  beforeLabel?: string;
  afterLabel?: string;
  beforeImage?: string;
  afterImage?: string;
}

export default function LooksChangedFade({
  beforeLabel = "Crown Thinning",
  afterLabel = "SHS Luxury Restoration",
  beforeImage,
  afterImage,
}: LooksChangedFadeProps) {
  const [showAfter, setShowAfter] = useState(false);

  // Set up repeating interval to transition between before and after images
  useEffect(() => {
    const interval = setInterval(() => {
      setShowAfter((prev) => !prev);
    }, 4500); // Cross-fade every 4.5 seconds
    return () => clearInterval(interval);
  }, []);

  const defaultBeforeStyle = {
    background: "linear-gradient(135deg, #475569 0%, #1e293b 100%)",
  };
  
  const defaultAfterStyle = {
    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
  };

  return (
    <div className="relative aspect-[4/3] w-full max-w-xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-gold/15 bg-navy-dark">
      {/* Before Image (Fade Out) */}
      <div
        className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center transition-opacity duration-1500 ease-in-out ${
          showAfter ? "opacity-0" : "opacity-100"
        }`}
      >
        {beforeImage ? (
          <img
            src={beforeImage}
            alt="Before"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center" style={defaultBeforeStyle}>
            <span className="font-playfair text-3xl font-extrabold text-gray-300">Initial Hair Loss</span>
            <p className="text-gold text-xs uppercase tracking-widest font-semibold mt-2">{beforeLabel}</p>
          </div>
        )}
        <div className="absolute bottom-6 left-6 bg-navy-dark/80 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-md z-20 border border-navy-light/40">
          Before: {beforeLabel}
        </div>
      </div>

      {/* After Image (Fade In) */}
      <div
        className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center transition-opacity duration-1500 ease-in-out ${
          showAfter ? "opacity-100" : "opacity-0"
        }`}
      >
        {afterImage ? (
          <img
            src={afterImage}
            alt="After"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center" style={defaultAfterStyle}>
            <span className="font-playfair text-3xl font-extrabold text-gold">Premium Volume & Style</span>
            <p className="text-white/80 text-xs uppercase tracking-widest font-semibold mt-2">{afterLabel}</p>
          </div>
        )}
        <div className="absolute bottom-6 right-6 bg-gold text-navy text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-md z-20 border border-white/20">
          After: {afterLabel}
        </div>
      </div>

      {/* Subtle indicator dots */}
      <div className="absolute top-6 right-6 flex space-x-2 z-20 bg-black/30 backdrop-blur-xs px-3 py-1.5 rounded-full">
        <span
          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            !showAfter ? "bg-white" : "bg-white/30"
          }`}
        />
        <span
          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            showAfter ? "bg-gold" : "bg-white/30"
          }`}
        />
      </div>
    </div>
  );
}
