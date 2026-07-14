"use client";

import Layout from "@/layouts/Layout";
import { HugeiconsIcon } from "@hugeicons/react";
import { Award01Icon, BookUserIcon, GraduationCapIcon } from "@hugeicons/core-free-icons";

export default function About() {

  return (
    <Layout
      title="About Us & Tutors — Fidel Tutorial"
      description="Read our five-year story in Addis Ababa and get to know our vetted, trained, and results-driven tutor network."
    >
      {/* Intro / Our Story */}
      <section className="py-16 md:py-24 bg-brand-cream-warm/40 border-b border-brand-rule" id="story">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-3">Our Story</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-brand-ink tracking-tight mb-6">
              Five Years of Inspiring Learning in Addis
            </h1>
            <div className="text-brand-muted text-base sm:text-lg leading-relaxed flex flex-col gap-4">
              <p>
                Established in 2020 in Addis Ababa, Fidel Tutorial was built with a clear purpose: to bridge the gap between classroom instruction and real, measurable academic results. We believe that tutoring is not just about helping students get by — it's about building the confidence and skills that will carry them through their lives.
              </p>
              <p>
                Over the years, we have grown to support hundreds of students across Addis Ababa, regional cities in Ethiopia, and diaspora families worldwide. By pairing vetted tutors with results-oriented programs, we have achieved a track record that speaks for itself.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="bg-brand-primary text-brand-paper rounded-2xl p-8 max-w-sm flex flex-col gap-6 shadow-xl shadow-brand-primary/10">
              <h3 className="font-serif text-xl font-bold text-brand-secondary">Core Pillars</h3>
              <div className="flex gap-4">
                <span className="text-brand-secondary"><HugeiconsIcon icon={Award01Icon} size={24} /></span>
                <div>
                  <h4 className="font-semibold text-sm">Vetted Standards</h4>
                  <p className="text-xs text-brand-cream/80 mt-1">Every tutor passes background checks, skill tests, and trial teaching runs.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-brand-secondary"><HugeiconsIcon icon={BookUserIcon} size={24} /></span>
                <div>
                  <h4 className="font-semibold text-sm">Backward Outcome Design</h4>
                  <p className="text-xs text-brand-cream/80 mt-1">We plan our classes starting from the desired exam score or placement goal.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-brand-secondary"><HugeiconsIcon icon={GraduationCapIcon} size={24} /></span>
                <div>
                  <h4 className="font-semibold text-sm">Academic Accountability</h4>
                  <p className="text-xs text-brand-cream/80 mt-1">Regular monthly reports keep parents and sponsors fully in the loop.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Tutors Section */}
      <section className="py-20 bg-brand-cream-warm/10" id="tutors">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-2">Our Tutors</span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand-ink mb-4">The Reason Families Come Back</h2>
            <p className="text-brand-muted text-base leading-relaxed">
              Our tutors are subject experts, trained in our educational delivery methods. They are patient with younger kids and challenging with advanced candidates.
            </p>
          </div>

          <a
            href="/tutors"
            className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-deep text-brand-paper px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-0.5 shadow-md shadow-brand-primary/15"
          >
            Meet Our Tutors →
          </a>
        </div>
      </section>

      {/* Careers/Join Us */}
      <section className="py-20 bg-brand-cream-warm/40 border-t border-brand-rule" id="careers">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-3 font-semibold">Join the Team</span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand-ink mb-4">Apply to Teach with Us</h2>
          <p className="text-brand-muted text-base leading-relaxed mb-8">
            Are you a passionate educator or subject matter expert looking to make a difference? We are always expanding our network of vetted, trained, and certified tutors in Addis Ababa and online.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:careers@fideltutorial.com" className="bg-brand-primary text-brand-paper hover:bg-brand-primary-deep px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-0.5">
              Submit Tutor Application
            </a>
            <a href="/contact" className="border border-brand-rule hover:bg-brand-cream-warm text-brand-ink px-8 py-4 rounded-full font-bold transition-all">
              Contact Recruitment advisor
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
