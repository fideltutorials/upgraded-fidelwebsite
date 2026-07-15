"use client";

import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import DashboardSection from "@/components/admin/DashboardSection";
import BookingsSection from "@/components/admin/BookingsSection";
import BlogsSection from "@/components/admin/BlogsSection";
import TutorsSection from "@/components/admin/TutorsSection";
import TestimonialsSection from "@/components/admin/TestimonialsSection";
import FaqSection from "@/components/admin/FaqSection";
import LeadsSection from "@/components/admin/LeadsSection";
import ResourcesSection from "@/components/admin/ResourcesSection";
import ProgramsSection from "@/components/admin/ProgramsSection";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown,
  Calendar,
  Document,
  Download01Icon,
  GraduationCapIcon,
  Message01Icon,
  PencilEdit02Icon,
  Question,
  SquareStackIcon,
} from "@hugeicons/core-free-icons";

export default function AdminDashboard() {
  const [expanded, setExpanded] = useState({
    bookings: true,
    blogs: true,
    tutors: true,
    testimonials: false,
    faq: false,
    leads: false,
    resources: false,
    programs: false,
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
                <HugeiconsIcon icon={Calendar} />
              </span>
              <h2 className="font-serif text-lg font-bold text-brand-ink">
                Trial Bookings
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-muted font-medium">
                {expanded.bookings ? "Collapse" : "Expand"}
              </span>
              <span
                className={`transform transition-transform duration-300 ${expanded.bookings ? "rotate-180" : ""} text-brand-muted`}
              >
                <HugeiconsIcon icon={ArrowDown} size={20} />
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
                <HugeiconsIcon icon={PencilEdit02Icon} />
              </span>
              <h2 className="font-serif text-lg font-bold text-brand-ink">
                Blog Posts
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-muted font-medium">
                {expanded.blogs ? "Collapse" : "Expand"}
              </span>
              <span
                className={`transform transition-transform duration-300 ${expanded.blogs ? "rotate-180" : ""} text-brand-muted`}
              >
                <HugeiconsIcon icon={ArrowDown} size={20} />
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
                <HugeiconsIcon icon={GraduationCapIcon} />
              </span>
              <h2 className="font-serif text-lg font-bold text-brand-ink">
                Tutors
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-muted font-medium">
                {expanded.tutors ? "Collapse" : "Expand"}
              </span>
              <span
                className={`transform transition-transform duration-300 ${expanded.tutors ? "rotate-180" : ""} text-brand-muted`}
              >
                <HugeiconsIcon icon={ArrowDown} size={20} />
              </span>
            </div>
          </button>

          {expanded.tutors && (
            <div className="border-t border-brand-rule p-6 lg:p-8 bg-white">
              <TutorsSection />
            </div>
          )}
        </section>

        {/* ─── Leads Section (Collapsible) ─── */}
        <section
          id="leads"
          className="bg-white rounded-2xl border border-brand-rule shadow-sm overflow-hidden transition-all duration-300 hover:border-brand-primary/20"
        >
          <button
            onClick={() => toggleSection("leads")}
            className="w-full flex items-center justify-between p-5 bg-brand-cream-warm/5 hover:bg-brand-cream-warm/15 transition-colors cursor-pointer text-left border-none outline-none"
          >
            <div className="flex items-center gap-3">
              <span className="text-brand-primary">
                <HugeiconsIcon icon={Document} />
              </span>
              <h2 className="font-serif text-lg font-bold text-brand-ink">
                Captured Leads & Inquiries
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-muted font-medium">
                {expanded.leads ? "Collapse" : "Expand"}
              </span>
              <span
                className={`transform transition-transform duration-300 ${expanded.leads ? "rotate-180" : ""} text-brand-muted`}
              >
                <HugeiconsIcon icon={ArrowDown} size={20} />
              </span>
            </div>
          </button>

          {expanded.leads && (
            <div className="border-t border-brand-rule p-6 lg:p-8 bg-white">
              <LeadsSection />
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
                <HugeiconsIcon icon={Message01Icon} />
              </span>
              <h2 className="font-serif text-lg font-bold text-brand-ink">
                Testimonials
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-muted font-medium">
                {expanded.testimonials ? "Collapse" : "Expand"}
              </span>
              <span
                className={`transform transition-transform duration-300 ${expanded.testimonials ? "rotate-180" : ""} text-brand-muted`}
              >
                <HugeiconsIcon icon={ArrowDown} size={20} />
              </span>
            </div>
          </button>

          {expanded.testimonials && (
            <div className="border-t border-brand-rule p-6 lg:p-8 bg-white">
              <TestimonialsSection />
            </div>
          )}
        </section>

        {/* ─── FAQ Section (Collapsible) ─── */}
        <section
          id="faq"
          className="bg-white rounded-2xl border border-brand-rule shadow-sm overflow-hidden transition-all duration-300 hover:border-brand-primary/20"
        >
          <button
            onClick={() => toggleSection("faq")}
            className="w-full flex items-center justify-between p-5 bg-brand-cream-warm/5 hover:bg-brand-cream-warm/15 transition-colors cursor-pointer text-left border-none outline-none"
          >
            <div className="flex items-center gap-3">
              <span className="text-brand-primary">
                <HugeiconsIcon icon={Question} />
              </span>
              <h2 className="font-serif text-lg font-bold text-brand-ink">
                FAQ Items
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-muted font-medium">
                {expanded.faq ? "Collapse" : "Expand"}
              </span>
              <span
                className={`transform transition-transform duration-300 ${expanded.faq ? "rotate-180" : ""} text-brand-muted`}
              >
                <HugeiconsIcon icon={ArrowDown} size={20} />
              </span>
            </div>
          </button>

          {expanded.faq && (
            <div className="border-t border-brand-rule p-6 lg:p-8 bg-white">
              <FaqSection />
            </div>
          )}
        </section>

        {/* ─── Resources Section (Collapsible) ─── */}
        <section
          id="resources"
          className="bg-white rounded-2xl border border-brand-rule shadow-sm overflow-hidden transition-all duration-300 hover:border-brand-primary/20"
        >
          <button
            onClick={() => toggleSection("resources")}
            className="w-full flex items-center justify-between p-5 bg-brand-cream-warm/5 hover:bg-brand-cream-warm/15 transition-colors cursor-pointer text-left border-none outline-none"
          >
            <div className="flex items-center gap-3">
              <span className="text-brand-primary">
                <HugeiconsIcon icon={Download01Icon} />
              </span>
              <h2 className="font-serif text-lg font-bold text-brand-ink">
                Downloadable Study Resources
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-muted font-medium">
                {expanded.resources ? "Collapse" : "Expand"}
              </span>
              <span
                className={`transform transition-transform duration-300 ${expanded.resources ? "rotate-180" : ""} text-brand-muted`}
              >
                <HugeiconsIcon icon={ArrowDown} size={20} />
              </span>
            </div>
          </button>

          {expanded.resources && (
            <div className="border-t border-brand-rule p-6 lg:p-8 bg-white">
              <ResourcesSection />
            </div>
          )}
        </section>

        {/* ─── Programs Section (Collapsible) ─── */}
        <section
          id="programs-admin"
          className="bg-white rounded-2xl border border-brand-rule shadow-sm overflow-hidden transition-all duration-300 hover:border-brand-primary/20"
        >
          <button
            onClick={() => toggleSection("programs")}
            className="w-full flex items-center justify-between p-5 bg-brand-cream-warm/5 hover:bg-brand-cream-warm/15 transition-colors cursor-pointer text-left border-none outline-none"
          >
            <div className="flex items-center gap-3">
              <span className="text-brand-primary">
                <HugeiconsIcon icon={SquareStackIcon} />
              </span>
              <h2 className="font-serif text-lg font-bold text-brand-ink">
                Academic Programs
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-muted font-medium">
                {expanded.programs ? "Collapse" : "Expand"}
              </span>
              <span
                className={`transform transition-transform duration-300 ${expanded.programs ? "rotate-180" : ""} text-brand-muted`}
              >
                <HugeiconsIcon icon={ArrowDown} size={20} />
              </span>
            </div>
          </button>

          {expanded.programs && (
            <div className="border-t border-brand-rule p-6 lg:p-8 bg-white">
              <ProgramsSection />
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
}
