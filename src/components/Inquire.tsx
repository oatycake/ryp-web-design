export function Inquire() {
  return (
    <section
      id="inquire"
      className="section-invert relative z-10 border-t px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto flex max-w-[90rem] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-lg">
          <h2 className="font-display text-[clamp(1.9rem,3.5vw,2.85rem)] tracking-[-0.04em] text-ink">
            Have a unit in{"\u00A0"}mind?
          </h2>
          <p className="mt-4 text-[0.95rem] leading-relaxed font-semibold text-pretty text-mute">
            Landings, mail, siderails, motion, or banners — say what you need
            sized, and I&apos;ll reply with a clear next{"\u00A0"}step.
          </p>
        </div>
        <a
          href="mailto:ryanpatricdeisgn@gmail.com?subject=RYP%20Web%20Design%20inquiry"
          className="btn-invert inline-flex items-center px-5 py-3 text-[0.7rem] font-bold tracking-[0.2em] uppercase transition-opacity hover:opacity-90"
        >
          ryanpatricdeisgn@gmail.com
        </a>
      </div>
    </section>
  );
}
