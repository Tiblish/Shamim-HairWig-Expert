import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white border-t border-navy-light pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & Bio */}
          <div className="space-y-4">
            <Link href="/" className="flex flex-col items-start">
              <span className="font-playfair text-2xl font-bold tracking-tight text-white">
                SHAMIM
              </span>
              <span className="text-xs tracking-[0.25em] text-gold font-bold uppercase -mt-1 font-inter">
                Hair Clinic
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Providing premium, high-quality, and completely natural hair patch and replacement services to restore your hair and your confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-lg font-semibold text-gold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Clinic Hours */}
          <div>
            <h4 className="font-playfair text-lg font-semibold text-gold mb-6">Clinic Hours</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Mon - Sat: 10:00 AM - 8:00 PM</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Sunday: 11:00 AM - 5:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-playfair text-lg font-semibold text-gold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                <span>123 Premium Grooming Lane, Luxury District, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="tel:+917903817049" className="hover:text-white transition-colors duration-200">
                  +91 7903817049
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="mailto:info@shamimhairclinic.com" className="hover:text-white transition-colors duration-200">
                  info@shamimhairclinic.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-navy-light mt-16 pt-8 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Shamim Hair Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
