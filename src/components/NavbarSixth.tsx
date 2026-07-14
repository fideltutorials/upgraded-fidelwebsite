"use client";

import React, { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon, Cancel01Icon, ChevronDownIcon } from "@hugeicons/core-free-icons";
import { buttonVariants } from "@/components/ui/button";

export default function NavbarSixth() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const [mobileSchoolsOpen, setMobileSchoolsOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-brand-paper/90 backdrop-blur-md border-b border-brand-rule">
        <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo - Enlarged */}
          <a href="/" className="flex items-center gap-3 group">
            <span className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-brand-secondary font-serif font-bold text-xl shadow-md group-hover:scale-[1.03] transition-transform">
              ፊ
            </span>
            <span className="font-serif font-bold text-lg text-brand-ink">
              Fidel Tutorial
            </span>
          </a>

          {/* Clean Navigation Row - Enlarged Text & Tight Gaps */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            
            <a
              href="/"
              className="px-3 py-2 rounded-lg text-[13.5px] font-semibold text-brand-ink hover:text-brand-primary transition-colors"
            >
              Home
            </a>

            {/* Programs Dropdown List */}
            <div className="relative group py-2">
              <a
                href="/programs"
                className="px-3 py-2 rounded-lg text-[13.5px] font-semibold text-brand-ink hover:text-brand-primary flex items-center gap-1.5 transition-colors"
              >
                <span>Programs</span>
                <HugeiconsIcon icon={ChevronDownIcon} size={12} className="opacity-55 transition-transform duration-200 group-hover:rotate-180" />
              </a>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
                <div className="bg-brand-paper/95 backdrop-blur-md border border-brand-rule p-3 rounded-xl shadow-xl w-64 flex flex-col gap-1">
                  <a href="/programs/one-on-one" className="group block p-2.5 rounded-lg hover:bg-brand-cream-warm/40 transition-colors">
                    <span className="block text-[13px] font-bold text-brand-ink group-hover:text-brand-primary">One-on-One Tutoring</span>
                    <span className="block text-[11px] text-brand-muted mt-0.5">Vetted personal matching for KG to University.</span>
                  </a>
                  <a href="/programs/exam-bootcamps" className="group block p-2.5 rounded-lg hover:bg-brand-cream-warm/40 transition-colors">
                    <span className="block text-[13px] font-bold text-brand-ink group-hover:text-brand-primary">Intensive Exam Cohorts</span>
                    <span className="block text-[11px] text-brand-muted mt-0.5">Grade 6, 8, and 12 mock prep cycles.</span>
                  </a>
                  <a href="/programs/test-prep" className="group block p-2.5 rounded-lg hover:bg-brand-cream-warm/40 transition-colors">
                    <span className="block text-[13px] font-bold text-brand-ink group-hover:text-brand-primary">SAT · TOEFL Prep</span>
                    <span className="block text-[11px] text-brand-muted mt-0.5">Mock testing database and feedback.</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Partnerships Dropdown List */}
            <div className="relative group py-2">
              <a
                href="/schools"
                className="px-3 py-2 rounded-lg text-[13.5px] font-semibold text-brand-ink hover:text-brand-primary flex items-center gap-1.5 transition-colors"
              >
                <span>Partnerships</span>
                <HugeiconsIcon icon={ChevronDownIcon} size={12} className="opacity-55 transition-transform duration-200 group-hover:rotate-180" />
              </a>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
                <div className="bg-brand-paper/95 backdrop-blur-md border border-brand-rule p-3 rounded-xl shadow-xl w-64 flex flex-col gap-1">
                  <a href="/schools/consulting" className="group block p-2.5 rounded-lg hover:bg-brand-cream-warm/40 transition-colors">
                    <span className="block text-[13px] font-bold text-brand-ink group-hover:text-brand-primary">Institution Consulting</span>
                    <span className="block text-[11px] text-brand-muted mt-0.5">Staff development audits & teacher training.</span>
                  </a>
                  <a href="/schools/lms-licensing" className="group block p-2.5 rounded-lg hover:bg-brand-cream-warm/40 transition-colors">
                    <span className="block text-[13px] font-bold text-brand-ink group-hover:text-brand-primary">LMS Portal Access</span>
                    <span className="block text-[11px] text-brand-muted mt-0.5">White-labeled software for private academies.</span>
                  </a>
                  <a href="/schools/ngo-programmes" className="group block p-2.5 rounded-lg hover:bg-brand-cream-warm/40 transition-colors">
                    <span className="block text-[13px] font-bold text-brand-ink group-hover:text-brand-primary">NGO Programmes</span>
                    <span className="block text-[11px] text-brand-muted mt-0.5">Accelerated reading clinics and non-profit aid.</span>
                  </a>
                  <a href="/diaspora" className="group block p-2.5 rounded-lg hover:bg-brand-cream-warm/40 transition-colors">
                    <span className="block text-[13px] font-bold text-brand-ink group-hover:text-brand-primary">Diaspora Sponsoring</span>
                    <span className="block text-[11px] text-brand-muted mt-0.5">Fund relatives' private packages back home in USD.</span>
                  </a>
                </div>
              </div>
            </div>

            <a
              href="/resources"
              className="px-3 py-2 rounded-lg text-[13.5px] font-semibold text-brand-ink hover:text-brand-primary transition-colors"
            >
              Resources
            </a>
            <a
              href="/blog"
              className="px-3 py-2 rounded-lg text-[13.5px] font-semibold text-brand-ink hover:text-brand-primary transition-colors"
            >
              Blog
            </a>
            <a
              href="/tutors"
              className="px-3 py-2 rounded-lg text-[13.5px] font-semibold text-brand-ink hover:text-brand-primary transition-colors"
            >
              Tutors
            </a>
            <a
              href="/about"
              className="px-3 py-2 rounded-lg text-[13.5px] font-semibold text-brand-ink hover:text-brand-primary transition-colors"
            >
              About
            </a>
            <a
              href="/contact"
              className="px-3 py-2 rounded-lg text-[13.5px] font-semibold text-brand-ink hover:text-brand-primary transition-colors"
            >
              Contact
            </a>

          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden w-11 h-11 rounded-xl border border-brand-rule flex items-center justify-center hover:bg-brand-cream-warm transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <HugeiconsIcon icon={Menu01Icon} size={20} className="text-brand-ink" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="fixed right-0 top-0 bottom-0 w-[85vw] max-w-[340px] bg-brand-paper shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300 border-l border-brand-rule">
            
            {/* Sticky Header */}
            <div className="p-5 flex items-center justify-between border-b border-brand-rule bg-brand-paper">
              <span className="font-serif font-bold text-sm text-brand-ink tracking-tight flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-brand-primary flex items-center justify-center text-brand-secondary font-serif font-bold text-xs">
                  ፊ
                </span>
                Fidel Navigation
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 rounded-xl border border-brand-rule flex items-center justify-center hover:bg-brand-cream-warm transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={16} className="text-brand-ink" />
              </button>
            </div>

            {/* Scrollable Body */}
            <nav className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-none">
              {/* Home */}
              <a 
                href="/" 
                onClick={() => setMobileOpen(false)} 
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-brand-ink hover:bg-brand-cream-warm/40 transition-colors"
              >
                Home
              </a>
              
              {/* Programs Dropdown */}
              <div className="border border-brand-rule/60 rounded-2xl overflow-hidden bg-brand-paper">
                <button
                  onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-brand-cream-warm/10 hover:bg-brand-cream-warm/30 transition-colors text-sm font-bold text-brand-ink cursor-pointer"
                >
                  <span>Programs</span>
                  <HugeiconsIcon 
                    icon={ChevronDownIcon} 
                    size={14} 
                    className={`transition-transform duration-250 opacity-70 ${mobileProgramsOpen ? "rotate-180 text-brand-primary" : ""}`} 
                  />
                </button>
                {mobileProgramsOpen && (
                  <div className="p-3 bg-brand-cream-warm/5 border-t border-brand-rule/40 flex flex-col gap-2.5 animate-in slide-in-from-top-2 duration-200">
                    <a 
                      href="/programs" 
                      onClick={() => setMobileOpen(false)}
                      className="group flex flex-col p-3 rounded-xl border border-transparent hover:border-brand-primary/20 hover:bg-brand-cream-warm/40 transition-all bg-brand-paper/50"
                    >
                      <span className="text-[13px] font-bold text-brand-primary">Explore All Programs</span>
                      <span className="text-[11px] text-brand-muted mt-0.5">Overview of tutoring packages & structure.</span>
                    </a>
                    
                    <a 
                      href="/programs/one-on-one" 
                      onClick={() => setMobileOpen(false)}
                      className="group flex flex-col p-3 rounded-xl border-l-4 border-l-brand-primary bg-brand-cream-warm/20 hover:bg-brand-cream-warm/35 transition-all"
                    >
                      <span className="text-[13px] font-bold text-brand-ink group-hover:text-brand-primary transition-colors">One-on-One Tutoring</span>
                      <span className="text-[11px] text-brand-muted mt-0.5">Vetted personal matching for KG to University.</span>
                    </a>
                    <a 
                      href="/programs/exam-bootcamps" 
                      onClick={() => setMobileOpen(false)}
                      className="group flex flex-col p-3 rounded-xl border-l-4 border-l-brand-primary bg-brand-cream-warm/20 hover:bg-brand-cream-warm/35 transition-all"
                    >
                      <span className="text-[13px] font-bold text-brand-ink group-hover:text-brand-primary transition-colors">Intensive Exam Cohorts</span>
                      <span className="text-[11px] text-brand-muted mt-0.5">Grade 6, 8, and 12 mock prep cycles.</span>
                    </a>
                    <a 
                      href="/programs/test-prep" 
                      onClick={() => setMobileOpen(false)}
                      className="group flex flex-col p-3 rounded-xl border-l-4 border-l-brand-primary bg-brand-cream-warm/20 hover:bg-brand-cream-warm/35 transition-all"
                    >
                      <span className="text-[13px] font-bold text-brand-ink group-hover:text-brand-primary transition-colors">SAT · TOEFL Prep</span>
                      <span className="text-[11px] text-brand-muted mt-0.5">Mock testing database and feedback.</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Partnerships Dropdown */}
              <div className="border border-brand-rule/60 rounded-2xl overflow-hidden bg-brand-paper">
                <button
                  onClick={() => setMobileSchoolsOpen(!mobileSchoolsOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-brand-cream-warm/10 hover:bg-brand-cream-warm/30 transition-colors text-sm font-bold text-brand-ink cursor-pointer"
                >
                  <span>Partnerships</span>
                  <HugeiconsIcon 
                    icon={ChevronDownIcon} 
                    size={14} 
                    className={`transition-transform duration-250 opacity-70 ${mobileSchoolsOpen ? "rotate-180 text-brand-primary" : ""}`} 
                  />
                </button>
                {mobileSchoolsOpen && (
                  <div className="p-3 bg-brand-cream-warm/5 border-t border-brand-rule/40 flex flex-col gap-2.5 animate-in slide-in-from-top-2 duration-200">
                    <a 
                      href="/schools" 
                      onClick={() => setMobileOpen(false)}
                      className="group flex flex-col p-3 rounded-xl border border-transparent hover:border-brand-primary/20 hover:bg-brand-cream-warm/40 transition-all bg-brand-paper/50"
                    >
                      <span className="text-[13px] font-bold text-brand-primary">Explore Partnerships</span>
                      <span className="text-[11px] text-brand-muted mt-0.5">Custom services for schools & organizations.</span>
                    </a>

                    <a 
                      href="/schools/consulting" 
                      onClick={() => setMobileOpen(false)}
                      className="group flex flex-col p-3 rounded-xl border-l-4 border-l-brand-primary bg-brand-cream-warm/20 hover:bg-brand-cream-warm/35 transition-all"
                    >
                      <span className="text-[13px] font-bold text-brand-ink group-hover:text-brand-primary transition-colors">Institution Consulting</span>
                      <span className="text-[11px] text-brand-muted mt-0.5">Staff development audits & teacher training.</span>
                    </a>
                    <a 
                      href="/schools/lms-licensing" 
                      onClick={() => setMobileOpen(false)}
                      className="group flex flex-col p-3 rounded-xl border-l-4 border-l-brand-primary bg-brand-cream-warm/20 hover:bg-brand-cream-warm/35 transition-all"
                    >
                      <span className="text-[13px] font-bold text-brand-ink group-hover:text-brand-primary transition-colors">LMS Portal Access</span>
                      <span className="text-[11px] text-brand-muted mt-0.5">White-labeled software for private academies.</span>
                    </a>
                    <a 
                      href="/schools/ngo-programmes" 
                      onClick={() => setMobileOpen(false)}
                      className="group flex flex-col p-3 rounded-xl border-l-4 border-l-brand-primary bg-brand-cream-warm/20 hover:bg-brand-cream-warm/35 transition-all"
                    >
                      <span className="text-[13px] font-bold text-brand-ink group-hover:text-brand-primary transition-colors">NGO Programmes</span>
                      <span className="text-[11px] text-brand-muted mt-0.5">Accelerated reading clinics and non-profit aid.</span>
                    </a>
                    <a 
                      href="/diaspora" 
                      onClick={() => setMobileOpen(false)}
                      className="group flex flex-col p-3 rounded-xl border-l-4 border-l-brand-primary bg-brand-cream-warm/20 hover:bg-brand-cream-warm/35 transition-all"
                    >
                      <span className="text-[13px] font-bold text-brand-ink group-hover:text-brand-primary transition-colors">Diaspora Sponsoring</span>
                      <span className="text-[11px] text-brand-muted mt-0.5">Fund relatives' private packages back home in USD.</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Other Links */}
              <div className="flex flex-col gap-1.5 pt-2">
                <a href="/resources" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-brand-ink hover:bg-brand-cream-warm/40 transition-colors">Resources</a>
                <a href="/blog" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-brand-ink hover:bg-brand-cream-warm/40 transition-colors">Blog</a>
                <a href="/tutors" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-brand-ink hover:bg-brand-cream-warm/40 transition-colors">Tutors</a>
                <a href="/about" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-brand-ink hover:bg-brand-cream-warm/40 transition-colors">About</a>
                <a href="/contact" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-brand-ink hover:bg-brand-cream-warm/40 transition-colors">Contact</a>
              </div>
            </nav>

            {/* Sticky Footer */}
            <div className="p-5 border-t border-brand-rule bg-brand-paper shadow-[0_-8px_20px_-8px_rgba(0,0,0,0.05)]">
              <a
                href="/book"
                onClick={() => setMobileOpen(false)}
                className={buttonVariants({
                  variant: "default",
                  size: "lg",
                  className: "w-full rounded-full text-xs font-bold py-3.5 text-center shadow-md justify-center",
                })}
              >
                Book Free Trial
              </a>
              <div className="text-center text-[10px] text-brand-muted mt-3">
                Call us at: <a href="tel:+251979795154" className="font-semibold text-brand-ink">+251 979 795 154</a>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
