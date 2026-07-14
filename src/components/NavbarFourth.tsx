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
  GlobeIcon,
  BookUserIcon,
  UserGroupIcon,
  Book02Icon
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
            <div className="max-w-[1200px] mx-auto px-6 py-8 grid grid-cols-3 gap-6">

              <a 
                href="/programs/one-on-one" 
                className="group block p-5 bg-brand-cream-warm/10 hover:bg-brand-cream-warm/30 border border-brand-rule/60 hover:border-brand-primary/20 rounded-2xl transition-all hover:shadow-md hover:shadow-brand-primary/5"
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="w-8 h-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                    <HugeiconsIcon icon={BookUserIcon} size={15} />
                  </span>
                  <span className="text-xs font-bold text-brand-ink group-hover:text-brand-primary transition-colors">One-on-One Tutoring</span>
                </div>
                <span className="block text-[10.5px] text-brand-muted leading-relaxed">Vetted personal matching and diagnostic skills alignment for KG to University.</span>
              </a>

              <a 
                href="/programs/exam-bootcamps" 
                className="group block p-5 bg-brand-cream-warm/10 hover:bg-brand-cream-warm/30 border border-brand-rule/60 hover:border-brand-primary/20 rounded-2xl transition-all hover:shadow-md hover:shadow-brand-primary/5"
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="w-8 h-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                    <HugeiconsIcon icon={Award01Icon} size={15} />
                  </span>
                  <span className="text-xs font-bold text-brand-ink group-hover:text-brand-primary transition-colors">Intensive Exam Cohorts</span>
                </div>
                <span className="block text-[10.5px] text-brand-muted leading-relaxed">Grade 6, 8, and 12 EHEECE national mock exam prep cycles under real timed setups.</span>
              </a>

              <a 
                href="/programs/test-prep" 
                className="group block p-5 bg-brand-cream-warm/10 hover:bg-brand-cream-warm/30 border border-brand-rule/60 hover:border-brand-primary/20 rounded-2xl transition-all hover:shadow-md hover:shadow-brand-primary/5"
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="w-8 h-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                    <HugeiconsIcon icon={Book02Icon} size={15} />
                  </span>
                  <span className="text-xs font-bold text-brand-ink group-hover:text-brand-primary transition-colors">SAT · TOEFL Preparation</span>
                </div>
                <span className="block text-[10.5px] text-brand-muted leading-relaxed">Interactive mock testing database, skills diagnostic audit, and live strategy sessions.</span>
              </a>

            </div>
          </div>

          {/* MEGA DROPDOWN PANEL 2: Schools */}
          <div
            className={`absolute left-0 right-0 top-full bg-brand-paper border-b border-brand-rule shadow-2xl transition-all duration-300 ${openMega === "schools" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
              }`}
            onMouseEnter={() => setOpenMega("schools")}
            onMouseLeave={() => setOpenMega(null)}
          >
            <div className="max-w-[1200px] mx-auto px-6 py-8 grid grid-cols-4 gap-6">

              <a 
                href="/schools/consulting" 
                className="group block p-5 bg-brand-cream-warm/10 hover:bg-brand-cream-warm/30 border border-brand-rule/60 hover:border-brand-primary/20 rounded-2xl transition-all hover:shadow-md hover:shadow-brand-primary/5"
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="w-8 h-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                    <HugeiconsIcon icon={SchoolIcon} size={15} />
                  </span>
                  <span className="text-xs font-bold text-brand-ink group-hover:text-brand-primary transition-colors">Institution Consulting</span>
                </div>
                <span className="block text-[10.5px] text-brand-muted leading-relaxed">Staff audits, curriculum mapping, and teacher training blocks for private schools.</span>
              </a>

              <a 
                href="/schools/lms-licensing" 
                className="group block p-5 bg-brand-cream-warm/10 hover:bg-brand-cream-warm/30 border border-brand-rule/60 hover:border-brand-primary/20 rounded-2xl transition-all hover:shadow-md hover:shadow-brand-primary/5"
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="w-8 h-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                    <HugeiconsIcon icon={SchoolIcon} size={15} />
                  </span>
                  <span className="text-xs font-bold text-brand-ink group-hover:text-brand-primary transition-colors">LMS Portal Access</span>
                </div>
                <span className="block text-[10.5px] text-brand-muted leading-relaxed">White-labeled learning management software licensed to private academies.</span>
              </a>

              <a 
                href="/schools/ngo-programmes" 
                className="group block p-5 bg-brand-cream-warm/10 hover:bg-brand-cream-warm/30 border border-brand-rule/60 hover:border-brand-primary/20 rounded-2xl transition-all hover:shadow-md hover:shadow-brand-primary/5"
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="w-8 h-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                    <HugeiconsIcon icon={UserGroupIcon} size={15} />
                  </span>
                  <span className="text-xs font-bold text-brand-ink group-hover:text-brand-primary transition-colors">NGO Programmes</span>
                </div>
                <span className="block text-[10.5px] text-brand-muted leading-relaxed">Non-profit accelerated reading clinics and educational aid partnerships.</span>
              </a>

              <a 
                href="/diaspora" 
                className="group block p-5 bg-brand-cream-warm/10 hover:bg-brand-cream-warm/30 border border-brand-rule/60 hover:border-brand-primary/20 rounded-2xl transition-all hover:shadow-md hover:shadow-brand-primary/5"
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="w-8 h-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                    <HugeiconsIcon icon={GlobeIcon} size={15} />
                  </span>
                  <span className="text-xs font-bold text-brand-ink group-hover:text-brand-primary transition-colors">Diaspora Sponsoring</span>
                </div>
                <span className="block text-[10.5px] text-brand-muted leading-relaxed">Fund and manage high-quality local packages back home securely in USD.</span>
              </a>

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
          className={`absolute top-0 right-0 bottom-0 w-[85vw] max-w-[340px] bg-brand-paper shadow-2xl flex flex-col overflow-hidden transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Header */}
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
            <ul className="flex flex-col gap-4">
              <li>
                <a 
                  href="/" 
                  onClick={() => setMobileOpen(false)} 
                  className="flex px-3 py-2 rounded-xl text-sm font-semibold text-brand-ink hover:bg-brand-cream-warm/40 transition-colors"
                >
                  Home
                </a>
              </li>

              {/* Programs Dropdown */}
              <li>
                <div className="border border-brand-rule/60 rounded-2xl overflow-hidden bg-brand-paper">
                  <button
                    onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-brand-cream-warm/10 hover:bg-brand-cream-warm/30 transition-colors text-sm font-bold text-brand-ink cursor-pointer"
                  >
                    <span>Programs</span>
                    <HugeiconsIcon 
                      icon={ChevronDownIcon} 
                      size={14} 
                      className={`transition-transform duration-255 opacity-70 ${mobileProgramsOpen ? "rotate-180 text-brand-primary" : ""}`} 
                    />
                  </button>
                  {mobileProgramsOpen && (
                    <div className="p-3 bg-brand-cream-warm/5 border-t border-brand-rule/40 flex flex-col gap-2.5 animate-in slide-in-from-top-2 duration-200">
                      <a 
                        href="/programs" 
                        onClick={() => setMobileOpen(false)}
                        className="group flex flex-col p-3 rounded-xl border border-dashed border-brand-rule/60 bg-brand-cream-warm/15 hover:bg-brand-cream-warm/30 transition-all"
                      >
                        <span className="text-[13px] font-bold text-brand-primary">Explore All Programs</span>
                        <span className="text-[11px] text-brand-muted mt-0.5">Overview of tutoring packages & structure.</span>
                      </a>
                      
                      <a 
                        href="/programs/one-on-one" 
                        onClick={() => setMobileOpen(false)}
                        className="group flex flex-col p-3 rounded-xl border border-brand-rule/45 bg-brand-paper hover:bg-brand-cream-warm/25 hover:border-brand-rule transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                      >
                        <span className="text-[13px] font-bold text-brand-ink group-hover:text-brand-primary transition-colors">One-on-One Tutoring</span>
                        <span className="text-[11px] text-brand-muted mt-0.5">Vetted personal matching for KG to University.</span>
                      </a>
                      <a 
                        href="/programs/exam-bootcamps" 
                        onClick={() => setMobileOpen(false)}
                        className="group flex flex-col p-3 rounded-xl border border-brand-rule/45 bg-brand-paper hover:bg-brand-cream-warm/25 hover:border-brand-rule transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                      >
                        <span className="text-[13px] font-bold text-brand-ink group-hover:text-brand-primary transition-colors">Intensive Exam Cohorts</span>
                        <span className="text-[11px] text-brand-muted mt-0.5">Grade 6, 8, and 12 mock preparation cycles.</span>
                      </a>
                      <a 
                        href="/programs/test-prep" 
                        onClick={() => setMobileOpen(false)}
                        className="group flex flex-col p-3 rounded-xl border border-brand-rule/45 bg-brand-paper hover:bg-brand-cream-warm/25 hover:border-brand-rule transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                      >
                        <span className="text-[13px] font-bold text-brand-ink group-hover:text-brand-primary transition-colors">SAT · TOEFL Preparation</span>
                        <span className="text-[11px] text-brand-muted mt-0.5">Mock testing database and live feedback sessions.</span>
                      </a>
                    </div>
                  )}
                </div>
              </li>

              {/* Partnerships Dropdown */}
              <li>
                <div className="border border-brand-rule/60 rounded-2xl overflow-hidden bg-brand-paper">
                  <button
                    onClick={() => setMobileSchoolsOpen(!mobileSchoolsOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-brand-cream-warm/10 hover:bg-brand-cream-warm/30 transition-colors text-sm font-bold text-brand-ink cursor-pointer"
                  >
                    <span>Partnerships</span>
                    <HugeiconsIcon 
                      icon={ChevronDownIcon} 
                      size={14} 
                      className={`transition-transform duration-255 opacity-70 ${mobileSchoolsOpen ? "rotate-180 text-brand-primary" : ""}`} 
                    />
                  </button>
                  {mobileSchoolsOpen && (
                    <div className="p-3 bg-brand-cream-warm/5 border-t border-brand-rule/40 flex flex-col gap-2.5 animate-in slide-in-from-top-2 duration-200">
                      <a 
                        href="/schools" 
                        onClick={() => setMobileOpen(false)}
                        className="group flex flex-col p-3 rounded-xl border border-dashed border-brand-rule/60 bg-brand-cream-warm/15 hover:bg-brand-cream-warm/30 transition-all"
                      >
                        <span className="text-[13px] font-bold text-brand-primary">Explore Partnerships</span>
                        <span className="text-[11px] text-brand-muted mt-0.5">Custom services for schools & organizations.</span>
                      </a>

                      <a 
                        href="/schools/consulting" 
                        onClick={() => setMobileOpen(false)}
                        className="group flex flex-col p-3 rounded-xl border border-brand-rule/45 bg-brand-paper hover:bg-brand-cream-warm/25 hover:border-brand-rule transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                      >
                        <span className="text-[13px] font-bold text-brand-ink group-hover:text-brand-primary transition-colors">Institution Programs</span>
                        <span className="text-[11px] text-brand-muted mt-0.5">Staff development audits & teacher training cycles.</span>
                      </a>
                      <a 
                        href="/schools/lms-licensing" 
                        onClick={() => setMobileOpen(false)}
                        className="group flex flex-col p-3 rounded-xl border border-brand-rule/45 bg-brand-paper hover:bg-brand-cream-warm/25 hover:border-brand-rule transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                      >
                        <span className="text-[13px] font-bold text-brand-ink group-hover:text-brand-primary transition-colors">LMS Portal Access</span>
                        <span className="text-[11px] text-brand-muted mt-0.5">White-labeled software for private academies.</span>
                      </a>
                      <a 
                        href="/schools/ngo-programmes" 
                        onClick={() => setMobileOpen(false)}
                        className="group flex flex-col p-3 rounded-xl border border-brand-rule/45 bg-brand-paper hover:bg-brand-cream-warm/25 hover:border-brand-rule transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                      >
                        <span className="text-[13px] font-bold text-brand-ink group-hover:text-brand-primary transition-colors">NGO Partnerships</span>
                        <span className="text-[11px] text-brand-muted mt-0.5">Non-profit accelerated reading cycles in Addis.</span>
                      </a>
                      <a 
                        href="/diaspora" 
                        onClick={() => setMobileOpen(false)}
                        className="group flex flex-col p-3 rounded-xl border border-brand-rule/45 bg-brand-paper hover:bg-brand-cream-warm/25 hover:border-brand-rule transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                      >
                        <span className="text-[13px] font-bold text-brand-ink group-hover:text-brand-primary transition-colors">Diaspora Sponsoring</span>
                        <span className="text-[11px] text-brand-muted mt-0.5">Fund relatives' private packages back home securely in USD.</span>
                      </a>
                    </div>
                  )}
                </div>
              </li>

              {/* Other Links */}
              <li>
                <a href="/resources" onClick={() => setMobileOpen(false)} className="flex px-3 py-2.5 rounded-xl text-sm font-semibold text-brand-ink hover:bg-brand-cream-warm/40 transition-colors">Resources</a>
              </li>
              <li>
                <a href="/blog" onClick={() => setMobileOpen(false)} className="flex px-3 py-2.5 rounded-xl text-sm font-semibold text-brand-ink hover:bg-brand-cream-warm/40 transition-colors">Blog</a>
              </li>
              <li>
                <a href="/tutors" onClick={() => setMobileOpen(false)} className="flex px-3 py-2.5 rounded-xl text-sm font-semibold text-brand-ink hover:bg-brand-cream-warm/40 transition-colors">Tutors</a>
              </li>
              <li>
                <a href="/about" onClick={() => setMobileOpen(false)} className="flex px-3 py-2.5 rounded-xl text-sm font-semibold text-brand-ink hover:bg-brand-cream-warm/40 transition-colors">About</a>
              </li>
              <li>
                <a href="/contact" onClick={() => setMobileOpen(false)} className="flex px-3 py-2.5 rounded-xl text-sm font-semibold text-brand-ink hover:bg-brand-cream-warm/40 transition-colors">Contact</a>
              </li>
            </ul>
          </nav>

          {/* Sticky Footer CTA */}
          <div className="p-5 border-t border-brand-rule bg-brand-paper shadow-[0_-8px_20px_-8px_rgba(0,0,0,0.05)]">
            <a
              href="/book"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center block bg-brand-primary text-brand-paper py-3.5 rounded-full font-bold text-sm shadow-md"
            >
              Book Free Trial
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
