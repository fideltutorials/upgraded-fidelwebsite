"use client";

import { useEffect, useState } from "react";

interface Testimonial {
  id: number;
  authorName: string;
  role: string;
  quote: string;
  initials: string;
}

const FALLBACK: Testimonial[] = [
  {
    id: 1,
    quote: "The change was not just in the marks — it was in how she sat down to study. The tutor didn't just teach the subject, she taught my daughter how to learn it.",
    authorName: "Meron T.",
    role: "Parent of a Grade-9 student · Bole",
    initials: "MT",
  },
  {
    id: 2,
    quote: "We are in Washington and our nephew is in Addis. Fidel made it simple — we pay here, he learns there, and we get a monthly progress note. It just works.",
    authorName: "Tewodros A.",
    role: "Diaspora sponsor · Washington, DC",
    initials: "TA",
  },
  {
    id: 3,
    quote: "The Grade-12 bootcamp was the most organised support my son received in his exam year. Weekly mocks made the real exam feel ordinary.",
    authorName: "Rahel B.",
    role: "Parent of an EHEECE candidate · Lebu",
    initials: "RB",
  },
];

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>(FALLBACK);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            // Show only the first 3 on the home page
            setItems(data.slice(0, 3));
          }
        }
      } catch (err) {
        console.error("Failed to load testimonials:", err);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="py-20 bg-brand-cream-warm" id="testimonials">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-12">
          <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-2">
            In their words
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-brand-ink tracking-tight">
            What families say.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((t) => (
            <div key={t.id} className="bg-brand-paper rounded-xl p-8 border border-brand-rule flex flex-col gap-6 shadow-sm">
              <span className="font-serif text-5xl text-brand-secondary leading-none h-4">
                &quot;
              </span>
              <blockquote className="font-serif text-lg leading-relaxed text-brand-ink">
                {t.quote}
              </blockquote>
              <div className="pt-5 border-t border-brand-rule flex items-center gap-3 mt-auto">
                <span className="w-10 h-10 rounded-full bg-brand-primary text-brand-secondary flex items-center justify-center font-serif font-bold text-base">
                  {t.initials}
                </span>
                <div>
                  <span className="block font-bold text-sm text-brand-ink">
                    {t.authorName}
                  </span>
                  <span className="block text-xs text-brand-muted">
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
