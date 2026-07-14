"use client";

import Layout from "@/layouts/Layout";
import { HugeiconsIcon } from "@hugeicons/react";
import { Book02Icon, BookOpenIcon, Award01Icon } from "@hugeicons/core-free-icons";
import FaqAccordion from "@/components/FaqAccordion";

interface Paper {
  title: string;
  year: string;
  grade: string;
}

const papers: Paper[] = [
  { title: "Mathematics Examination Paper", year: "2025", grade: "Grade 12 / EHEECE" },
  { title: "English Language Examination Paper", year: "2025", grade: "Grade 12 / EHEECE" },
  { title: "General Sciences Diagnostic test", year: "2024", grade: "Grade 8" },
  { title: "Aptitude & General Knowledge Mocks", year: "2024", grade: "Grade 6" },
];

export default function Resources() {
  return (
    <Layout
      title="Free Learning Resources — Fidel Tutorial"
      description="Download free past papers, mock exam templates, and explore study tips for grade 6, grade 8, and grade 12 national exams."
    >
      {/* Header */}
      <section className="py-16 md:py-24 bg-brand-cream-warm/40 border-b border-brand-rule">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-3 font-semibold">Resources Hub</span>
          <h1 className="font-serif text-4xl md:text-6xl font-medium text-brand-ink tracking-tight mb-6">
            Free Study Assets &amp; Mocks
          </h1>
          <p className="text-brand-muted text-lg leading-relaxed max-w-2xl mx-auto">
            Access past papers archives, mock testing booklets, study schedules, and blog tips prepared by our lead instructors.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LHS: Materials & Mocks */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            {/* Past Papers Archives */}
            <div id="past-papers" className="scroll-mt-24">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-brand-ink mb-6 flex items-center gap-2">
                <span className="text-brand-primary">
                  <HugeiconsIcon icon={BookOpenIcon} size={24} />
                </span>
                National Exam Past Papers
              </h2>
              <p className="text-brand-muted text-sm leading-relaxed mb-6">
                Get official past exam papers to understand question structure and common test patterns. Available for Grade 6, 8, and 12 levels.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {papers.map((paper, idx) => (
                  <div key={idx} className="p-5 border border-brand-rule rounded-xl bg-brand-paper/50 flex flex-col justify-between hover:border-brand-primary transition-colors">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-brand-secondary block mb-1">{paper.grade}</span>
                      <h4 className="font-serif text-base font-bold text-brand-ink">{paper.title}</h4>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-brand-rule/65 text-xs text-brand-muted">
                      <span>Year: {paper.year}</span>
                      <a href="#" className="font-bold text-brand-primary hover:text-brand-primary-deep">Download PDF →</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mock Exams */}
            <div id="mock-exams" className="scroll-mt-24">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-brand-ink mb-6 flex items-center gap-2">
                <span className="text-brand-primary">
                  <HugeiconsIcon icon={Award01Icon} size={24} />
                </span>
                Fidel Mock Practice Bundles
              </h2>
              <p className="text-brand-muted text-sm leading-relaxed mb-6">
                Our subject prep teams write custom testing papers annually to help bootcamps candidates test their timing and scoring ranges under realistic setups.
              </p>
              <div className="p-6 border border-brand-rule rounded-xl bg-brand-cream-warm/35 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="max-w-md">
                  <h4 className="font-serif text-lg font-bold text-brand-ink mb-1">Weekly Saturday Test Bundles</h4>
                  <p className="text-xs text-brand-muted leading-relaxed">Includes test files, solutions keys sheets, and performance score tables.</p>
                </div>
                <a href="/contact" className="bg-brand-primary text-brand-paper hover:bg-brand-primary-deep px-5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap">
                  Request Practice Booklet
                </a>
              </div>
            </div>

            {/* Study Tips Blog */}
            <div id="blog" className="scroll-mt-24">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-brand-ink mb-6 flex items-center gap-2">
                <span className="text-brand-primary">
                  <HugeiconsIcon icon={Book02Icon} size={24} />
                </span>
                Parent &amp; Student Study Tips
              </h2>
              <p className="text-brand-muted text-sm leading-relaxed mb-6">
                Helpful tips on managing testing anxieties, establishing study schedules, and selecting high school subjects.
              </p>
              <div className="flex flex-col gap-4">
                <a href="#" className="block p-5 border border-brand-rule rounded-xl hover:border-brand-primary transition-all">
                  <span className="text-[10px] text-brand-primary font-bold uppercase">Study Skills</span>
                  <h4 className="font-serif text-lg font-semibold text-brand-ink mt-1">How to create a balanced study plan at home</h4>
                  <p className="text-xs text-brand-muted mt-2">A short, step-by-step guide for parents looking to build accountability habits in high school children.</p>
                </a>
                <a href="#" className="block p-5 border border-brand-rule rounded-xl hover:border-brand-primary transition-all">
                  <span className="text-[10px] text-brand-primary font-bold uppercase">Exam Prep</span>
                  <h4 className="font-serif text-lg font-semibold text-brand-ink mt-1">Succeeding in the EHEECE: 5 Common Traps to Avoid</h4>
                  <p className="text-xs text-brand-muted mt-2">Insight notes from our lead mathematics bootcamp instructor on common errors Grade-12 test candidates make.</p>
                </a>
              </div>
            </div>
          </div>

          {/* RHS: LMS Portal Card */}
          <div className="lg:col-span-4">
            <div className="bg-brand-primary-deep text-brand-paper border border-white/10 rounded-2xl p-8 sticky top-24 shadow-xl">
              <span className="text-brand-secondary text-xs uppercase font-bold tracking-widest block mb-2">Student Area</span>
              <h3 className="font-serif text-2xl font-bold mb-4">Student LMS Portal</h3>
              <p className="text-brand-cream/80 text-xs leading-relaxed mb-6">
                Log in to your whiteboard dashboard to access homework, scheduled online sessions links, mock testing results reports, and review recordings.
              </p>
              <a 
                href="https://lms.fideltutorial.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full text-center bg-brand-secondary hover:bg-brand-secondary-soft text-brand-ink py-3 rounded-lg font-bold text-xs inline-block transition-colors shadow-md"
              >
                Access LMS Account Login
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-brand-cream-warm/20 border-t border-brand-rule scroll-mt-24" id="faq">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-2">Got questions?</span>
            <h2 className="font-serif text-3xl font-semibold text-brand-ink">Frequently Asked Questions</h2>
          </div>
          <FaqAccordion />
        </div>
      </section>
    </Layout>
  );
}
