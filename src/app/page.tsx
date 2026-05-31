import React from "react";
import Link from "next/link";
import { Star, ShieldCheck, Sparkles, Award, Users } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import LooksChangedFade from "@/components/LooksChangedFade";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import SocialProofSection from "@/components/SocialProofSection";
import FAQSection from "@/components/FAQSection";

export default function Home() {
  const whyChooseUs = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-gold" />,
      title: "100% Non-Surgical",
      description: "Completely safe, painless, and instant hair restoration without any surgical risks or downtime.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-gold" />,
      title: "Natural Human Hair",
      description: "We use only premium, ethically sourced natural human hair patches that perfectly match your texture.",
    },
    {
      icon: <Award className="w-8 h-8 text-gold" />,
      title: "Custom Cut & Style",
      description: "Every patch is custom trimmed, colored, and styled by master stylists to blend seamlessly with your hair.",
    },
    {
      icon: <Users className="w-8 h-8 text-gold" />,
      title: "Expert Consultation",
      description: "Our certified hair specialists inspect your scalp profile to recommend the perfect patch system.",
    },
  ];

  const previewServices = [
    {
      title: "Hair Patch Bonding",
      desc: "Secure medical-grade adhesive bonding for an active lifestyle. Perfect for swimming and sports.",
      price: "₹8,999 onwards",
    },
    {
      title: "Hair Replacement (Lace Base)",
      desc: "Ultra-breathable premium lace base for a completely natural and invisible front hairline.",
      price: "₹12,499 onwards",
    },
    {
      title: "Scalp Consultation",
      desc: "Detailed micro-scopic assessment of your scalp skin and hair density by our experts.",
      price: "Free (First Visit)",
    },
  ];

  return (
    <div className="relative bg-navy-dark">
      {/* 1. Immersive Luxury Hero Canvas */}
      <HeroSlider />

      {/* 3. Immersive Before/After Storytelling Spotlight */}
      <section className="py-24 bg-navy-dark border-t border-navy-light/35 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Visual storytelling text */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <span className="text-xs font-bold text-gold uppercase tracking-[0.2em] font-inter">
                Transformation Spotlight
              </span>
              <h2 className="font-playfair text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                Confidence Redefined, <br />
                <span className="text-gold font-serif italic font-light">Hair Restored</span>
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                A premium transformation isn't just about cover-up; it's about matching your unique identity, facial structure, and hair density. Watch the seamless fade transition to see the natural hairline integration.
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/gallery"
                  className="border border-gold text-gold hover:bg-gold hover:text-navy text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-350 shadow-md inline-block font-inter"
                >
                  Explore Showcase Gallery
                </Link>
              </div>
            </div>

            {/* Right Column: Timed Cross-Fade Component */}
            <div className="lg:col-span-6 w-full">
              <div className="p-2 bg-navy rounded-3xl shadow-2xl border border-gold/15">
                <LooksChangedFade
                  beforeImage="/images/gallery/hair_before_v2.png"
                  afterImage="/images/gallery/hair_after_v2.png"
                  beforeLabel="Thinning Crown"
                  afterLabel="SHS Volume System"
                />
              </div>
              <p className="text-center text-gray-400 text-[10px] sm:text-xs mt-3 uppercase tracking-wider font-semibold">
                Auto-transitioning before & after states
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-gold mb-4">
              Why Choose Shamim Hair Stylist?
            </h2>
            <p className="text-gray-400">
              We specialize in offering undetectable non-surgical hair systems designed to match your individual style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="bg-navy-dark p-8 rounded-2xl border border-navy-light/60 hover:border-gold/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="mb-6 bg-navy-light w-16 h-16 rounded-full flex items-center justify-center border border-gold/15 shadow-inner">
                  {item.icon}
                </div>
                <h3 className="font-playfair text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Services Overview */}
      <section className="py-20 bg-navy-dark border-t border-navy-light/35">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="font-inter text-xs font-bold text-gold uppercase tracking-[0.2em] bg-gold/10 px-4 py-1.5 rounded-full border border-gold/15 inline-block">
              What We Offer
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-extrabold text-white">
              Our Premium Solutions
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Explore our core non-surgical hair replacement configurations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {previewServices.map((service, idx) => (
              <div
                key={idx}
                className="group bg-navy rounded-3xl p-8 border border-gold/10 hover:border-gold/35 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(212,175,55,0.10)] flex flex-col justify-between transition-all duration-350 cursor-default"
              >
                <div>
                  <h3 className="font-playfair text-xl font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>
                <div className="flex justify-between items-center border-t border-navy-light/40 pt-5">
                  <span className="text-xs font-bold text-gold uppercase tracking-wider font-inter">
                    {service.price}
                  </span>
                  <Link
                    href="/services"
                    className="text-[10px] font-bold text-gold/70 hover:text-gold uppercase tracking-widest font-inter transition-colors duration-200"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/services"
              className="border border-gold text-gold hover:bg-gold hover:text-navy font-bold uppercase tracking-wider text-xs px-10 py-4 rounded-full inline-block transition-all duration-300 shadow-md font-inter"
            >
              See All Services
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Social Proof Section */}
      <SocialProofSection />

      {/* 7. FAQ Section */}
      <FAQSection />

      {/* Floating CTA */}
      <WhatsAppCTA floating={true} />
    </div>
  );
}
