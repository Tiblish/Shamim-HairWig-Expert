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
    answer: "No, the hair patch installation is entirely non-surgical and non-invasive. We secure it gently using medical-grade adhesive tape or clips, depending on your preferred application method.",
  },
  {
    question: "How long does a premium hair patch last?",
    answer: "Depending on your lifestyle and care, a high-quality human hair patch lasts anywhere between 6 to 12 months. Routine maintenance visits every 3-4 weeks help maximize durability and keep it looking natural.",
  },
  {
    question: "Can I shower, swim, or exercise with a hair patch?",
    answer: "Absolutely! Our premium bonding system allows you to resume all daily activities including swimming, showering, gym workouts, and sports without any fear of it coming off.",
  },
  {
    question: "How often do I need to visit the clinic for maintenance?",
    answer: "We recommend a service visit once every 3 to 4 weeks. During this maintenance session, we clean your scalp, wash and condition the hair patch, and re-apply fresh medical adhesive for a secure fit.",
  },
  {
    question: "Is the hair patch visible to others?",
    answer: "No. We use premium lace or ultra-thin skin base patches that seamlessly blend with your natural hair density, texture, and color. Our specialist custom cuts and styles the patch so it remains virtually undetectable.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-navy mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Everything you need to know about our premium non-surgical hair restoration solutions.
          </p>
        </div>

        <div className="space-y-4">
          {defaultFAQs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-150 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
                >
                  <span className="font-playfair font-bold text-lg text-navy pr-4">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gold flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gold flex-shrink-0" />
                  )}
                </button>
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-60 border-t border-gray-100" : "max-h-0"
                  }`}
                >
                  <p className="px-6 py-5 text-gray-600 text-sm leading-relaxed">
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
