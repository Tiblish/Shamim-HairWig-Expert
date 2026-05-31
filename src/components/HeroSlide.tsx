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
  const defaultBackground = "linear-gradient(135deg, #0b0c10 0%, #0f172a 100%)";

  return (
    <div className="relative w-full h-full flex items-start pt-24 sm:items-center sm:pt-0 overflow-hidden bg-navy-dark">
      {/* Background Image Layer */}
      {backgroundImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] scale-105"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-[10000ms] scale-105"
          style={{ background: defaultBackground }}
        />
      )}

      {/* Cinematic dark gradient overlay for text legibility and fashion aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy-dark/70 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/30 to-transparent pointer-events-none" />

      {/* Left-Aligned Staggered Content Area */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="max-w-2xl text-left space-y-4 sm:space-y-8 pl-0 sm:pl-8">
          
          {/* Tagline */}
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-gold bg-gold/10 px-4 py-2 rounded-full border border-gold/20 font-inter animate-fade-in-up delay-100">
            {tagline}
          </span>
          
          {/* Headline */}
          <h1 className="font-playfair text-3xl sm:text-7xl font-extrabold text-white leading-tight animate-fade-in-up delay-200 tracking-tight">
            {title}
          </h1>
          
          {/* Description */}
          <p className="text-gray-300 text-xs sm:text-lg font-inter leading-relaxed max-w-xl animate-fade-in-up delay-300 line-clamp-2 sm:line-clamp-none hidden sm:block">
            {description}
          </p>

          {/* Ghost CTA Button */}
          <div className="pt-2 sm:pt-4 animate-fade-in-up delay-400 hidden sm:block">
            <Link
              href={ctaLink}
              className="inline-flex items-center space-x-2 border-2 border-gold text-gold hover:bg-gold hover:text-navy font-bold uppercase tracking-wider text-[10px] sm:text-xs px-6 py-3.5 sm:px-8 sm:py-4 rounded-full transition-all duration-500 shadow-md hover:shadow-xl font-inter group"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>

  );
}
