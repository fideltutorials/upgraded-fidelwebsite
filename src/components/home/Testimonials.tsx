export default function Testimonials() {
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
          {/* Testimonial 1 */}
          <div className="bg-brand-paper rounded-xl p-8 border border-brand-rule flex flex-col gap-6 shadow-sm">
            <span className="font-serif text-5xl text-brand-secondary leading-none h-4">
              "
            </span>
            <blockquote className="font-serif text-lg leading-relaxed text-brand-ink">
              The change was not just in the marks — it was in how she sat down to
              study. The tutor didn't just teach the subject, she taught my
              daughter how to learn it.
            </blockquote>
            <div className="pt-5 border-t border-brand-rule flex items-center gap-3 mt-auto">
              <span className="w-10 h-10 rounded-full bg-brand-primary text-brand-secondary flex items-center justify-center font-serif font-bold text-base">
                MT
              </span>
              <div>
                <span className="block font-bold text-sm text-brand-ink">
                  Meron T.
                </span>
                <span className="block text-xs text-brand-muted">
                  Parent of a Grade-9 student · Bole
                </span>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-brand-paper rounded-xl p-8 border border-brand-rule flex flex-col gap-6 shadow-sm">
            <span className="font-serif text-5xl text-brand-secondary leading-none h-4">
              "
            </span>
            <blockquote className="font-serif text-lg leading-relaxed text-brand-ink">
              We are in Washington and our nephew is in Addis. Fidel made it
              simple — we pay here, he learns there, and we get a monthly
              progress note. It just works.
            </blockquote>
            <div className="pt-5 border-t border-brand-rule flex items-center gap-3 mt-auto">
              <span className="w-10 h-10 rounded-full bg-brand-primary text-brand-secondary flex items-center justify-center font-serif font-bold text-base">
                TA
              </span>
              <div>
                <span className="block font-bold text-sm text-brand-ink">
                  Tewodros A.
                </span>
                <span className="block text-xs text-brand-muted">
                  Diaspora sponsor · Washington, DC
                </span>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-brand-paper rounded-xl p-8 border border-brand-rule flex flex-col gap-6 shadow-sm">
            <span className="font-serif text-5xl text-brand-secondary leading-none h-4">
              "
            </span>
            <blockquote className="font-serif text-lg leading-relaxed text-brand-ink">
              The Grade-12 bootcamp was the most organised support my son
              received in his exam year. Weekly mocks made the real exam feel
              ordinary.
            </blockquote>
            <div className="pt-5 border-t border-brand-rule flex items-center gap-3 mt-auto">
              <span className="w-10 h-10 rounded-full bg-brand-primary text-brand-secondary flex items-center justify-center font-serif font-bold text-base">
                RB
              </span>
              <div>
                <span className="block font-bold text-sm text-brand-ink">
                  Rahel B.
                </span>
                <span className="block text-xs text-brand-muted">
                  Parent of an EHEECE candidate · Lebu
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
