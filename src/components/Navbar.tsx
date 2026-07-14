"use client";

import React, { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Menu01Icon,
  Cancel01Icon,
  ChevronDownIcon,
  ArrowRight01Icon
} from "@hugeicons/core-free-icons";
import { buttonVariants } from "@/components/ui/button";

interface NavItem {
  label: string;
  href?: string;
  submenu?: {
    label: string;
    desc: string;
    href: string;
  }[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Programs",
    submenu: [
      { label: "One-on-One Tutoring", desc: "In-home and online, KG to university", href: "/programs/one-on-one" },
      { label: "Group Classes", desc: "Small cohorts at lower per-student cost", href: "/programs/group-classes" },
      { label: "National Exam Bootcamps", desc: "Grade 6, Grade 8, Grade 12 / EHEECE", href: "/programs/exam-bootcamps" },
      { label: "Summer Camps", desc: "STEM, English, heritage and Amharic", href: "/programs/summer-camps" },
      { label: "SAT · TOEFL · IELTS", desc: "Test prep for students aiming abroad", href: "/programs/test-prep" },
      { label: "University & Scholarship Counselling", desc: "College apps, essays, placements", href: "/programs/counselling" },
    ],
  },
  {
    label: "Partnerships",
    submenu: [
      { label: "Private Schools", desc: "In-school programmes and licensing", href: "/schools/private-schools" },
      { label: "NGO & Donor Programmes", desc: "Accelerated learning at scale", href: "/schools/ngo-programmes" },
      { label: "Educational Consulting", desc: "Setup, curriculum, EdTech consulting", href: "/schools/consulting" },
      { label: "Digital Content Development", desc: "Localised learning content", href: "/schools/digital-content" },
      { label: "Teacher Training & Certification", desc: "CPD and standards training", href: "/schools/teacher-training" },
      { label: "LMS Licensing", desc: "For schools and networks", href: "/schools/lms-licensing" },
    ],
  },
  { label: "Tutors", href: "/tutors" },
  { label: "Diaspora", href: "/diaspora" },
  {
    label: "Resources",
    submenu: [
      { label: "Free Past Papers", desc: "Grade 6, 8, 12 archive", href: "/resources#past-papers" },
      { label: "Mock Exams", desc: "Timed practice with scoring", href: "/resources#mock-exams" },
      { label: "Study Tips & Blog", desc: "Guides for parents and students", href: "/resources#blog" },
      { label: "Student LMS Login", desc: "Access your courses", href: "https://lms.fideltutorial.com" },
    ],
  },
  {
    label: "About",
    submenu: [
      { label: "Our Story", desc: "Five years and counting", href: "/about#story" },
      { label: "Results & Testimonials", desc: "What families say", href: "/testimonials" },
      { label: "Join Our Tutor Network", desc: "Apply to teach with us", href: "/about#careers" },
      { label: "Contact", desc: "Talk to a programme advisor", href: "/contact" },
    ],
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-brand-primary-deep text-brand-cream py-2.5 text-xs font-sans select-none border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="bg-white/10 border border-white/20 px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide">
              አዲስ ኮርሶች · New summer cohorts now enrolling
            </span>
          </div>
          <div className="flex items-center gap-4 text-white/90">
            <a href="tel:+251979795154" className="hover:text-brand-secondary transition-colors">
              +251 979 795 154
            </a>
            <span className="opacity-40">·</span>
            <a href="mailto:hello@fideltutorial.com" className="hover:text-brand-secondary transition-colors">
              hello@fideltutorial.com
            </a>
            <span className="opacity-40">·</span>
            <a href="/diaspora" className="hover:text-brand-secondary transition-colors font-medium">
              Diaspora (USD)
            </a>
          </div>
        </div>
      </div>

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 bg-brand-paper/95 backdrop-blur-md border-b border-brand-rule">
        <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between gap-6">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group" aria-label="Fidel Tutorial home">
            <span className="w-11 h-11 rounded-xl bg-brand-primary flex items-center justify-center text-brand-secondary-soft font-serif font-bold text-2xl relative shadow-md shadow-brand-primary/10 group-hover:scale-[1.02] transition-transform">
              ፊ
              <span className="absolute inset-0.5 rounded-[9px] border border-brand-secondary/20 pointer-events-none" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-serif font-semibold text-xl text-brand-ink tracking-tight">
                Fidel Tutorial
              </span>
              <span className="font-sans text-[10px] tracking-widest uppercase text-brand-muted mt-1">
                ፊደል · Est. 2020 · Addis Ababa
              </span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <ul className="flex items-center gap-1" role="menubar">
              {navItems.map((item, idx) => (
                <li
                  key={idx}
                  role="none"
                  className="relative py-2"
                  onMouseEnter={() => item.submenu && setActiveDropdown(idx)}
                  onMouseLeave={() => item.submenu && setActiveDropdown(null)}
                >
                  {item.href || item.submenu ? (
                    <a
                      role="menuitem"
                      href={item.href || (item.label === "Programs" ? "/programs" : item.label === "Partnerships" ? "/schools" : item.label === "Resources" ? "/resources" : "/about")}
                      className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg text-[14.5px] font-medium text-brand-ink hover:bg-brand-cream-warm hover:text-brand-primary-deep transition-all ${activeDropdown === idx ? "bg-brand-cream-warm text-brand-primary-deep" : ""}`}
                    >
                      {item.label}
                      {item.submenu && (
                        <HugeiconsIcon
                          icon={ChevronDownIcon}
                          size={12}
                          className={`transition-transform duration-200 opacity-60 ${activeDropdown === idx ? "transform rotate-180" : ""}`}
                        />
                      )}
                    </a>
                  ) : null}

                  {/* Desktop Dropdown Submenu */}
                  {item.submenu && (
                    <div
                      className={`absolute left-0 top-[calc(100%-4px)] min-w-[280px] bg-brand-paper border border-brand-rule rounded-xl p-2 shadow-xl shadow-brand-primary-deep/5 transition-all duration-200 origin-top-left ${activeDropdown === idx
                          ? "opacity-100 visible translate-y-0 scale-100"
                          : "opacity-0 invisible -translate-y-2 scale-95 pointer-events-none"
                        }`}
                      role="menu"
                    >
                      {item.submenu.map((sub, sIdx) => (
                        <a
                          key={sIdx}
                          role="menuitem"
                          href={sub.href}
                          className="block p-3 rounded-lg hover:bg-brand-cream text-brand-ink hover:text-brand-primary-deep transition-colors group/item"
                        >
                          <span className="block font-medium text-sm transition-colors group-hover/item:text-brand-primary">
                            {sub.label}
                          </span>
                          <span className="block text-[11.5px] text-brand-muted mt-0.5 leading-normal">
                            {sub.desc}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA / Mobile Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden w-11 h-11 flex flex-col justify-center items-center gap-1.5 rounded-xl border border-brand-rule hover:bg-brand-cream-warm transition-colors"
              aria-label="Open menu"
            >
              <HugeiconsIcon icon={Menu01Icon} size={20} className="text-brand-ink" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAV PANEL */}
      <div
        className={`fixed inset-0 z-50 bg-brand-ink/40 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 bottom-0 w-[85vw] max-w-[340px] bg-brand-paper shadow-2xl flex flex-col overflow-hidden transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Header */}
          <div className="p-5 flex items-center justify-between border-b border-brand-rule bg-brand-paper">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-brand-primary flex items-center justify-center text-brand-secondary-soft font-serif font-bold text-lg">
                ፊ
              </span>
              <span className="font-serif font-semibold text-lg text-brand-ink leading-none">
                Fidel Tutorial
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-9 h-9 rounded-xl border border-brand-rule flex items-center justify-center hover:bg-brand-cream-warm transition-colors"
              aria-label="Close menu"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={16} className="text-brand-ink" />
            </button>
          </div>

          {/* Mobile Nav Links (Scrollable) */}
          <nav className="flex-1 overflow-y-auto p-5 scrollbar-none">
            <ul className="flex flex-col gap-4">
              {navItems.map((item, idx) => (
                <li key={idx}>
                  {item.href ? (
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex px-3 py-2 rounded-xl text-sm font-semibold text-brand-ink hover:bg-brand-cream-warm/40 transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <MobileMenuDetails item={item} onClose={() => setMobileMenuOpen(false)} />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile CTA (Sticky Footer) */}
          <div className="p-5 border-t border-brand-rule bg-brand-paper shadow-[0_-8px_20px_-8px_rgba(0,0,0,0.05)] flex flex-col gap-3">
            <a
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={buttonVariants({ variant: "default", size: "lg", className: "w-full text-center py-3.5 rounded-full font-bold shadow-md justify-center" })}
            >
              Book a Free Trial
            </a>
            <div className="text-center text-[10px] text-brand-muted">
              Call us at: <a href="tel:+251979795154" className="font-semibold text-brand-ink">+251 979 795 154</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Collapsible helper component for mobile submenu details
function MobileMenuDetails({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [open, setOpen] = useState(false);

  const parentHref = item.href || (item.label === "Programs" ? "/programs" : item.label === "Partnerships" ? "/schools" : item.label === "Resources" ? "/resources" : "/about");

  return (
    <div className="border border-brand-rule/60 rounded-2xl overflow-hidden bg-brand-paper flex flex-col">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-brand-cream-warm/10 hover:bg-brand-cream-warm/30 transition-colors text-sm font-bold text-brand-ink cursor-pointer"
        aria-expanded={open}
        aria-label={`Toggle ${item.label} submenu`}
      >
        <span>{item.label}</span>
        <HugeiconsIcon
          icon={ChevronDownIcon}
          size={14}
          className={`transition-transform duration-250 opacity-70 ${open ? "rotate-180 text-brand-primary" : ""}`}
        />
      </button>
      {open && (
        <div className="p-3 bg-brand-cream-warm/5 border-t border-brand-rule/40 flex flex-col gap-2.5 animate-in slide-in-from-top-2 duration-200">
          <a
            href={parentHref}
            onClick={onClose}
            className="group flex flex-col p-3 rounded-xl border border-transparent hover:border-brand-primary/20 hover:bg-brand-cream-warm/40 transition-all bg-brand-paper/50"
          >
            <span className="text-[13px] font-bold text-brand-primary">Explore All {item.label}</span>
            <span className="text-[11px] text-brand-muted mt-0.5">Overview of {item.label.toLowerCase()} page.</span>
          </a>

          {item.submenu?.map((sub, sIdx) => (
            <a
              key={sIdx}
              href={sub.href}
              onClick={onClose}
              className="group flex flex-col p-3 rounded-xl border-l-4 border-l-brand-primary bg-brand-cream-warm/20 hover:bg-brand-cream-warm/35 transition-all"
            >
              <span className="text-[13px] font-bold text-brand-ink group-hover:text-brand-primary transition-colors">
                {sub.label}
              </span>
              <span className="text-[11px] text-brand-muted mt-0.5 leading-normal">
                {sub.desc}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
