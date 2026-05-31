import React from "react";

interface VideoEmbedSectionProps {
  videoId?: string; // YouTube ID e.g. "dQw4w9WgXcQ"
  title?: string;
  description?: string;
}

export default function VideoEmbedSection({
  videoId = "ScMzIvxBSi4", // Use a generic/placeholder premium hair patch showcase if needed
  title = "Witness the Transformation",
  description = "Watch how our specialists meticulously install and custom style a premium hair patch, giving our client a completely natural look and boosting their confidence.",
}: VideoEmbedSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-navy mb-4">
          {title}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-sm sm:text-base">
          {description}
        </p>
        
        {/* Responsive Video Container */}
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-gold/10 max-w-3xl mx-auto">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
