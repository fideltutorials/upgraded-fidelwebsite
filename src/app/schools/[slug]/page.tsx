import React from "react";
import Layout from "@/layouts/Layout";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  SchoolIcon,
  BriefcaseIcon,
  Book02Icon,
  Award01Icon,
  GraduationCapIcon
} from "@hugeicons/core-free-icons";
import { notFound } from "next/navigation";

// Define the static params for build pre-rendering
export function generateStaticParams() {
  return [
    { slug: "private-schools" },
    { slug: "ngo-programmes" },
    { slug: "consulting" },
    { slug: "digital-content" },
    { slug: "teacher-training" },
    { slug: "lms-licensing" },
  ];
}

const schoolsData: Record<string, {
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  details: string;
  icon: any;
  benefits: string[];
  engagementModel: string;
  timeline: string;
  metaTitle: string;
  metaDesc: string;
}> = {
  "private-schools": {
    title: "Private Schools Partnerships",
    subtitle: "For Private Academies",
    tagline: "Enhance school curriculums with premium after-school programs, mocks, and bootcamps.",
    description: "We collaborate with private educational institutions in Addis Ababa to deliver structured academic boosters. From in-school EHEECE exam preparation to after-school STEM enrichment tracks, we align our expert resources with your academy's current calendar.",
    details: "Fidel works hand-in-hand with administrative coordinators to schedule specialized diagnostic testing, write school-branded mock booklets, and deploy top-rated tutors for targeted subject interventions. Our partnerships lift school-wide average scores, providing key marketing and enrollment advantages to private institutions.",
    icon: SchoolIcon,
    benefits: [
      "In-school EHEECE preparation bootcamps",
      "After-school enrichment programs (Coding, STEM, English writing)",
      "School-branded mock testing booklets and custom metrics dashboards",
      "Teacher collaboration workshops to share best teaching methodologies",
    ],
    engagementModel: "Institutional contract. Structured by cohort size or school term.",
    timeline: "Custom scheduling aligned with the academic school calendar.",
    metaTitle: "Private School Partnerships & Boosters — Fidel Tutorial",
    metaDesc: "Collaborate with Fidel Tutorial to deliver after-school programs, proctored EHEECE mocks, and customized curriculum boosters for private schools.",
  },
  "ngo-programmes": {
    title: "NGO & Donor Programmes",
    subtitle: "Educational Social Impact",
    tagline: "Accelerating learning interventions and literacy outcomes in underserved communities.",
    description: "Fidel partners with local and international non-profits, foundations, and donors to implement scalable educational programs. We design accelerated learning curricula, deploy specialized tutors, and manage student performance tracking metrics in high-need regions.",
    details: "We have experience organizing regional scholarship groups, setting up community learning pods, and developing literacy and numeracy training models. Our custom reporting allows donors to see clear graphs showing grade increases, attendance metrics, and instructional impact audits.",
    icon: BriefcaseIcon,
    benefits: [
      "Accelerated learning curricula designed for catch-up tutoring",
      "Regional educational access programs and local tutor deployment",
      "Transparent donor progress reports and performance metrics audit",
      "Community student grouping and local school integration",
    ],
    engagementModel: "Project-based grant/contract. Monitored on key milestones.",
    timeline: "Covers 3-month intensive intervals to multi-year program implementation.",
    metaTitle: "NGO & Donor Educational Programs — Fidel Tutorial",
    metaDesc: "Partner with us to scale tutoring interventions, community learning pods, and donor-monitored educational access projects in local communities.",
  },
  "consulting": {
    title: "Educational Consulting",
    subtitle: "Strategy & Advisory",
    tagline: "Expert consultation for curriculum design, school setup, and EdTech planning.",
    description: "We advise new and expanding schools, NGOs, and developers on pedagogical setup, curriculum alignment, regional educational policies, and modern digital instruction frameworks.",
    details: "Whether you are designing a new digital curriculum, planning EdTech infrastructure, training administrative staff, or looking to match quality-control licensing standards, Fidel's leadership team offers specialized advisory audits and actionable guides.",
    icon: GraduationCapIcon,
    benefits: [
      "Curriculum alignment audits for local and international boards",
      "Strategic planning templates for new school setups and spacing",
      "EdTech integration advisory (LMS, whiteboards, content management)",
      "Quality-assurance certified standards reporting guidelines",
    ],
    engagementModel: "Retainer-based advisory or project scoping.",
    timeline: "Flexible schedules (from 2-week assessments to long-term consulting).",
    metaTitle: "Educational Consulting & Strategy — Fidel Tutorial",
    metaDesc: "Pedagogical strategy audits, curriculum design advice, EdTech systems deployment, and school licensing planning by Fidel Tutorial.",
  },
  "digital-content": {
    title: "Digital Content Development",
    subtitle: "Custom E-Courseware & Media",
    tagline: "Produce localized, high-quality digital lessons and diagnostic question banks.",
    description: "We script, design, and produce localized digital curriculum materials, including comprehensive mock question databases, animations, and lesson guides in English, Amharic, and other languages.",
    details: "Fidel's subject matter experts write rigorous, clean diagnostic content and question banks complete with detailed written explanations. Our media teams build high-quality video content suitable for school LMS portals, online learning courses, and offline educational apps.",
    icon: Book02Icon,
    benefits: [
      "Localized video lessons and instructional animated explanations",
      "Massive databases of custom math and science mock questions",
      "Ge'ez and Amharic language lessons content packages",
      "White-labeled courseware ready for LMS integration",
    ],
    engagementModel: "Content licensing or bespoke content creation agreement.",
    timeline: "Content deliverables packages delivered on milestone schedules.",
    metaTitle: "Digital Content Development & E-Courseware — Fidel Tutorial",
    metaDesc: "Localized digital curriculum, video lessons production, animated explanations, and custom mock question databases developed by our team.",
  },
  "teacher-training": {
    title: "Teacher Training & Certification",
    subtitle: "Professional Development",
    tagline: "Upskill your teaching staff with modern instructional design and engagement skills.",
    description: "Professional development workshops built around the Fidel Teaching Standard. We train schoolteachers and private tutors on active classroom engagement, structured lesson pacing, diagnostic checks, and student psychology.",
    details: "Teachers learn to move away from passive chalk-and-talk models to dynamic, feedback-rich setups. Training blocks include live classroom simulation sessions, video audits, diagnostic worksheet design tutorials, and certification exams that elevate tutor qualification metrics.",
    icon: Award01Icon,
    benefits: [
      "Instructional design workshops for active engagement",
      "Student diagnostic testing and feedback loop methodologies",
      "Classroom management and diagnostic checks training",
      "Official Fidel Teaching Certification standard",
    ],
    engagementModel: "Cohort workshop packages or annual teacher audit contracts.",
    timeline: "3-day intensive bootcamps to month-long audit programs.",
    metaTitle: "Teacher Training & Professional Development — Fidel Tutorial",
    metaDesc: "Upskill classroom instructors and tutors with active engagement methods, diagnostic checks training, and professional certification.",
  },
  "lms-licensing": {
    title: "LMS Licensing",
    subtitle: "EdTech Portals",
    tagline: "Deploy a white-labeled, localized learning management system for your school.",
    description: "Gain complete white-labeled access to Fidel's proprietary, robust Learning Management System. Easily assign homework, post class links, track mock scores, and compile student analytics.",
    details: "Our LMS is optimized for local internet bandwidths and supports mobile application formats. Schools receive a customized domain, branded portal theme, student/parent portals, teacher management dashboards, and loaded question banks ready for immediate testing assignments.",
    icon: SchoolIcon,
    benefits: [
      "White-labeled LMS portal (yourname.school.com) with custom themes",
      "Optimized performance profiles for low-bandwidth environments",
      "Preloaded mock databases, quizzes, and homework managers",
      "Real-time analytics trackers for parents and administrators",
    ],
    engagementModel: "Annual software subscription per student/teacher license.",
    timeline: "LMS portal setup and domain mapping within 7 business days.",
    metaTitle: "LMS Software Licensing for Schools — Fidel Tutorial",
    metaDesc: "White-labeled, low-bandwidth optimized LMS portals preloaded with quizzes, student tracking analytics, and school administrator controls.",
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SchoolPage({ params }: PageProps) {
  const resolvedParams = await params;
  const school = schoolsData[resolvedParams.slug];

  if (!school) {
    notFound();
  }

  return (
    <Layout
      title={school.metaTitle}
      description={school.metaDesc}
    >
      <article className="min-h-screen bg-brand-paper">
        {/* Banner header */}
        <section className="py-20 lg:py-24 bg-brand-primary-deep text-brand-paper relative overflow-hidden">
          <div className="absolute inset-0 bg-radial from-brand-secondary/10 to-transparent pointer-events-none" />
          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <a
              href="/schools"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-secondary hover:text-brand-secondary-soft tracking-wider uppercase mb-8 transition-colors"
            >
              ← Back to Partnerships
            </a>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-4">
              <div className="lg:col-span-8">
                <span className="text-brand-secondary text-xs font-bold tracking-widest uppercase block mb-3">
                  {school.subtitle}
                </span>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
                  {school.title}
                </h1>
                <p className="text-brand-cream/80 text-lg leading-relaxed max-w-2xl">
                  {school.tagline}
                </p>
              </div>
              <div className="lg:col-span-4 flex lg:justify-end">
                <div className="w-32 h-32 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-secondary shadow-sm">
                  <HugeiconsIcon icon={school.icon} size={48} />
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
                Partnership Scope & Solutions
              </h2>
              <p className="text-brand-muted text-base leading-relaxed mb-6">
                {school.description}
              </p>
              <p className="text-brand-muted text-base leading-relaxed">
                {school.details}
              </p>
            </div>

            <div className="p-8 border border-brand-rule rounded-2xl bg-brand-cream-warm/20">
              <h3 className="font-serif text-xl font-semibold text-brand-ink mb-6">
                Key Collaboration Deliverables
              </h3>
              <ul className="flex flex-col gap-4">
                {school.benefits.map((benefit, idx) => (
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
                  Engagement Model
                </span>
                <span className="font-serif text-base font-bold text-brand-ink block">
                  {school.engagementModel}
                </span>
              </div>

              <hr className="border-brand-rule" />

              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-muted block mb-1">
                  Setup & Timeline
                </span>
                <span className="font-sans text-sm font-semibold text-brand-ink block">
                  {school.timeline}
                </span>
              </div>

              <hr className="border-brand-rule" />

              <a
                href="/contact"
                className="w-full text-center bg-brand-primary text-brand-paper hover:bg-brand-primary-deep py-3.5 rounded-full font-bold text-sm shadow-md shadow-brand-primary/10 transition-colors"
              >
                Request Custom Proposal →
              </a>
              
              <a
                href="/contact"
                className="w-full text-center border border-brand-rule hover:bg-brand-cream-warm text-brand-ink py-3.5 rounded-full font-bold text-sm transition-colors"
              >
                Contact Partnerships Team
              </a>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
}
