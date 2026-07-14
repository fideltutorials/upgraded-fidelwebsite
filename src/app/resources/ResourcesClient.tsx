"use client";

import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Book02Icon, BookOpenIcon, Award01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import FaqAccordion from "@/components/FaqAccordion";

interface Paper {
  id?: number;
  title: string;
  year: string | null;
  grade: string | null;
  file: string | null;
  isGated: boolean;
  category: string;
}

const STATIC_PAPERS: Paper[] = [
  { id: 1, title: "Mathematics Examination Paper", year: "2025", grade: "Grade 12 / EHEECE", file: "#", isGated: true, category: "past-paper" },
  { id: 2, title: "English Language Examination Paper", year: "2025", grade: "Grade 12 / EHEECE", file: "#", isGated: true, category: "past-paper" },
  { id: 3, title: "General Sciences Diagnostic test", year: "2024", grade: "Grade 8", file: "#", isGated: false, category: "past-paper" },
  { id: 4, title: "Aptitude & General Knowledge Mocks", year: "2024", grade: "Grade 6", file: "#", isGated: false, category: "past-paper" },
];

export default function ResourcesClient() {
  const [papers, setPapers] = useState<Paper[]>(STATIC_PAPERS);
  const [loading, setLoading] = useState(true);

  // Gate Modal State
  const [activePaper, setActivePaper] = useState<Paper | null>(null);
  const [gateOpen, setGateOpen] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [submittingGate, setSubmittingGate] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Check if user is already unlocked from localStorage
    if (typeof window !== "undefined") {
      const unlocked = localStorage.getItem("fidel_resources_unlocked");
      if (unlocked === "true") {
        setIsUnlocked(true);
      }
    }

    const fetchResources = async () => {
      try {
        const res = await fetch("/api/resources");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setPapers(data);
          }
        }
      } catch (err) {
        console.error("Failed to load resources:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const handleDownloadClick = (e: React.MouseEvent, paper: Paper) => {
    if (paper.isGated && !isUnlocked) {
      e.preventDefault();
      setActivePaper(paper);
      setGateOpen(true);
    }
  };

  const handleGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail || !leadPhone || !activePaper) return;
    setSubmittingGate(true);

    try {
      // POST the lead to our leads endpoint
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          phone: leadPhone,
          message: `Unlocked gated resource: ${activePaper.title}`,
          source: `resource_gate`,
        }),
      });

      // Mark as unlocked in state and localStorage
      setIsUnlocked(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("fidel_resources_unlocked", "true");
      }

      setGateOpen(false);

      // Trigger the download of the file
      if (activePaper.file && activePaper.file !== "#") {
        window.open(activePaper.file, "_blank");
      } else {
        alert("Thank you! Since this is a sample placeholder resource, the file is not yet uploaded.");
      }
    } catch (err) {
      console.error("Failed to submit download gate form:", err);
    } finally {
      setSubmittingGate(false);
    }
  };

  return (
    <>
      {/* Header */}
      <section className="py-16 md:py-24 bg-brand-cream-warm/40 border-b border-brand-rule">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-3 font-semibold">Resources Hub</span>
          <h1 className="font-serif text-4xl md:text-6xl font-medium text-brand-ink tracking-tight mb-6">
            Free Study Assets &amp; Mocks
          </h1>
          <p className="text-brand-muted text-lg leading-relaxed max-w-2xl mx-auto">
            Access past papers archives, mock testing booklets, study schedules, and blog tips prepared by our lead instructors.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LHS: Materials & Mocks */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            {/* Past Papers Archives */}
            <div id="past-papers" className="scroll-mt-24">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-brand-ink mb-6 flex items-center gap-2">
                <span className="text-brand-primary">
                  <HugeiconsIcon icon={BookOpenIcon} size={24} />
                </span>
                National Exam Past Papers
              </h2>
              <p className="text-brand-muted text-sm leading-relaxed mb-6">
                Get official past exam papers to understand question structure and common test patterns. Available for Grade 6, 8, and 12 levels.
              </p>

              {loading && papers === STATIC_PAPERS ? (
                <div className="text-center py-10">
                  <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {papers.map((paper) => (
                    <div key={paper.id} className="p-5 border border-brand-rule rounded-xl bg-brand-paper/50 flex flex-col justify-between hover:border-brand-primary transition-colors">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[10px] uppercase font-bold text-brand-secondary block">{paper.grade || "General"}</span>
                          {paper.isGated && !isUnlocked && (
                            <span className="bg-amber-50 text-amber-700 border border-amber-100 text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1">
                              🔒 Gated
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif text-base font-bold text-brand-ink">{paper.title}</h4>
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-3 border-t border-brand-rule/65 text-xs text-brand-muted">
                        <span>Year: {paper.year || "N/A"}</span>
                        {paper.file && paper.file !== "#" ? (
                          <a
                            href={paper.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => handleDownloadClick(e, paper)}
                            className="font-bold text-brand-primary hover:text-brand-primary-deep"
                          >
                            Download PDF →
                          </a>
                        ) : (
                          <a
                            href="#"
                            onClick={(e) => handleDownloadClick(e, paper)}
                            className="font-bold text-brand-primary hover:text-brand-primary-deep"
                          >
                            Download PDF →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mock Exams */}
            <div id="mock-exams" className="scroll-mt-24">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-brand-ink mb-6 flex items-center gap-2">
                <span className="text-brand-primary">
                  <HugeiconsIcon icon={Award01Icon} size={24} />
                </span>
                Fidel Mock Practice Bundles
              </h2>
              <p className="text-brand-muted text-sm leading-relaxed mb-6">
                Our subject prep teams write custom testing papers annually to help bootcamps candidates test their timing and scoring ranges under realistic setups.
              </p>
              <div className="p-6 border border-brand-rule rounded-xl bg-brand-cream-warm/35 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="max-w-md">
                  <h4 className="font-serif text-lg font-bold text-brand-ink mb-1">Weekly Saturday Test Bundles</h4>
                  <p className="text-xs text-brand-muted leading-relaxed">Includes test files, solutions keys sheets, and performance score tables.</p>
                </div>
                <a href="/contact" className="bg-brand-primary text-brand-paper hover:bg-brand-primary-deep px-5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap">
                  Request Practice Booklet
                </a>
              </div>
            </div>

            {/* Study Tips Blog */}
            <div id="blog" className="scroll-mt-24">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-brand-ink mb-6 flex items-center gap-2">
                <span className="text-brand-primary">
                  <HugeiconsIcon icon={Book02Icon} size={24} />
                </span>
                Parent &amp; Student Study Tips
              </h2>
              <p className="text-brand-muted text-sm leading-relaxed mb-6">
                Helpful tips on managing testing anxieties, establishing study schedules, and selecting high school subjects.
              </p>
              <div className="flex flex-col gap-4">
                <a href="#" className="block p-5 border border-brand-rule rounded-xl hover:border-brand-primary transition-all">
                  <span className="text-[10px] text-brand-primary font-bold uppercase">Study Skills</span>
                  <h4 className="font-serif text-lg font-semibold text-brand-ink mt-1">How to create a balanced study plan at home</h4>
                  <p className="text-xs text-brand-muted mt-2">A short, step-by-step guide for parents looking to build accountability habits in high school children.</p>
                </a>
                <a href="#" className="block p-5 border border-brand-rule rounded-xl hover:border-brand-primary transition-all">
                  <span className="text-[10px] text-brand-primary font-bold uppercase">Exam Prep</span>
                  <h4 className="font-serif text-lg font-semibold text-brand-ink mt-1">Succeeding in the EHEECE: 5 Common Traps to Avoid</h4>
                  <p className="text-xs text-brand-muted mt-2">Insight notes from our lead mathematics bootcamp instructor on common errors Grade-12 test candidates make.</p>
                </a>
              </div>
            </div>
          </div>

          {/* RHS: LMS Portal Card */}
          <div className="lg:col-span-4">
            <div className="bg-brand-primary-deep text-brand-paper border border-white/10 rounded-2xl p-8 sticky top-24 shadow-xl">
              <span className="text-brand-secondary text-xs uppercase font-bold tracking-widest block mb-2">Student Area</span>
              <h3 className="font-serif text-2xl font-bold mb-4">Student LMS Portal</h3>
              <p className="text-brand-cream/80 text-xs leading-relaxed mb-6">
                Log in to your whiteboard dashboard to access homework, scheduled online sessions links, mock testing results reports, and review recordings.
              </p>
              <a 
                href="https://academy.fideltutorial.com" 
                className="w-full text-center bg-brand-secondary hover:bg-brand-secondary-soft text-brand-ink py-3 rounded-lg font-bold text-xs inline-block transition-colors shadow-md"
              >
                Access LMS Account Login
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gated Resource Download Modal */}
      {gateOpen && activePaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white border border-brand-rule p-8 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setGateOpen(false)}
              className="absolute top-4 right-4 text-brand-muted hover:text-brand-ink cursor-pointer"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={18} />
            </button>
            <div className="mb-6">
              <span className="text-[10px] uppercase font-bold text-brand-secondary block mb-1">Download Gate</span>
              <h3 className="font-serif text-xl font-bold text-brand-ink leading-tight">Unlock {activePaper.title}</h3>
              <p className="text-brand-muted text-xs mt-1.5 leading-relaxed">
                Enter your details to unlock free instant access to all past papers and mock practice booklets.
              </p>
            </div>

            <form onSubmit={handleGateSubmit} className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1">
                <label htmlFor="gate-name" className="font-semibold text-brand-ink">Full Name</label>
                <input
                  type="text"
                  id="gate-name"
                  required
                  placeholder="e.g. Samuel Ayele"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl border border-brand-rule focus:outline-none focus:border-brand-primary"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="gate-email" className="font-semibold text-brand-ink">Email Address</label>
                <input
                  type="email"
                  id="gate-email"
                  required
                  placeholder="name@example.com"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl border border-brand-rule focus:outline-none focus:border-brand-primary"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="gate-phone" className="font-semibold text-brand-ink">Phone Number</label>
                <input
                  type="tel"
                  id="gate-phone"
                  required
                  placeholder="e.g. +251 912 345..."
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl border border-brand-rule focus:outline-none focus:border-brand-primary"
                />
              </div>
              <button
                type="submit"
                disabled={submittingGate}
                className="mt-2 w-full bg-brand-primary text-brand-paper hover:bg-brand-primary-deep py-3.5 rounded-xl font-bold transition-colors disabled:opacity-50 cursor-pointer"
              >
                {submittingGate ? "Unlocking..." : "Unlock & Download PDF"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
