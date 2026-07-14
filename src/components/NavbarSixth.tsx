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
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            <span className="w-9 h-9 rounded-lg bg-brand-primary flex items-center justify-center text-brand-secondary font-serif font-bold text-lg shadow-sm group-hover:scale-[1.03] transition-transform">
              ፊ
            </span>
            <span className="font-serif font-bold text-base text-brand-ink">
              Fidel Tutorial
            </span>
          </a>

          {/* Clean Navigation Row */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-4">
            
            <a
              href="/"
              className="px-3 py-2 rounded-lg text-xs font-semibold text-brand-ink hover:text-brand-primary transition-colors"
            >
              Home
            </a>

            {/* Programs Dropdown List */}
            <div className="relative group py-2">
              <a
                href="/programs"
                className="px-3 py-2 rounded-lg text-xs font-semibold text-brand-ink hover:text-brand-primary flex items-center gap-1 transition-colors"
              >
                <span>Programs</span>
                <HugeiconsIcon icon={ChevronDownIcon} size={10} className="opacity-55 transition-transform duration-200 group-hover:rotate-180" />
              </a>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
                <div className="bg-brand-paper/95 backdrop-blur-md border border-brand-rule p-2 rounded-xl shadow-xl w-60 flex flex-col gap-0.5">
                  <a href="/programs/one-on-one" className="group block p-2.5 rounded-lg hover:bg-brand-cream-warm/40 transition-colors">
                    <span className="block text-xs font-bold text-brand-ink group-hover:text-brand-primary">One-on-One Tutoring</span>
                    <span className="block text-[9.5px] text-brand-muted mt-0.5">Vetted personal matching for KG to University.</span>
                  </a>
                  <a href="/programs/exam-bootcamps" className="group block p-2.5 rounded-lg hover:bg-brand-cream-warm/40 transition-colors">
                    <span className="block text-xs font-bold text-brand-ink group-hover:text-brand-primary">Intensive Exam Cohorts</span>
                    <span className="block text-[9.5px] text-brand-muted mt-0.5">Grade 6, 8, and 12 mock prep cycles.</span>
                  </a>
                  <a href="/programs/test-prep" className="group block p-2.5 rounded-lg hover:bg-brand-cream-warm/40 transition-colors">
                    <span className="block text-xs font-bold text-brand-ink group-hover:text-brand-primary">SAT · TOEFL Prep</span>
                    <span className="block text-[9.5px] text-brand-muted mt-0.5">Mock testing database and feedback.</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Partnerships Dropdown List */}
            <div className="relative group py-2">
              <a
                href="/schools"
                className="px-3 py-2 rounded-lg text-xs font-semibold text-brand-ink hover:text-brand-primary flex items-center gap-1 transition-colors"
              >
                <span>Partnerships</span>
                <HugeiconsIcon icon={ChevronDownIcon} size={10} className="opacity-55 transition-transform duration-200 group-hover:rotate-180" />
              </a>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
                <div className="bg-brand-paper/95 backdrop-blur-md border border-brand-rule p-2 rounded-xl shadow-xl w-60 flex flex-col gap-0.5">
                  <a href="/schools/consulting" className="group block p-2.5 rounded-lg hover:bg-brand-cream-warm/40 transition-colors">
                    <span className="block text-xs font-bold text-brand-ink group-hover:text-brand-primary">Institution Consulting</span>
                    <span className="block text-[9.5px] text-brand-muted mt-0.5">Staff development audits & teacher training.</span>
                  </a>
                  <a href="/schools/lms-licensing" className="group block p-2.5 rounded-lg hover:bg-brand-cream-warm/40 transition-colors">
                    <span className="block text-xs font-bold text-brand-ink group-hover:text-brand-primary">LMS Portal Access</span>
                    <span className="block text-[9.5px] text-brand-muted mt-0.5">White-labeled software for private academies.</span>
                  </a>
                  <a href="/schools/ngo-programmes" className="group block p-2.5 rounded-lg hover:bg-brand-cream-warm/40 transition-colors">
                    <span className="block text-xs font-bold text-brand-ink group-hover:text-brand-primary">NGO Programmes</span>
                    <span className="block text-[9.5px] text-brand-muted mt-0.5">Accelerated reading clinics and non-profit aid.</span>
                  </a>
                  <a href="/diaspora" className="group block p-2.5 rounded-lg hover:bg-brand-cream-warm/40 transition-colors">
                    <span className="block text-xs font-bold text-brand-ink group-hover:text-brand-primary">Diaspora Sponsoring</span>
                    <span className="block text-[9.5px] text-brand-muted mt-0.5">Fund relatives' private packages back home in USD.</span>
                  </a>
                </div>
              </div>
            </div>

            <a
              href="/resources"
              className="px-3 py-2 rounded-lg text-xs font-semibold text-brand-ink hover:text-brand-primary transition-colors"
            >
              Resources
            </a>
            <a
              href="/blog"
              className="px-3 py-2 rounded-lg text-xs font-semibold text-brand-ink hover:text-brand-primary transition-colors"
            >
              Blog
            </a>
            <a
              href="/tutors"
              className="px-3 py-2 rounded-lg text-xs font-semibold text-brand-ink hover:text-brand-primary transition-colors"
            >
              Tutors
            </a>
            <a
              href="/about"
              className="px-3 py-2 rounded-lg text-xs font-semibold text-brand-ink hover:text-brand-primary transition-colors"
            >
              About
            </a>
            <a
              href="/contact"
              className="px-3 py-2 rounded-lg text-xs font-semibold text-brand-ink hover:text-brand-primary transition-colors"
            >
              Contact
            </a>

          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="/book"
              className={buttonVariants({
                variant: "default",
                size: "sm",
                className: "hidden md:inline-flex rounded-full text-[11px] font-bold px-4.5 py-2 shadow-sm hover:scale-[1.02] transition-transform",
              })}
            >
              Book Free Trial
            </a>
            
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden w-9 h-9 rounded-lg border border-brand-rule flex items-center justify-center hover:bg-brand-cream-warm transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <HugeiconsIcon icon={Menu01Icon} size={18} className="text-brand-ink" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="fixed right-0 top-0 bottom-0 w-64 bg-brand-paper p-6 shadow-2xl flex flex-col gap-6 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-sm text-brand-ink">Navigation</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-lg border border-brand-rule flex items-center justify-center hover:bg-brand-cream-warm transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={16} className="text-brand-ink" />
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              <a href="/" onClick={() => setMobileOpen(false)} className="block text-sm font-semibold text-brand-ink">Home</a>
              
              <div>
                <div className="flex items-center justify-between py-1">
                  <a href="/programs" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-brand-ink">Programs</a>
                  <button onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}>
                    <HugeiconsIcon icon={ChevronDownIcon} size={12} className={`transition-transform ${mobileProgramsOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>
                {mobileProgramsOpen && (
                  <div className="pl-3 border-l border-brand-rule flex flex-col gap-2 mt-1.5 text-xs text-brand-muted">
                    <a href="/programs/one-on-one" onClick={() => setMobileOpen(false)}>One-on-One Tutoring</a>
                    <a href="/programs/exam-bootcamps" onClick={() => setMobileOpen(false)}>Intensive Exam Cohorts</a>
                    <a href="/programs/test-prep" onClick={() => setMobileOpen(false)}>SAT & TOEFL Prep</a>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between py-1">
                  <a href="/schools" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-brand-ink">Partnerships</a>
                  <button onClick={() => setMobileSchoolsOpen(!mobileSchoolsOpen)}>
                    <HugeiconsIcon icon={ChevronDownIcon} size={12} className={`transition-transform ${mobileSchoolsOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>
                {mobileSchoolsOpen && (
                  <div className="pl-3 border-l border-brand-rule flex flex-col gap-2 mt-1.5 text-xs text-brand-muted">
                    <a href="/schools/consulting" onClick={() => setMobileOpen(false)}>Institution Consulting</a>
                    <a href="/schools/lms-licensing" onClick={() => setMobileOpen(false)}>LMS Portal Access</a>
                    <a href="/schools/ngo-programmes" onClick={() => setMobileOpen(false)}>NGO Programmes</a>
                    <a href="/diaspora" onClick={() => setMobileOpen(false)}>Diaspora Sponsoring</a>
                  </div>
                )}
              </div>

              <a href="/resources" onClick={() => setMobileOpen(false)} className="block text-sm font-semibold text-brand-ink">Resources</a>
              <a href="/blog" onClick={() => setMobileOpen(false)} className="block text-sm font-semibold text-brand-ink">Blog</a>
              <a href="/tutors" onClick={() => setMobileOpen(false)} className="block text-sm font-semibold text-brand-ink">Tutors</a>
              <a href="/about" onClick={() => setMobileOpen(false)} className="block text-sm font-semibold text-brand-ink">About</a>
              <a href="/contact" onClick={() => setMobileOpen(false)} className="block text-sm font-semibold text-brand-ink">Contact</a>
            </nav>

            <a
              href="/book"
              onClick={() => setMobileOpen(false)}
              className={buttonVariants({
                variant: "default",
                size: "lg",
                className: "w-full rounded-xl text-xs font-bold py-3.5 mt-auto text-center shadow-md",
              })}
            >
              Book Free Trial
            </a>
          </div>
        </div>
      )}
    </>
  );
}
