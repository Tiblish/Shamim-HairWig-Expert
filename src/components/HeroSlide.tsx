import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface HeroSlideProps {
  backgroundImage?: string;
  tagline: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export default function HeroSlide({
  backgroundImage,
  tagline,
  title,
  description,
  ctaText,
  ctaLink,
}: HeroSlideProps) {
  // Luxury background placeholders if no custom image is injected
  const defaultBackground = "linear-gradient(rgba(15, 23, 42, 0.6), rgba(9, 13, 22, 0.95))";

  return (
    <div className="relative w-full h-[85vh] sm:h-screen flex items-center justify-center overflow-hidden bg-navy-dark">
      {/* Background Image Layer */}
      {backgroundImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] scale-105"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-[8000ms] scale-105"
          style={{ background: defaultBackground }}
        />
      )}

      {/* Cinematic dark gradient overlay for enhanced readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/40 via-navy-dark/60 to-navy-dark/95 pointer-events-none" />

      {/* Layered Content */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8 z-10">
        <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-gold bg-gold/10 px-4 py-2 rounded-full border border-gold/20 font-inter">
          {tagline}
        </span>
        
        <h1 className="font-playfair text-4xl sm:text-7xl font-extrabold text-white leading-tight max-w-4xl mx-auto">
          {title}
        </h1>
        
        <p className="text-gray-300 text-sm sm:text-lg max-w-2xl mx-auto font-inter leading-relaxed">
          {description}
        </p>

        {/* Ghost CTA Button */}
        <div className="pt-4">
          <Link
            href={ctaLink}
            className="inline-flex items-center space-x-2 border-2 border-gold text-gold hover:bg-gold hover:text-navy font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-full transition-all duration-500 shadow-md hover:shadow-xl font-inter group"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}
