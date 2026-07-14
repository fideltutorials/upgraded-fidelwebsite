"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import NavbarSecond from "@/components/NavbarSecond";
import NavbarFourth from "@/components/NavbarFourth";
import NavbarFifth from "@/components/NavbarFifth";
import Footer from "@/components/Footer";

interface LayoutProps {
  title?: string;
  description?: string;
  navVersion?: "default" | "pill" | "mega" | "minimal";
  children: React.ReactNode;
}

export default function Layout({
  title = "Fidel Tutorial — Tutoring built for the moments that count",
  description = "Fidel Tutorial pairs students across Ethiopia and the diaspora with vetted tutors and a track record of results. KG through university, SAT, TOEFL, IELTS, exam bootcamps, summer camps. Online and in-home. Addis Ababa.",
  navVersion = "minimal",
  children,
}: LayoutProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = title;
      
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute("content", description);
    }
  }, [title, description]);

  return (
    <div className="bg-brand-paper text-brand-ink selection:bg-brand-primary/10 selection:text-brand-primary min-h-screen flex flex-col font-sans antialiased overflow-x-hidden">
      {navVersion === "pill" && <NavbarSecond />}
      {navVersion === "mega" && <NavbarFourth />}
      {navVersion === "default" && <Navbar />}
      {navVersion === "minimal" && <NavbarFifth />}

      <main className={`flex-1 w-full ${navVersion === "pill" ? "pt-16" : ""}`}>
        {children}
      </main>

      <div>
        <Footer />
      </div>
    </div>
  );
}
