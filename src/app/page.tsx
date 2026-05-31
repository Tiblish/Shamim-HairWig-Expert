import React from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Sparkles, Star, Award, Users } from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import VideoEmbedSection from "@/components/VideoEmbedSection";
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
    <div className="relative">
      {/* 1. Hero Section */}
      <section className="relative bg-cream pt-20 pb-28 sm:pt-28 sm:pb-36 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none rounded-l-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center space-x-2 bg-navy/5 text-navy font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border border-navy/10 font-inter">
                <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                <span>Premium Hair Restoration Clinic</span>
              </span>
              <h1 className="font-playfair text-4xl sm:text-6xl font-extrabold text-navy leading-tight">
                Restore Your Hair. <br />
                <span className="text-gold">Reclaim Your Confidence.</span>
              </h1>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Get completely natural-looking, premium non-surgical hair patch installations tailored to your scalp density and styling preferences. Invisible bases, pain-free, and styled by experts.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto text-center bg-navy hover:bg-navy-light text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-full shadow-lg transition duration-300 border border-gold/30"
                >
                  Book Consultation
                </Link>
                <WhatsAppCTA floating={false} className="w-full sm:w-auto justify-center" />
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-navy/10 max-w-md mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="font-playfair text-2xl sm:text-3xl font-extrabold text-navy">15k+</div>
                  <div className="text-gray-500 text-xs sm:text-sm font-semibold">Happy Clients</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="font-playfair text-2xl sm:text-3xl font-extrabold text-navy">100%</div>
                  <div className="text-gray-500 text-xs sm:text-sm font-semibold">Natural Hair</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="font-playfair text-2xl sm:text-3xl font-extrabold text-navy">4.9★</div>
                  <div className="text-gray-500 text-xs sm:text-sm font-semibold">Google Rating</div>
                </div>
              </div>
            </div>

            {/* Right Column Interactive Before/After */}
            <div className="lg:col-span-5 w-full">
              <div className="relative p-2 bg-white rounded-3xl shadow-2xl border border-gray-100">
                <BeforeAfterSlider />
              </div>
              <p className="text-center text-gray-500 text-xs mt-4 italic font-medium">
                Drag the slider left/right to view the premium hair patch transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Before/After Spotlight */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-navy mb-4">
            See the Difference
          </h2>
          <p className="text-gray-600 max-w-md mx-auto mb-12">
            Explore our real transformation results. We design custom solutions for all patterns of hair loss.
          </p>
          <div className="inline-flex justify-center mb-8">
            <Link
              href="/gallery"
              className="font-inter text-sm font-bold text-gold hover:text-gold-dark border-b-2 border-gold pb-1 transition duration-200"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us Section */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-gold mb-4">
              Why Choose Shamim Hair Clinic?
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

      {/* 4. Services Overview */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-navy mb-4">
              Our Premium Solutions
            </h2>
            <p className="text-gray-600">
              Explore our core non-surgical hair replacement configurations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {previewServices.map((service, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-playfair text-xl font-bold text-navy mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>
                <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                  <span className="text-xs font-bold text-gold uppercase tracking-wider">
                    {service.price}
                  </span>
                  <Link
                    href="/services"
                    className="text-xs font-bold text-navy hover:text-gold uppercase tracking-wider"
                  >
                    Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="bg-navy hover:bg-navy-light text-white font-bold uppercase tracking-wider text-xs px-8 py-3.5 rounded-full inline-block border border-gold/20 shadow-md"
            >
              See All Services
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Video Transformations */}
      <VideoEmbedSection />

      {/* 6. FAQ Section */}
      <FAQSection />

      {/* Floating CTA */}
      <WhatsAppCTA floating={true} />
    </div>
  );
}
