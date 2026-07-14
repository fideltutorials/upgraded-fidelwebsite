"use client";

import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import DashboardSection from "@/components/admin/DashboardSection";
import BookingsSection from "@/components/admin/BookingsSection";
import BlogsSection from "@/components/admin/BlogsSection";
import TutorsSection from "@/components/admin/TutorsSection";

type Section = "dashboard" | "bookings" | "blogs" | "tutors";

const SIDEBAR_ITEMS: { key: Section; label: string; icon: React.ReactNode }[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    key: "bookings",
    label: "Bookings",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    key: "blogs",
    label: "Blog Posts",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    key: "tutors",
    label: "Tutors",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (section: string) => {
    setActiveSection(section as Section);
    setSidebarOpen(false);
  };

  return (
    <AdminLayout title="Admin — Fidel Tutorial">
      <div className="flex min-h-[calc(100vh-3.5rem)]">
        {/* ─── Mobile sidebar toggle ─── */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed bottom-5 left-5 z-50 lg:hidden w-12 h-12 bg-brand-primary text-brand-paper rounded-full shadow-xl flex items-center justify-center hover:bg-brand-primary-deep transition-colors cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {sidebarOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>

        {/* ─── Mobile backdrop ─── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ─── Sidebar ─── */}
        <aside
          className={`
            fixed top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-56 bg-white border-r border-brand-rule
            flex flex-col justify-between
            transition-transform duration-300 ease-out
            lg:sticky lg:translate-x-0 lg:flex-shrink-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <nav className="flex flex-col gap-1 p-3 pt-4">
            {SIDEBAR_ITEMS.map((item) => {
              const isActive = activeSection === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavigate(item.key)}
                  className={`
                    flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer text-left
                    ${isActive
                      ? "bg-brand-primary/8 text-brand-primary border-l-[3px] border-brand-primary pl-3"
                      : "text-brand-muted hover:text-brand-ink hover:bg-brand-cream-warm/50 border-l-[3px] border-transparent pl-3"
                    }
                  `}
                >
                  <span className={`flex-shrink-0 ${isActive ? "text-brand-primary" : ""}`}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-brand-rule">
            <p className="text-[10px] text-brand-muted text-center font-medium tracking-wider uppercase">
              Fidel Admin v1.0
            </p>
          </div>
        </aside>

        {/* ─── Main content area ─── */}
        <main className="flex-1 min-w-0 p-6 lg:p-8">
          {activeSection === "dashboard" && (
            <DashboardSection onNavigate={handleNavigate} />
          )}
          {activeSection === "bookings" && <BookingsSection />}
          {activeSection === "blogs" && <BlogsSection />}
          {activeSection === "tutors" && <TutorsSection />}
        </main>
      </div>
    </AdminLayout>
  );
}
