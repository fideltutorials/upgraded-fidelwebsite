"use client";

import Layout from "@/layouts/Layout";
import FaqAccordion from "@/components/FaqAccordion";

export default function FaqPage() {
  return (
    <Layout
      title="Frequently Asked Questions — Fidel Tutorial"
      description="Got questions about tutoring packages, matching, vetting, payments, or online formats? Find quick answers in our FAQ page."
    >
      <section className="py-16 md:py-24 bg-brand-cream-warm/40 border-b border-brand-rule">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-3 font-semibold">Help Center</span>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-brand-ink tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-brand-muted text-base sm:text-lg leading-relaxed">
            Find answers regarding matching, payments, diaspora accounts, class formats, and vetting standards.
          </p>
        </div>
      </section>

      <section className="py-20 bg-brand-paper">
        <div className="max-w-[800px] mx-auto px-6">
          <FaqAccordion />
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-brand-primary-deep text-brand-paper text-center">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">Still have questions?</h2>
          <p className="text-brand-cream/80 text-sm sm:text-base leading-relaxed mb-8">
            Our educational advisors are available to discuss diagnostic testing, schedules, and custom pricing packages.
          </p>
          <a href="/contact" className="bg-brand-secondary text-brand-ink hover:bg-brand-secondary-soft px-8 py-4 rounded-full font-bold transition-all inline-block shadow-md">
            Connect with an Advisor
          </a>
        </div>
      </section>
    </Layout>
  );
}
