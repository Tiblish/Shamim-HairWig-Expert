"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Star, MapPin, Award, Users, ShieldCheck, Sparkles } from "lucide-react";
import FeaturedVideoCard, { VideoInfo } from "./FeaturedVideoCard";
import InstagramReelCard, { InstagramPost } from "./InstagramReelCard";
import CinematicMediaModal from "./CinematicMediaModal";
import { trackEvent } from "@/lib/analytics";

import "swiper/css";

// ─── Real Google Reviews ────────────────────────────────────────────
interface GoogleReview {
  id: number;
  name: string;
  location?: string;
  text: string;
  rating: number;
}

const googleReviews: GoogleReview[] = [
  {
    id: 1,
    name: "Sk Akram",
    text: "I was using a hair patch for the last three years, but no centre was able to give me the perfect hairstyle. I am very happy with my new hairstyle according to my face.",
    rating: 5,
  },
  {
    id: 2,
    name: "Praveen Kumar",
    location: "Patna, Bihar",
    text: "Myself Praveen Kumar coming from Patna, Bihar for my hair treatment. Excellent treatment and I am personally very satisfied.",
    rating: 5,
  },
  {
    id: 3,
    name: "Niraj Ray",
    text: "If you want natural results, visit this hair patch centre. Work and behaviour very nice.",
    rating: 5,
  },
  {
    id: 4,
    name: "Md Sajed",
    location: "Jharkhand",
    text: "Very polite behaviour and excellent work.",
    rating: 5,
  },
  {
    id: 5,
    name: "Md Sawaz",
    text: "I got exactly the hairstyle I wanted.",
    rating: 5,
  },
  {
    id: 6,
    name: "Shahnawaz Shaikh",
    text: "Wonderful experience. The team is very welcoming and understands your needs perfectly.",
    rating: 5,
  },
  {
    id: 7,
    name: "Gaurav Kumar",
    text: "Staff behaviour was superb and the technicians are experts.",
    rating: 5,
  },
];

// ─── Instagram posts ─────────────────────────────────────────────────
const instagramPosts: InstagramPost[] = [
  {
    url: "https://www.instagram.com/p/DWeIWiXTkX0/",
    caption: "Meticulous hairline custom mapping and density styling process. View complete restoration.",
    tag: "Lace Fronting",
    thumbnailStyle: {
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #d4af37 100%)",
    },
  },
  {
    url: "https://www.instagram.com/p/DXMiDx2zHCc/",
    caption: "Waterproof bonding test and client styling update. Gym and sweat proof configurations.",
    tag: "Bonding Test",
    thumbnailStyle: {
      background: "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #b3912b 100%)",
    },
  },
  {
    url: "https://www.instagram.com/p/DWvgKJxTMOF/",
    caption: "Crown area restoration before vs after transformation view. Completely natural volumizing.",
    tag: "Crown Thinning",
    thumbnailStyle: {
      background: "linear-gradient(135deg, #090d16 0%, #0f172a 60%, #e5c158 100%)",
    },
  },
  {
    url: "https://www.instagram.com/p/DV-Ibsok4ta/",
    caption: "Grooming and maintenance session highlight. Safe cleaning and re-taping border steps.",
    tag: "Maintenance",
    thumbnailStyle: {
      background: "linear-gradient(135deg, #1f2937 0%, #111827 50%, #d4af37 100%)",
    },
  },
];

// ─── YouTube Shorts ────────────────────────────────────────────────────
const youtubeVideos: VideoInfo[] = [
  {
    url: "https://www.youtube.com/shorts/iOtqfbSkL1E",
    title: "Undetectable Hair Patch Fitting",
    tagline: "Featured Transformation Review",
    desc: "Witness the complete non-surgical hair replacement fitting process and the final natural styled haircut.",
  },
  {
    url: "https://www.youtube.com/shorts/Qm85LZ48wVs",
    title: "Invisible Boundary Blending",
    tagline: "Hairline Detail",
    desc: "Close-up microscopic demonstration of the front lace base blending seamlessly with the scalp skin.",
  },
];

// ─── Trust Metrics Data ────────────────────────────────────────────────
const trustMetrics = [
  {
    icon: <Star className="w-5 h-5 text-gold fill-gold" />,
    value: "4.9",
    label: "Google Rating",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-gold" />,
    value: "255+",
    label: "Verified Reviews",
  },
  {
    icon: <Users className="w-5 h-5 text-gold" />,
    value: "Pan India",
    label: "Clients Served",
  },
  {
    icon: <Sparkles className="w-5 h-5 text-gold" />,
    value: "100%",
    label: "Undetectable Results",
  },
];

// ─── Google "G" SVG Logo ───────────────────────────────────────────────
function GoogleGIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

// ─── Main Component ────────────────────────────────────────────────────
export default function SocialProofSection() {
  const [instaModalOpen, setInstaModalOpen] = useState(false);
  const [selectedInstaIndex, setSelectedInstaIndex] = useState(0);
  const [ytModalOpen, setYtModalOpen] = useState(false);
  const [selectedYtIndex, setSelectedYtIndex] = useState(0);

  const openInstaModal = (index: number) => {
    setSelectedInstaIndex(index);
    setInstaModalOpen(true);
  };

  const openYtModal = (index: number) => {
    setSelectedYtIndex(index);
    setYtModalOpen(true);
    trackEvent("yt_modal_opened", { index });
  };

  return (
    <section className="bg-navy-dark relative overflow-hidden">

      {/* ─── Google Trust Metrics Strip ─────────────────────────── */}
      <div className="border-b border-navy-light/40 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0">
            {trustMetrics.map((metric, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center text-center px-4 sm:px-6 ${
                  idx < trustMetrics.length - 1
                    ? "sm:border-r sm:border-gold/15"
                    : ""
                }`}
              >
                <div className="mb-2">{metric.icon}</div>
                <span className="font-playfair text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {metric.value}
                </span>
                <span className="text-[10px] sm:text-xs text-gold/80 uppercase tracking-[0.2em] font-bold font-inter mt-1">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Section Header ──────────────────────────────────────── */}
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <GoogleGIcon className="w-5 h-5" />
            <span className="font-inter text-xs font-bold text-gold uppercase tracking-[0.25em] bg-gold/10 px-4 py-2 rounded-full border border-gold/15">
              Google Verified Reviews
            </span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-white">
            Real Transformations,{" "}
            <span className="text-gold font-serif italic font-light">Verified Reviews</span>
          </h2>
          <p className="text-gray-300 font-inter text-sm sm:text-base leading-relaxed">
            Hear directly from our clients across India — authentic experiences, genuine voices, real confidence restored.
          </p>
        </div>
      </div>

      {/* ─── Google Reviews Swiper Carousel ─────────────────────── */}
      <div className="pb-16 overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          centeredSlides={false}
          spaceBetween={16}
          slidesPerView={1.15}
          breakpoints={{
            640: {
              slidesPerView: 2.1,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3.2,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 3.5,
              spaceBetween: 28,
            },
          }}
          className="!pl-4 sm:!pl-6 lg:!pl-8 !overflow-visible"
        >
          {googleReviews.map((review) => (
            <SwiperSlide key={review.id} className="pb-4 pt-2 !h-auto">
              <div className="group relative bg-navy rounded-3xl p-6 sm:p-7 border border-gold/10 hover:border-gold/35 transition-all duration-400 hover:shadow-[0_0_24px_rgba(212,175,55,0.12)] h-full flex flex-col justify-between">

                {/* Large background quotation mark */}
                <span className="absolute top-4 right-6 font-playfair text-7xl text-gold/8 leading-none select-none pointer-events-none">
                  &ldquo;
                </span>

                {/* Top Row: Stars + Google logo */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <GoogleGIcon className="w-5 h-5 opacity-80" />
                </div>

                {/* Review Text */}
                <p className="text-gray-200 text-sm leading-relaxed font-inter italic flex-1 mb-5">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Author Details + Badge */}
                <div className="border-t border-navy-light/50 pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-playfair text-base font-bold text-white">
                      {review.name}
                    </h4>
                    {review.location && (
                      <span className="flex items-center space-x-1 text-[10px] text-gold/70 font-inter mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span>{review.location}</span>
                      </span>
                    )}
                  </div>
                  <span className="text-[8px] sm:text-[9px] font-bold text-gold/60 uppercase tracking-widest font-inter text-right leading-tight">
                    Verified<br />Google Review
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ─── Video + Instagram Grid ──────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        {/* Asymmetrical Video + Instagram Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          <div className="lg:col-span-7 h-full">
            <FeaturedVideoCard {...youtubeVideos[0]} />
          </div>

          {/* Instagram Reel Preview Cards stacked */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {instagramPosts.slice(0, 4).map((post, idx) => (
              <InstagramReelCard
                key={idx}
                {...post}
                onClick={() => openInstaModal(idx)}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA Strip */}
        <div className="bg-navy rounded-3xl p-6 sm:p-10 border border-gold/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h4 className="font-playfair text-lg sm:text-xl font-bold text-white">
              Want to see more detailed hairline fittings?
            </h4>
            <p className="text-gray-400 text-xs font-inter leading-relaxed">
              Watch our other detailed close-up videos showing invisible lace-front boundary integrations.
            </p>
          </div>
          <button
            onClick={() => {
              openYtModal(1);
            }}
            className="border border-gold text-gold hover:bg-gold hover:text-navy text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full transition-all duration-300 shadow-md font-inter whitespace-nowrap cursor-pointer"
          >
            Watch Shorts Playlists
          </button>
        </div>
      </div>

      {/* ─── Modals ──────────────────────────────────────────────── */}
      <CinematicMediaModal
        isOpen={instaModalOpen}
        onClose={() => setInstaModalOpen(false)}
        mediaItems={instagramPosts.map((post) => ({
          type: "instagram",
          url: post.url,
          title: post.caption,
          tag: post.tag,
        }))}
        initialIndex={selectedInstaIndex}
        sourceSection="social_proof"
      />

      <CinematicMediaModal
        isOpen={ytModalOpen}
        onClose={() => setYtModalOpen(false)}
        mediaItems={youtubeVideos.map((video) => ({
          type: "youtube",
          url: video.url,
          title: video.title,
          tag: video.tagline,
        }))}
        initialIndex={selectedYtIndex}
        sourceSection="social_proof"
      />
    </section>
  );
}
