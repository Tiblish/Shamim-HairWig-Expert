"use client";
import React from "react";
import { MessageSquare } from "lucide-react";

interface WhatsAppCTAProps {
  message?: string;
  floating?: boolean;
  className?: string;
}

export default function WhatsAppCTA({
  message = "Hello, I want to inquire about hair patch services.",
  floating = true,
  className = "",
}: WhatsAppCTAProps) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917903817049";
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  if (floating) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-xl hover:scale-115 transition-all duration-300 animate-bounce group"
        title="Chat on WhatsApp"
      >
        <MessageSquare className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-out font-inter font-bold text-xs tracking-wider uppercase whitespace-nowrap">
          Talk to Specialist
        </span>
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
    >
      <MessageSquare className="w-5 h-5 fill-current" />
      <span>Consult on WhatsApp</span>
    </a>
  );
}
