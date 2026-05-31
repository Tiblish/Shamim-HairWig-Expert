import React from "react";
import FeaturedVideoCard, { VideoInfo } from "./FeaturedVideoCard";
import InstagramReelCard, { InstagramPost } from "./InstagramReelCard";
import TestimonialCard, { Testimonial } from "./TestimonialCard";

// Real customer Instagram review posts templates
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

// YouTube Shorts video review arrays
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

// Testimonial reviews
const testimonials: Testimonial[] = [
  {
    id: 1,
    clientName: "Rajesh K.",
    service: "Custom Hair Patch",
    rating: 5,
    reviewText: "The front hairline is completely invisible. I was highly skeptical initially, but the micro-bonding holds incredibly well during gym workouts.",
  },
  {
    id: 2,
    clientName: "Amit S.",
    service: "Hair Replacement (Lace)",
    rating: 5,
    reviewText: "Totally changed my look and boosted my self-confidence. I can swim, shower, and play sports without any fear of displacement.",
  },
];

export default function SocialProofSection() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="font-inter text-xs font-bold text-gold uppercase tracking-[0.25em] bg-gold/10 px-4 py-2 rounded-full border border-gold/15">
            Social Proof
          </span>
          <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-navy">
            Real Transformations, Verified Reviews
          </h2>
          <p className="text-gray-500 font-inter text-sm sm:text-base leading-relaxed">
            We prioritize visual storytelling. Explore our live client videos, before/after reels, and verified testimonials to see our hairline blending expertise.
          </p>
        </div>

        {/* Asymmetrical Storytelling Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Large Video Card Anchor (Left 7 Columns) */}
          <div className="lg:col-span-7 h-full">
            <FeaturedVideoCard {...youtubeVideos[0]} />
          </div>

          {/* Client Testimonial Cards stack (Right 5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 h-full">
            {testimonials.map((test) => (
              <TestimonialCard key={test.id} {...test} />
            ))}
          </div>

        </div>

        {/* Supporting Instagram Reels Preview Cards Grid */}
        <div className="border-t border-gray-150 pt-16">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 gap-4">
            <div>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-navy">
                Instagram Showcases
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                Browse transformation clips and clinic highlights directly from our feed.
              </p>
            </div>
            <a
              href="https://www.instagram.com/p/DWeIWiXTkX0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-gold hover:text-gold-dark border-b border-gold pb-0.5 inline-block font-inter"
            >
              Follow @ShamimHairStylish &rarr;
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {instagramPosts.map((post, idx) => (
              <InstagramReelCard key={idx} {...post} />
            ))}
          </div>
        </div>

        {/* Optional Secondary Video (YouTube Shorts Grid placeholder) */}
        <div className="mt-16 bg-cream rounded-3xl p-6 sm:p-10 border border-gray-150 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h4 className="font-playfair text-lg sm:text-xl font-bold text-navy">
              Want to see more detailed hairline fittings?
            </h4>
            <p className="text-gray-500 text-xs font-inter leading-relaxed">
              Watch our other detailed close-up videos showing invisible lace-front boundary integrations.
            </p>
          </div>
          <a
            href="https://www.youtube.com/shorts/Qm85LZ48wVs"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-navy hover:bg-navy-light text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full border border-gold/20 shadow-md inline-block font-inter whitespace-nowrap"
          >
            Watch Shorts Playlists
          </a>
        </div>

      </div>
    </section>
  );
}
