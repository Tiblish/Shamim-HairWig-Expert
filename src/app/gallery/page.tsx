import React from "react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import Link from "next/link";

interface TransformationCase {
  id: number;
  title: string;
  subtitle: string;
  beforeLabel: string;
  afterLabel: string;
}

export default function GalleryPage() {
  const cases: TransformationCase[] = [
    {
      id: 1,
      title: "Crown Area Thinning",
      subtitle: "Custom human hair patch bonded seamlessly with medical grade borders.",
      beforeLabel: "Stage 4 Baldness",
      afterLabel: "Signature Bonding"
    },
    {
      id: 2,
      title: "Frontal Hairline Recedence",
      subtitle: "Ultra-thin lace base patch giving a completely invisible front hairline.",
      beforeLabel: "Receding Hairline",
      afterLabel: "Lace Front System"
    },
    {
      id: 3,
      title: "Complete Top Baldness",
      subtitle: "Full-top non-surgical hair replacement matching side hair density.",
      beforeLabel: "Stage 6 Baldness",
      afterLabel: "Full Restored Look"
    }
  ];

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-inter text-xs font-bold text-gold uppercase tracking-widest bg-gold/10 px-3 py-1 rounded-full">
            Transformations Showcase
          </span>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-navy">
            Real Results, Real Confidence
          </h1>
          <p className="text-gray-600">
            Drag the vertical sliders left and right to inspect our micro-bonding and hairline blending quality.
          </p>
        </div>

        {/* Gallery Matrix */}
        <div className="space-y-20">
          {cases.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={item.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-gray-100 pb-16 last:border-b-0`}
              >
                {/* Description Column */}
                <div
                  className={`lg:col-span-5 space-y-4 text-center lg:text-left ${
                    isEven ? "lg:order-first" : "lg:order-last"
                  }`}
                >
                  <span className="text-xs font-bold text-gold uppercase tracking-wider font-inter">
                    Transformation Case 0{item.id}
                  </span>
                  <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-navy">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {item.subtitle}
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <a
                      href={`https://wa.me/917903817049?text=${encodeURIComponent(
                        `Hello, I would like to inquire about Case 0${item.id} (${item.title}) style.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-navy hover:bg-navy-light text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full border border-gold/20 shadow-md inline-block"
                    >
                      Enquire about this style
                    </a>
                  </div>
                </div>

                {/* Slider Column */}
                <div className="lg:col-span-7 w-full">
                  <div className="p-2 bg-cream rounded-3xl border border-gray-100 shadow-xl max-w-xl mx-auto">
                    <BeforeAfterSlider
                      beforeLabel={item.beforeLabel}
                      afterLabel={item.afterLabel}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="text-center bg-cream rounded-3xl p-8 sm:p-12 mt-20 border border-gold/15">
          <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-navy mb-4">
            Ready to start your own transformation?
          </h3>
          <p className="text-gray-600 max-w-xl mx-auto mb-8 text-sm">
            Contact us today for a private, confidential consultation at our clinic.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/contact"
              className="bg-navy hover:bg-navy-light text-white font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-full border border-gold/20 shadow-md"
            >
              Book In-Clinic Visit
            </Link>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <WhatsAppCTA floating={true} />
    </div>
  );
}
