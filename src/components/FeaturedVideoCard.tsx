import React from "react";
import { Youtube } from "lucide-react";

export interface VideoInfo {
  url: string;
  title: string;
  tagline: string;
  desc: string;
}

export default function FeaturedVideoCard({
  url,
  title,
  tagline,
  desc,
}: VideoInfo) {
  // Convert standard and Shorts URLs into proper iframe embed links
  const getEmbedUrl = (videoUrl: string): string => {
    if (videoUrl.includes("/shorts/")) {
      const parts = videoUrl.split("/shorts/");
      const videoId = parts[1]?.split("?")[0]?.split("/")[0];
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
    }
    if (videoUrl.includes("watch?v=")) {
      const parts = videoUrl.split("watch?v=");
      const videoId = parts[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
    }
    return videoUrl;
  };

  const embedUrl = getEmbedUrl(url);

  return (
    <div className="bg-navy rounded-3xl overflow-hidden shadow-xl border border-gold/15 p-6 sm:p-8 flex flex-col justify-between h-full">
      {/* Video Description Headers */}
      <div className="space-y-3 mb-6">
        <span className="inline-flex items-center space-x-1.5 text-[10px] font-bold text-gold uppercase tracking-wider bg-gold/10 px-3 py-1 rounded-full border border-gold/15">
          <Youtube className="w-3.5 h-3.5 text-red-500 fill-current" />
          <span>{tagline}</span>
        </span>
        <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white">
          {title}
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-inter">
          {desc}
        </p>
      </div>

      {/* Embed Iframe Container */}
      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-inner border border-navy-light/60 bg-navy-dark">
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy" // Native browser lazy loading
        ></iframe>
      </div>
    </div>
  );
}
