import React from "react";
import { Instagram, ArrowUpRight } from "lucide-react";

export interface InstagramPost {
  url: string;
  caption: string;
  thumbnailStyle: any; // Fallback gradient styling
  tag: string;
}

export default function InstagramReelCard({
  url,
  caption,
  thumbnailStyle,
  tag,
}: InstagramPost) {
  // Fallback styling if no custom image is supplied
  const defaultBg = {
    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
  };

  return (
    <div className="group relative rounded-3xl overflow-hidden aspect-[9/16] max-w-[280px] mx-auto shadow-lg border border-gold/15 bg-navy-dark hover:shadow-2xl transition-all duration-500">
      
      {/* Background/Thumbnail Layer */}
      <div
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={thumbnailStyle || defaultBg}
      />

      {/* Dimmed glassmorphism overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-navy-dark/90 pointer-events-none" />

      {/* Content positioning */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
        
        {/* Top Tag & Icon */}
        <div className="flex justify-between items-start">
          <span className="text-[9px] font-bold text-gold bg-gold/10 px-2.5 py-1 rounded-full border border-gold/20 uppercase tracking-widest font-inter">
            {tag}
          </span>
          <Instagram className="w-5 h-5 text-white/80" />
        </div>

        {/* Bottom Details & CTA Link */}
        <div className="space-y-4">
          <p className="text-white text-xs leading-relaxed font-inter line-clamp-3">
            {caption}
          </p>
          
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center space-x-1.5 border border-white/20 hover:border-gold hover:text-gold text-white text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-full transition duration-300 bg-white/5 backdrop-blur-xs"
          >
            <span>View on Instagram</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
