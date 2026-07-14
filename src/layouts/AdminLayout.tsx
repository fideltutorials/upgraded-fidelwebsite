"use client";

import React, { useEffect } from "react";

interface AdminLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function AdminLayout({
  title = "Admin — Fidel Tutorial",
  children,
}: AdminLayoutProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = title;
    }
  }, [title]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-brand-paper text-brand-ink font-sans antialiased">
      {/* Admin Top Bar */}
      <header className="sticky top-0 z-50 bg-brand-primary-deep border-b border-brand-primary/30">
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/admin" className="flex items-center gap-2.5 group">
              <span className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-brand-secondary font-serif font-bold text-sm">
                ፊ
              </span>
              <span className="text-brand-cream font-serif font-semibold text-sm">
                Fidel Admin
              </span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-brand-cream/60 hover:text-brand-cream transition-colors"
            >
              View Site ↗
            </a>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-md text-xs font-medium text-brand-cream/80 hover:text-brand-cream hover:bg-white/10 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  );
}
