"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Play, AlertCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface MediaItem {
  type: "youtube" | "instagram";
  url: string;
  title?: string;
  tag?: string;
  bgGradient?: string;
}

interface CinematicMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaItems: MediaItem[];
  initialIndex: number;
  sourceSection?: "hero" | "social_proof";
}

export default function CinematicMediaModal({
  isOpen,
  onClose,
  mediaItems,
  initialIndex,
  sourceSection = "hero",
}: CinematicMediaModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [hasErrorOrTimeout, setHasErrorOrTimeout] = useState(false);
  
  // Touch Gestures State
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [translateY, setTranslateY] = useState(0);
  const [isDraggingDown, setIsDraggingDown] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isIframeLoadedRef = useRef(false);

  // Sync index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setTranslateY(0);
      setIsDraggingDown(false);
      trackOpenEvent(initialIndex);
    }
  }, [isOpen, initialIndex]);

  // Handle video change (preloader, error timers, analytics)
  useEffect(() => {
    if (!isOpen || mediaItems.length === 0) return;

    setIsIframeLoaded(false);
    isIframeLoadedRef.current = false;
    setHasErrorOrTimeout(false);

    // Track analytics for video start
    const activeItem = mediaItems[currentIndex];
    trackEvent("transformation_video_watched", {
      title: activeItem.title || "Untitled",
      url: activeItem.url,
      index: currentIndex,
      section: sourceSection,
      progress: "started",
    });

    // Timeout detection for blocked embeds (e.g. adblockers blocking Instagram)
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (!isIframeLoadedRef.current) {
        setHasErrorOrTimeout(true);
      }
    }, 4500); // 4.5 seconds timeout threshold

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, isOpen, mediaItems, sourceSection]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, mediaItems]);

  if (!isOpen || mediaItems.length === 0) return null;

  const activeItem = mediaItems[currentIndex];

  const trackOpenEvent = (index: number) => {
    const item = mediaItems[index];
    trackEvent(`${sourceSection}_card_opened`, {
      title: item.title || "Untitled",
      url: item.url,
      index,
    });
  };

  const handleClose = () => {
    trackEvent("media_modal_closed", {
      lastIndex: currentIndex,
      section: sourceSection,
    });
    onClose();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  // Convert URLs to Embed Format
  const getEmbedUrl = (item: MediaItem): string => {
    if (item.type === "youtube") {
      const parts = item.url.split("/shorts/");
      const videoId = parts[1]?.split("?")[0]?.split("/")[0];
      // Autoplay, mute, loop, and playsinline are critical for Shorts immersion
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&rel=0&modestbranding=1&playsinline=1`;
    } else {
      // Instagram Reels
      const parts = item.url.split("/p/");
      const postId = parts[1]?.split("/")[0];
      return `https://www.instagram.com/p/${postId}/embed/captioned/?cr=1&v=12`;
    }
  };

  // Get high-res poster images for YouTube or abstract fallback gradient
  const getThumbnailUrl = (item: MediaItem): string => {
    if (item.type === "youtube") {
      const parts = item.url.split("/shorts/");
      const videoId = parts[1]?.split("?")[0]?.split("/")[0];
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    return ""; // Empty for Instagram fallback
  };

  const activeEmbedUrl = getEmbedUrl(activeItem);

  // Touch handlers for swipe controls
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const diffX = e.touches[0].clientX - touchStart.x;
    const diffY = e.touches[0].clientY - touchStart.y;

    // Detect vertical drag down for closing (ignore small horizontal movement)
    if (diffY > 10 && Math.abs(diffY) > Math.abs(diffX)) {
      setIsDraggingDown(true);
      setTranslateY(diffY);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const diffX = e.changedTouches[0].clientX - touchStart.x;
    const diffY = e.changedTouches[0].clientY - touchStart.y;

    if (isDraggingDown) {
      if (diffY > 150) {
        // Enforce intentional drag down threshold of 150px
        handleClose();
      } else {
        // Snap back to position
        setTranslateY(0);
      }
      setIsDraggingDown(false);
    } else {
      // Horizontal swipe controls (require > 50px offset)
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 60) {
        if (diffX > 0) {
          handlePrev();
        } else {
          handleNext();
        }
      }
    }
    setTouchStart(null);
  };

  // Preloading indices
  const prevIdx = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
  const nextIdx = (currentIndex + 1) % mediaItems.length;
  const prevThumb = getThumbnailUrl(mediaItems[prevIdx]);
  const nextThumb = getThumbnailUrl(mediaItems[nextIdx]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-300">
      
      {/* 1. Preload Thumbnails in Hidden DOM Container */}
      <div className="hidden">
        {prevThumb && <img src={prevThumb} alt="preload-prev" />}
        {nextThumb && <img src={nextThumb} alt="preload-next" />}
      </div>

      {/* Close Background Click Area */}
      <div className="absolute inset-0 cursor-default" onClick={handleClose} />

      {/* Modal Wrapper Container */}
      <div 
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateY(${translateY}px)`,
          transition: isDraggingDown ? "none" : "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="relative z-10 w-full max-w-[420px] px-4 md:px-0 flex flex-col items-center h-[85svh] md:h-[80svh] transition-all duration-300"
      >
        
        {/* Top Header Row inside Modal */}
        <div className="w-full flex justify-between items-center mb-3 text-white">
          <div>
            <span className="text-[10px] font-bold text-gold uppercase tracking-widest font-inter">
              {activeItem.tag || "Client Proof"}
            </span>
            <h3 className="font-playfair text-base font-bold truncate max-w-[280px]">
              {activeItem.title || "Hair Restoration Showcase"}
            </h3>
          </div>
          
          <button 
            onClick={handleClose}
            className="bg-navy/80 hover:bg-gold/20 p-2 rounded-full border border-white/10 hover:border-gold/30 text-white transition-all duration-300"
            aria-label="Close cinematic player"
          >
            <X className="w-4 h-4 text-gold" />
          </button>
        </div>

        {/* Video Screen container (9:16 Aspect ratio box) */}
        <div className="w-full flex-1 relative bg-navy-dark rounded-3xl overflow-hidden shadow-2xl border border-gold/20 flex flex-col justify-center items-center">
          
          {/* Iframe Loading Placeholder */}
          {!isIframeLoaded && !hasErrorOrTimeout && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy-dark z-20 space-y-4">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute w-full h-full border-2 border-gold/20 rounded-full"></div>
                <div className="absolute w-full h-full border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-[10px] uppercase font-bold text-gold/60 tracking-wider font-inter">
                Configuring Showroom...
              </p>
            </div>
          )}

          {/* Adblock / Error Fallback UI */}
          {hasErrorOrTimeout && (
            <div className="absolute inset-0 flex flex-col justify-between p-8 bg-navy z-30 text-center border-2 border-red-500/20 rounded-3xl">
              <div className="absolute inset-0 bg-radial-gradient from-red-500/5 via-navy-dark to-navy-dark pointer-events-none" />
              
              <div className="mt-8 flex flex-col items-center space-y-3">
                <AlertCircle className="w-10 h-10 text-red-500 animate-pulse" />
                <span className="text-[9px] font-bold text-red-400 bg-red-950/20 px-3 py-1 rounded border border-red-900/30 uppercase tracking-widest font-inter">
                  Connection Error / Ad-blocker
                </span>
                <h4 className="font-playfair text-lg font-bold text-white leading-snug">
                  Embed Restrained By Browser
                </h4>
                <p className="text-gray-400 text-xs font-inter leading-relaxed">
                  Your adblocker or security filter has restricted this social media iframe. You can view the original video directly.
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <a
                  href={activeItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("fallback_media_clicked", { url: activeItem.url, title: activeItem.title })}
                  className="w-full flex items-center justify-center space-x-2 bg-gold hover:bg-gold-light text-navy font-bold uppercase tracking-wider text-[10px] py-3 rounded-full transition-all duration-300 shadow-md font-inter"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch on {activeItem.type === "youtube" ? "YouTube" : "Instagram"}</span>
                </a>
                
                <button
                  onClick={() => {
                    setIsIframeLoaded(false);
                    setHasErrorOrTimeout(false);
                    // Force refresh
                    setCurrentIndex(currentIndex);
                  }}
                  className="text-[9px] text-gray-400 uppercase font-bold tracking-wider hover:text-gold transition-colors duration-300 underline"
                >
                  Attempt Reload
                </button>
              </div>
            </div>
          )}

          {/* Actual Embedded Video Iframe */}
          <iframe
            src={activeEmbedUrl}
            title={activeItem.title || "Video player"}
            onLoad={() => {
              setIsIframeLoaded(true);
              isIframeLoadedRef.current = true;
              setHasErrorOrTimeout(false);
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            className={`w-full h-full border-0 transition-opacity duration-500 z-10 ${
              isIframeLoaded && !hasErrorOrTimeout ? "opacity-100" : "opacity-0"
            }`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        {/* Modal Bottom Swipe/Swipe indicators for mobile */}
        <p className="mt-2 text-white/50 text-[9px] font-bold uppercase tracking-wider font-inter md:hidden block">
          &larr; Swipe left/right to view next &bull; Swipe down to close &rarr;
        </p>

      </div>

      {/* Side Pagination Controls (Desktop Only) */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <button
          onClick={handlePrev}
          className="bg-navy/80 hover:bg-gold text-white hover:text-navy p-4 rounded-full border border-gold/20 transition-all duration-300 shadow-lg"
          aria-label="Previous transformation video"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <button
          onClick={handleNext}
          className="bg-navy/80 hover:bg-gold text-white hover:text-navy p-4 rounded-full border border-gold/20 transition-all duration-300 shadow-lg"
          aria-label="Next transformation video"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
}
