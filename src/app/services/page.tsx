import React from "react";
import { Check, PhoneCall } from "lucide-react";
import WhatsAppCTA from "@/components/WhatsAppCTA";

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  duration: string;
  accent?: string;
}

export default function ServicesPage() {
  const services: ServiceItem[] = [
    {
      id: "hair-patch",
      name: "Custom Hair Patch",
      description:
        "Premium natural human hair patch matched to your texture, color, and baldness pattern. Features a lightweight, breathable base designed for invisible seamless blending.",
      price: "₹8,990 – ₹15,990",
      duration: "90 Mins",
      features: [
        "100% Premium Human Hair",
        "Breathable French/Swiss Lace base option",
        "Fully customized color matching",
        "Natural front hairline replication",
      ],
    },
    {
      id: "hair-replacement",
      name: "Non-Surgical Hair Replacement",
      description:
        "Comprehensive restoration covering larger bald areas. Custom designed hair systems fitted seamlessly to recreate complete top scalp coverage and youthful density.",
      price: "₹12,490 – ₹24,990",
      duration: "120 Mins",
      features: [
        "Full top scalp coverage",
        "Custom density configuration",
        "Lace, poly skin, or monofilament bases",
        "Undetectable natural finish",
      ],
    },
    {
      id: "hair-fixing",
      name: "Clip-on Hair Fixing",
      description:
        "Convenient and temporary hair patch integration. Secure medical-grade clips clamp safely to existing side/back hair. Ideal for clients wanting self-removal options.",
      price: "₹7,990 – ₹12,990",
      duration: "60 Mins",
      features: [
        "Easy self-removal at home",
        "Minimal maintenance needed",
        "Zero adhesive chemicals used",
        "Extremely secure clip mechanism",
      ],
    },
    {
      id: "hair-bonding",
      name: "Waterproof Hair Bonding",
      description:
        "High-strength medical bonding tape and liquid adhesive installation. Tailored for active lifestyles. Sweatproof, waterproof, and gym-proof secure placement.",
      price: "₹9,990 – ₹18,990",
      duration: "90 Mins",
      features: [
        "Waterproof and sweatproof bonding",
        "Perfect for swimmers and athletes",
        "Lasts 3–4 weeks per application",
        "High-grade skin-safe medical glue",
      ],
    },
    {
      id: "scalp-consultation",
      name: "Advanced Scalp Consultation",
      description:
        "Detailed microscopic inspection of your scalp health, hair thinning stage, and donor hair density. Includes customized mapping for optimal patch style configuration.",
      price: "Free (First Visit)",
      duration: "30 Mins",
      features: [
        "High-definition microscopic scan",
        "Donor hair density check",
        "Baldness pattern mapping",
        "Personalized hair system recommendations",
      ],
    },
    {
      id: "hair-maintenance",
      name: "System Servicing & Maintenance",
      description:
        "Routine servicing recommended every 3–4 weeks. Includes patch removal, professional deep cleansing, hair conditioning, scalp grooming, and complete re-bonding.",
      price: "₹1,200 – ₹2,000",
      duration: "60 Mins",
      features: [
        "Safe adhesive removal & cleaning",
        "Deep conditioning treatment for patch",
        "Scalp washing & sanitization",
        "Fresh border taping and styling",
      ],
    },
  ];

  return (
    <div className="bg-navy-dark min-h-screen">
      {/* ── Page Hero ─────────────────────────────── */}
      <div className="pt-28 pb-16 sm:pt-36 sm:pb-20 text-center px-4 border-b border-navy-light/30">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="font-inter text-xs font-bold text-gold uppercase tracking-[0.25em] bg-gold/10 px-4 py-2 rounded-full border border-gold/15 inline-block">
            Our Offerings
          </span>
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Premium Hair{" "}
            <span className="text-gold font-serif italic font-light">
              Restoration Services
            </span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Select from our range of non-surgical restoration systems. Every
            treatment includes expert custom cutting and styling.
          </p>
        </div>
      </div>

      {/* ── Services Grid ─────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative bg-navy rounded-3xl overflow-hidden border border-gold/10 hover:border-gold/40 hover:-translate-y-1.5 hover:shadow-[0_0_36px_rgba(212,175,55,0.12)] flex flex-col justify-between transition-all duration-350"
            >
              {/* Subtle inner glow corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold/5 to-transparent rounded-bl-full pointer-events-none" />

              <div className="p-7 sm:p-8 relative z-10">
                {/* Name & Duration */}
                <div className="flex justify-between items-start mb-4 gap-2">
                  <h3 className="font-playfair text-xl font-bold text-white leading-snug pr-1">
                    {service.name}
                  </h3>
                  <span className="flex-shrink-0 bg-navy-dark text-gold text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-full border border-gold/20 font-inter">
                    {service.duration}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-xs text-gray-300">
                      <Check className="w-4 h-4 text-gold mr-2.5 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing & CTA Footer */}
              <div className="bg-navy-dark/60 p-6 sm:p-7 border-t border-navy-light/30 flex items-center justify-between relative z-10">
                <div>
                  <div className="text-[9px] text-gold/60 uppercase tracking-[0.2em] font-bold font-inter mb-0.5">
                    Starting At
                  </div>
                  <div className="text-base sm:text-lg font-extrabold text-white font-playfair">
                    {service.price}
                  </div>
                </div>
                <a
                  href={`https://wa.me/917903817049?text=${encodeURIComponent(
                    `Hello, I would like to inquire about the "${service.name}" service.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 border border-gold text-gold hover:bg-gold hover:text-navy text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-full transition-all duration-300 shadow-sm font-inter"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Enquire</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ── Consultation Banner ───────────────────── */}
        <div className="bg-navy rounded-3xl mt-20 sm:mt-28 p-8 sm:p-12 border border-gold/25 shadow-2xl relative overflow-hidden">
          {/* Decorative gradient corner */}
          <div className="absolute right-0 bottom-0 w-2/5 h-full bg-gradient-to-tl from-gold/8 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-br from-gold/4 to-transparent pointer-events-none" />

          <div className="max-w-2xl relative z-10 space-y-5">
            <span className="font-inter text-xs font-bold text-gold uppercase tracking-[0.25em] bg-gold/10 px-4 py-2 rounded-full border border-gold/15 inline-block">
              Free Consultation
            </span>
            <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-white leading-snug">
              Not sure which hair patch system{" "}
              <span className="text-gold font-serif italic font-light">
                suits your scalp?
              </span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Book a free virtual microscopic scalp assessment. Speak directly
              to our hair specialist on WhatsApp or schedule an in-clinic
              appointment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <WhatsAppCTA floating={false} message="Hello, I want a free scalp consultation." />
            </div>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <WhatsAppCTA floating={true} />
    </div>
  );
}
