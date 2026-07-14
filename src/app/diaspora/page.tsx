import Layout from "@/layouts/Layout";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  GlobeIcon,
  Award01Icon,
  Book02Icon,
  UserGroupIcon
} from "@hugeicons/core-free-icons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "For the Diaspora — Fidel Tutorial",
  description: "Support your relatives' education in Ethiopia with secure USD payments, or enroll children in online heritage Amharic language lessons and college admissions prep.",
};

export default function Diaspora() {
  return (
    <Layout>
      {/* Intro Hero Header */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-brand-primary to-brand-primary-deep text-brand-paper relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-brand-secondary/15 to-transparent pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 text-left">
            <span className="text-brand-secondary text-xs font-bold tracking-widest uppercase block mb-3">Supporting Family back Home</span>
            <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight mb-6">
              Fund Your Family's <span className="italic text-brand-secondary">Future</span> from Anywhere.
            </h1>
            <p className="text-brand-cream/80 text-lg leading-relaxed mb-8 max-w-xl">
              Fidel makes it easy for the global Ethiopian diaspora to sponsor premium tutoring in Addis Ababa. We also offer courses designed to help children living abroad maintain their language, heritage, and academic goals.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/contact" className="bg-brand-secondary text-brand-ink hover:bg-brand-secondary-soft px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-0.5">
                Book USD consultation →
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-72 h-72 rounded-3xl bg-black/20 border border-white/10 flex flex-col justify-center items-center text-center p-8 relative">
              <span className="text-brand-secondary block mb-4 animate-pulse">
                <HugeiconsIcon icon={GlobeIcon} size={84} />
              </span>
              <div className="font-serif text-lg text-brand-paper">Global Network</div>
              <div className="text-xs text-brand-cream/60 mt-2 tracking-wide leading-relaxed">
                Sponsors in Washington · London · Dubai · Stockholm · Toronto · Riyadh & beyond
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diaspora Features */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-2">Our Solutions</span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand-ink mb-4">Bridging Education Across Borders</h2>
            <p className="text-brand-muted text-base leading-relaxed">
              Whether you want to sponsor study support for a relative in Addis, or enrich your child's cultural connection abroad, we have solutions for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-brand-paper border border-brand-rule rounded-2xl p-8 flex flex-col gap-5 shadow-sm hover:border-brand-primary hover:shadow-lg transition-all">
              <span className="text-brand-primary">
                <HugeiconsIcon icon={UserGroupIcon} size={32} />
              </span>
              <h3 className="font-serif text-xl font-bold text-brand-ink">Sponsor Family in Addis</h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                Pay for a nephew's, niece's, or cousin's tutoring in Addis Ababa in US Dollars. We invoice you securely via stripe/credit card and settle the tutor logistics in Ethiopian Birr on our side.
              </p>
              <ul className="text-xs text-brand-ink font-semibold flex flex-col gap-2 mt-2">
                <li>✓ Secure credit/debit card checkout</li>
                <li>✓ Direct progress reports in English</li>
                <li>✓ Dedicated customer representative</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-brand-paper border border-brand-rule rounded-2xl p-8 flex flex-col gap-5 shadow-sm hover:border-brand-primary hover:shadow-lg transition-all">
              <span className="text-brand-primary">
                <HugeiconsIcon icon={Book02Icon} size={32} />
              </span>
              <h3 className="font-serif text-xl font-bold text-brand-ink">Heritage Amharic Lessons</h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                Live, online language sessions designed for children of the Ethiopian diaspora. Focuses on speaking, listening, reading Ge'ez alphabets, and understanding cultural values in a friendly environment.
              </p>
              <ul className="text-xs text-brand-ink font-semibold flex flex-col gap-2 mt-2">
                <li>✓ Adapted to your local time zone</li>
                <li>✓ Native speaking instructors</li>
                <li>✓ Interactive games & speaking tools</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-brand-paper border border-brand-rule rounded-2xl p-8 flex flex-col gap-5 shadow-sm hover:border-brand-primary hover:shadow-lg transition-all">
              <span className="text-brand-primary">
                <HugeiconsIcon icon={Award01Icon} size={32} />
              </span>
              <h3 className="font-serif text-xl font-bold text-brand-ink">SAT &amp; College Admissions Prep</h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                Rigorous coaching and test preparation for high school students looking to gain admissions in highly competitive US, UK, and Canadian universities. Mentoring covers essay reviews and admissions prep.
              </p>
              <ul className="text-xs text-brand-ink font-semibold flex flex-col gap-2 mt-2">
                <li>✓ Focused diagnostic reviews</li>
                <li>✓ Personal statement writing support</li>
                <li>✓ Expert admissions counsellors</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ/Price CTA */}
      <section className="py-16 bg-brand-cream-warm/40 border-t border-brand-rule text-center">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="font-serif text-3xl font-semibold text-brand-ink mb-4">Simple Dollar Invoicing</h2>
          <p className="text-brand-muted text-base leading-relaxed mb-6">
            No need to deal with wire services or local money exchanges. We invoice in USD, and your family in Addis Ababa receives classes directly.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/contact" className="bg-brand-primary text-brand-paper hover:bg-brand-primary-deep px-6 py-3 rounded-full font-semibold transition-all">
              View USD Pricing Rates
            </a>
            <a href="/contact" className="border border-brand-rule hover:bg-brand-cream-warm text-brand-ink px-6 py-3 rounded-full font-semibold transition-all">
              Request Custom Invoicing Setup
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
