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
      subtitle:
        "Custom human hair patch bonded seamlessly with medical grade borders and an invisible lace base.",
      beforeLabel: "Stage 4 Baldness",
      afterLabel: "Signature Bonding",
    },
    {
      id: 2,
      title: "Frontal Hairline Recedence",
      subtitle:
        "Ultra-thin lace base patch giving a completely invisible front hairline with natural density.",
      beforeLabel: "Receding Hairline",
      afterLabel: "Lace Front System",
    },
    {
      id: 3,
      title: "Complete Top Baldness",
      subtitle:
        "Full-top non-surgical hair replacement matching side hair density for a seamless natural look.",
      beforeLabel: "Stage 6 Baldness",
      afterLabel: "Full Restored Look",
    },
  ];

  return (
    <div className="bg-navy-dark min-h-screen">

      {/* ── Page Hero ───────────────────────────────── */}
      <div className="pt-28 pb-16 sm:pt-36 sm:pb-20 text-center px-4 border-b border-navy-light/30">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="font-inter text-xs font-bold text-gold uppercase tracking-[0.25em] bg-gold/10 px-4 py-2 rounded-full border border-gold/15 inline-block">
            Transformations Showcase
          </span>
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Real Results,{" "}
            <span className="text-gold font-serif italic font-light">
              Real Confidence
            </span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Drag the vertical sliders left and right to inspect our
            micro-bonding and hairline blending quality.
          </p>
        </div>
      </div>

      {/* ── Gallery Matrix ──────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="space-y-24 sm:space-y-32">
          {cases.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={item.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center pb-24 sm:pb-32 last:pb-0 border-b border-navy-light/25 last:border-b-0`}
              >
                {/* Description Column */}
                <div
                  className={`lg:col-span-5 space-y-5 text-center lg:text-left ${
                    isEven ? "lg:order-first" : "lg:order-last"
                  }`}
                >
                  <span className="text-[10px] font-bold text-gold uppercase tracking-[0.25em] font-inter bg-gold/10 px-3 py-1.5 rounded-full border border-gold/15 inline-block">
                    Transformation Case 0{item.id}
                  </span>
                  <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    {item.subtitle}
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <a
                      href={`https://wa.me/917903817049?text=${encodeURIComponent(
                        `Hello, I would like to inquire about Case 0${item.id} (${item.title}) style.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-gold text-gold hover:bg-gold hover:text-navy text-xs font-bold uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-300 shadow-md inline-block font-inter"
                    >
                      Enquire about this style
                    </a>
                  </div>
                </div>

                {/* Slider Column */}
                <div className="lg:col-span-7 w-full">
                  <div className="p-2 bg-navy rounded-3xl border border-gold/15 shadow-[0_0_40px_rgba(0,0,0,0.5)] max-w-xl mx-auto">
                    <BeforeAfterSlider
                      beforeLabel={item.beforeLabel}
                      afterLabel={item.afterLabel}
                    />
                  </div>
                  <p className="text-center text-gray-500 text-[10px] uppercase tracking-widest font-inter mt-3">
                    Drag slider to compare
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA Banner ──────────────────────────── */}
        <div className="bg-navy text-center rounded-3xl p-10 sm:p-14 mt-16 border border-gold/20 relative overflow-hidden shadow-2xl">
          {/* Decorative corner glows */}
          <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-gold/6 to-transparent rounded-br-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-gold/6 to-transparent rounded-tl-full pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <span className="font-inter text-xs font-bold text-gold uppercase tracking-[0.25em] bg-gold/10 px-4 py-2 rounded-full border border-gold/15 inline-block">
              Book Your Session
            </span>
            <h3 className="font-playfair text-2xl sm:text-3xl font-extrabold text-white leading-snug">
              Ready to start your own{" "}
              <span className="text-gold font-serif italic font-light">
                transformation?
              </span>
            </h3>
            <p className="text-gray-300 max-w-lg mx-auto text-sm leading-relaxed">
              Contact us today for a private, confidential consultation at our
              clinic in Kolkata.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link
                href="/contact"
                className="border border-gold text-gold hover:bg-gold hover:text-navy font-bold uppercase tracking-wider text-xs px-10 py-4 rounded-full inline-block transition-all duration-300 shadow-md font-inter"
              >
                Book In-Clinic Visit
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <WhatsAppCTA floating={true} />
    </div>
  );
}
