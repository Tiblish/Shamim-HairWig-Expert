"use client";
import React, { useState, useRef, useEffect } from "react";

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before Treatment",
  afterLabel = "Premium Hair Patch",
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0-100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  // Fallback styling if no images are supplied
  const defaultBeforeStyle = {
    background: "linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)",
  };
  const defaultAfterStyle = {
    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-2xl shadow-xl aspect-[4/3] max-w-xl mx-auto border-2 border-gold/20 ${className}`}
    >
      {/* After Frame (Base layer) */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        {afterImage ? (
          <img
            src={afterImage}
            alt="After treatment"
            className="w-full h-full object-cover pointer-events-none"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-white p-6" style={defaultAfterStyle}>
            <span className="font-playfair text-3xl font-bold text-gold">Thick & Natural Hair</span>
            <p className="text-gray-300 text-xs mt-2 uppercase tracking-widest">Premium Restoration</p>
          </div>
        )}
        <div className="absolute bottom-4 right-4 bg-navy/80 backdrop-blur-sm text-gold px-3 py-1 rounded text-xs font-bold tracking-wide border border-gold/30">
          {afterLabel}
        </div>
      </div>

      {/* Before Frame (Clipped overlay) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          {beforeImage ? (
            <img
              src={beforeImage}
              alt="Before treatment"
              className="w-full h-full object-cover pointer-events-none"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-navy p-6" style={defaultBeforeStyle}>
              <span className="font-playfair text-3xl font-bold text-navy-dark">Thinning/Baldness</span>
              <p className="text-navy-light text-xs mt-2 uppercase tracking-widest font-semibold">Initial Stage</p>
            </div>
          )}
          <div className="absolute bottom-4 left-4 bg-white/90 text-navy px-3 py-1 rounded text-xs font-bold tracking-wide border border-gray-200">
            {beforeLabel}
          </div>
        </div>
      </div>

      {/* Slider Bar/Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-gold cursor-ew-resize flex items-center justify-center group"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute w-8 h-8 bg-gold hover:bg-gold-light rounded-full flex items-center justify-center shadow-lg border border-white cursor-ew-resize transition duration-150">
          <div className="flex space-x-0.5">
            <span className="w-1 h-3 bg-navy rounded-full"></span>
            <span className="w-1 h-3 bg-navy rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
