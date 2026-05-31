"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const defaultFAQs: FAQItem[] = [
  {
    question: "Is the hair patch process painful?",
    answer:
      "No, the hair patch installation is entirely non-surgical and non-invasive. We secure it gently using medical-grade adhesive tape or clips, depending on your preferred application method.",
  },
  {
    question: "How long does a premium hair patch last?",
    answer:
      "Depending on your lifestyle and care, a high-quality human hair patch lasts anywhere between 6 to 12 months. Routine maintenance visits every 3–4 weeks help maximize durability and keep it looking natural.",
  },
  {
    question: "Can I shower, swim, or exercise with a hair patch?",
    answer:
      "Absolutely! Our premium bonding system allows you to resume all daily activities including swimming, showering, gym workouts, and sports without any fear of it coming off.",
  },
  {
    question: "How often do I need to visit the clinic for maintenance?",
    answer:
      "We recommend a service visit once every 3 to 4 weeks. During this maintenance session, we clean your scalp, wash and condition the hair patch, and re-apply fresh medical adhesive for a secure fit.",
  },
  {
    question: "Is the hair patch visible to others?",
    answer:
      "No. We use premium lace or ultra-thin skin base patches that seamlessly blend with your natural hair density, texture, and color. Our specialist custom cuts and styles the patch so it remains virtually undetectable.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 sm:py-28 bg-navy border-t border-navy-light/35">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <span className="font-inter text-xs font-bold text-gold uppercase tracking-[0.25em] bg-gold/10 px-4 py-2 rounded-full border border-gold/15 inline-block">
            Common Questions
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-extrabold text-white">
            Frequently Asked{" "}
            <span className="text-gold font-serif italic font-light">
              Questions
            </span>
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed max-w-lg mx-auto">
            Everything you need to know about our premium non-surgical hair
            restoration solutions.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {defaultFAQs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-gold/35 shadow-[0_0_24px_rgba(212,175,55,0.08)]"
                    : "border-gold/10 hover:border-gold/25"
                } bg-navy-dark`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none group"
                >
                  <span className="font-playfair font-bold text-base sm:text-lg text-white pr-4 leading-snug group-hover:text-gold/90 transition-colors duration-200">
                    {faq.question}
                  </span>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isOpen
                      ? "bg-gold/15 border-gold/30"
                      : "bg-navy border-navy-light/50"
                  }`}>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-gold" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gold/60" />
                    )}
                  </span>
                </button>
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-60 border-t border-navy-light/30" : "max-h-0"
                  }`}
                >
                  <p className="px-6 py-5 text-gray-300 text-sm leading-relaxed font-inter">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
