import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  TelegramIcon,
  Facebook02Icon,
  TiktokIcon,
  YoutubeIcon,
  Linkedin02Icon
} from "@hugeicons/core-free-icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-ink text-brand-paper/75 py-16 border-t border-brand-rule/10 font-sans text-sm">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-rule/15">
          {/* Brand Info */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <a href="/" className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-brand-primary flex items-center justify-center text-brand-secondary-soft font-serif font-bold text-xl">
                ፊ
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-serif font-semibold text-lg text-brand-paper">
                  Fidel Tutorial
                </span>
                <span className="font-sans text-[10px] tracking-widest uppercase text-brand-secondary">
                  ፊደል · Addis Ababa
                </span>
              </span>
            </a>
            <p className="text-sm text-brand-paper/70 leading-relaxed mt-2">
              Vetted tutors, real results. Serving families across Ethiopia and the diaspora since 2020.
            </p>
            <div className="flex gap-2 mt-2">
              <a
                href="https://t.me/fideltutorial"
                aria-label="Telegram"
                className="w-9 h-9 rounded-full border border-brand-secondary/30 flex items-center justify-center hover:bg-brand-secondary/15 hover:border-brand-secondary transition-all"
              >
                <HugeiconsIcon icon={TelegramIcon} size={16} className="text-brand-secondary" />
              </a>
              <a
                href="https://facebook.com/fideltutorial"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-brand-secondary/30 flex items-center justify-center hover:bg-brand-secondary/15 hover:border-brand-secondary transition-all"
              >
                <HugeiconsIcon icon={Facebook02Icon} size={16} className="text-brand-secondary" />
              </a>
              <a
                href="https://tiktok.com/@fideltutorial"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full border border-brand-secondary/30 flex items-center justify-center hover:bg-brand-secondary/15 hover:border-brand-secondary transition-all"
              >
                <HugeiconsIcon icon={TiktokIcon} size={16} className="text-brand-secondary" />
              </a>
              <a
                href="https://youtube.com/@fideltutorial"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full border border-brand-secondary/30 flex items-center justify-center hover:bg-brand-secondary/15 hover:border-brand-secondary transition-all"
              >
                <HugeiconsIcon icon={YoutubeIcon} size={16} className="text-brand-secondary" />
              </a>
              <a
                href="https://linkedin.com/company/fideltutorial"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-brand-secondary/30 flex items-center justify-center hover:bg-brand-secondary/15 hover:border-brand-secondary transition-all"
              >
                <HugeiconsIcon icon={Linkedin02Icon} size={16} className="text-brand-secondary" />
              </a>
            </div>
          </div>

          {/* Links Column 1: Programs */}
          <div>
            <h4 className="text-brand-paper font-semibold tracking-wider text-xs uppercase mb-5">
              Programs
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="/programs/one-on-one" className="hover:text-brand-secondary transition-colors">
                  One-on-One Tutoring
                </a>
              </li>
              <li>
                <a href="/programs/group-classes" className="hover:text-brand-secondary transition-colors">
                  Group Classes
                </a>
              </li>
              <li>
                <a href="/programs/exam-bootcamps" className="hover:text-brand-secondary transition-colors">
                  Exam Bootcamps
                </a>
              </li>
              <li>
                <a href="/programs/summer-camps" className="hover:text-brand-secondary transition-colors">
                  Summer Camps
                </a>
              </li>
              <li>
                <a href="/programs/test-prep" className="hover:text-brand-secondary transition-colors">
                  SAT · TOEFL · IELTS
                </a>
              </li>
              <li>
                <a href="/programs/counselling" className="hover:text-brand-secondary transition-colors">
                  University Counselling
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Institutions */}
          <div>
            <h4 className="text-brand-paper font-semibold tracking-wider text-xs uppercase mb-5">
              For Institutions
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="/schools/private-schools" className="hover:text-brand-secondary transition-colors">
                  Private Schools
                </a>
              </li>
              <li>
                <a href="/schools/ngo-programmes" className="hover:text-brand-secondary transition-colors">
                  NGO Programmes
                </a>
              </li>
              <li>
                <a href="/schools/consulting" className="hover:text-brand-secondary transition-colors">
                  Educational Consulting
                </a>
              </li>
              <li>
                <a href="/schools/digital-content" className="hover:text-brand-secondary transition-colors">
                  Digital Content
                </a>
              </li>
              <li>
                <a href="/schools/teacher-training" className="hover:text-brand-secondary transition-colors">
                  Teacher Training
                </a>
              </li>
              <li>
                <a href="/schools/lms-licensing" className="hover:text-brand-secondary transition-colors">
                  LMS Licensing
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Resources */}
          <div>
            <h4 className="text-brand-paper font-semibold tracking-wider text-xs uppercase mb-5">
              Resources
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="/resources#past-papers" className="hover:text-brand-secondary transition-colors">
                  Past Papers
                </a>
              </li>
              <li>
                <a href="/resources#mock-exams" className="hover:text-brand-secondary transition-colors">
                  Mock Exams
                </a>
              </li>
              <li>
                <a href="/resources#blog" className="hover:text-brand-secondary transition-colors">
                  Study Tips Blog
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-brand-secondary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://lms.fideltutorial.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-secondary transition-colors"
                >
                  Student LMS Login
                </a>
              </li>
              <li>
                <a href="/diaspora" className="hover:text-brand-secondary transition-colors">
                  Diaspora
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 4: Company */}
          <div>
            <h4 className="text-brand-paper font-semibold tracking-wider text-xs uppercase mb-5">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="/about#story" className="hover:text-brand-secondary transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="/tutors" className="hover:text-brand-secondary transition-colors">
                  Tutors
                </a>
              </li>
              <li>
                <a href="/testimonials" className="hover:text-brand-secondary transition-colors">
                  Results
                </a>
              </li>
              <li>
                <a href="/about#careers" className="hover:text-brand-secondary transition-colors">
                  Join Our Tutors
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-brand-secondary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-brand-paper/60">
          <div>
            © {currentYear} Fidel Tutorial · ፊደል · All rights reserved.
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <span className="uppercase tracking-widest text-[10px] mr-2 text-brand-paper/50 font-semibold">
              Accepted
            </span>
            <span className="px-2.5 py-1 border border-brand-secondary/20 rounded-md text-brand-secondary font-medium">
              Telebirr
            </span>
            <span className="px-2.5 py-1 border border-brand-secondary/20 rounded-md text-brand-secondary font-medium">
              CBE Birr
            </span>
            <span className="px-2.5 py-1 border border-brand-secondary/20 rounded-md text-brand-secondary font-medium">
              Visa
            </span>
            <span className="px-2.5 py-1 border border-brand-secondary/20 rounded-md text-brand-secondary font-medium">
              Mastercard
            </span>
            <span className="px-2.5 py-1 border border-brand-secondary/20 rounded-md text-brand-secondary font-medium">
              USD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
