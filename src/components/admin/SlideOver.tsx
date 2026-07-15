"use client";

import { X } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useEffect } from "react";

interface SlideOverProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}

export default function SlideOver({
  open,
  onClose,
  title,
  children,
  wide,
}: SlideOverProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // // Close on Escape
  // useEffect(() => {
  //   const handleKey = (e: KeyboardEvent) => {
  //     if (e.key === "Escape") onClose();
  //   };
  //   if (open) window.addEventListener("keydown", handleKey);
  //   return () => window.removeEventListener("keydown", handleKey);
  // }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full ${wide ? "w-full max-w-2xl" : "w-full max-w-lg"} bg-brand-paper shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-rule bg-brand-cream-warm/20 flex-shrink-0">
          <h2 className="font-serif text-lg font-bold text-brand-ink">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-muted hover:text-brand-ink hover:bg-brand-cream transition-colors cursor-pointer"
            aria-label="Close panel"
          >
            <HugeiconsIcon icon={X} size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
      </div>
    </>
  );
}
