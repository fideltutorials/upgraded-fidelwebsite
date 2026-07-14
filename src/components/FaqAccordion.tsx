"use client";

import React, { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChevronDownIcon } from "@hugeicons/core-free-icons";

interface FaqItem {
  id?: number;
  question: string;
  answer: string;
}

const STATIC_FAQS: FaqItem[] = [
  {
    question: "What grades and subjects do you cover?",
    answer: "KG through Grade 12 across every core subject — mathematics, English, Amharic, sciences, social studies, ICT and coding — plus university-level support in selected subjects. Test prep includes EHEECE, SAT, TOEFL and IELTS.",
  },
  {
    question: "Are sessions in English or Amharic?",
    answer: "Both. Tutors deliver in whichever language helps the student learn best, and they switch as needed. Diaspora-focused programmes are typically taught in English with Amharic as a heritage option.",
  },
  {
    question: "How are tutors vetted?",
    answer: "Every tutor passes a subject test, a teaching demonstration, an interview and a background check before they are matched with a student — and is trained on the Fidel teaching standard during onboarding.",
  },
  {
    question: "What does it cost?",
    answer: "Tutoring is offered as monthly packages with transparent pricing by grade and subject. Bootcamps are priced per cohort. Diaspora programmes are billed in USD. Book a free advisory call for a written quote.",
  },
  {
    question: "Do you offer online tutoring outside Addis Ababa?",
    answer: "Yes — we serve students in Bahir Dar, Hawassa, Mekelle, Dire Dawa and beyond, as well as Ethiopian families living abroad. The teaching standard is the same; only the delivery is online.",
  },
  {
    question: "How do diaspora families pay?",
    answer: "International debit and credit cards via secure checkout, in USD. We invoice in dollars and handle the Birr-side logistics so your relative or child receives tutoring without you sending money home first.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<FaqItem[]>(STATIC_FAQS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch("/api/faq");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setFaqs(data);
          }
        }
      } catch (err) {
        console.error("Failed to load FAQs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  if (loading && faqs === STATIC_FAQS) {
    // Just a fast render fallback, not blocking layout
  }

  return (
    <div className="border-t border-brand-rule">
      {faqs.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.id || idx} className="border-b border-brand-rule">
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex items-center justify-between gap-6 py-5 font-serif font-semibold text-lg md:text-xl text-brand-ink text-left hover:text-brand-primary transition-colors focus:outline-none"
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <span className={`flex-shrink-0 w-8 h-8 rounded-full border border-brand-rule flex items-center justify-center transition-colors ${
                isOpen ? "bg-brand-primary border-brand-primary text-brand-paper" : "bg-transparent text-brand-ink"
              }`}>
                <HugeiconsIcon 
                  icon={ChevronDownIcon} 
                  size={14} 
                  className={`transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""}`}
                />
              </span>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-[300px] opacity-100 pb-5" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-brand-muted text-sm md:text-base leading-relaxed max-w-3xl">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
