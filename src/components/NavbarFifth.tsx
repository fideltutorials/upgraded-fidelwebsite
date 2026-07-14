"use client";

import React, { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
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
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-brand-rule">
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

          {/* Minimal Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            <a
              href="/programs"
              className="px-4 py-2 rounded-lg text-xs font-bold text-brand-ink hover:text-brand-primary hover:bg-brand-cream-warm/40 transition-all"
            >
              Programs
            </a>
            <a
              href="/tutors"
              className="px-4 py-2 rounded-lg text-xs font-bold text-brand-ink hover:text-brand-primary hover:bg-brand-cream-warm/40 transition-all"
            >
              Tutors
            </a>
            <a
              href="/diaspora"
              className="px-4 py-2 rounded-lg text-xs font-bold text-brand-ink hover:text-brand-primary hover:bg-brand-cream-warm/40 transition-all"
            >
              Diaspora
            </a>
            <a
              href="/resources"
              className="px-4 py-2 rounded-lg text-xs font-bold text-brand-ink hover:text-brand-primary hover:bg-brand-cream-warm/40 transition-all"
            >
              Resources
            </a>
            <a
              href="/contact"
              className="px-4 py-2 rounded-lg text-xs font-bold text-brand-ink hover:text-brand-primary hover:bg-brand-cream-warm/40 transition-all"
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
                className: "hidden md:inline-flex rounded-full text-[11px] font-bold px-4 py-2 shadow-sm hover:scale-[1.02] transition-transform",
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
          <div className="fixed right-0 top-0 bottom-0 w-64 bg-brand-paper p-6 shadow-2xl flex flex-col gap-6 animate-in slide-in-from-right duration-300">
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
                href="/tutors"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-lg text-xs font-bold text-brand-ink hover:bg-brand-cream-warm transition-all"
              >
                Tutors
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
