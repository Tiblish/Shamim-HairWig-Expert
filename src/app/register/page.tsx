"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { Lock, Mail, AlertCircle, User } from "lucide-react";

const registerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must match"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user, loading } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const newUser = userCredential.user;

      // Save user profile details to Firestore matching their uid
      await setDoc(doc(db, "users", newUser.uid), {
        fullName: data.fullName,
        email: data.email,
        createdAt: new Date().toISOString(),
      });

      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Registration error:", error);
      let errMsg = "Failed to create account. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errMsg = "This email is already registered.";
      }
      toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || user) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-cream flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="font-playfair text-3xl font-extrabold text-navy">
            Create Account
          </h2>
          <p className="text-gray-500 text-sm">
            Sign up to track your enquiries and customized consultations.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                {...register("fullName")}
                className={`w-full bg-cream border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition ${
                  errors.fullName ? "border-red-500" : "border-gray-250 focus:border-gold"
                }`}
                placeholder="John Doe"
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1" />
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                {...register("email")}
                className={`w-full bg-cream border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition ${
                  errors.email ? "border-red-500" : "border-gray-250 focus:border-gold"
                }`}
                placeholder="you@email.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                {...register("password")}
                className={`w-full bg-cream border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition ${
                  errors.password ? "border-red-500" : "border-gray-250 focus:border-gold"
                }`}
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                {...register("confirmPassword")}
                className={`w-full bg-cream border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-250 focus:border-gold"
                }`}
                placeholder="••••••••"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1" />
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-navy hover:bg-navy-light text-white font-bold uppercase tracking-wider text-xs py-4 rounded-xl shadow-lg border border-gold/20 transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Switch to Login */}
        <div className="text-center text-sm text-gray-500 font-medium pt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-gold hover:text-gold-dark font-bold">
            Sign In Instead
          </Link>
        </div>
      </div>
    </div>
  );
}
