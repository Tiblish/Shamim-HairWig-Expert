"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { Lock, Mail, AlertCircle } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
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
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Successfully logged in!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      let errMsg = "Failed to log in. Please check your credentials.";
      if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        errMsg = "Invalid email or password.";
      }
      toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Logged in with Google!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Google Auth error:", error);
      toast.error("Google login failed. Please try again.");
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
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm">
            Sign in to track your consultations and profile.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-navy hover:bg-navy-light text-white font-bold uppercase tracking-wider text-xs py-4 rounded-xl shadow-lg border border-gold/20 transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-gray-500 font-semibold tracking-wide font-inter">
              Or Continue With
            </span>
          </div>
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center space-x-2 border border-gray-300 bg-white hover:bg-cream text-charcoal font-bold text-sm py-3.5 rounded-xl shadow-sm transition duration-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="#EA4335"
              d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.414 0-6.19-2.775-6.19-6.19 0-3.414 2.776-6.19 6.19-6.19 1.483 0 2.844.524 3.92 1.4l3.11-3.11C18.172 1.632 15.352 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.486 0 11.24-4.578 11.24-11.24 0-.765-.082-1.483-.22-2.184H12.24z"
            />
          </svg>
          <span>Sign In with Google</span>
        </button>

        {/* Switch to Register */}
        <div className="text-center text-sm text-gray-500 font-medium pt-2">
          New here?{" "}
          <Link href="/register" className="text-gold hover:text-gold-dark font-bold">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
