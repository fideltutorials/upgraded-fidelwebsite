"use client";

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

export default function Programs() {
  return (
    <Layout
      title="Tutoring & Exam Prep Programs — Fidel Tutorial"
      description="Explore our customized tutoring, exam bootcamps, SAT preparation, and university counselling programs for students in Addis Ababa and the diaspora."
    >
      {/* Intro Header */}
      <section className="py-16 md:py-24 bg-brand-cream-warm/40 border-b border-brand-rule">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-3 font-semibold">Our Offerings</span>
          <h1 className="font-serif text-4xl md:text-6xl font-medium text-brand-ink tracking-tight mb-6">
            Programs Built for Results
          </h1>
          <p className="text-brand-muted text-lg leading-relaxed max-w-2xl mx-auto">
            From primary school foundations to international college applications, discover our structured learning paths designed for academic excellence.
          </p>
        </div>
      </section>

      {/* Programs Deep Dive */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-24">
          
          {/* 1. One-on-One Tutoring */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center scroll-mt-24" id="one-on-one">
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <a href="/programs/one-on-one" className="group block hover:scale-[1.02] transition-transform duration-300">
                <div className="w-64 h-64 rounded-2xl bg-brand-primary/5 flex items-center justify-center border border-brand-primary/10 group-hover:border-brand-primary/30">
                  <span className="text-brand-primary">
                    <HugeiconsIcon icon={BookUserIcon} size={96} />
                  </span>
                </div>
              </a>
            </div>
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="text-brand-primary font-bold text-sm tracking-wider uppercase mb-2">KG to University</span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand-ink mb-4 hover:text-brand-primary transition-colors">
                <a href="/programs/one-on-one">One-on-One Tutoring</a>
              </h2>
              <p className="text-brand-muted text-base leading-relaxed mb-6">
                Personalised, individual attention tailored to the student's unique learning style and pace. Available in-home in Addis Ababa and online globally. Every student undergoes a baseline assessment, and progress is reported on a monthly basis.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-brand-ink font-semibold mb-6">
                <li className="flex items-center gap-2">✓ Tailored study plans</li>
                <li className="flex items-center gap-2">✓ Math, Science, Languages & Coding</li>
                <li className="flex items-center gap-2">✓ Flexible monthly schedule</li>
                <li className="flex items-center gap-2">✓ Vetted and matched subject tutors</li>
              </ul>
              <a href="/programs/one-on-one" className="bg-brand-primary text-brand-paper hover:bg-brand-primary-deep px-6 py-3 rounded-full font-semibold transition-all">
                Learn More →
              </a>
            </div>
          </div>

          <hr className="border-brand-rule" />

          {/* 2. Group Classes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center scroll-mt-24" id="group-classes">
            <div className="lg:col-span-7 flex flex-col items-start order-2 lg:order-1">
              <span className="text-brand-primary font-bold text-sm tracking-wider uppercase mb-2">Collaborative Learning</span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand-ink mb-4 hover:text-brand-primary transition-colors">
                <a href="/programs/group-classes">Group Classes</a>
              </h2>
              <p className="text-brand-muted text-base leading-relaxed mb-6">
                Small cohorts of 4 to 8 students designed for interactive learning. Combines structured curriculum instruction with peer collaboration to enhance problem-solving skills, at a cost-effective per-student price point.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-brand-ink font-semibold mb-6">
                <li className="flex items-center gap-2">✓ Interactive peer environment</li>
                <li className="flex items-center gap-2">✓ Weekly worksheets & tasks</li>
                <li className="flex items-center gap-2">✓ Homework review sessions</li>
                <li className="flex items-center gap-2">✓ Lower per-student cost</li>
              </ul>
              <a href="/programs/group-classes" className="bg-brand-primary text-brand-paper hover:bg-brand-primary-deep px-6 py-3 rounded-full font-semibold transition-all">
                Learn More →
              </a>
            </div>
            <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
              <a href="/programs/group-classes" className="group block hover:scale-[1.02] transition-transform duration-300">
                <div className="w-64 h-64 rounded-2xl bg-brand-primary/5 flex items-center justify-center border border-brand-primary/10 group-hover:border-brand-primary/30">
                  <span className="text-brand-primary">
                    <HugeiconsIcon icon={UserGroupIcon} size={96} />
                  </span>
                </div>
              </a>
            </div>
          </div>

          <hr className="border-brand-rule" />

          {/* 3. National Exam Bootcamps */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center scroll-mt-24" id="bootcamps">
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <a href="/programs/exam-bootcamps" className="group block hover:scale-[1.02] transition-transform duration-300">
                <div className="w-64 h-64 rounded-2xl bg-brand-primary/5 flex items-center justify-center border border-brand-primary/10 group-hover:border-brand-primary/30">
                  <span className="text-brand-primary">
                    <HugeiconsIcon icon={Book02Icon} size={96} />
                  </span>
                </div>
              </a>
            </div>
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="text-brand-primary font-bold text-sm tracking-wider uppercase mb-2">Grade 6, 8, & 12</span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand-ink mb-4 hover:text-brand-primary transition-colors">
                <a href="/programs/exam-bootcamps">National Exam Bootcamps</a>
              </h2>
              <p className="text-brand-muted text-base leading-relaxed mb-6">
                Our intensive exam cohorts are structured specifically around national assessments and EHEECE. With rigorous mock examinations every Saturday, weekly graded diagnostic papers, and detailed reviews by subject experts, our bootcamps prepare candidates for high-stress testing environments.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-brand-ink font-semibold mb-6">
                <li className="flex items-center gap-2">✓ Full-length weekly mocks</li>
                <li className="flex items-center gap-2">✓ Target-driven mock scoring</li>
                <li className="flex items-center gap-2">✓ Dedicated subject revision guides</li>
                <li className="flex items-center gap-2">✓ Limited group sizes</li>
              </ul>
              <a href="/programs/exam-bootcamps" className="bg-brand-primary text-brand-paper hover:bg-brand-primary-deep px-6 py-3 rounded-full font-semibold transition-all">
                Learn More →
              </a>
            </div>
          </div>

          <hr className="border-brand-rule" />

          {/* 4. Summer Camps */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center scroll-mt-24" id="summer-camps">
            <div className="lg:col-span-7 flex flex-col items-start order-2 lg:order-1">
              <span className="text-brand-primary font-bold text-sm tracking-wider uppercase mb-2">Seasonal enrichment</span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand-ink mb-4 hover:text-brand-primary transition-colors">
                <a href="/programs/summer-camps">Summer Camps</a>
              </h2>
              <p className="text-brand-muted text-base leading-relaxed mb-6">
                Engaging summer camps designed for cognitive and personal growth. Programs cover STEM foundations (scratch, Python coding, robotics), English immersion and creative writing, exam prep prep-camps, and a heritage Amharic language program for children from the diaspora.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-brand-ink font-semibold mb-6">
                <li className="flex items-center gap-2">✓ Coding & STEM projects</li>
                <li className="flex items-center gap-2">✓ English language fluency focus</li>
                <li className="flex items-center gap-2">✓ Heritage Amharic options</li>
                <li className="flex items-center gap-2">✓ Dynamic learning environments</li>
              </ul>
              <a href="/programs/summer-camps" className="bg-brand-primary text-brand-paper hover:bg-brand-primary-deep px-6 py-3 rounded-full font-semibold transition-all">
                Learn More →
              </a>
            </div>
            <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
              <a href="/programs/summer-camps" className="group block hover:scale-[1.02] transition-transform duration-300">
                <div className="w-64 h-64 rounded-2xl bg-brand-primary/5 flex items-center justify-center border border-brand-primary/10 group-hover:border-brand-primary/30">
                  <span className="text-brand-primary">
                    <HugeiconsIcon icon={Calendar01Icon} size={96} />
                  </span>
                </div>
              </a>
            </div>
          </div>

          <hr className="border-brand-rule" />

          {/* 5. SAT · TOEFL · IELTS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center scroll-mt-24" id="test-prep">
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <a href="/programs/test-prep" className="group block hover:scale-[1.02] transition-transform duration-300">
                <div className="w-64 h-64 rounded-2xl bg-brand-primary/5 flex items-center justify-center border border-brand-primary/10 group-hover:border-brand-primary/30">
                  <span className="text-brand-primary">
                    <HugeiconsIcon icon={Award01Icon} size={96} />
                  </span>
                </div>
              </a>
            </div>
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="text-brand-primary font-bold text-sm tracking-wider uppercase mb-2">International Test Prep</span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand-ink mb-4 hover:text-brand-primary transition-colors">
                <a href="/programs/test-prep">SAT · TOEFL · IELTS</a>
              </h2>
              <p className="text-brand-muted text-base leading-relaxed mb-6">
                Score-improving prep work for students aiming at universities abroad. We offer baseline tests, identify score gaps, assign weekly practice sections, analyze mistakes systematically, and teach essential vocabulary and test-taking strategies.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-brand-ink font-semibold mb-6">
                <li className="flex items-center gap-2">✓ Verified practice resources</li>
                <li className="flex items-center gap-2">✓ Time-management tactics</li>
                <li className="flex items-center gap-2">✓ Essays & grammar reviews</li>
                <li className="flex items-center gap-2">✓ Direct mentor accountability</li>
              </ul>
              <a href="/programs/test-prep" className="bg-brand-primary text-brand-paper hover:bg-brand-primary-deep px-6 py-3 rounded-full font-semibold transition-all">
                Learn More →
              </a>
            </div>
          </div>

          <hr className="border-brand-rule" />

          {/* 6. University & Scholarship Counselling */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center scroll-mt-24" id="counselling">
            <div className="lg:col-span-7 flex flex-col items-start order-2 lg:order-1">
              <span className="text-brand-primary font-bold text-sm tracking-wider uppercase mb-2">College Admissions</span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand-ink mb-4 hover:text-brand-primary transition-colors">
                <a href="/programs/counselling">University &amp; Scholarship Counselling</a>
              </h2>
              <p className="text-brand-muted text-base leading-relaxed mb-6">
                Strategic advice for navigating university admissions. From selecting matching institutions to writing personal statements, preparing portfolios, and optimizing scholarship applications for top institutions globally.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-brand-ink font-semibold mb-6">
                <li className="flex items-center gap-2">✓ College shortlisting</li>
                <li className="flex items-center gap-2">✓ Essay crafting & guidance</li>
                <li className="flex items-center gap-2">✓ Mock admissions interviews</li>
                <li className="flex items-center gap-2">✓ Scholarship matching strategy</li>
              </ul>
              <a href="/programs/counselling" className="bg-brand-primary text-brand-paper hover:bg-brand-primary-deep px-6 py-3 rounded-full font-semibold transition-all">
                Learn More →
              </a>
            </div>
            <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
              <a href="/programs/counselling" className="group block hover:scale-[1.02] transition-transform duration-300">
                <div className="w-64 h-64 rounded-2xl bg-brand-primary/5 flex items-center justify-center border border-brand-primary/10 group-hover:border-brand-primary/30">
                  <span className="text-brand-primary">
                    <HugeiconsIcon icon={GraduationCapIcon} size={96} />
                  </span>
                </div>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-brand-primary-deep text-brand-paper text-center">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">Ready to lift your child's academic performance?</h2>
          <p className="text-brand-cream/80 text-base leading-relaxed mb-8">
            Book a consultation call or register for a free trial session today. Our advisors are ready to help.
          </p>
          <a href="/contact" className="bg-brand-secondary text-brand-ink hover:bg-brand-secondary-soft px-8 py-4 rounded-full font-bold transition-all inline-block">
            Book a Free Trial Session
          </a>
        </div>
      </section>
    </Layout>
  );
}
