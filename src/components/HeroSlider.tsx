"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import HeroSlide, { HeroSlideProps } from "./HeroSlide";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

// Scalable template slides to allow injection of custom images later
const defaultSlides: HeroSlideProps[] = [
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

interface HeroSliderProps {
  slides?: HeroSlideProps[];
}

export default function HeroSlider({ slides = defaultSlides }: HeroSliderProps) {
  return (
    <div className="relative w-full h-[85vh] sm:h-screen bg-navy-dark">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1500}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".custom-swiper-pagination",
        }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <HeroSlide {...slide} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Styled Swiper pagination container matching luxury branding */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center pointer-events-none">
        <div className="custom-swiper-pagination flex space-x-2 pointer-events-auto bg-navy-dark/40 backdrop-blur-xs px-4 py-2 rounded-full border border-white/5" />
      </div>

      {/* Pagination bullet overrides styling (inserted in custom classes or global CSS) */}
      <style jsx global>{`
        .custom-swiper-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.4);
          opacity: 1;
          transition: all 0.3s ease;
          border-radius: 50%;
        }
        .custom-swiper-pagination .swiper-pagination-bullet-active {
          background: #d4af37 !important;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
