"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, PhoneCall, User as UserIcon, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

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

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100 py-3"
          : "bg-cream/90 backdrop-blur-sm border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start">
            <span className="font-playfair text-xl sm:text-2xl font-bold tracking-tight text-navy">
              SHAMIM
            </span>
            <span className="text-[10px] tracking-[0.25em] text-gold font-bold uppercase -mt-1 font-inter">
              Hair Clinic
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-inter text-sm font-semibold tracking-wide transition-colors duration-200 ${
                    isActive
                      ? "text-gold border-b-2 border-gold pb-1"
                      : "text-navy hover:text-gold"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2 text-sm font-bold text-navy hover:text-gold transition duration-200"
                >
                  <UserIcon className="w-4 h-4 text-gold" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={() => logout()}
                  className="flex items-center space-x-1 text-sm font-bold text-red-600 hover:text-red-800 transition duration-200 pl-2 border-l border-gray-200"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-sm font-bold text-navy hover:text-gold transition duration-200"
              >
                Client Login
              </Link>
            )}

            <a
              href="https://wa.me/917903817049?text=Hello%20I%20want%20consultation%20regarding%20hair%20patch%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-navy text-white hover:bg-navy-light text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-full transition duration-300 shadow-md hover:shadow-lg border border-gold/30"
            >
              <PhoneCall className="w-3.5 h-3.5 text-gold" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            {user && (
              <Link
                href="/dashboard"
                className="text-navy hover:text-gold transition duration-200"
                title="Dashboard"
              >
                <UserIcon className="w-5 h-5 text-gold" />
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-navy hover:text-gold transition-colors duration-200 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0 pointer-events-none"
        } bg-white border-t border-gray-100`}
      >
        <div className="px-4 pt-2 pb-4 space-y-3 shadow-inner">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className={`block px-3 py-2 rounded-md text-base font-semibold ${
                  isActive
                    ? "bg-cream text-gold"
                    : "text-navy hover:bg-cream hover:text-gold"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="border-t border-gray-100 pt-4 flex flex-col space-y-3 px-3">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-2 text-base font-bold text-navy hover:text-gold"
                >
                  <UserIcon className="w-5 h-5 text-gold" />
                  <span>Go to Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    handleLinkClick();
                  }}
                  className="flex items-center space-x-2 text-base font-bold text-red-600 hover:text-red-800 text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={handleLinkClick}
                className="text-base font-bold text-navy hover:text-gold block"
              >
                Client Login
              </Link>
            )}
            <a
              href="https://wa.me/917903817049?text=Hello%20I%20want%20consultation%20regarding%20hair%20patch%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-navy text-white text-sm font-bold uppercase tracking-wider py-3 rounded-full shadow-md border border-gold/30"
            >
              <PhoneCall className="w-4 h-4 text-gold" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
