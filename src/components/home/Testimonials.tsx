"use client";

import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft, ArrowRight } from "@hugeicons/core-free-icons";

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
    quote:
      "The change was not just in the marks — it was in how she sat down to study. The tutor didn't just teach the subject, she taught my daughter how to learn it.",
    authorName: "Meron T.",
    role: "Parent of a Grade-9 student · Bole",
    initials: "MT",
  },
  {
    id: 2,
    quote:
      "We are in Washington and our nephew is in Addis. Fidel made it simple — we pay here, he learns there, and we get a monthly progress note. It just works.",
    authorName: "Tewodros A.",
    role: "Diaspora sponsor · Washington, DC",
    initials: "TA",
  },
  {
    id: 3,
    quote:
      "The Grade-12 bootcamp was the most organised support my son received in his exam year. Weekly mocks made the real exam feel ordinary.",
    authorName: "Rahel B.",
    role: "Parent of an EHEECE candidate · Lebu",
    initials: "RB",
  },
];

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>(FALLBACK);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setItems(data);
          }
        }
      } catch (err) {
        console.error("Failed to load testimonials:", err);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section
      className="py-20 bg-brand-cream-warm overflow-hidden"
      id="testimonials"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header with Navigation controls */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-2">
              In their words
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-brand-ink tracking-tight">
              What families say.
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              aria-label="Previous testimonials"
              className="w-10 h-10 rounded-full border border-brand-rule bg-white flex items-center justify-center text-brand-ink hover:bg-brand-primary hover:text-brand-paper hover:border-brand-primary transition-all duration-300 shadow-sm cursor-pointer"
            >
              <HugeiconsIcon icon={ArrowLeft} />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next testimonials"
              className="w-10 h-10 rounded-full border border-brand-rule bg-white flex items-center justify-center text-brand-ink hover:bg-brand-primary hover:text-brand-paper hover:border-brand-primary transition-all duration-300 shadow-sm cursor-pointer"
            >
              <HugeiconsIcon icon={ArrowRight} />
            </button>
          </div>
        </div>

        {/* Embla Carousel Viewport */}
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex gap-6">
            {items.map((t) => (
              <div
                key={t.id}
                className="embla__slide flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
              >
                <div className="bg-brand-paper rounded-xl p-8 border border-brand-rule flex flex-col gap-6 shadow-sm hover:shadow-md hover:border-brand-primary/20 transition-all duration-300 h-full">
                  <span className="font-serif text-5xl text-brand-secondary leading-none h-4">
                    &quot;
                  </span>
                  <blockquote className="font-serif text-lg leading-relaxed text-brand-ink flex-1">
                    {t.quote}
                  </blockquote>
                  <div className="pt-5 border-t border-brand-rule flex items-center gap-3 mt-auto">
                    <span className="w-10 h-10 rounded-full bg-brand-primary text-brand-secondary flex items-center justify-center font-serif font-bold text-base shadow-sm">
                      {t.initials}
                    </span>
                    <div>
                      <span className="block font-bold text-sm text-brand-ink">
                        {t.authorName}
                      </span>
                      <span className="block text-xs text-brand-muted line-clamp-1">
                        {t.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
