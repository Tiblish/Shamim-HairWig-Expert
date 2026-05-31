import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthContextProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Premium Hair Patch & Replacement Clinic | Shamim Hair Stylist",
    template: "%s | Shamim Hair Stylist",
  },
  description: "Get premium, natural hair patch, hair replacement, and hair bonding services at Shamim Hair Stylist. Book a consultation or message on WhatsApp.",
  keywords: ["Hair Patch", "Hair Replacement", "Hair Fixing", "Hair Bonding", "Shamim Hair Stylist", "Premium Hair Studio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-white text-charcoal min-h-screen flex flex-col font-inter antialiased">
        <AuthContextProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        </AuthContextProvider>
      </body>
    </html>
  );
}
