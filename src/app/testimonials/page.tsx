"use client";

import React, { useState } from "react";
import Layout from "@/layouts/Layout";
import { HugeiconsIcon } from "@hugeicons/react";
import { Award01Icon, UserGroupIcon, GlobeIcon, StarIcon } from "@hugeicons/core-free-icons";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  category: "all" | "parents" | "diaspora" | "bootcamps";
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "The change was not just in the marks — it was in how she sat down to study. The tutor didn't just teach the subject, she taught my daughter how to learn it.",
    author: "Meron T.",
    role: "Parent of a Grade-9 student · Bole",
    category: "parents",
    initials: "MT",
  },
  {
    quote: "We are in Washington and our nephew is in Addis. Fidel made it simple — we pay here, he learns there, and we get a monthly progress note. It just works.",
    author: "Tewodros A.",
    role: "Diaspora sponsor · Washington, DC",
    category: "diaspora",
    initials: "TA",
  },
  {
    quote: "The Grade-12 bootcamp was the most organised support my son received in his exam year. Weekly mocks made the real exam feel ordinary.",
    author: "Rahel B.",
    role: "Parent of an EHEECE candidate · Lebu",
    category: "bootcamps",
    initials: "RB",
  },
  {
    quote: "Finding a tutor back home used to be a hassle of trust. Fidel's monthly feedback logs and Stripe USD payment portal makes sponsoring my siblings' education entirely hands-off.",
    author: "Saron W.",
    role: "Diaspora Sponsor · London, UK",
    category: "diaspora",
    initials: "SW",
  },
  {
    quote: "My math diagnostic went from 45% in October to 88% on the final EHEECE national exam. The Saturday mocks taught me exactly how to manage my time.",
    author: "Kaleb D.",
    role: "Grade 12 Student · Addis Ababa",
    category: "bootcamps",
    initials: "KD",
  },
  {
    quote: "Fidel matches tutors based on personality, not just availability. Our physics tutor is a role model who got my son excited about engineering.",
    author: "Dr. Elias H.",
    role: "Parent of Grade 10 student · Old Airport",
    category: "parents",
    initials: "EH",
  },
];

const stats = [
  { value: "94%", label: "EHEECE exam pass rate", icon: Award01Icon },
  { value: "+180", label: "Average SAT score increase", icon: StarIcon },
  { value: "500+", label: "Addis families matched", icon: UserGroupIcon },
  { value: "15+", label: "Diaspora sponsor cities", icon: GlobeIcon },
];

export default function TestimonialsPage() {
  const [filter, setFilter] = useState<"all" | "parents" | "diaspora" | "bootcamps">("all");

  const filteredTestimonials = filter === "all" 
    ? testimonials 
    : testimonials.filter((t) => t.category === filter);

  return (
    <Layout
      title="Success Stories & Testimonials — Fidel Tutorial"
      description="Read reviews, feedback, and success stories from parents, students, and diaspora sponsors who partner with Fidel Tutorial."
    >
      {/* Hero Header */}
      <section className="py-16 md:py-24 bg-brand-cream-warm/40 border-b border-brand-rule">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-3 font-semibold">Success Stories</span>
          <h1 className="font-serif text-4xl md:text-6xl font-medium text-brand-ink tracking-tight mb-6">
            Trusted by Hundreds of Families
          </h1>
          <p className="text-brand-muted text-lg leading-relaxed max-w-2xl mx-auto">
            From local exam candidates to global sponsors, discover how our matching standards and structured assessments yield results.
          </p>
        </div>
      </section>

      {/* Stats Board */}
      <section className="py-12 bg-brand-paper border-b border-brand-rule">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-6 border border-brand-rule rounded-2xl bg-brand-cream-warm/10">
                <span className="text-brand-primary block mb-3">
                  <HugeiconsIcon icon={stat.icon} size={24} />
                </span>
                <span className="font-serif text-3xl md:text-4xl font-bold text-brand-ink mb-1">
                  {stat.value}
                </span>
                <span className="text-xs text-brand-muted font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Catalog */}
      <section className="py-20 bg-brand-paper">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { id: "all", label: "All Stories" },
              { id: "parents", label: "Parents in Addis" },
              { id: "diaspora", label: "Diaspora Sponsors" },
              { id: "bootcamps", label: "Exam Candidates" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                  filter === btn.id
                    ? "bg-brand-primary border-brand-primary text-brand-paper shadow-sm"
                    : "bg-white border-brand-rule text-brand-ink hover:bg-brand-cream-warm"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredTestimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-brand-paper rounded-2xl p-8 border border-brand-rule flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="font-serif text-5xl text-brand-secondary leading-none h-4">
                  "
                </span>
                <blockquote className="font-serif text-base md:text-lg leading-relaxed text-brand-ink">
                  {testimonial.quote}
                </blockquote>
                
                <div className="pt-5 border-t border-brand-rule flex items-center gap-3 mt-auto">
                  <span className="w-10 h-10 rounded-full bg-brand-primary text-brand-secondary flex items-center justify-center font-serif font-bold text-base shadow-sm">
                    {testimonial.initials}
                  </span>
                  <div>
                    <span className="block font-bold text-sm text-brand-ink">
                      {testimonial.author}
                    </span>
                    <span className="block text-[11px] text-brand-muted">
                      {testimonial.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-brand-primary-deep text-brand-paper text-center">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">Start your own success story today</h2>
          <p className="text-brand-cream/80 text-base leading-relaxed mb-8">
            Join hundreds of families. We baseline assess your child, assign a matched tutor, and send monthly tracking reports directly.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/book" className="bg-brand-secondary text-brand-ink hover:bg-brand-secondary-soft px-8 py-4 rounded-full font-bold transition-all shadow-md">
              Book a Free Trial Session
            </a>
            <a href="/contact" className="border border-white/20 hover:bg-white/5 text-brand-paper px-8 py-4 rounded-full font-bold transition-all">
              Talk to an Advisor
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
