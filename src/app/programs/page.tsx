import Layout from "@/layouts/Layout";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BookUserIcon,
  UserGroupIcon,
  Book02Icon,
  Calendar01Icon,
  Award01Icon,
  GraduationCapIcon,
  ArrowRight02Icon,
  Calendar,
} from "@hugeicons/core-free-icons";
import { db } from "@/db/db";
import { programs as programsTable, Program } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const ICON_MAP: Record<string, any> = {
  BookUserIcon,
  UserGroupIcon,
  Book02Icon,
  Calendar01Icon,
  Award01Icon,
  GraduationCapIcon,
};

export default async function Programs() {
  // Fetch programs from database
  let dbPrograms: Program[] = [];
  try {
    dbPrograms = await db
      .select()
      .from(programsTable)
      .where(eq(programsTable.isPublished, true));
  } catch (err) {
    console.error("Failed to load programs from DB:", err);
  }

  // Fallback to empty state helper if DB check fails completely
  const hasPrograms = dbPrograms && dbPrograms.length > 0;

  return (
    <Layout
      title="Tutoring & Exam Prep Programs — Fidel Tutorial"
      description="Explore our customized tutoring, exam bootcamps, SAT preparation, and university counselling programs for students in Addis Ababa and the diaspora."
    >
      {/* Intro Header */}
      <section className="py-16 md:py-24 bg-brand-cream-warm/40 border-b border-brand-rule">
        <div className="max-w-300 mx-auto px-6 text-center">
          <span className="text-xs font-bold tracking-widest text-primary uppercase block mb-3">
            Our Offerings
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-medium text-brand-ink tracking-tight mb-6">
            Programs Built for Results
          </h1>
          <p className="text-brand-muted text-lg leading-relaxed max-w-2xl mx-auto">
            From primary school foundations to international college
            applications, discover our structured learning paths designed for
            academic excellence.
          </p>
        </div>
      </section>

      {/* Programs Deep Dive */}
      <section className="py-20">
        <div className="max-w-300 mx-auto px-6 flex flex-col gap-24">
          {hasPrograms ? (
            dbPrograms.map((program, idx) => {
              const IconComponent = ICON_MAP[program.icon] || BookUserIcon;
              let benefitsArray: string[] = [];
              if (program.benefits) {
                try {
                  benefitsArray = JSON.parse(program.benefits);
                } catch {
                  benefitsArray = [];
                }
              }

              const isEven = idx % 2 === 0;

              return (
                <div key={program.id}>
                  <div
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center scroll-mt-24"
                    id={program.slug}
                  >
                    <div
                      className={`lg:col-span-5 flex justify-center lg:justify-start ${!isEven ? "order-1 lg:order-2 lg:justify-end" : ""}`}
                    >
                      <a
                        href={`/programs/${program.slug}`}
                        className="group block hover:scale-[1.02] transition-transform duration-300"
                      >
                        <div className="w-64 h-64 rounded-2xl bg-brand-primary/5 flex items-center justify-center border border-brand-primary/10 group-hover:border-brand-primary/30">
                          <span className="text-brand-primary">
                            <HugeiconsIcon icon={IconComponent} size={96} />
                          </span>
                        </div>
                      </a>
                    </div>
                    <div
                      className={`lg:col-span-7 flex flex-col items-start ${!isEven ? "order-2 lg:order-1" : ""}`}
                    >
                      <span className="text-brand-primary font-bold text-sm tracking-wider uppercase mb-2">
                        {program.tagline || "KG to University"}
                      </span>
                      <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand-ink mb-4 hover:text-brand-primary transition-colors">
                        <a href={`/programs/${program.slug}`}>{program.name}</a>
                      </h2>
                      <p className="text-brand-muted text-base leading-relaxed mb-6">
                        {program.description}
                      </p>
                      {benefitsArray.length > 0 && (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-brand-ink font-semibold mb-6">
                          {benefitsArray.map((benefit, bIdx) => (
                            <li key={bIdx} className="flex items-center gap-2">
                              <HugeiconsIcon icon={ArrowRight02Icon} />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      )}
                      <Link
                        href={`/programs/${program.slug}`}
                        className={buttonVariants({
                          size: "lg",
                          className: "px-7 py-5",
                        })}
                      >
                        Learn More
                        <HugeiconsIcon icon={ArrowRight02Icon} />
                      </Link>
                    </div>
                  </div>
                  {idx < dbPrograms.length - 1 && (
                    <hr className="border-brand-rule my-16" />
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-brand-cream-warm/20 rounded-2xl border border-brand-rule border-dashed">
              <p className="text-brand-muted text-sm">
                No programs configured in the database.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-brand-primary-deep text-brand-paper text-center">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            Ready to lift your child's academic performance?
          </h2>
          <p className="text-brand-cream/80 text-base leading-relaxed mb-8">
            Book a consultation call or register for a free trial session today.
            Our advisors are ready to help.
          </p>
          <Link
            href="/contact"
            className={buttonVariants({
              variant: "secondary",
              className:
                "px-8 py-6 rounded-full sm:text-lg sm:font-bold transition-all inline-block",
            })}
          >
            Book a Free Trial Session
            <HugeiconsIcon icon={Calendar} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
