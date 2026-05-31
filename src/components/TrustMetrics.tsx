import React from "react";
import { ShieldCheck, Award, Clock, Sparkles } from "lucide-react";

export default function TrustMetrics() {
  const metrics = [
    {
      icon: <Award className="w-6 h-6 text-gold" />,
      value: "5000+",
      label: "Transformations Completed",
      desc: "Delivering natural styles that restore client confidence.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-gold" />,
      value: "100%",
      label: "Hairline Blending",
      desc: "Undetectable front lace base boundary transition details.",
    },
    {
      icon: <Clock className="w-6 h-6 text-gold" />,
      value: "Same Day",
      label: "Scalp Profiling",
      desc: "Immediate Microscopic scan and styling layout assessment.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-gold" />,
      value: "Premium",
      label: "Hair Patch Solutions",
      desc: "Ethically sourced human hair matched to individual density.",
    },
  ];

  return (
    <section className="bg-navy-dark text-white border-y border-navy-light/40 py-12 relative overflow-hidden">
      {/* Decorative luxury mesh backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-navy-light/40">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center lg:items-start text-center lg:text-left pt-6 sm:pt-0 lg:px-8 first:pl-0 first:pt-0`}
            >
              {/* Icon & Value Row */}
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-navy-light p-2 rounded-full border border-gold/10">
                  {metric.icon}
                </div>
                <span className="font-playfair text-2xl sm:text-3xl font-extrabold text-gold tracking-wide">
                  {metric.value}
                </span>
              </div>
              
              {/* Details */}
              <h4 className="font-playfair text-base font-bold text-white tracking-wide mb-1">
                {metric.label}
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed max-w-[240px]">
                {metric.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
