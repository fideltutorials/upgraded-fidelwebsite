"use client";

import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import DashboardSection from "@/components/admin/DashboardSection";
import BookingsSection from "@/components/admin/BookingsSection";
import BlogsSection from "@/components/admin/BlogsSection";
import TutorsSection from "@/components/admin/TutorsSection";
import TestimonialsSection from "@/components/admin/TestimonialsSection";

export default function AdminDashboard() {
  const [expanded, setExpanded] = useState({
    bookings: true,
    blogs: true,
    tutors: true,
    testimonials: false,
  });

  const handleNavigate = (section: string) => {
    const secKey = section as keyof typeof expanded;
    if (secKey in expanded) {
      setExpanded((prev) => ({ ...prev, [secKey]: true }));
    }
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        const offset = 80; // offset for the sticky header
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const toggleSection = (section: keyof typeof expanded) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <AdminLayout title="Admin Dashboard — Fidel Tutorial">
      <div className="max-w-[1200px] mx-auto px-4 py-8 lg:py-12 flex flex-col gap-8">
        
        {/* ─── Dashboard Overview (Always Visible) ─── */}
        <section className="bg-white rounded-2xl border border-brand-rule shadow-sm p-6 lg:p-8">
          <DashboardSection onNavigate={handleNavigate} />
        </section>

        {/* ─── Bookings Section (Collapsible) ─── */}
        <section
          id="bookings"
          className="bg-white rounded-2xl border border-brand-rule shadow-sm overflow-hidden transition-all duration-300 hover:border-brand-primary/20"
        >
          <button
            onClick={() => toggleSection("bookings")}
            className="w-full flex items-center justify-between p-5 bg-brand-cream-warm/5 hover:bg-brand-cream-warm/15 transition-colors cursor-pointer text-left border-none outline-none"
          >
            <div className="flex items-center gap-3">
              <span className="text-brand-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <h2 className="font-serif text-lg font-bold text-brand-ink">Trial Bookings</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-muted font-medium">
                {expanded.bookings ? "Collapse" : "Expand"}
              </span>
              <span className={`transform transition-transform duration-300 ${expanded.bookings ? 'rotate-180' : ''} text-brand-muted`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </div>
          </button>
          
          {expanded.bookings && (
            <div className="border-t border-brand-rule p-6 lg:p-8 bg-white">
              <BookingsSection />
            </div>
          )}
        </section>

        {/* ─── Blog Posts Section (Collapsible) ─── */}
        <section
          id="blogs"
          className="bg-white rounded-2xl border border-brand-rule shadow-sm overflow-hidden transition-all duration-300 hover:border-brand-primary/20"
        >
          <button
            onClick={() => toggleSection("blogs")}
            className="w-full flex items-center justify-between p-5 bg-brand-cream-warm/5 hover:bg-brand-cream-warm/15 transition-colors cursor-pointer text-left border-none outline-none"
          >
            <div className="flex items-center gap-3">
              <span className="text-brand-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </span>
              <h2 className="font-serif text-lg font-bold text-brand-ink">Blog Posts</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-muted font-medium">
                {expanded.blogs ? "Collapse" : "Expand"}
              </span>
              <span className={`transform transition-transform duration-300 ${expanded.blogs ? 'rotate-180' : ''} text-brand-muted`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </div>
          </button>
          
          {expanded.blogs && (
            <div className="border-t border-brand-rule p-6 lg:p-8 bg-white">
              <BlogsSection />
            </div>
          )}
        </section>

        {/* ─── Tutors Section (Collapsible) ─── */}
        <section
          id="tutors"
          className="bg-white rounded-2xl border border-brand-rule shadow-sm overflow-hidden transition-all duration-300 hover:border-brand-primary/20"
        >
          <button
            onClick={() => toggleSection("tutors")}
            className="w-full flex items-center justify-between p-5 bg-brand-cream-warm/5 hover:bg-brand-cream-warm/15 transition-colors cursor-pointer text-left border-none outline-none"
          >
            <div className="flex items-center gap-3">
              <span className="text-brand-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              <h2 className="font-serif text-lg font-bold text-brand-ink">Tutors</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-muted font-medium">
                {expanded.tutors ? "Collapse" : "Expand"}
              </span>
              <span className={`transform transition-transform duration-300 ${expanded.tutors ? 'rotate-180' : ''} text-brand-muted`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </div>
          </button>
          
          {expanded.tutors && (
            <div className="border-t border-brand-rule p-6 lg:p-8 bg-white">
              <TutorsSection />
            </div>
          )}
        </section>

        {/* ─── Testimonials Section (Collapsible) ─── */}
        <section
          id="testimonials"
          className="bg-white rounded-2xl border border-brand-rule shadow-sm overflow-hidden transition-all duration-300 hover:border-brand-primary/20"
        >
          <button
            onClick={() => toggleSection("testimonials")}
            className="w-full flex items-center justify-between p-5 bg-brand-cream-warm/5 hover:bg-brand-cream-warm/15 transition-colors cursor-pointer text-left border-none outline-none"
          >
            <div className="flex items-center gap-3">
              <span className="text-brand-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </span>
              <h2 className="font-serif text-lg font-bold text-brand-ink">Testimonials</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-muted font-medium">
                {expanded.testimonials ? "Collapse" : "Expand"}
              </span>
              <span className={`transform transition-transform duration-300 ${expanded.testimonials ? 'rotate-180' : ''} text-brand-muted`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </div>
          </button>
          
          {expanded.testimonials && (
            <div className="border-t border-brand-rule p-6 lg:p-8 bg-white">
              <TestimonialsSection />
            </div>
          )}
        </section>
        
      </div>
    </AdminLayout>
  );
}
