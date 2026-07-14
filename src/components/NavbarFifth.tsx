"use client";

import React, { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  Menu01Icon, 
  Cancel01Icon, 
  ChevronDownIcon,
  BookUserIcon,
  Award01Icon,
  Book02Icon,
  GlobeIcon,
  SchoolIcon,
  UserGroupIcon
} from "@hugeicons/core-free-icons";
import { buttonVariants } from "@/components/ui/button";

export default function NavbarFifth() {
  const [mobileOpen, setMobileOpen] = useState(false);

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

          {/* Grouped Hover Navigation (Creative Dropdowns) */}
          <nav className="hidden md:flex items-center gap-6">
            
            {/* Group 1: Learn */}
            <div className="relative group py-4">
              <button className="flex items-center gap-1 text-xs font-bold text-brand-ink hover:text-brand-primary transition-colors cursor-pointer select-none">
                <span>Learn</span>
                <HugeiconsIcon icon={ChevronDownIcon} size={11} className="opacity-55 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
                <div className="bg-brand-paper/95 backdrop-blur-md border border-brand-rule p-3 rounded-2xl shadow-xl w-64 flex flex-col gap-1">
                  <a href="/programs" className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-brand-cream-warm/40 transition-colors">
                    <span className="text-brand-primary mt-0.5"><HugeiconsIcon icon={BookUserIcon} size={16} /></span>
                    <div>
                      <span className="block text-xs font-bold text-brand-ink">Academic Programs</span>
                      <span className="block text-[10px] text-brand-muted mt-0.5">Explore our custom packages.</span>
                    </div>
                  </a>
                  <a href="/tutors" className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-brand-cream-warm/40 transition-colors">
                    <span className="text-brand-primary mt-0.5"><HugeiconsIcon icon={UserGroupIcon} size={16} /></span>
                    <div>
                      <span className="block text-xs font-bold text-brand-ink">Our Tutor Directory</span>
                      <span className="block text-[10px] text-brand-muted mt-0.5">Meet vetted educational mentors.</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Group 2: Resources */}
            <div className="relative group py-4">
              <button className="flex items-center gap-1 text-xs font-bold text-brand-ink hover:text-brand-primary transition-colors cursor-pointer select-none">
                <span>Resources</span>
                <HugeiconsIcon icon={ChevronDownIcon} size={11} className="opacity-55 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
                <div className="bg-brand-paper/95 backdrop-blur-md border border-brand-rule p-3 rounded-2xl shadow-xl w-64 flex flex-col gap-1">
                  <a href="/resources" className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-brand-cream-warm/40 transition-colors">
                    <span className="text-brand-primary mt-0.5"><HugeiconsIcon icon={Book02Icon} size={16} /></span>
                    <div>
                      <span className="block text-xs font-bold text-brand-ink">Mock Papers Hub</span>
                      <span className="block text-[10px] text-brand-muted mt-0.5">Download free PDFs & test mocks.</span>
                    </div>
                  </a>
                  <a href="/blog" className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-brand-cream-warm/40 transition-colors">
                    <span className="text-brand-primary mt-0.5"><HugeiconsIcon icon={BookUserIcon} size={16} /></span>
                    <div>
                      <span className="block text-xs font-bold text-brand-ink">Learning Blog</span>
                      <span className="block text-[10px] text-brand-muted mt-0.5">Vetting tips and testing guides.</span>
                    </div>
                  </a>
                  <a href="/faq" className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-brand-cream-warm/40 transition-colors">
                    <span className="text-brand-primary mt-0.5"><HugeiconsIcon icon={Award01Icon} size={16} /></span>
                    <div>
                      <span className="block text-xs font-bold text-brand-ink">Help Center / FAQ</span>
                      <span className="block text-[10px] text-brand-muted mt-0.5">Get quick answers to basic policies.</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Group 3: Partnerships */}
            <div className="relative group py-4">
              <button className="flex items-center gap-1 text-xs font-bold text-brand-ink hover:text-brand-primary transition-colors cursor-pointer select-none">
                <span>Partnerships</span>
                <HugeiconsIcon icon={ChevronDownIcon} size={11} className="opacity-55 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
                <div className="bg-brand-paper/95 backdrop-blur-md border border-brand-rule p-3 rounded-2xl shadow-xl w-64 flex flex-col gap-1">
                  <a href="/schools" className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-brand-cream-warm/40 transition-colors">
                    <span className="text-brand-primary mt-0.5"><HugeiconsIcon icon={SchoolIcon} size={16} /></span>
                    <div>
                      <span className="block text-xs font-bold text-brand-ink">School Programs</span>
                      <span className="block text-[10px] text-brand-muted mt-0.5">Partnerships for NGOs and private schools.</span>
                    </div>
                  </a>
                  <a href="/diaspora" className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-brand-cream-warm/40 transition-colors">
                    <span className="text-brand-primary mt-0.5"><HugeiconsIcon icon={GlobeIcon} size={16} /></span>
                    <div>
                      <span className="block text-xs font-bold text-brand-ink">Diaspora Sponsoring</span>
                      <span className="block text-[10px] text-brand-muted mt-0.5">Fund relatives' packages from abroad.</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Group 4: Company */}
            <div className="relative group py-4">
              <button className="flex items-center gap-1 text-xs font-bold text-brand-ink hover:text-brand-primary transition-colors cursor-pointer select-none">
                <span>Company</span>
                <HugeiconsIcon icon={ChevronDownIcon} size={11} className="opacity-55 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
                <div className="bg-brand-paper/95 backdrop-blur-md border border-brand-rule p-3 rounded-2xl shadow-xl w-64 flex flex-col gap-1">
                  <a href="/about" className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-brand-cream-warm/40 transition-colors">
                    <span className="text-brand-primary mt-0.5"><HugeiconsIcon icon={BookUserIcon} size={16} /></span>
                    <div>
                      <span className="block text-xs font-bold text-brand-ink">Our Story</span>
                      <span className="block text-[10px] text-brand-muted mt-0.5">Read our five-year Addis story.</span>
                    </div>
                  </a>
                  <a href="/contact" className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-brand-cream-warm/40 transition-colors">
                    <span className="text-brand-primary mt-0.5"><HugeiconsIcon icon={UserGroupIcon} size={16} /></span>
                    <div>
                      <span className="block text-xs font-bold text-brand-ink">Contact Advisors</span>
                      <span className="block text-[10px] text-brand-muted mt-0.5">Talk to our curriculum advisors.</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

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

            <nav className="flex flex-col gap-2.5">
              <a
                href="/"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-lg text-xs font-bold text-brand-ink hover:bg-brand-cream-warm transition-all"
              >
                Home
              </a>
              <a
                href="/programs"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-lg text-xs font-bold text-brand-ink hover:bg-brand-cream-warm transition-all"
              >
                Programs
              </a>
              <a
                href="/schools"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-lg text-xs font-bold text-brand-ink hover:bg-brand-cream-warm transition-all"
              >
                Partnerships
              </a>
              <a
                href="/diaspora"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-lg text-xs font-bold text-brand-ink hover:bg-brand-cream-warm transition-all"
              >
                Diaspora
              </a>
              <a
                href="/resources"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-lg text-xs font-bold text-brand-ink hover:bg-brand-cream-warm transition-all"
              >
                Resources
              </a>
              <a
                href="/blog"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-lg text-xs font-bold text-brand-ink hover:bg-brand-cream-warm transition-all"
              >
                Blog
              </a>
              <a
                href="/tutors"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-lg text-xs font-bold text-brand-ink hover:bg-brand-cream-warm transition-all"
              >
                Tutors
              </a>
              <a
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-lg text-xs font-bold text-brand-ink hover:bg-brand-cream-warm transition-all"
              >
                About
              </a>
              <a
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-lg text-xs font-bold text-brand-ink hover:bg-brand-cream-warm transition-all"
              >
                Contact
              </a>
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
