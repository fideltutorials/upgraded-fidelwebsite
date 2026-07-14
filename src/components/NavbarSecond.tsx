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
      { label: "One-on-One Tutoring", desc: "KG to university matching", href: "/programs/one-on-one" },
      { label: "Exam Bootcamps", desc: "Grade 6, 8, 12 prep", href: "/programs/exam-bootcamps" },
      { label: "SAT · Test Prep", desc: "SAT, TOEFL & IELTS prep", href: "/programs/test-prep" },
    ],
  },
  {
    label: "Partnerships",
    submenu: [
      { label: "Partnerships", desc: "Private schools & NGOs", href: "/schools" },
      { label: "LMS Licensing", desc: "LMS white-label portals", href: "/schools/lms-licensing" },
    ],
  },
  { label: "Diaspora", href: "/diaspora" },
  { label: "Resources", href: "/resources" },
  { label: "Tutors", href: "/tutors" },
  { label: "About", href: "/about" },
];

export default function NavbarSecond() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 px-4 pointer-events-none">
        <header className="max-w-[1020px] mx-auto backdrop-blur-lg bg-brand-paper/90 border border-brand-rule rounded-full py-3 px-8 shadow-xl shadow-brand-primary-deep/5 pointer-events-auto flex items-center justify-between gap-8">
          <a href="/" className="flex items-center gap-3" aria-label="Fidel Home">
            <span className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-brand-secondary-soft font-serif font-bold text-lg shadow-sm">
              ፊ
            </span>
            <span className="font-serif font-semibold text-xl text-brand-ink tracking-tight">
              Fidel
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            <ul className="flex items-center gap-1.5" role="menubar">
              {navItems.map((item, idx) => (
                <li
                  key={idx}
                  className="relative"
                  onMouseEnter={() => item.submenu && setActiveDropdown(idx)}
                  onMouseLeave={() => item.submenu && setActiveDropdown(null)}
                >
                  {item.href || item.submenu ? (
                    <a
                      href={item.href || (item.label === "Programs" ? "/programs" : item.label === "Partnerships" ? "/schools" : "/about")}
                      className={`px-4 py-2.5 rounded-full text-sm font-semibold text-brand-ink hover:bg-brand-cream-warm hover:text-brand-primary transition-all duration-200 flex items-center gap-1.5 ${activeDropdown === idx ? "bg-brand-cream-warm text-brand-primary" : ""}`}
                    >
                      {item.label}
                      {item.submenu && (
                        <HugeiconsIcon icon={ChevronDownIcon} size={11} className="opacity-55" />
                      )}
                    </a>
                  ) : null}

                  {item.submenu && (
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50 transition-all duration-200 origin-top ${activeDropdown === idx
                        ? "opacity-100 visible translate-y-0 scale-100"
                        : "opacity-0 invisible -translate-y-1 scale-95 pointer-events-none"
                        }`}
                    >
                      <div className="min-w-[260px] bg-brand-paper border border-brand-rule rounded-2xl p-2 shadow-xl shadow-brand-primary-deep/5 flex flex-col gap-0.5">
                        {item.submenu.map((sub, sIdx) => (
                          <a
                            key={sIdx}
                            href={sub.href}
                            className="block p-3 rounded-xl hover:bg-brand-cream text-brand-ink hover:text-brand-primary transition-colors group"
                          >
                            <span className="block font-bold text-sm transition-colors group-hover:text-brand-primary">{sub.label}</span>
                            <span className="block text-[11px] text-brand-muted mt-1 leading-normal">{sub.desc}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/contact"
              className={buttonVariants({ variant: "default", size: "default", className: "hidden md:inline-flex rounded-full font-bold shadow-md px-6 py-2.5 hover:scale-[1.02] transition-all" })}
            >
              Make a Call
            </a>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 rounded-full border border-brand-rule flex items-center justify-center hover:bg-brand-cream-warm transition-colors"
              aria-label="Open menu"
            >
              <HugeiconsIcon icon={Menu01Icon} size={18} className="text-brand-ink" />
            </button>
          </div>
        </header>
      </div>

      {/* MOBILE DRAWERS PANEL */}
      <div
        className={`fixed inset-0 z-50 bg-brand-ink/40 backdrop-blur-sm md:hidden transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-4 right-4 bottom-4 left-4 rounded-3xl bg-brand-paper shadow-2xl flex flex-col overflow-hidden transition-transform duration-300 ${mobileMenuOpen ? "scale-100" : "scale-95 pointer-events-none opacity-0"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-brand-rule bg-brand-paper">
            <span className="font-serif font-bold text-lg text-brand-primary flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-brand-secondary-soft text-sm">ፊ</span>
              Fidel Tutorial
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-8 h-8 rounded-full border border-brand-rule flex items-center justify-center hover:bg-brand-cream-warm"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={14} className="text-brand-ink" />
            </button>
          </div>

          {/* Scrollable Nav list */}
          <nav className="flex-1 overflow-y-auto p-5 scrollbar-none">
            <ul className="flex flex-col gap-4">
              {navItems.map((item, idx) => (
                <li key={idx} className="border-b border-brand-rule/30 pb-3 last:border-b-0">
                  {item.href ? (
                    <a href={item.href} onClick={() => setMobileMenuOpen(false)} className="block py-1 text-base font-bold text-brand-ink">
                      {item.label}
                    </a>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <span className="block py-1 text-base font-bold text-brand-muted">{item.label}</span>
                      <div className="flex flex-col gap-2.5">
                        {item.submenu?.map((sub, sIdx) => (
                          <a 
                            key={sIdx} 
                            href={sub.href} 
                            onClick={() => setMobileMenuOpen(false)} 
                            className="group block p-3 rounded-xl border-l-4 border-l-brand-primary bg-brand-cream-warm/20 hover:bg-brand-cream-warm/35 transition-all"
                          >
                            <span className="block text-[13px] font-bold text-brand-ink group-hover:text-brand-primary transition-colors">{sub.label}</span>
                            <span className="block text-[10px] text-brand-muted mt-0.5">{sub.desc}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Sticky Footer */}
          <div className="p-5 border-t border-brand-rule bg-brand-paper shadow-[0_-8px_20px_-8px_rgba(0,0,0,0.05)]">
            <a 
              href="/book" 
              onClick={() => setMobileMenuOpen(false)} 
              className="w-full text-center block bg-brand-primary text-brand-paper py-3 rounded-full font-bold text-sm shadow-md"
            >
              Book a Free Trial
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
