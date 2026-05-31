"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, doc, getDoc, orderBy } from "firebase/firestore";
import { User as UserIcon, Calendar, ClipboardList, Clock, MessageSquare, LogOut, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

interface Enquiry {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  service: string;
  consultationMode: "clinic_visit" | "whatsapp";
  preferredDate: string;
  message: string;
  createdAt: string;
  status: "submitted" | "under_review" | "contacted" | "consultation_scheduled" | "converted" | "closed";
}

const statusWorkflow = [
  { key: "submitted", label: "Submitted", desc: "Enquiry successfully received" },
  { key: "under_review", label: "Under Review", desc: "Team is reviewing your concerns" },
  { key: "contacted", label: "Contacted", desc: "Specialist contacted you" },
  { key: "consultation_scheduled", label: "Consultation Scheduled", desc: "Your appointment is confirmed" },
];

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const [profileName, setProfileName] = useState("");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [fetchingEnquiries, setFetchingEnquiries] = useState(true);
  const router = useRouter();

  // Route protection
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Fetch User Details & Enquiries
  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      setFetchingEnquiries(true);
      try {
        // 1. Fetch user custom profile name from Firestore users collection
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setProfileName(userDoc.data().fullName);
        } else {
          setProfileName(user.displayName || "Valued Client");
        }

        // 2. Fetch enquiries linked to matching uid
        const q = query(
          collection(db, "enquiries"),
          where("uid", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const fetchedList: Enquiry[] = [];
        querySnapshot.forEach((docSnap) => {
          fetchedList.push({
            id: docSnap.id,
            ...(docSnap.data() as Omit<Enquiry, "id">),
          });
        });
        
        // Sort by createdAt client-side to keep simple Firestore indexes
        fetchedList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setEnquiries(fetchedList);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        toast.error("Failed to load dashboard enquiries.");
      } finally {
        setFetchingEnquiries(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Successfully logged out.");
      router.push("/login");
    } catch (err) {
      toast.error("Logout failed.");
    }
  };

  const getStatusIndex = (currentStatus: string) => {
    const mainStatuses = ["submitted", "under_review", "contacted", "consultation_scheduled"];
    const idx = mainStatuses.indexOf(currentStatus);
    if (currentStatus === "converted" || currentStatus === "closed") return 3; // cap at completed
    return idx === -1 ? 0 : idx;
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-[85vh] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-gray-150 flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center space-x-4">
            <div className="bg-navy p-4 rounded-full border border-gold/25">
              <UserIcon className="w-8 h-8 text-gold" />
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider font-bold">Welcome Back</p>
              <h1 className="font-playfair text-2xl sm:text-3xl font-extrabold text-navy">
                {profileName || user.email}
              </h1>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border border-red-200 transition duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Primary Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Support Quick Cards (Left Column) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-navy text-white rounded-3xl p-8 border border-gold/25 shadow-xl space-y-4">
              <h3 className="font-playfair text-xl font-bold text-gold">Need Quick Assistance?</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Connect directly with our hair specialist on WhatsApp to share concerns, reschedule appointments, or get a quick virtual assessment.
              </p>
              <a
                href="https://wa.me/917903817049?text=Hello%2C%20I%20need%20assistance%20regarding%20my%20hair%20patch%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-bold uppercase tracking-wider text-xs py-3.5 rounded-xl shadow-md border border-white/10 transition duration-200 w-full"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Chat with Specialist</span>
              </a>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-150 space-y-4">
              <h3 className="font-playfair text-lg font-bold text-navy">Clinic Instructions</h3>
              <ul className="space-y-3 text-xs text-gray-500">
                <li className="flex items-start">
                  <span className="text-gold font-bold mr-2">•</span>
                  <span>Wash your scalp thoroughly before coming for patch measurement.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold font-bold mr-2">•</span>
                  <span>Bring a photo reference of your desired hairstyle.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold font-bold mr-2">•</span>
                  <span>Consultation takes approximately 30-45 minutes.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Enquiries Tracker List (Right Column) */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-playfair text-2xl font-bold text-navy flex items-center space-x-2">
              <ClipboardList className="w-6 h-6 text-gold" />
              <span>Your Consultation Enquiries</span>
            </h2>

            {fetchingEnquiries ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-150 shadow-md">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gold mx-auto mb-4"></div>
                <p className="text-gray-500 text-sm">Fetching your booking details...</p>
              </div>
            ) : enquiries.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-150 shadow-md space-y-4">
                <p className="text-gray-500 text-sm">No consultation enquiries found matching your account.</p>
                <button
                  onClick={() => router.push("/contact")}
                  className="bg-navy hover:bg-navy-light text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full border border-gold/15"
                >
                  Book Your First Consultation
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {enquiries.map((enquiry) => {
                  const statusIdx = getStatusIndex(enquiry.status);
                  return (
                    <div
                      key={enquiry.id}
                      className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-gray-150 space-y-6 hover:shadow-lg transition duration-200"
                    >
                      {/* Enquiry details header */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-4 gap-2">
                        <div>
                          <span className="bg-cream text-gold text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded border border-gold/20">
                            {enquiry.service.replace("-", " ")}
                          </span>
                          <h3 className="font-playfair text-lg font-bold text-navy mt-2">
                            Enquiry for {enquiry.fullName}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-1.5 text-xs text-gray-500">
                          <Calendar className="w-3.5 h-3.5 text-gold" />
                          <span>Pref. Date: {enquiry.preferredDate}</span>
                        </div>
                      </div>

                      {/* Timeline status indicator */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-navy mb-4">
                          Restoration Tracking Status
                        </p>
                        
                        {/* Horizontal/Vertical Visual Timeline */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-2">
                          {statusWorkflow.map((step, index) => {
                            const isCompleted = index <= statusIdx;
                            const isCurrent = index === statusIdx;
                            return (
                              <div
                                key={step.key}
                                className={`flex items-start md:flex-col p-3 rounded-xl border transition ${
                                  isCurrent
                                    ? "bg-navy text-white border-navy"
                                    : isCompleted
                                    ? "bg-green-50/50 border-green-200 text-navy"
                                    : "bg-cream/40 border-gray-200 text-gray-400"
                                }`}
                              >
                                <div className="flex items-center justify-between w-full md:mb-2">
                                  <div className="flex items-center justify-center w-6 h-6 rounded-full border bg-white flex-shrink-0">
                                    {isCompleted ? (
                                      <CheckCircle2 className="w-4 h-4 text-green-600 fill-current" />
                                    ) : (
                                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                                    )}
                                  </div>
                                </div>
                                <div className="ml-3 md:ml-0">
                                  <p className="text-xs font-bold font-inter tracking-wide">
                                    {step.label}
                                  </p>
                                  <p className={`text-[10px] mt-0.5 leading-tight ${isCurrent ? "text-gray-300" : "text-gray-500"}`}>
                                    {step.desc}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
