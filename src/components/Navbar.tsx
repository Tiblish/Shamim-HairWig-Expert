"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, User as UserIcon, LogOut, Search, MessageSquare } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Scroll detection handler
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll locking when mobile drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        className={`sticky top-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-[#05080e]/95 backdrop-blur-md shadow-lg border-b border-gold/15 py-1.5 sm:py-2"
            : "bg-[#05080e] border-b border-navy-light/40 py-3 sm:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-1 sm:py-2">
            
            {/* LEFT SIDE: Hamburger, CTA & Search Toggle */}
            <div className="flex items-center space-x-2 sm:space-x-4 flex-1 justify-start">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="text-white hover:text-gold transition duration-200 focus:outline-none"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 sm:w-6 h-6" />
              </button>
              
              <Link
                href="/contact"
                className="text-[7.5px] xs:text-[9px] sm:text-[10px] font-bold text-gold border border-gold/30 hover:border-gold px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full uppercase tracking-widest transition-all duration-300 hover:bg-gold hover:text-[#05080e] whitespace-nowrap font-inter"
              >
                Change Your Look
              </Link>
              
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-white hover:text-gold transition duration-200 focus:outline-none hidden sm:inline-block"
                aria-label="Toggle search"
              >
                <Search className="w-4 h-4 sm:w-5 h-5" />
              </button>
            </div>

            {/* CENTER: Custom "SHS" Luxury Logo */}
            <div className="flex flex-col items-center flex-1 justify-center">
              <Link href="/" className="flex flex-col items-center text-center">
                <span className="font-playfair text-xl sm:text-2xl font-bold tracking-[0.25em] text-white leading-none">
                  S<span className="font-serif italic text-gold lowercase">h</span>S
                </span>
                <span className="text-[7.5px] sm:text-[8.5px] tracking-[0.35em] text-gray-300 font-extrabold uppercase font-inter mt-1.5 leading-none">
                  Shamim Hair Stylist
                </span>
                <span className="text-[6.5px] sm:text-[7.5px] tracking-[0.2em] text-gold/90 font-bold uppercase font-inter mt-1 leading-none">
                  Non-Surgical Hair Restoration
                </span>
                <span className="text-[5px] sm:text-[6px] tracking-[0.15em] text-gray-400 font-medium uppercase font-inter mt-1.5 leading-none hidden md:inline-block">
                  EST. 2014 ✦ 5000+ Transformations ✦ Private Suite
                </span>
              </Link>
            </div>

            {/* RIGHT SIDE: Phone, Auth & WhatsApp */}
            <div className="flex items-center space-x-3 sm:space-x-4 flex-1 justify-end">
              {/* Telephone */}
              <a
                href="tel:+917903817049"
                className="text-white hover:text-gold transition duration-200"
                title="Call Clinic"
              >
                <Phone className="w-4.5 h-4.5" />
              </a>

              {/* Profile/Auth */}
              {user ? (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/dashboard"
                    className="text-white hover:text-gold transition duration-200"
                    title="Dashboard"
                  >
                    <UserIcon className="w-4.5 h-4.5 text-gold" />
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="text-red-400 hover:text-red-500 transition duration-200 hidden sm:inline-block"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-white hover:text-gold transition duration-200"
                  title="Client Login"
                >
                  <UserIcon className="w-4.5 h-4.5" />
                </Link>
              )}

              {/* WhatsApp Mini Badge */}
              <a
                href="https://wa.me/917903817049?text=Hello%2C%20I%20want%20to%20book%20a%20salon%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold text-navy hover:bg-gold-light hover:scale-105 transition-all duration-300 rounded-full p-2 border border-white/10 hidden sm:flex"
                title="WhatsApp Consultation"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
              </a>
            </div>

          </div>
        </div>

        {/* Minimal Dropdown Search Drawer (Optional UI placeholder only) */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-navy-dark border-t border-navy-light/30 py-3 px-4 shadow-inner z-30 transition-all duration-300">
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="Search services..."
                className="w-full bg-navy border border-gold/20 rounded-full px-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold"
              />
              <Search className="w-4 h-4 text-gray-500 absolute right-3 top-2.5" />
            </div>
          </div>
        )}
      </nav>

      {/* OFF-CANVAS MOBILE DRAWER */}
      {/* Backdrop dark overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 z-50 ${
          isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsDrawerOpen(false)}
      ></div>

      {/* Slide-out Panel */}
      <div
        className={`fixed top-0 bottom-0 left-0 w-[280px] sm:w-[320px] bg-navy-dark text-white shadow-2xl z-50 transition-transform duration-500 ease-out transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full justify-between p-6">
          {/* Header */}
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-playfair text-xl font-bold tracking-[0.2em] text-white">
                  S<span className="font-serif italic text-gold lowercase">h</span>S
                </span>
                <span className="text-[7px] tracking-[0.4em] text-gray-400 font-bold uppercase mt-0.5">
                  Shamim Hair Stylist
                </span>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-gray-400 hover:text-white transition duration-200 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className={`block font-inter text-base font-semibold tracking-wide py-2 transition ${
                      isActive ? "text-gold pl-2 border-l-2 border-gold" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Footer details in Drawer */}
          <div className="space-y-6 border-t border-navy-light/40 pt-6">
            {/* Auth status link in mobile menu */}
            {user ? (
              <div className="space-y-3">
                <Link
                  href="/dashboard"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center space-x-2 text-sm font-bold text-gold"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Go to Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsDrawerOpen(false);
                  }}
                  className="flex items-center space-x-2 text-sm font-bold text-red-400 hover:text-red-500"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsDrawerOpen(false)}
                className="flex items-center space-x-2 text-sm font-bold text-white hover:text-gold"
              >
                <UserIcon className="w-4.5 h-4.5 text-gold" />
                <span>Client Login</span>
              </Link>
            )}

            <div className="space-y-2 text-xs text-gray-400 font-inter">
              <p>📍 12/1, Pemantle Street, Taltala, Kolkata, WB 700016</p>
              <p>📞 +91 7903817049</p>
            </div>
            
            <a
              href="https://wa.me/917903817049?text=Hello%2C%20I%20want%20to%20book%20a%20salon%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-gold hover:bg-gold-light text-navy font-bold uppercase tracking-wider text-xs py-3 rounded-full border border-white/10"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
