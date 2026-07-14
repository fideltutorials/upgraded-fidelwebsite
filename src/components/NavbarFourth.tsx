"use client";

import React, { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Menu01Icon,
  Cancel01Icon,
  ChevronDownIcon,
  ArrowRight01Icon,
  Award01Icon,
  SchoolIcon,
  GlobeIcon
} from "@hugeicons/core-free-icons";
import { buttonVariants } from "@/components/ui/button";

export default function NavbarFourth() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState<"programs" | "schools" | null>(null);
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
      {/* ENTERPRISE LOGO / HEADER */}
      <header
        className="sticky top-0 z-40 bg-brand-paper/95 backdrop-blur-md border-b border-brand-rule"
        onMouseLeave={() => setOpenMega(null)}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between relative">

          {/* Logo */}
          <a href="/" onMouseEnter={() => setOpenMega(null)} className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-brand-secondary-soft font-serif font-bold text-xl shadow-md">
              ፊ
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-serif font-semibold text-base text-brand-ink">Fidel Tutorial</span>
              <span className="font-sans text-[9px] uppercase tracking-widest text-brand-primary font-bold mt-1">Enterprise Standard</span>
            </span>
          </a>

          {/* Nav List with Mega Menu trigger */}
          <nav className="hidden lg:flex items-center gap-2">
            <ul className="flex items-center gap-2" role="menubar">
              <li onMouseEnter={() => setOpenMega(null)}>
                <a href="/" className="px-4 py-2 rounded-lg text-sm font-semibold text-brand-ink hover:bg-brand-cream-warm transition-colors">
                  Home
                </a>
              </li>

              {/* Programs Mega Trigger */}
              <li
                onMouseEnter={() => setOpenMega("programs")}
                className="relative"
              >
                <a
                  href="/programs"
                  className={`px-4 py-2 rounded-lg text-sm font-semibold text-brand-ink hover:bg-brand-cream-warm transition-colors flex items-center gap-1.5 ${openMega === "programs" ? "bg-brand-cream-warm text-brand-primary" : ""
                    }`}
                >
                  Programs
                  <HugeiconsIcon icon={ChevronDownIcon} size={12} className="opacity-55" />
                </a>
              </li>

              {/* Schools Mega Trigger */}
              <li
                onMouseEnter={() => setOpenMega("schools")}
                className="relative"
              >
                <a
                  href="/schools"
                  className={`px-4 py-2 rounded-lg text-sm font-semibold text-brand-ink hover:bg-brand-cream-warm transition-colors flex items-center gap-1.5 ${openMega === "schools" ? "bg-brand-cream-warm text-brand-primary" : ""
                    }`}
                >
                  Partnerships
                  <HugeiconsIcon icon={ChevronDownIcon} size={12} className="opacity-55" />
                </a>
              </li>

              <li onMouseEnter={() => setOpenMega(null)}>
                <a href="/diaspora" className="px-4 py-2 rounded-lg text-sm font-semibold text-brand-ink hover:bg-brand-cream-warm transition-colors">
                  Diaspora
                </a>
              </li>
              <li onMouseEnter={() => setOpenMega(null)}>
                <a href="/resources" className="px-4 py-2 rounded-lg text-sm font-semibold text-brand-ink hover:bg-brand-cream-warm transition-colors">
                  Resources
                </a>
              </li>
              <li onMouseEnter={() => setOpenMega(null)}>
                <a href="/blog" className="px-4 py-2 rounded-lg text-sm font-semibold text-brand-ink hover:bg-brand-cream-warm transition-colors">
                  Blog
                </a>
              </li>
              <li onMouseEnter={() => setOpenMega(null)}>
                <a href="/tutors" className="px-4 py-2 rounded-lg text-sm font-semibold text-brand-ink hover:bg-brand-cream-warm transition-colors">
                  Tutors
                </a>
              </li>
              <li onMouseEnter={() => setOpenMega(null)}>
                <a href="/about" className="px-4 py-2 rounded-lg text-sm font-semibold text-brand-ink hover:bg-brand-cream-warm transition-colors">
                  About
                </a>
              </li>
              <li onMouseEnter={() => setOpenMega(null)}>
                <a href="/contact" className="px-4 py-2 rounded-lg text-sm font-semibold text-brand-ink hover:bg-brand-cream-warm transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Desktop Right CTA / Mobile Toggle */}
          <div onMouseEnter={() => setOpenMega(null)} className="flex items-center gap-3">
            <a
              href="/book"
              className={buttonVariants({ variant: "default", size: "lg", className: "hidden lg:inline-flex rounded-full text-xs font-bold px-5 py-3 shadow-md" })}
            >
              Book a Free Trial
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-11 h-11 rounded-xl border border-brand-rule flex items-center justify-center hover:bg-brand-cream-warm transition-colors"
              aria-label="Open menu"
            >
              <HugeiconsIcon icon={Menu01Icon} size={20} className="text-brand-ink" />
            </button>
          </div>

          {/* MEGA DROPDOWN PANEL 1: Programs */}
          <div
            className={`absolute left-0 right-0 top-full bg-brand-paper border-b border-brand-rule shadow-2xl transition-all duration-300 ${openMega === "programs" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
              }`}
            onMouseEnter={() => setOpenMega("programs")}
            onMouseLeave={() => setOpenMega(null)}
          >
            <div className="max-w-[1200px] mx-auto px-6 py-8 grid grid-cols-3 gap-8">

              <div className="flex flex-col gap-3">
                <span className="text-brand-primary font-serif font-bold text-sm border-b border-brand-rule pb-2 flex items-center gap-1.5">
                  <HugeiconsIcon icon={Award01Icon} size={16} /> Individual Formats
                </span>
                <a href="/programs/one-on-one" className="group block">
                  <span className="block text-xs font-bold text-brand-ink group-hover:text-brand-primary">One-on-One Tutoring</span>
                  <span className="block text-[10.5px] text-brand-muted mt-0.5">Vetted personal matching for KG to University.</span>
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-brand-primary font-serif font-bold text-sm border-b border-brand-rule pb-2 flex items-center gap-1.5">
                  <HugeiconsIcon icon={Award01Icon} size={16} /> Exam Bootcamps
                </span>
                <a href="/programs/exam-bootcamps" className="group block">
                  <span className="block text-xs font-bold text-brand-ink group-hover:text-brand-primary">Intensive Exam Cohorts</span>
                  <span className="block text-[10.5px] text-brand-muted mt-0.5">Grade 6, 8, and 12 mock preparation cycles.</span>
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-brand-primary font-serif font-bold text-sm border-b border-brand-rule pb-2 flex items-center gap-1.5">
                  <HugeiconsIcon icon={Award01Icon} size={16} /> Advanced Tests
                </span>
                <a href="/programs/test-prep" className="group block">
                  <span className="block text-xs font-bold text-brand-ink group-hover:text-brand-primary">SAT · TOEFL Preparation</span>
                  <span className="block text-[10.5px] text-brand-muted mt-0.5">Mock testing database and live feedback sessions.</span>
                </a>
              </div>

            </div>
          </div>

          {/* MEGA DROPDOWN PANEL 2: Schools */}
          <div
            className={`absolute left-0 right-0 top-full bg-brand-paper border-b border-brand-rule shadow-2xl transition-all duration-300 ${openMega === "schools" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
              }`}
            onMouseEnter={() => setOpenMega("schools")}
            onMouseLeave={() => setOpenMega(null)}
          >
            <div className="max-w-[1200px] mx-auto px-6 py-8 grid grid-cols-3 gap-8">

              <div className="flex flex-col gap-3">
                <span className="text-brand-primary font-serif font-bold text-sm border-b border-brand-rule pb-2 flex items-center gap-1.5">
                  <HugeiconsIcon icon={SchoolIcon} size={16} /> Consulting
                </span>
                <a href="/schools/consulting" className="group block">
                  <span className="block text-xs font-bold text-brand-ink group-hover:text-brand-primary">Institution Programs</span>
                  <span className="block text-[10.5px] text-brand-muted mt-0.5">Staff development audits & teacher training cycles.</span>
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-brand-primary font-serif font-bold text-sm border-b border-brand-rule pb-2 flex items-center gap-1.5">
                  <HugeiconsIcon icon={SchoolIcon} size={16} /> Licensing
                </span>
                <a href="/schools/lms-licensing" className="group block">
                  <span className="block text-xs font-bold text-brand-ink group-hover:text-brand-primary">LMS Portal Access</span>
                  <span className="block text-[10.5px] text-brand-muted mt-0.5">White-labeled software for private academies.</span>
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-brand-primary font-serif font-bold text-sm border-b border-brand-rule pb-2 flex items-center gap-1.5">
                  <HugeiconsIcon icon={GlobeIcon} size={16} /> Social Impact
                </span>
                <a href="/schools/ngo-programmes" className="group block">
                  <span className="block text-xs font-bold text-brand-ink group-hover:text-brand-primary">NGO Partnerships</span>
                  <span className="block text-[10.5px] text-brand-muted mt-0.5">Non-profit accelerated reading cycles in Addis.</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-50 bg-brand-ink/40 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        onClick={() => setMobileOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 bottom-0 w-[82vw] max-w-[310px] bg-brand-paper shadow-2xl p-6 overflow-y-auto flex flex-col transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-6 border-b border-brand-rule">
            <span className="font-serif font-bold text-lg text-brand-ink">Fidel Tutorial</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-9 h-9 rounded-lg border border-brand-rule flex items-center justify-center hover:bg-brand-cream-warm"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={16} className="text-brand-ink" />
            </button>
          </div>

          <nav className="flex-1 py-6">
            <ul className="flex flex-col gap-4">
              <li>
                <a href="/" onClick={() => setMobileOpen(false)} className="block text-base font-semibold text-brand-ink">Home</a>
              </li>
              <li>
                <div className="flex items-center justify-between py-1.5">
                  <a href="/programs" onClick={() => setMobileOpen(false)} className="block text-base font-semibold text-brand-ink flex-1">
                    Programs
                  </a>
                  <button
                    onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
                    className="w-9 h-9 rounded-xl flex items-center justify-center border border-brand-rule/60 hover:bg-brand-cream-warm focus:outline-none transition-colors"
                    aria-label="Toggle programs submenu"
                    aria-expanded={mobileProgramsOpen}
                  >
                    <HugeiconsIcon
                      icon={ChevronDownIcon}
                      size={14}
                      className={`transition-transform duration-200 opacity-60 ${mobileProgramsOpen ? "transform rotate-180" : ""}`}
                    />
                  </button>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${mobileProgramsOpen ? "max-h-[300px] opacity-100 mt-2 mb-3" : "max-h-0 opacity-0 pointer-events-none"}`}>
                  <div className="flex flex-col gap-3 pl-3 border-l-2 border-brand-secondary/35">
                    <a href="/programs/one-on-one" onClick={() => setMobileOpen(false)} className="block">
                      <span className="block text-sm font-bold text-brand-ink">One-on-One Tutoring</span>
                      <span className="block text-[10px] text-brand-muted mt-0.5">Vetted personal matching for KG to University.</span>
                    </a>
                    <a href="/programs/exam-bootcamps" onClick={() => setMobileOpen(false)} className="block">
                      <span className="block text-sm font-bold text-brand-ink">Intensive Exam Cohorts</span>
                      <span className="block text-[10px] text-brand-muted mt-0.5">Grade 6, 8, and 12 mock preparation cycles.</span>
                    </a>
                    <a href="/programs/test-prep" onClick={() => setMobileOpen(false)} className="block">
                      <span className="block text-sm font-bold text-brand-ink">SAT · TOEFL Preparation</span>
                      <span className="block text-[10px] text-brand-muted mt-0.5">Mock testing database and live feedback sessions.</span>
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center justify-between py-1.5">
                  <a href="/schools" onClick={() => setMobileOpen(false)} className="block text-base font-semibold text-brand-ink flex-1">
                    Partnerships
                  </a>
                  <button
                    onClick={() => setMobileSchoolsOpen(!mobileSchoolsOpen)}
                    className="w-9 h-9 rounded-xl flex items-center justify-center border border-brand-rule/60 hover:bg-brand-cream-warm focus:outline-none transition-colors"
                    aria-label="Toggle partnerships submenu"
                    aria-expanded={mobileSchoolsOpen}
                  >
                    <HugeiconsIcon
                      icon={ChevronDownIcon}
                      size={14}
                      className={`transition-transform duration-200 opacity-60 ${mobileSchoolsOpen ? "transform rotate-180" : ""}`}
                    />
                  </button>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${mobileSchoolsOpen ? "max-h-[300px] opacity-100 mt-2 mb-3" : "max-h-0 opacity-0 pointer-events-none"}`}>
                  <div className="flex flex-col gap-3 pl-3 border-l-2 border-brand-secondary/35">
                    <a href="/schools/consulting" onClick={() => setMobileOpen(false)} className="block">
                      <span className="block text-sm font-bold text-brand-ink">Institution Programs</span>
                      <span className="block text-[10px] text-brand-muted mt-0.5">Staff development audits & teacher training cycles.</span>
                    </a>
                    <a href="/schools/lms-licensing" onClick={() => setMobileOpen(false)} className="block">
                      <span className="block text-sm font-bold text-brand-ink">LMS Portal Access</span>
                      <span className="block text-[10px] text-brand-muted mt-0.5">White-labeled software for private academies.</span>
                    </a>
                    <a href="/schools/ngo-programmes" onClick={() => setMobileOpen(false)} className="block">
                      <span className="block text-sm font-bold text-brand-ink">NGO Partnerships</span>
                      <span className="block text-[10px] text-brand-muted mt-0.5">Non-profit accelerated reading cycles in Addis.</span>
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <a href="/diaspora" onClick={() => setMobileOpen(false)} className="block text-base font-semibold text-brand-ink">Diaspora</a>
              </li>
              <li>
                <a href="/resources" onClick={() => setMobileOpen(false)} className="block text-base font-semibold text-brand-ink">Resources</a>
              </li>
              <li>
                <a href="/blog" onClick={() => setMobileOpen(false)} className="block text-base font-semibold text-brand-ink">Blog</a>
              </li>
              <li>
                <a href="/tutors" onClick={() => setMobileOpen(false)} className="block text-base font-semibold text-brand-ink">Tutors</a>
              </li>
              <li>
                <a href="/about" onClick={() => setMobileOpen(false)} className="block text-base font-semibold text-brand-ink">About</a>
              </li>
            </ul>
          </nav>

          <a
            href="/book"
            onClick={() => setMobileOpen(false)}
            className="w-full text-center bg-brand-primary text-brand-paper py-3 rounded-lg font-bold text-sm shadow-md"
          >
            Book Free Trial
          </a>
        </div>
      </div>
    </>
  );
}
