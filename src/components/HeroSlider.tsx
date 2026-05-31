"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import HeroSlide, { HeroSlideProps } from "./HeroSlide";
import TrustMetrics from "./TrustMetrics";
import { Youtube, Instagram, Play, ArrowRight } from "lucide-react";
import CinematicMediaModal from "./CinematicMediaModal";
import { trackEvent } from "@/lib/analytics";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

// Background slides representing the campaign posters
const campaignSlides: HeroSlideProps[] = [
  {
    backgroundImage: "/images/gallery/patch_fitting.png",
    tagline: "Unveiling Elegance",
    title: "Signature Grooming & Hair Restoration",
    description: "Welcome to SHS – Shamim Hair Stylist. Experience the gold standard of non-surgical hair replacement systems, custom-tailored for your distinct style and confidence.",
    ctaText: "Discover Services",
    ctaLink: "/services",
  },
  {
    backgroundImage: "/images/gallery/hair_fade.png",
    tagline: "Natural Aesthetics",
    title: "Undetectable Lace Front Hairlines",
    description: "Meticulously configured hair patch installations matching your exact hair density and texture. Crafted for active lifestyles, workouts, and swimming.",
    ctaText: "View Transformations",
    ctaLink: "/gallery",
  },
  {
    backgroundImage: "/images/gallery/hair_shaved_lines.png",
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
    thumbnailUrl: "/images/gallery/hair_fade.png",
  },
  {
    type: "instagram",
    url: "https://www.instagram.com/p/DWeIWiXTkX0/",
    title: "Hairline custom mapping",
    tag: "Lace Front Detail",
    thumbnailUrl: "/images/gallery/hair_shaved_lines.png",
  },
  {
    type: "youtube",
    url: "https://www.youtube.com/shorts/Qm85LZ48wVs",
    title: "Microscope boundary test",
    tag: "Expert Profiling",
    thumbnailUrl: "/images/gallery/microscope_test.png",
  },
  {
    type: "instagram",
    url: "https://www.instagram.com/p/DXMiDx2zHCc/",
    title: "Grooming & Retaping",
    tag: "Maintenance Step",
    thumbnailUrl: "/images/gallery/grooming_retaping.png",
  },
];

export default function HeroSlider() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const handleCardClick = (item: typeof mediaItems[0], index: number, isActive: boolean, e: React.MouseEvent) => {
    if (!isActive) {
      // Inactive card click is handled by Swiper slideToClickedSlide
      return;
    }
    e.preventDefault();
    setSelectedVideoIndex(index);
    setModalOpen(true);
  };

  const handleCtaCardClick = (isActive: boolean, e: React.MouseEvent) => {
    if (!isActive) return;
    e.preventDefault();
    trackEvent("appointment_cta_clicked", { source: "hero_final_card" });
    router.push("/contact");
  };

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
                Click active to play &bull; Swipe to browse &rarr;
              </span>
            </div>

            {/* Horizontal Swiper Carousel Track */}
            {/* Desktop peeking: 2.4 visible. Mobile peeking: 1.4 visible */}
            <div className="w-full relative select-none">
              <Swiper
                modules={[Autoplay]}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                }}
                speed={5000}
                loop={true}
                centeredSlides={true}
                slideToClickedSlide={true}
                spaceBetween={12}
                slidesPerView={1.4}
                breakpoints={{
                  640: {
                    slidesPerView: 2.2,
                    spaceBetween: 16,
                  },
                  1024: {
                    slidesPerView: 2.4,
                    spaceBetween: 20,
                  }
                }}
                className="media-swiper-container w-full"
              >
                {mediaItems.map((item, idx) => {
                  return (
                    <SwiperSlide key={idx} className="pb-4 pt-2">
                      {({ isActive }) => (
                        <div
                          onClick={(e) => handleCardClick(item, idx, isActive, e)}
                          onMouseEnter={() => {
                            if (isActive) {
                              trackEvent("hero_card_hovered", { title: item.title, index: idx });
                            }
                          }}
                          className={`group relative aspect-[4/5] sm:aspect-[9/16] rounded-3xl overflow-hidden shadow-md border transition-all duration-500 cursor-pointer ${
                            isActive
                              ? "scale-105 opacity-100 shadow-[0_0_15px_rgba(212,175,55,0.25)] border-gold/45"
                              : "scale-95 opacity-65 border-gold/15"
                          }`}
                        >
                          {/* Background Image (Transformation Thumbnail) */}
                          <img
                            src={item.thumbnailUrl}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                          
                          {/* Subtle bottom gradient overlay for text readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none z-10" />
                          
                          {/* Media Card Metadata */}
                          <div className="absolute inset-0 flex flex-col justify-between p-5 z-20">
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
                            <div className={`mx-auto bg-gold/10 backdrop-blur-xs p-3 rounded-full border border-gold/25 transition-all duration-500 ${
                              isActive ? "group-hover:scale-110 group-hover:bg-gold/20 group-hover:border-gold/50" : ""
                            }`}>
                              <Play className={`w-5 h-5 text-gold fill-current ml-0.5 transition-transform duration-500 ${
                                isActive ? "group-hover:rotate-12" : ""
                              }`} />
                            </div>

                            <div>
                              <h4 className="font-playfair text-sm font-bold text-white tracking-wide">
                                {item.title}
                              </h4>
                              <span className="text-[8px] text-gray-300 font-bold uppercase tracking-wider font-inter mt-1 block">
                                Watch Transformation &rarr;
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </SwiperSlide>
                  );
                })}

                {/* FINAL CONVERSION CARD (Endpoint of swipe) */}
                <SwiperSlide className="pb-4 pt-2">
                  {({ isActive }) => (
                    <div
                      onClick={(e) => handleCtaCardClick(isActive, e)}
                      className={`relative aspect-[4/5] sm:aspect-[9/16] rounded-3xl overflow-hidden shadow-md border-2 bg-navy flex flex-col justify-between p-6 text-center transition-all duration-500 cursor-pointer ${
                        isActive
                          ? "scale-105 opacity-100 shadow-[0_0_15px_rgba(212,175,55,0.25)] border-gold/45"
                          : "scale-95 opacity-65 border-gold/15"
                      }`}
                    >
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
                        onClick={(e) => handleCtaCardClick(isActive, e)}
                        className={`w-full flex items-center justify-center space-x-1 border font-bold uppercase tracking-wider text-[9px] py-3 rounded-full transition-all duration-300 shadow-md font-inter ${
                          isActive
                            ? "border-gold text-gold hover:bg-gold hover:text-navy cursor-pointer"
                            : "border-gold/30 text-gold/50 cursor-default"
                        }`}
                      >
                        <span>Book Appointment</span>
                        <ArrowRight className="w-3 h-3 animate-pulse" />
                      </a>
                    </div>
                  )}
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Certification Trust Row Banner */}
      <TrustMetrics />

      {/* Cinematic Modal Player Overlay */}
      <CinematicMediaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mediaItems={mediaItems.map((item) => ({
          type: item.type as "youtube" | "instagram",
          url: item.url,
          title: item.title,
          tag: item.tag,
        }))}
        initialIndex={selectedVideoIndex}
        sourceSection="hero"
      />

      {/* SEO VideoObject JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": mediaItems.map((item) => {
              const isYoutube = item.type === "youtube";
              const videoId = isYoutube ? item.url.split("/shorts/")[1]?.split("?")[0] : "";
              return {
                "@type": "VideoObject",
                "name": item.title,
                "description": `Shamim Hair Stylist transformation clip: ${item.title} (${item.tag}). Discover non-surgical hair replacement results.`,
                "thumbnailUrl": isYoutube 
                  ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` 
                  : "https://shamimhairstylish.com/images/default-reel-poster.jpg",
                "uploadDate": "2026-05-01T08:00:00Z",
                "contentUrl": item.url,
                "embedUrl": isYoutube 
                  ? `https://www.youtube.com/embed/${videoId}` 
                  : `https://www.instagram.com/p/${item.url.split("/p/")[1]?.split("/")[0]}/embed/`
              };
            })
          })
        }}
      />

      {/* SEO Visually Hidden Content (Semantic Search Engines Indexing) */}
      <div className="sr-only">
        <h2>Client Hair Restoration Transformations & Proof Showroom</h2>
        {mediaItems.map((item, idx) => (
          <article key={idx}>
            <h3>{item.title}</h3>
            <p>Grooming transformation tag: {item.tag}</p>
            <p>Verification link on {item.type}: <a href={item.url} rel="nofollow">{item.title} Video</a></p>
          </article>
        ))}
      </div>

    </div>
  );
}
