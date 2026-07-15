import { HugeiconsIcon } from "@hugeicons/react";
import {
  CallIcon,
  Mail01Icon,
  Location01Icon,
  Clock01Icon,
  ArrowRight02Icon,
  TelegramIcon,
} from "@hugeicons/core-free-icons";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section
      className="py-20 bg-brand-primary-deep text-brand-paper relative overflow-hidden"
      id="contact"
    >
      <div className="absolute inset-0 bg-radial from-brand-secondary/10 to-transparent pointer-events-none" />
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <p
            className="font-bold text-brand-secondary text-lg mb-2"
            style={{ fontFamily: "Google Serif" }}
          >
            ለመጀመር ዝግጁ ነዎት?
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-brand-paper leading-tight mb-6">
            Book a free trial.{" "}
            <em className="italic text-brand-secondary block mt-1">
              No pressure. No surprises.
            </em>
          </h2>
          <p className="text-brand-cream/80 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
            Tell us about your child's grade, the subject you have in mind, and
            what "a good outcome" looks like. We will match you to a tutor
            within 48 hours — and the first session is on us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/contact"
              className={buttonVariants({
                variant: "secondary",
                size: "lg",
                className: "rounded-full font-bold shadow-md py-6 px-6",
              })}
            >
              Request Your Free Trial
              <HugeiconsIcon icon={ArrowRight02Icon} />
            </Link>
            <Link
              href="/contact"
              className={buttonVariants({
                variant: "secondary",
                size: "lg",
                className: "rounded-full font-bold shadow-md py-6 px-6",
              })}
            >
              Chat on Telegram
              <HugeiconsIcon icon={TelegramIcon} />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-black/25 border border-white/10 rounded-2xl p-8 flex flex-col gap-6 text-sm">
            <h3 className="font-serif text-xl font-bold text-brand-paper">
              Talk to us
            </h3>

            <div className="flex gap-4 items-start border-b border-white/10 pb-4">
              <span className="text-brand-secondary mt-1">
                <HugeiconsIcon icon={CallIcon} size={18} />
              </span>
              <div>
                <span className="block text-[10px] tracking-wider uppercase text-brand-secondary font-bold">
                  Phone
                </span>
                <a
                  href="tel:+251979795154"
                  className="block text-brand-paper hover:text-brand-secondary font-medium mt-1"
                >
                  +251 979 795 154
                </a>
                <a
                  href="tel:+251979795468"
                  className="block text-brand-paper hover:text-brand-secondary font-medium"
                >
                  +251 979 795 468
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start border-b border-white/10 pb-4">
              <span className="text-brand-secondary mt-1">
                <HugeiconsIcon icon={Mail01Icon} size={18} />
              </span>
              <div>
                <span className="block text-[10px] tracking-wider uppercase text-brand-secondary font-bold">
                  Email
                </span>
                <a
                  href="mailto:hello@fideltutorial.com"
                  className="block text-brand-paper hover:text-brand-secondary font-medium mt-1"
                >
                  hello@fideltutorial.com
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start border-b border-white/10 pb-4">
              <span className="text-brand-secondary mt-1">
                <HugeiconsIcon icon={Location01Icon} size={18} />
              </span>
              <div>
                <span className="block text-[10px] tracking-wider uppercase text-brand-secondary font-bold">
                  Office
                </span>
                <span className="block text-brand-paper font-medium mt-1">
                  Addis Ababa, Ethiopia
                </span>
                <span className="block text-[11px] text-brand-cream/60 mt-0.5">
                  Hours: Mon–Sat · 8:30 — 18:00 EAT
                </span>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="text-brand-secondary mt-1">
                <HugeiconsIcon icon={Clock01Icon} size={18} />
              </span>
              <div>
                <span className="block text-[10px] tracking-wider uppercase text-brand-secondary font-bold">
                  Diaspora support
                </span>
                <a
                  href="mailto:diaspora@fideltutorial.com"
                  className="block text-brand-paper hover:text-brand-secondary font-medium mt-1"
                >
                  diaspora@fideltutorial.com
                </a>
                <span className="block text-[11px] text-brand-cream/60 mt-0.5">
                  USD billing &amp; international hours
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
