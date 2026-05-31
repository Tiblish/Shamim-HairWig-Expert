"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const enquirySchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  service: z.string().min(1, "Please select a service"),
  consultationMode: z.enum(["clinic_visit", "whatsapp"]),
  preferredDate: z.string().min(1, "Please select a date"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      consultationMode: "clinic_visit",
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);
    try {
      // Save enquiry to Firestore with linking uid
      await addDoc(collection(db, "enquiries"), {
        ...data,
        uid: user?.uid || "guest",
        createdAt: new Date().toISOString(),
        status: "submitted",
        source: "website",
      });

      // Show email notification success (mocked or handled in Phase 5 via api route)
      try {
        await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } catch (e) {
        console.error("Email notification error", e);
      }

      toast.success("Enquiry submitted successfully!");
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error("Error saving enquiry:", error);
      toast.error("Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-cream py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-inter text-xs font-bold text-gold uppercase tracking-widest bg-gold/10 px-3 py-1 rounded-full">
            Get In Touch
          </span>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-navy">
            Book a Free Consultation
          </h1>
          <p className="text-gray-600">
            Submit the form below, and our care team will reach out to confirm your slot within 2 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 space-y-6">
              <h3 className="font-playfair text-2xl font-bold text-navy border-b border-gray-100 pb-4">
                Clinic Details
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-cream p-3 rounded-2xl border border-gold/15">
                    <MapPin className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-sm font-inter">Address</h4>
                    <p className="text-gray-500 text-sm mt-1">
                      123 Premium Grooming Lane, Luxury District, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-cream p-3 rounded-2xl border border-gold/15">
                    <Phone className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-sm font-inter">Phone Number</h4>
                    <p className="text-gray-500 text-sm mt-1">
                      <a href="tel:+917903817049" className="hover:text-gold transition duration-200">
                        +91 7903817049
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-cream p-3 rounded-2xl border border-gold/15">
                    <Mail className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-sm font-inter">Email Address</h4>
                    <p className="text-gray-500 text-sm mt-1">
                      <a href="mailto:info@shamimhairclinic.com" className="hover:text-gold transition duration-200">
                        info@shamimhairclinic.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-cream p-3 rounded-2xl border border-gold/15">
                    <Clock className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-sm font-inter">Hours</h4>
                    <p className="text-gray-500 text-sm mt-1">
                      Mon - Sat: 10:00 AM - 8:00 PM <br />
                      Sunday: 11:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-150 aspect-[4/3] relative bg-white">
              <iframe
                title="Clinic Location Map"
                className="absolute inset-0 w-full h-full border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0970636843467!2d88.3512962!3d22.5697223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM0JzExLjAiTiA4OMKwMjEnMDUuNyJFOg!5e0!3m2!1sen!2sin!4v1684346738920"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-gray-100">
            {submitSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="inline-flex items-center justify-center bg-green-100 p-4 rounded-full text-green-600 mb-2">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="font-playfair text-3xl font-bold text-navy">
                  Thank You!
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Your enquiry has been received successfully. A clinic representative will contact you shortly to confirm your booking.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-6 bg-navy text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full hover:bg-navy-light transition duration-200"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <h3 className="font-playfair text-2xl font-bold text-navy border-b border-gray-100 pb-4 mb-2">
                  Consultation Enquiry Form
                </h3>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("fullName")}
                    className={`w-full bg-cream border rounded-xl px-4 py-3 text-sm focus:outline-none transition ${
                      errors.fullName ? "border-red-500" : "border-gray-250 focus:border-gold"
                    }`}
                    placeholder="Enter your name"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Contact Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...register("phone")}
                      className={`w-full bg-cream border rounded-xl px-4 py-3 text-sm focus:outline-none transition ${
                        errors.phone ? "border-red-500" : "border-gray-250 focus:border-gold"
                      }`}
                      placeholder="e.g. +91 9876543210"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center">
                        <AlertCircle className="w-3.5 h-3.5 mr-1" />
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      className={`w-full bg-cream border rounded-xl px-4 py-3 text-sm focus:outline-none transition ${
                        errors.email ? "border-red-500" : "border-gray-250 focus:border-gold"
                      }`}
                      placeholder="e.g. name@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center">
                        <AlertCircle className="w-3.5 h-3.5 mr-1" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Dropdowns Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Service Selection */}
                  <div>
                    <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                      Preferred Service
                    </label>
                    <select
                      {...register("service")}
                      className="w-full bg-cream border border-gray-250 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold transition"
                    >
                      <option value="">Select a service...</option>
                      <option value="hair-patch">Custom Hair Patch</option>
                      <option value="hair-replacement">Non-Surgical Hair Replacement</option>
                      <option value="hair-fixing">Clip-on Hair Fixing</option>
                      <option value="hair-bonding">Waterproof Hair Bonding</option>
                      <option value="scalp-consultation">Scalp Consultation</option>
                      <option value="hair-maintenance">Maintenance & Service</option>
                    </select>
                    {errors.service && (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center">
                        <AlertCircle className="w-3.5 h-3.5 mr-1" />
                        {serviceErrMessage(errors.service)}
                      </p>
                    )}
                  </div>

                  {/* Consultation Mode */}
                  <div>
                    <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                      Consultation Mode
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center justify-center border border-gray-250 rounded-xl p-3 text-xs font-semibold cursor-pointer hover:bg-cream transition-all">
                        <input
                          type="radio"
                          value="clinic_visit"
                          {...register("consultationMode")}
                          className="mr-2 accent-navy"
                        />
                        Clinic Visit
                      </label>
                      <label className="flex items-center justify-center border border-gray-250 rounded-xl p-3 text-xs font-semibold cursor-pointer hover:bg-cream transition-all">
                        <input
                          type="radio"
                          value="whatsapp"
                          {...register("consultationMode")}
                          className="mr-2 accent-navy"
                        />
                        WhatsApp
                      </label>
                    </div>
                  </div>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    {...register("preferredDate")}
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full bg-cream border rounded-xl px-4 py-3 text-sm focus:outline-none transition ${
                      errors.preferredDate ? "border-red-500" : "border-gray-250 focus:border-gold"
                    }`}
                  />
                  {errors.preferredDate && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      {errors.preferredDate.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                    Message / Concern
                  </label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    className={`w-full bg-cream border rounded-xl px-4 py-3 text-sm focus:outline-none transition ${
                      errors.message ? "border-red-500" : "border-gray-250 focus:border-gold"
                    }`}
                    placeholder="Describe your hair loss patterns or styling queries..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-navy hover:bg-navy-light text-white font-bold uppercase tracking-wider text-xs py-4 rounded-xl shadow-lg border border-gold/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting enquiry..." : "Submit Consultation Enquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function serviceErrMessage(err: any): string {
  return err.message || "Required";
}
