"use client";

import Layout from "@/layouts/Layout";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  SchoolIcon,
  BriefcaseIcon,
  Book02Icon,
  Award01Icon,
  GraduationCapIcon
} from "@hugeicons/core-free-icons";

export default function Schools() {
  return (
    <Layout
      title="For Schools & Institutions — Fidel Tutorial"
      description="Partner with Fidel Tutorial to implement accelerated learning programs, LMS licensing, digital content development, teacher training, and educational consulting."
    >
      {/* Header */}
      <section className="py-16 md:py-24 bg-brand-primary-deep text-brand-paper text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-brand-secondary/10 to-transparent pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <span className="text-brand-secondary text-xs font-bold tracking-widest uppercase block mb-3">For Institutions</span>
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight mb-6">
            Partnering for Educational Impact
          </h1>
          <p className="text-brand-cream/80 text-lg leading-relaxed max-w-2xl mx-auto">
            We collaborate with private schools, NGOs, and international donors to deliver custom learning solutions, digital curriculum content, and modern teacher training at scale.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Private Schools */}
            <a 
              href="/schools/private-schools" 
              className="bg-brand-paper border border-brand-rule rounded-2xl p-8 shadow-sm flex flex-col gap-5 hover:border-brand-primary hover:shadow-lg transition-all hover:-translate-y-1.5 duration-300 group" 
              id="private-schools"
            >
              <span className="text-brand-primary block group-hover:scale-105 transition-transform duration-300">
                <HugeiconsIcon icon={SchoolIcon} size={36} />
              </span>
              <h3 className="font-serif text-xl font-bold text-brand-ink group-hover:text-brand-primary transition-colors">Private Schools</h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                Enhance school offerings with after-school enrichment programs, in-school EHEECE exam bootcamps, custom worksheets, and teacher certification packages that elevate student performance.
              </p>
              <span className="text-xs font-bold text-brand-primary mt-auto group-hover:text-brand-primary-deep transition-colors">Learn more →</span>
            </a>

            {/* NGO Programmes */}
            <a 
              href="/schools/ngo-programmes" 
              className="bg-brand-paper border border-brand-rule rounded-2xl p-8 shadow-sm flex flex-col gap-5 hover:border-brand-primary hover:shadow-lg transition-all hover:-translate-y-1.5 duration-300 group" 
              id="ngo-programmes"
            >
              <span className="text-brand-primary block group-hover:scale-105 transition-transform duration-300">
                <HugeiconsIcon icon={BriefcaseIcon} size={36} />
              </span>
              <h3 className="font-serif text-xl font-bold text-brand-ink group-hover:text-brand-primary transition-colors">NGO &amp; Donor Programmes</h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                Implement accelerated learning interventions, regional scholarship programs, educational access programs, and student performance tracking in marginalized communities.
              </p>
              <span className="text-xs font-bold text-brand-primary mt-auto group-hover:text-brand-primary-deep transition-colors">Learn more →</span>
            </a>

            {/* Educational Consulting */}
            <a 
              href="/schools/consulting" 
              className="bg-brand-paper border border-brand-rule rounded-2xl p-8 shadow-sm flex flex-col gap-5 hover:border-brand-primary hover:shadow-lg transition-all hover:-translate-y-1.5 duration-300 group" 
              id="consulting"
            >
              <span className="text-brand-primary block group-hover:scale-105 transition-transform duration-300">
                <HugeiconsIcon icon={GraduationCapIcon} size={36} />
              </span>
              <h3 className="font-serif text-xl font-bold text-brand-ink group-hover:text-brand-primary transition-colors">Educational Consulting</h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                Strategic advice for new school setups, regional curriculum adjustments, local assessment alignment, EdTech infrastructure development, and quality-control licensing standards.
              </p>
              <span className="text-xs font-bold text-brand-primary mt-auto group-hover:text-brand-primary-deep transition-colors">Learn more →</span>
            </a>

            {/* Digital Content Development */}
            <a 
              href="/schools/digital-content" 
              className="bg-brand-paper border border-brand-rule rounded-2xl p-8 shadow-sm flex flex-col gap-5 hover:border-brand-primary hover:shadow-lg transition-all hover:-translate-y-1.5 duration-300 group" 
              id="digital-content"
            >
              <span className="text-brand-primary block group-hover:scale-105 transition-transform duration-300">
                <HugeiconsIcon icon={Book02Icon} size={36} />
              </span>
              <h3 className="font-serif text-xl font-bold text-brand-ink group-hover:text-brand-primary transition-colors">Digital Content Development</h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                Production of localized digital lessons, animated content, comprehensive question banks, and complete e-courseware in Amharic and other languages, ready for integration.
              </p>
              <span className="text-xs font-bold text-brand-primary mt-auto group-hover:text-brand-primary-deep transition-colors">Learn more →</span>
            </a>

            {/* Teacher Training & Certification */}
            <a 
              href="/schools/teacher-training" 
              className="bg-brand-paper border border-brand-rule rounded-2xl p-8 shadow-sm flex flex-col gap-5 hover:border-brand-primary hover:shadow-lg transition-all hover:-translate-y-1.5 duration-300 group" 
              id="teacher-training"
            >
              <span className="text-brand-primary block group-hover:scale-105 transition-transform duration-300">
                <HugeiconsIcon icon={Award01Icon} size={36} />
              </span>
              <h3 className="font-serif text-xl font-bold text-brand-ink group-hover:text-brand-primary transition-colors">Teacher Training &amp; Certification</h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                Professional development workshops, modern instructional design practices, active classroom engagement methodologies, and certified tutor training standard evaluations.
              </p>
              <span className="text-xs font-bold text-brand-primary mt-auto group-hover:text-brand-primary-deep transition-colors">Learn more →</span>
            </a>

            {/* LMS Licensing */}
            <a 
              href="/schools/lms-licensing" 
              className="bg-brand-paper border border-brand-rule rounded-2xl p-8 shadow-sm flex flex-col gap-5 hover:border-brand-primary hover:shadow-lg transition-all hover:-translate-y-1.5 duration-300 group" 
              id="lms-licensing"
            >
              <span className="text-brand-primary block group-hover:scale-105 transition-transform duration-300">
                <HugeiconsIcon icon={SchoolIcon} size={36} />
              </span>
              <h3 className="font-serif text-xl font-bold text-brand-ink group-hover:text-brand-primary transition-colors">LMS Licensing</h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                Gain full white-labeled access to Fidel's proprietary learning management system, including localized modules, progress metrics dashboard, and structured assignment banks.
              </p>
              <span className="text-xs font-bold text-brand-primary mt-auto group-hover:text-brand-primary-deep transition-colors">Learn more →</span>
            </a>
          </div>
        </div>
      </section>

      {/* Partner Contact Form CTA */}
      <section className="py-20 bg-brand-cream-warm/40 border-t border-brand-rule">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand-ink mb-4 font-semibold">Request a Partnership Brief</h2>
          <p className="text-brand-muted text-base leading-relaxed mb-8">
            Learn how Fidel's curriculum, tools, and tutor network can align with your institution's goals. Get in touch for customized proposals.
          </p>
          <a href="/contact" className="bg-brand-primary text-brand-paper hover:bg-brand-primary-deep px-8 py-4 rounded-full font-bold transition-all inline-block">
            Connect with our Partnerships Team
          </a>
        </div>
      </section>
    </Layout>
  );
}
