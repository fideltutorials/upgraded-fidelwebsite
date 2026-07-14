import Layout from "@/layouts/Layout";
import InquiryForm from "@/components/InquiryForm";
import FaqAccordion from "@/components/FaqAccordion";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  CallIcon, 
  Mail01Icon, 
  Location01Icon, 
  Clock01Icon,
  TelegramIcon
} from "@hugeicons/core-free-icons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Fidel Tutorial",
  description: "Get in touch with Fidel Tutorial. Send an inquiry, call our office direct lines, or chat with our team on Telegram.",
};

export default function Contact() {
  return (
    <Layout>
      {/* Header */}
      <section className="py-16 bg-brand-cream-warm/40 border-b border-brand-rule">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-3 font-semibold">Get in Touch</span>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-brand-ink tracking-tight mb-4">
            Talk to a Programme Advisor
          </h1>
          <p className="text-brand-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Have questions about grades, subjects, payments, or scheduling? Send us a message, email, or call. We are here to help.
          </p>
        </div>
      </section>

      {/* Form & Info Section */}
      <section className="py-20 bg-radial from-brand-secondary/5 via-transparent to-transparent">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* LHS: Inquiry Form */}
          <div className="lg:col-span-7">
            <InquiryForm />
          </div>

          {/* RHS: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Contact Numbers card */}
            <div className="border border-brand-rule rounded-2xl p-6 bg-brand-paper shadow-sm">
              <h3 className="font-serif text-lg font-bold text-brand-ink mb-4 flex items-center gap-2">
                <span className="text-brand-primary">
                  <HugeiconsIcon icon={CallIcon} size={20} />
                </span>
                Direct Call Lines
              </h3>
              <div className="flex flex-col gap-2 font-semibold">
                <a href="tel:+251979795154" className="text-brand-ink hover:text-brand-primary text-base">
                  +251 979 795 154
                </a>
                <a href="tel:+251979795468" className="text-brand-ink hover:text-brand-primary text-base">
                  +251 979 795 468
                </a>
              </div>
              <span className="block text-xs text-brand-muted mt-3">
                Available Monday to Saturday (8:30 — 18:00 EAT)
              </span>
            </div>

            {/* Telegram card */}
            <div className="border border-brand-rule rounded-2xl p-6 bg-brand-paper shadow-sm">
              <h3 className="font-serif text-lg font-bold text-brand-ink mb-3 flex items-center gap-2">
                <span className="text-brand-primary">
                  <HugeiconsIcon icon={TelegramIcon} size={20} />
                </span>
                Instant Chat Support
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed mb-4">
                Prefer texting? Message our client support advisor on Telegram or WhatsApp for rapid quotes, matching status updates, and schedules.
              </p>
              <a
                href="https://t.me/fideltutorial"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-cream-warm hover:bg-brand-cream text-brand-ink font-semibold px-5 py-2.5 rounded-lg border border-brand-rule transition-colors text-xs inline-flex items-center gap-2"
              >
                <HugeiconsIcon icon={TelegramIcon} size={14} className="text-brand-primary" />
                Open Telegram Chat
              </a>
            </div>

            {/* Email Addresses card */}
            <div className="border border-brand-rule rounded-2xl p-6 bg-brand-paper shadow-sm">
              <h3 className="font-serif text-lg font-bold text-brand-ink mb-4 flex items-center gap-2">
                <span className="text-brand-primary">
                  <HugeiconsIcon icon={Mail01Icon} size={20} />
                </span>
                Email Enquiries
              </h3>
              <div className="flex flex-col gap-3">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-brand-secondary">
                    General Support
                  </span>
                  <a
                    href="mailto:hello@fideltutorial.com"
                    className="text-brand-ink hover:text-brand-primary font-semibold text-sm"
                  >
                    hello@fideltutorial.com
                  </a>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-brand-secondary">
                    Diaspora &amp; Invoicing
                  </span>
                  <a
                    href="mailto:diaspora@fideltutorial.com"
                    className="text-brand-ink hover:text-brand-primary font-semibold text-sm"
                  >
                    diaspora@fideltutorial.com
                  </a>
                </div>
              </div>
            </div>

            {/* Head Office location card */}
            <div className="border border-brand-rule rounded-2xl p-6 bg-brand-paper shadow-sm">
              <h3 className="font-serif text-lg font-bold text-brand-ink mb-3 flex items-center gap-2">
                <span className="text-brand-primary">
                  <HugeiconsIcon icon={Location01Icon} size={20} />
                </span>
                Head Office
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Addis Ababa, Ethiopia. We conduct tutor evaluations, background vetting, and certification modules live from our capital headquarters.
              </p>
              <div className="flex items-center gap-1 text-[11px] text-brand-ink font-semibold mt-3">
                <HugeiconsIcon icon={Clock01Icon} size={12} className="text-brand-secondary" />
                <span>Mon–Sat · 8:30 — 18:00 EAT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-brand-rule bg-brand-cream-warm/25">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 flex flex-col items-start">
              <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-2">Common questions</span>
              <h2 className="font-serif text-3xl md:text-5xl font-medium text-brand-ink tracking-tight mb-4">
                Frequently Asked <span className="italic text-brand-primary block">Questions</span>
              </h2>
              <p className="text-brand-muted text-base leading-relaxed max-w-sm mb-6">
                The questions parents and partners ask most often about our tutoring services.
              </p>
            </div>

            <div className="lg:col-span-7">
              <FaqAccordion />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
