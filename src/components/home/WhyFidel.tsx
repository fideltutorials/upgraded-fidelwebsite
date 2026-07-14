export default function WhyFidel() {
  return (
    <section className="py-20 border-t border-brand-rule" id="about">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase block mb-2">
            Why Fidel
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-brand-ink tracking-tight">
            The quiet things that make a real difference.
          </h2>
          <p className="text-brand-muted text-base leading-relaxed mt-4">
            There are cheaper tutors in this market. Fidel is built for families
            who would rather pay for the result.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="pt-6 border-t-2 border-brand-primary">
            <span className="font-serif italic text-brand-secondary text-xs font-semibold block mb-2">
              01 · Standards
            </span>
            <h3 className="font-serif text-xl font-bold text-brand-ink mb-3">
              Vetted Tutors
            </h3>
            <p className="text-brand-muted text-sm leading-relaxed">
              Every tutor is interviewed, background-checked, and trained on the
              Fidel teaching standard before they meet a student.
            </p>
          </div>

          <div className="pt-6 border-t-2 border-brand-primary">
            <span className="font-serif italic text-brand-secondary text-xs font-semibold block mb-2">
              02 · Outcomes
            </span>
            <h3 className="font-serif text-xl font-bold text-brand-ink mb-3">
              Built for Results
            </h3>
            <p className="text-brand-muted text-sm leading-relaxed">
              Programmes are designed backwards from the outcome — the exam
              score, the placement, the scholarship offer.
            </p>
          </div>

          <div className="pt-6 border-t-2 border-brand-primary">
            <span className="font-serif italic text-brand-secondary text-xs font-semibold block mb-2">
              03 · Local depth
            </span>
            <h3 className="font-serif text-xl font-bold text-brand-ink mb-3">
              Five Years in Addis
            </h3>
            <p className="text-brand-muted text-sm leading-relaxed">
              Long enough to know the curriculum, the schools, and the families
              inside out — and short enough to still teach with energy.
            </p>
          </div>

          <div className="pt-6 border-t-2 border-brand-primary">
            <span className="font-serif italic text-brand-secondary text-xs font-semibold block mb-2">
              04 · Convenience
            </span>
            <h3 className="font-serif text-xl font-bold text-brand-ink mb-3">
              Frictionless Payment
            </h3>
            <p className="text-brand-muted text-sm leading-relaxed">
              Telebirr, CBE Birr and international cards. Whether you are in
              Addis or Atlanta, pay for tutoring in one tap.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
