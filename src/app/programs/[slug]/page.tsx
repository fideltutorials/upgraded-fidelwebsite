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

// Define the static params for build pre-rendering
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

const programsData: Record<string, {
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  details: string;
  icon: any;
  benefits: string[];
  pricing: string;
  schedule: string;
  metaTitle: string;
  metaDesc: string;
}> = {
  "one-on-one": {
    title: "One-on-One Tutoring",
    subtitle: "KG to University",
    tagline: "Personalized individual attention tailored to your child's learning pace.",
    description: "Our core tutoring service pairs students with highly matched, vetted educators for in-home (in Addis Ababa) or online classes (globally). By centering instructions entirely on the student's baseline strengths and weaknesses, we build confidence and ensure measurable score increases.",
    details: "Every new enrollment begins with a diagnostic evaluation covering core skills. Our team then matches the candidate with a tutor who fits their temperament and subject needs. Tutors write comprehensive session summaries, and we share progress notes and performance tracking charts with sponsors on a monthly schedule.",
    icon: BookUserIcon,
    benefits: [
      "Diagnostic baseline skills audit to spot gaps early",
      "Tailored study plan and progress tracking matrices",
      "Flexible schedules built around your family's weekly calendar",
      "Subject selections including Mathematics, Sciences, Amharic, English, and Coding",
    ],
    pricing: "Customized monthly packages. Billed per hour or per session.",
    schedule: "Flexible booking times from Monday to Sunday.",
    metaTitle: "One-on-One Tutoring KG-12 — Fidel Tutorial",
    metaDesc: "Personalised, matched subject tutoring for students in Addis Ababa and online globally. Baseline diagnostic assessments and monthly progress reporting.",
  },
  "group-classes": {
    title: "Group Classes",
    subtitle: "Collaborative Cohorts",
    tagline: "Learn interactively in small student pods at a budget-friendly rate.",
    description: "Small interactive classes of 4 to 8 students that merge the focus of custom tutor instructions with the collaborative energy of peer learning. Ideal for social learners who benefit from sharing ideas, worksheets, and peer-to-peer logic.",
    details: "Groups are matched by level and subject, ensuring that the pace is comfortable yet challenging for all participants. Homework reviews, practice exam worksheets, and diagnostic testing are integrated into the weekly cycle. This format significantly reduces the per-student price point while maintaining high educational outcomes.",
    icon: UserGroupIcon,
    benefits: [
      "Collaborative and interactive peer environments",
      "Weekly diagnostic tasks and structured review sessions",
      "Highly matched peer groups (4 to 8 students max)",
      "Affordable per-student cohort pricing structures",
    ],
    pricing: "Flat monthly rate per cohort block.",
    schedule: "Fixed weekly schedules on weekday evenings or Saturday sessions.",
    metaTitle: "Small Group Tutoring Classes — Fidel Tutorial",
    metaDesc: "Interactive cohorts of 4 to 8 students designed for collaborative study, weekly problem-solving, and cost-effective learning outcomes.",
  },
  "exam-bootcamps": {
    title: "National Exam Bootcamps",
    subtitle: "Grade 6, 8, and 12 EHEECE Prep",
    tagline: "Rigorous diagnostic mock cycles to ace high-stress national assessments.",
    description: "Our signature high-intensity bootcamps are built explicitly around official ministry specifications, national examinations, and EHEECE matrices. We focus on past exam analysis, critical time management, and test-taking confidence.",
    details: "Candidates sit for full-length proctored mocks every Saturday, mimicking real testing conditions. Tutors review the answers in detail during the weekdays, clearing misconceptions in physics, chemistry, biology, mathematics, and English. Detailed score cards are updated weekly so students know exactly where they stand.",
    icon: Book02Icon,
    benefits: [
      "Intensive test-day time management tips and tricks",
      "Weekly Saturday mock tests and expert review classes",
      "Past paper analysis archives (Grade 6, 8, & 12 / EHEECE)",
      "Strict diagnostic score targets and metrics tracking reports",
    ],
    pricing: "Cohort package rates including booklets and mock keys.",
    schedule: "Saturdays 9:00 AM - 1:00 PM for mocks + Weekday revision classes.",
    metaTitle: "National Exam & EHEECE Bootcamps — Fidel Tutorial",
    metaDesc: "Prepare candidates for high-stress Grade 6, 8, and 12 national examinations with full-length mocks, diagnostic scoring, and expert review.",
  },
  "summer-camps": {
    title: "Summer Camps",
    subtitle: "Seasonal Enrichment Tracks",
    tagline: "Keep brains active during the break with STEM, languages, and coding camps.",
    description: "Fun, hands-on summer tracks designed for kids and teens. We balance structured learning blocks with project-based creativity, ensuring students return to school in September with a strong academic advantage.",
    details: "Parents can select from three custom tracks: 1) STEM & Coding (Python, Scratch, Lego robotics foundations), 2) English immersion and creative writing workshops, or 3) Heritage Amharic language lessons for children living in the diaspora. Camps run in 4-week blocks and conclude with a projects showcase.",
    icon: Calendar01Icon,
    benefits: [
      "STEM & Coding foundation projects (Scratch, Python, Robotics)",
      "Creative writing and public speaking confidence workshops",
      "Heritage Amharic language track for diaspora students",
      "Daily interactive activities, field days, and cohort prizes",
    ],
    pricing: "Single or multi-week camp packages.",
    schedule: "June - August. Half-day options (8:30 AM - 12:30 PM).",
    metaTitle: "Academic Summer Camps Addis Ababa — Fidel Tutorial",
    metaDesc: "Interactive summer camps covering coding, STEM, English writing, and Amharic language lessons. Project-based tracks for kids and teens.",
  },
  "test-prep": {
    title: "SAT · TOEFL · IELTS Prep",
    subtitle: "International Admissions Test Prep",
    tagline: "Score higher and unlock admission to top international universities.",
    description: "Comprehensive instruction packages targeting the digital SAT, TOEFL, and IELTS exams. Perfect for students in Ethiopia aiming for universities in the United States, United Kingdom, Canada, or Europe.",
    details: "We start by identifying target ranges for your chosen universities, then run initial diagnostics to pinpoint focus areas (e.g. grammar rules, math grids, or listening sections). Instructors teach proven score-improving hacks, vocabulary drills, and reading compression hacks. Weekly full-length practice tests build stamina.",
    icon: Award01Icon,
    benefits: [
      "Proven scoring strategies for digital SAT format",
      "IELTS & TOEFL speaking and writing feedback cycles",
      "Vast repository of practice tests and mock question banks",
      "Direct instructor accountability and key vocabulary sheets",
    ],
    pricing: "Structured exam cycles (8-week or 12-week options).",
    schedule: "Custom schedules (Weekday evenings and weekend blocks).",
    metaTitle: "SAT, TOEFL & IELTS Preparation Addis Ababa — Fidel Tutorial",
    metaDesc: "Score-improving prep programs for students aiming to study abroad. Baseline diagnostics, practice tests, and writing feedback.",
  },
  "counselling": {
    title: "University & Scholarship Counselling",
    subtitle: "College Admissions & Placements",
    tagline: "Navigate admissions, craft essays, and secure global scholarships.",
    description: "Admissions consulting program designed to help students stand out in competitive applicant pools globally. We help you choose the right matching universities, draft essays, apply for aid, and prepare for interviews.",
    details: "Applying to universities abroad is complex and highly competitive. Our advisors work one-on-one with candidates to craft a strong narrative. We help brainstorm personal statements, refine supplemental essays, structure resume activities lists, and locate scholarship opportunities matching the candidate's financial need.",
    icon: GraduationCapIcon,
    benefits: [
      "Personalized college list selection (Reach, Match, Safety)",
      "Essay editing, review cycles, and brainstorming sessions",
      "Common App and international application portal guidance",
      "Mock admissions interviews and financial aid document prep",
    ],
    pricing: "Admissions cycle consulting package.",
    schedule: "Scheduled consultation check-ins throughout the app cycle.",
    metaTitle: "University Admissions & Scholarship Consulting — Fidel Tutorial",
    metaDesc: "Strategic advisory for university admissions. Essay review, Common App setup, scholarship matching, and mock interview practice.",
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProgramPage({ params }: PageProps) {
  const resolvedParams = await params;
  const program = programsData[resolvedParams.slug];

  if (!program) {
    notFound();
  }

  return (
    <Layout
      title={program.metaTitle}
      description={program.metaDesc}
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
                  {program.subtitle}
                </span>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-brand-ink tracking-tight mb-4">
                  {program.title}
                </h1>
                <p className="text-brand-muted text-lg leading-relaxed max-w-2xl">
                  {program.tagline}
                </p>
              </div>
              <div className="lg:col-span-4 flex lg:justify-end">
                <div className="w-32 h-32 rounded-3xl bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center text-brand-primary shadow-sm">
                  <HugeiconsIcon icon={program.icon} size={48} />
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
                {program.description}
              </p>
              <p className="text-brand-muted text-base leading-relaxed">
                {program.details}
              </p>
            </div>

            <div className="p-8 border border-brand-rule rounded-2xl bg-brand-cream-warm/20">
              <h3 className="font-serif text-xl font-semibold text-brand-ink mb-6">
                What's Included in this Program
              </h3>
              <ul className="flex flex-col gap-4">
                {program.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-brand-ink font-semibold items-start">
                    <span className="text-brand-primary text-base flex-shrink-0 mt-0.5">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RHS Sidebar Card */}
          <div className="lg:col-span-4">
            <div className="border border-brand-rule rounded-2xl p-8 bg-brand-cream-warm/15 shadow-sm sticky top-28 flex flex-col gap-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-muted block mb-1">
                  Pricing Rate
                </span>
                <span className="font-serif text-lg font-bold text-brand-ink block">
                  {program.pricing}
                </span>
              </div>

              <hr className="border-brand-rule" />

              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-muted block mb-1">
                  Session & Schedule
                </span>
                <span className="font-sans text-sm font-semibold text-brand-ink block">
                  {program.schedule}
                </span>
              </div>

              <hr className="border-brand-rule" />

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
