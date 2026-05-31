"use client";
import React from "react";

export default function AnnouncementBar() {
  const tickerText = "✦ NATURAL HAIRLINE DESIGN ✦ NON-SURGICAL HAIR RESTORATION ✦ SAME DAY FITTING AVAILABLE ✦ PRIVATE CONSULTATION ✦ WHATSAPP BOOKING OPEN ✦ CUSTOM HAIR SYSTEM EXPERTS ✦ ";

  return (
    <div className="relative w-full bg-navy text-gold overflow-hidden py-2 border-b border-gold/10 select-none h-9 flex items-center">
      {/* Premium left/right edge fade mask overlays */}
      <div className="absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-navy to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-navy to-transparent pointer-events-none z-10"></div>

      {/* Scrolling container */}
      <div className="flex w-full overflow-hidden whitespace-nowrap">
        {/* We use two identical elements moving left. As the first finishes (shifts by -100%), the second seamlessly repeats. */}
        <div className="animate-marquee flex whitespace-nowrap text-xs font-semibold uppercase tracking-wider font-inter">
          <span className="px-4">{tickerText}</span>
          <span className="px-4">{tickerText}</span>
        </div>
        <div className="animate-marquee flex whitespace-nowrap text-xs font-semibold uppercase tracking-wider font-inter">
          <span className="px-4">{tickerText}</span>
          <span className="px-4">{tickerText}</span>
        </div>
      </div>
    </div>
  );
}
