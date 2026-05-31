"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import HeroSlide, { HeroSlideProps } from "./HeroSlide";
import TrustMetrics from "./TrustMetrics";
import { Youtube, Instagram, Play, ArrowRight, MessageSquare } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

// Background slides representing the campaign posters
const campaignSlides: HeroSlideProps[] = [
  {
    tagline: "Unveiling Elegance",
    title: "Signature Grooming & Hair Restoration",
    description: "Welcome to SHS – Shamim Hair Stylish. Experience the gold standard of non-surgical hair replacement systems, custom-tailored for your distinct style and confidence.",
    ctaText: "Discover Services",
    ctaLink: "/services",
  },
  {
    tagline: "Natural Aesthetics",
    title: "Undetectable Lace Front Hairlines",
    description: "Meticulously configured hair patch installations matching your exact hair density and texture. Crafted for active lifestyles, workouts, and swimming.",
    ctaText: "View Transformations",
    ctaLink: "/gallery",
  },
  {
    tagline: "Personalized Grooming",
    title: "Schedule Your Micro-Scalp Scan",
    description: "Meet our top restoration specialists for a detailed scalp analysis and custom density profiling. Start your confidence transformation today.",
    ctaText: "Book In-Clinic",
    ctaLink: "/contact",
  },
];

// Carousel items containing YouTube Shorts and Instagram reels
const mediaItems = [
  {
    type: "youtube",
    url: "https://www.youtube.com/shorts/iOtqfbSkL1E",
    title: "Undetectable Patch fitting",
    tag: "Transformation Clip",
    bgGradient: "from-red-950 via-slate-900 to-black",
  },
  {
    type: "instagram",
    url: "https://www.instagram.com/p/DWeIWiXTkX0/",
    title: "Hairline custom mapping",
    tag: "Lace Front Detail",
    bgGradient: "from-blue-950 via-slate-900 to-black",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/shorts/Qm85LZ48wVs",
    title: "Microscope boundary test",
    tag: "Expert Profiling",
    bgGradient: "from-amber-950 via-slate-900 to-black",
  },
  {
    type: "instagram",
    url: "https://www.instagram.com/p/DXMiDx2zHCc/",
    title: "Grooming & Retaping",
    tag: "Maintenance Step",
    bgGradient: "from-emerald-950 via-slate-900 to-black",
  },
];

export default function HeroSlider() {
  return (
    <div className="relative w-full min-h-[100svh] bg-navy-dark flex flex-col justify-between overflow-hidden">
      
      {/* Background Slideshow (Fades campaign posters) */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={2000}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="h-full w-full"
        >
          {campaignSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <HeroSlide {...slide} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* OVERLAY ELEMENTS (Staggered over the slides) */}
      {/* 1. Transparent gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/95 via-navy-dark/40 to-transparent pointer-events-none z-10" />

      {/* 2. Floating Storytelling Media Carousel (Overlapping viewports) */}
      {/* Desktop: lower-right absolute placement. Mobile: Bottom thumb-zone placement */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-auto mb-16 sm:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Column spacer to push carousel to the right */}
          <div className="hidden lg:block lg:col-span-6" />
          
          {/* Swipable Media Carousel Container */}
          <div className="col-span-1 lg:col-span-6 space-y-4 w-full">
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] font-inter">
                Swipe Transformations ✦ Proof
              </span>
              <span className="text-[9px] text-gray-400 font-bold uppercase font-inter hidden sm:inline-block">
                Drag to swipe &rarr;
              </span>
            </div>

            {/* Horizontal Snap Scroll Track */}
            {/* Desktop peeking: 1.3 visible. Mobile peeking: 1.1 visible */}
            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none space-x-4 pb-2 scroll-smooth touch-pan-x">
              
              {mediaItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[80%] sm:w-[50%] lg:w-[45%] snap-start snap-always"
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group relative aspect-[9/16] rounded-3xl overflow-hidden shadow-lg border border-gold/10 hover:border-gold/30 transition-all duration-500 bg-navy-dark"
                  >
                    {/* Floating object styling - custom overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-b ${item.bgGradient} opacity-90 transition-transform duration-700 group-hover:scale-105`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent pointer-events-none" />
                    
                    {/* Media Card Metadata */}
                    <div className="absolute inset-0 flex flex-col justify-between p-5 z-10">
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] font-bold text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/15 uppercase tracking-widest font-inter">
                          {item.tag}
                        </span>
                        {item.type === "youtube" ? (
                          <Youtube className="w-4 h-4 text-red-500 fill-current" />
                        ) : (
                          <Instagram className="w-4 h-4 text-white" />
                        )}
                      </div>

                      {/* Play Action Badge */}
                      <div className="mx-auto bg-gold/10 backdrop-blur-xs p-3 rounded-full border border-gold/25 group-hover:scale-115 transition duration-300">
                        <Play className="w-5 h-5 text-gold fill-current ml-0.5" />
                      </div>

                      <div>
                        <h4 className="font-playfair text-sm font-bold text-white tracking-wide">
                          {item.title}
                        </h4>
                        <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider font-inter mt-1 block">
                          Watch Transformation &rarr;
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              ))}

              {/* FINAL CONVERSION CARD (Endpoint of swipe) */}
              <div className="flex-shrink-0 w-[80%] sm:w-[50%] lg:w-[45%] snap-start snap-always">
                <div className="relative aspect-[9/16] rounded-3xl overflow-hidden shadow-lg border-2 border-gold/25 bg-navy flex flex-col justify-between p-6 z-10 text-center">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-navy-dark to-navy-dark pointer-events-none" />
                  
                  <span className="text-[8px] font-bold text-gold uppercase tracking-[0.2em] font-inter">
                    Your Turn
                  </span>

                  <div className="my-auto space-y-4">
                    <h4 className="font-playfair text-xl font-bold text-white tracking-tight">
                      Ready for your transformation?
                    </h4>
                    <p className="text-gray-400 text-[10px] font-inter leading-relaxed px-2">
                      Natural hairlines. Real confidence. Private clinic consultation.
                    </p>
                  </div>

                  <a
                    href="/contact"
                    className="w-full flex items-center justify-center space-x-1 border border-gold text-gold hover:bg-gold hover:text-navy font-bold uppercase tracking-wider text-[9px] py-3 rounded-full transition-all duration-300 shadow-md font-inter"
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Certification Trust Row Banner */}
      <TrustMetrics />

    </div>
  );
}
