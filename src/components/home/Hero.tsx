import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight, Award01Icon, CallIcon } from "@hugeicons/core-free-icons";
import { buttonVariants } from "@/components/ui/button";
import heroImage from "@/assets/images/hero-image.jpg";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-brand-paper py-20 lg:py-32 overflow-hidden border-b border-brand-rule">
      <div className="absolute -top-36 right-0 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7 flex flex-col items-start relative">
          <span className="text-brand-primary text-xs uppercase font-bold tracking-widest block mb-4">
            ፊደል · Premium Education
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-normal leading-[1.08] text-brand-ink tracking-tight mb-6">
            Tutoring built <br />
            for the{" "}
            <span className="italic text-brand-primary relative inline-block font-medium">
              moments
              <span className="absolute left-0 right-0 bottom-2 h-2.5 bg-brand-secondary/35 -z-10 rounded-sm"></span>
            </span>{" "}
            that count.
          </h1>
          <p className="text-brand-muted text-base sm:text-lg leading-relaxed max-w-xl mb-8">
            We bridge the gap between classroom instruction and real, measurable
            academic results. Serving families in Addis Ababa and the diaspora
            since 2020.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/contact"
              className={buttonVariants({
                variant: "default",
                size: "lg",
                className:
                  "rounded-full sm:text-lg px-9 py-7 font-bold inline-flex items-center justify-center",
              })}
            >
              Request Free Trial
              <HugeiconsIcon
                icon={CallIcon}
                className="inline ml-2 transform transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/programs"
              className={buttonVariants({
                variant: "secondary",
                size: "lg",
                className:
                  "rounded-full sm:text-lg py-7 px-9 font-bold group inline-flex items-center justify-center",
              })}
            >
              View Programs
              <HugeiconsIcon
                icon={ArrowRight}
                className="inline ml-2 transform transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center relative">
          <div className="relative w-full aspect-[1/1.3]">
            <div className="absolute inset-0 bg-brand-secondary/15 border border-brand-secondary/30 rounded-t-full rounded-b-[160px] transform translate-x-4 translate-y-4 -z-10"></div>

            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-brand-rule bg-white shadow-2xl shadow-brand-primary-deep/5 transition-transform hover:translate-y-[-4px] duration-300">
              <img
                src={heroImage.src}
                alt="Student tutoring session in Addis"
                className="w-full h-full object-cover filter contrast-[1.01]"
              />
            </div>

            <div className="absolute -right-8 bottom-12 bg-brand-cream-warm border border-brand-rule rounded-2xl p-4 shadow-xl flex items-center gap-3 max-w-53 transform rotate-3">
              <span className="w-12 h-12 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                <HugeiconsIcon icon={Award01Icon} size={25} />
              </span>
              <div>
                <span className="block font-bold text-brand-ink">
                  KG - University
                </span>
                <span className="block text-xs text-brand-muted mt-0.5 leading-tight">
                  Vetted tutor match
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
