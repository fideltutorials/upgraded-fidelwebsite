import React from "react";
import Layout from "@/layouts/Layout";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  BookUserIcon, 
  UserGroupIcon, 
  Book02Icon, 
  Calendar01Icon, 
  Award01Icon, 
  GraduationCapIcon 
} from "@hugeicons/core-free-icons";
import { notFound } from "next/navigation";
import { db } from "@/db/db";
import { programs as programsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

const ICON_MAP: Record<string, any> = {
  BookUserIcon,
  UserGroupIcon,
  Book02Icon,
  Calendar01Icon,
  Award01Icon,
  GraduationCapIcon,
};

// Define static params for build pre-rendering (Next.js SSG fallback)
export function generateStaticParams() {
  return [
    { slug: "one-on-one" },
    { slug: "group-classes" },
    { slug: "exam-bootcamps" },
    { slug: "summer-camps" },
    { slug: "test-prep" },
    { slug: "counselling" },
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProgramPage({ params }: PageProps) {
  const resolvedParams = await params;
  
  // Fetch specific program by slug from the database
  let dbProgram = null;
  try {
    const results = await db
      .select()
      .from(programsTable)
      .where(eq(programsTable.slug, resolvedParams.slug));
    
    if (results.length > 0) {
      dbProgram = results[0];
    }
  } catch (err) {
    console.error("Failed to load program detail from DB:", err);
  }

  // If not found in DB, return 404
  if (!dbProgram) {
    notFound();
  }

  const IconComponent = ICON_MAP[dbProgram.icon] || BookUserIcon;
  
  let benefitsArray: string[] = [];
  if (dbProgram.benefits) {
    try {
      benefitsArray = JSON.parse(dbProgram.benefits);
    } catch {
      benefitsArray = [];
    }
  }

  return (
    <Layout
      title={`${dbProgram.name} — Fidel Tutorial`}
      description={dbProgram.tagline}
    >
      <article className="min-h-screen bg-brand-paper">
        {/* Banner header */}
        <section className="py-20 lg:py-24 bg-brand-cream-warm/40 border-b border-brand-rule">
          <div className="max-w-[1200px] mx-auto px-6">
            <a
              href="/programs"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary hover:text-brand-primary-deep tracking-wider uppercase mb-8 transition-colors"
            >
              ← Back to Programs
            </a>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-4">
              <div className="lg:col-span-8">
                <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-3">
                  {dbProgram.subtitle}
                </span>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-brand-ink tracking-tight mb-4">
                  {dbProgram.name}
                </h1>
                <p className="text-brand-muted text-lg leading-relaxed max-w-2xl">
                  {dbProgram.tagline}
                </p>
              </div>
              <div className="lg:col-span-4 flex lg:justify-end">
                <div className="w-32 h-32 rounded-3xl bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center text-brand-primary shadow-sm">
                  <HugeiconsIcon icon={IconComponent} size={48} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content details */}
        <section className="py-20 max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Info */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-brand-ink mb-4">
                Program Overview
              </h2>
              <p className="text-brand-muted text-base leading-relaxed mb-6">
                {dbProgram.description}
              </p>
              {dbProgram.details && (
                <p className="text-brand-muted text-base leading-relaxed">
                  {dbProgram.details}
                </p>
              )}
            </div>

            {benefitsArray.length > 0 && (
              <div className="p-8 border border-brand-rule rounded-2xl bg-brand-cream-warm/20">
                <h3 className="font-serif text-xl font-semibold text-brand-ink mb-6">
                  What's Included in this Program
                </h3>
                <ul className="flex flex-col gap-4">
                  {benefitsArray.map((benefit, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-brand-ink font-semibold items-start">
                      <span className="text-brand-primary text-base flex-shrink-0 mt-0.5">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* RHS Sidebar Card */}
          <div className="lg:col-span-4">
            <div className="border border-brand-rule rounded-2xl p-8 bg-brand-cream-warm/15 shadow-sm sticky top-28 flex flex-col gap-6">
              {dbProgram.pricing && (
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-muted block mb-1">
                    Pricing Rate
                  </span>
                  <span className="font-serif text-lg font-bold text-brand-ink block">
                    {dbProgram.pricing}
                  </span>
                </div>
              )}

              {dbProgram.pricing && dbProgram.schedule && <hr className="border-brand-rule" />}

              {dbProgram.schedule && (
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-muted block mb-1">
                    Session & Schedule
                  </span>
                  <span className="font-sans text-sm font-semibold text-brand-ink block">
                    {dbProgram.schedule}
                  </span>
                </div>
              )}

              {(dbProgram.pricing || dbProgram.schedule) && <hr className="border-brand-rule" />}

              <a
                href="/contact"
                className="w-full text-center bg-brand-primary text-brand-paper hover:bg-brand-primary-deep py-3.5 rounded-full font-bold text-sm shadow-md shadow-brand-primary/10 transition-colors"
              >
                Inquire & Start Today →
              </a>
              
              <a
                href="/book"
                className="w-full text-center border border-brand-rule hover:bg-brand-cream-warm text-brand-ink py-3.5 rounded-full font-bold text-sm transition-colors"
              >
                Book a Free Trial Session
              </a>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
}
