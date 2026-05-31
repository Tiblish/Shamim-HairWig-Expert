import React from "react";
import { Star } from "lucide-react";

export interface Testimonial {
  id: number;
  clientName: string;
  service: string;
  rating: number;
  reviewText: string;
}

export default function TestimonialCard({
  clientName,
  service,
  rating,
  reviewText,
}: Testimonial) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-150 shadow-md flex flex-col justify-between hover:shadow-lg transition duration-300">
      <div>
        {/* Rating Stars */}
        <div className="flex items-center space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "fill-gold text-gold" : "text-gray-200"
              }`}
            />
          ))}
        </div>
        
        {/* Review Quote */}
        <p className="text-gray-600 text-sm italic leading-relaxed mb-6 font-inter">
          &ldquo;{reviewText}&rdquo;
        </p>
      </div>

      {/* Author details */}
      <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
        <div>
          <h4 className="font-playfair text-base font-bold text-navy">
            {clientName}
          </h4>
          <span className="text-[10px] uppercase font-bold text-gold tracking-wider">
            {service}
          </span>
        </div>
        <span className="text-[10px] text-gray-400 font-bold uppercase font-inter">
          Verified Review
        </span>
      </div>
    </div>
  );
}
