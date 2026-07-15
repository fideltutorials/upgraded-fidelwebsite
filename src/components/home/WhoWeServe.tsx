import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function WhoWeServe() {
  return (
    <section className="py-20 bg-brand-cream-warm/25" id="who">
      <div className="max-w-300 mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-2">
            Who we serve
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-brand-ink tracking-tight">
            Different families. Different goals. One standard.
          </h2>
          <p className="text-brand-muted text-base leading-relaxed mt-4">
            Whether you are a parent in Bole, a head of school in Lebu, an aunt
            in Washington, or a programme officer at a donor, we have built a
            way to work with you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-brand-paper border border-brand-rule rounded-xl p-8 pb-4 flex flex-col gap-4 hover:border-brand-secondary hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-200">
            <span className="font-serif italic text-brand-secondary text-sm font-semibold">
              01
            </span>
            <h3 className="font-serif text-xl font-bold text-brand-ink">
              Parents & Students
            </h3>
            <p className="text-brand-muted text-sm leading-relaxed flex-1">
              KG through Grade 12, plus university support. Flexible packages,
              transparent pricing, and Telebirr or CBE Birr in one tap.
            </p>
            <Link
              href="/programs"
              className={buttonVariants({
                size: "lg",
              })}
            >
              Explore programs
              <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-brand-paper border border-brand-rule rounded-xl p-8 pb-4 flex flex-col gap-4 hover:border-brand-secondary hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-200">
            <span className="font-serif italic text-brand-secondary text-sm font-semibold">
              02
            </span>
            <h3 className="font-serif text-xl font-bold text-brand-ink">
              Private Schools
            </h3>
            <p className="text-brand-muted text-sm leading-relaxed flex-1">
              After-school enrichment, in-school exam bootcamps, teacher
              training, and an LMS your students can use from day one.
            </p>
            <Link
              href="/schools"
              className={buttonVariants({
                size: "lg",
              })}
            >
              Partner with us
              <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-brand-paper border border-brand-rule rounded-xl p-8 pb-4 flex flex-col gap-4 hover:border-brand-secondary hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-200">
            <span className="font-serif italic text-brand-secondary text-sm font-semibold">
              03
            </span>
            <h3 className="font-serif text-xl font-bold text-brand-ink">
              The Diaspora
            </h3>
            <p className="text-brand-muted text-sm leading-relaxed flex-1">
              Premium tutoring for relatives back home, priced in dollars.
              Heritage Amharic and Ethiopian-curriculum classes for children
              abroad.
            </p>
            <a
              href="/diaspora"
              className={buttonVariants({
                size: "lg",
              })}
            >
              For families abroad
              <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
            </a>
          </div>

          {/* Card 4 */}
          <div className="bg-brand-paper border border-brand-rule rounded-xl p-8 pb-4 flex flex-col gap-4 hover:border-brand-secondary hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-200">
            <span className="font-serif italic text-brand-secondary text-sm font-semibold">
              04
            </span>
            <h3 className="font-serif text-xl font-bold text-brand-ink">
              NGOs &amp; Donors
            </h3>
            <p className="text-brand-muted text-sm leading-relaxed flex-1">
              Accelerated learning, scholarship delivery, content localisation
              and teacher development — delivered through funded contracts.
            </p>
            <Link
              href="/schools#ngo-programmes"
              className={buttonVariants({
                size: "lg",
              })}
            >
              Program partnerships
              <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
