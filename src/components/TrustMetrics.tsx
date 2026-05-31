import React from "react";
import { ShieldCheck, Award, Clock, Sparkles } from "lucide-react";

export default function TrustMetrics() {
  const metrics = [
    {
      icon: <Award className="w-4 h-4 text-gold flex-shrink-0" />,
      value: "12,000+",
      label: "Transformations Completed",
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />,
      value: "Natural",
      label: "Hairline Finish",
    },
    {
      icon: <Clock className="w-4 h-4 text-gold flex-shrink-0" />,
      value: "Waterproof",
      label: "Bonding Systems",
    },
    {
      icon: <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />,
      value: "Private",
      label: "Clinic Consultation",
    },
  ];

  return (
    <div className="w-full bg-navy-dark/90 backdrop-blur-xs border-t border-navy-light/30 py-4 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 divide-x-0 md:divide-x divide-navy-light/30">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center space-x-2 px-2 text-center md:text-left"
            >
              {metric.icon}
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-1.5 font-inter text-xs">
                <span className="font-bold text-gold tracking-wide">
                  {metric.value}
                </span>
                <span className="text-gray-400 font-medium">
                  {metric.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
