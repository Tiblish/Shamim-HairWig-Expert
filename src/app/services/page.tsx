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
}

export default function ServicesPage() {
  const services: ServiceItem[] = [
    {
      id: "hair-patch",
      name: "Custom Hair Patch",
      description: "Premium natural human hair patch matched to your texture, color, and baldness pattern. Features a lightweight, breathable base designed for invisible seamless blending.",
      price: "₹8,990 - ₹15,990",
      duration: "90 Mins",
      features: [
        "100% Premium Human Hair",
        "Breathable French/Swiss Lace base option",
        "Fully customized color matching",
        "Natural front hairline replication"
      ]
    },
    {
      id: "hair-replacement",
      name: "Non-Surgical Hair Replacement",
      description: "Comprehensive restoration covering larger bald areas. Custom designed hair systems fitted seamlessly to recreate complete top scalp coverage and youthful density.",
      price: "₹12,490 - ₹24,990",
      duration: "120 Mins",
      features: [
        "Full top scalp coverage",
        "Custom density configuration",
        "Lace, poly skin, or monofilament bases",
        "Undetectable natural finish"
      ]
    },
    {
      id: "hair-fixing",
      name: "Clip-on Hair Fixing",
      description: "Convenient and temporary hair patch integration. Secure medical-grade clips clamp safely to existing side/back hair. Ideal for clients wanting self-removal options.",
      price: "₹7,990 - ₹12,990",
      duration: "60 Mins",
      features: [
        "Easy self-removal at home",
        "Minimal maintenance needed",
        "Zero adhesive chemicals used",
        "Extremely secure clip mechanism"
      ]
    },
    {
      id: "hair-bonding",
      name: "Waterproof Hair Bonding",
      description: "High-strength medical bonding tape and liquid adhesive installation. Tailored for active lifestyles. Sweatproof, waterproof, and gym-proof secure placement.",
      price: "₹9,990 - ₹18,990",
      duration: "90 Mins",
      features: [
        "Waterproof and sweatproof bonding",
        "Perfect for swimmers and athletes",
        "Lasts 3-4 weeks per application",
        "High-grade skin-safe medical glue"
      ]
    },
    {
      id: "scalp-consultation",
      name: "Advanced Scalp Consultation",
      description: "Detailed microscopic inspection of your scalp health, hair thinning stage, and donor hair density. Includes customized mapping for optimal patch style configuration.",
      price: "Free (First Visit)",
      duration: "30 Mins",
      features: [
        "High-definition microscopic scan",
        "Donor hair density check",
        "Baldness pattern mapping",
        "Personalized hair system recommendations"
      ]
    },
    {
      id: "hair-maintenance",
      name: "System Servicing & Maintenance",
      description: "Routine servicing recommended every 3-4 weeks. Includes patch removal, professional deep cleansing, hair conditioning, scalp grooming, and complete re-bonding.",
      price: "₹1,200 - ₹2,000",
      duration: "60 Mins",
      features: [
        "Safe adhesive removal & cleaning",
        "Deep conditioning treatment for patch",
        "Scalp washing & sanitization",
        "Fresh border taping and styling"
      ]
    }
  ];

  return (
    <div className="bg-cream py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-inter text-xs font-bold text-gold uppercase tracking-widest bg-gold/10 px-3 py-1 rounded-full">
            Our Offerings
          </span>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-navy">
            Premium Hair Restoration Services
          </h1>
          <p className="text-gray-600">
            Select from our range of non-surgical restoration systems. Every treatment includes expert custom cutting and styling.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl border border-gray-100 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-8">
                {/* Name & Duration */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-playfair text-xl font-bold text-navy pr-2">
                    {service.name}
                  </h3>
                  <span className="bg-cream text-navy text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-gray-150">
                    {service.duration}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-xs text-gray-600">
                      <Check className="w-4 h-4 text-gold mr-2.5 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing & CTA */}
              <div className="bg-cream/40 p-8 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
                    Starting At
                  </div>
                  <div className="text-lg font-extrabold text-navy font-playfair">
                    {service.price}
                  </div>
                </div>
                <a
                  href={`https://wa.me/917903817049?text=${encodeURIComponent(
                    `Hello, I would like to inquire about the "${service.name}" service.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 bg-navy hover:bg-navy-light text-white text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-full border border-gold/20 shadow-md transition duration-200"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-gold" />
                  <span>Enquire</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Global Consultation banner */}
        <div className="bg-navy text-white rounded-3xl mt-20 p-8 sm:p-12 border border-gold/25 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-1/3 h-full bg-gradient-to-tl from-gold/10 to-transparent pointer-events-none rounded-tl-full"></div>
          <div className="max-w-2xl relative z-10 space-y-6">
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-gold">
              Not sure which hair patch system suits your scalp?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Book a free virtual microscopic scalp assessment. Speak directly to our hair specialist on WhatsApp or schedule an in-clinic appointment.
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
