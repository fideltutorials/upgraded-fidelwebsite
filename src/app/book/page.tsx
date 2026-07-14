"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Layout from "@/layouts/Layout";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserIcon, Mail01Icon, CallIcon, BookOpen01Icon, Configuration01Icon, ArrowLeft01Icon } from "@hugeicons/core-free-icons";

interface Tutor {
  id: number;
  name: string;
  specialties: string[];
}

export default function BookTutor() {
  return (
    <React.Suspense fallback={
      <Layout title="Book a Free Trial Session — Fidel Tutorial">
        <div className="min-h-screen bg-brand-cream-warm/30 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </Layout>
    }>
      <BookTutorForm />
    </React.Suspense>
  );
}

function BookTutorForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const preselectedTutorId = searchParams.get("tutor");

  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tutorId, setTutorId] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("Grades 9 & 10");
  const [format, setFormat] = useState("Online Tutoring");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Fetch tutors for the dropdown selection
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await fetch("/api/tutors");
        if (res.ok) {
          const data = await res.json();
          setTutors(data);
          
          // Pre-select if param exists
          if (preselectedTutorId) {
            const match = data.find((t: Tutor) => t.id === parseInt(preselectedTutorId, 10));
            if (match) {
              setTutorId(preselectedTutorId);
              // Auto-fill specialty/subject if tutor has one
              if (match.specialties && match.specialties.length > 0) {
                setSubject(match.specialties[0]);
              }
            }
          }
        }
      } catch (err) {
        console.error("Failed to load tutors:", err);
      }
    };
    fetchTutors();
  }, [preselectedTutorId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName,
          email,
          phone,
          tutorId: tutorId ? parseInt(tutorId, 10) : null,
          subject,
          grade,
          format,
          message,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to submit booking");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedTutorObj = tutors.find((t) => t.id === parseInt(tutorId, 10));

  return (
    <Layout
      title="Book a Free Trial Session — Fidel Tutorial"
      description="Book a vetted, trained tutor for in-home or online lessons. First 1-hour assessment is completely free."
    >
      <section className="py-20 bg-brand-cream-warm/30 min-h-screen flex items-center justify-center">
        <div className="max-w-[640px] w-full mx-auto px-6">
          {/* Back Link */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-xs font-semibold text-brand-muted hover:text-brand-primary mb-6 transition-colors cursor-pointer"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
            Go Back
          </button>

          {submitted ? (
            <div className="bg-white border border-brand-rule p-8 md:p-12 rounded-3xl text-center flex flex-col items-center gap-6 shadow-xl shadow-brand-primary/5">
              <span className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-2xl border border-emerald-100">
                ✓
              </span>
              <div>
                <h3 className="font-serif text-2xl font-bold text-brand-ink mb-2">Booking Requested!</h3>
                <p className="text-brand-muted text-sm leading-relaxed max-w-md mx-auto">
                  Thank you for booking with Fidel. One of our educational advisors will call you at <strong className="text-brand-ink">{phone}</strong> within 24 to 48 hours to confirm matches and schedule your free 1-hour trial assessment.
                </p>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setParentName("");
                  setEmail("");
                  setPhone("");
                  setTutorId("");
                  setSubject("");
                  setMessage("");
                }}
                className="bg-brand-primary text-brand-paper hover:bg-brand-primary-deep px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-md shadow-brand-primary/10 cursor-pointer"
              >
                Submit Another Booking
              </button>
            </div>
          ) : (
            <div className="bg-white border border-brand-rule p-8 md:p-10 rounded-3xl shadow-xl shadow-brand-primary/5">
              <div className="mb-8">
                <span className="text-[10px] font-bold tracking-widest text-brand-secondary uppercase block mb-1">Free 1-Hour Assessment</span>
                <h1 className="font-serif text-3xl font-bold text-brand-ink">Schedule a Lesson</h1>
                <p className="text-brand-muted text-xs mt-1 leading-relaxed">
                  Provide your tutoring details below. We will match your child with a vetted subject expert.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 border border-red-100 rounded-xl px-4 py-3 text-xs font-semibold mb-6">
                  {error}
                </div>
              )}

              {selectedTutorObj && (
                <div className="bg-brand-cream-warm/40 border border-brand-rule rounded-xl px-4 py-3 mb-6 flex items-center justify-between text-xs">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-brand-secondary">Pre-Selected Instructor</span>
                    <span className="font-semibold text-brand-ink mt-0.5">{selectedTutorObj.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTutorId("")}
                    className="text-brand-muted hover:text-red-600 transition-colors font-bold"
                  >
                    Clear Selection
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-sm">
                {/* Parent Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="parentName" className="font-semibold text-xs text-brand-ink">Parent/Student Name <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted/70">
                      <HugeiconsIcon icon={UserIcon} size={16} />
                    </span>
                    <input
                      type="text"
                      id="parentName"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="e.g. Hanna Kebede"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-rule bg-brand-cream-warm/15 text-brand-ink placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>

                {/* Email / Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="font-semibold text-xs text-brand-ink">Email Address <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted/70">
                        <HugeiconsIcon icon={Mail01Icon} size={16} />
                      </span>
                      <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="parent@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-rule bg-brand-cream-warm/15 text-brand-ink placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="font-semibold text-xs text-brand-ink">Phone Number <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted/70">
                        <HugeiconsIcon icon={CallIcon} size={16} />
                      </span>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+251 9..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-rule bg-brand-cream-warm/15 text-brand-ink placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Tutor / Subject Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="tutorSelect" className="font-semibold text-xs text-brand-ink">Select Tutor</label>
                    <select
                      id="tutorSelect"
                      value={tutorId}
                      onChange={(e) => {
                        setTutorId(e.target.value);
                        const selectedT = tutors.find((t) => t.id === parseInt(e.target.value, 10));
                        if (selectedT && selectedT.specialties.length > 0) {
                          setSubject(selectedT.specialties[0]);
                        }
                      }}
                      className="w-full px-3.5 py-3 rounded-xl border border-brand-rule bg-brand-cream-warm/15 text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"
                    >
                      <option value="">-- Auto Match Tutor --</option>
                      {tutors.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className="font-semibold text-xs text-brand-ink">Subject / Specialty <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted/70">
                        <HugeiconsIcon icon={BookOpen01Icon} size={16} />
                      </span>
                      <input
                        type="text"
                        id="subject"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Mathematics, Physics"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-rule bg-brand-cream-warm/15 text-brand-ink placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Grade / Format Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="gradeSelect" className="font-semibold text-xs text-brand-ink">Student Level <span className="text-red-500">*</span></label>
                    <select
                      id="gradeSelect"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl border border-brand-rule bg-brand-cream-warm/15 text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"
                    >
                      <option value="KG">KG</option>
                      <option value="Grades 1–4">Grades 1–4</option>
                      <option value="Grades 5–8">Grades 5–8</option>
                      <option value="Grades 9 & 10">Grades 9 & 10</option>
                      <option value="Grades 11 & 12">Grades 11 & 12</option>
                      <option value="University">University</option>
                      <option value="SAT">SAT</option>
                      <option value="TOEFL">TOEFL</option>
                      <option value="IELTS">IELTS</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="formatSelect" className="font-semibold text-xs text-brand-ink">Delivery Format <span className="text-red-500">*</span></label>
                    <select
                      id="formatSelect"
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl border border-brand-rule bg-brand-cream-warm/15 text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"
                    >
                      <option value="Online Tutoring">Online Tutoring</option>
                      <option value="In-Home Tutoring">In-Home Tutoring</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="font-semibold text-xs text-brand-ink">Learning Goals / Special Needs</label>
                  <div className="relative">
                    <textarea
                      id="message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. Preparing for EHEECE exam next month, needs extra help in calculus..."
                      className="w-full px-4 py-3 rounded-xl border border-brand-rule bg-brand-cream-warm/15 text-brand-ink placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-brand-primary text-brand-paper hover:bg-brand-primary-deep w-full py-3.5 rounded-xl font-semibold text-xs transition-all shadow-md shadow-brand-primary/10 disabled:opacity-50 mt-2 cursor-pointer"
                >
                  {submitting ? "Booking..." : "Book Free Trial Session"}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
