import Image from "next/image";

const MARQUEE = [
  "custom web design",
  "100% not boring emails",
  "interstitials that don't eat the whole screen",
  "landings with a point of view",
  "siderails that earn their keep",
  "banners with a pulse",
  "motion that knows when to stop",
  "mobile that doesn't feel cramped",
];

export function Hero() {
  const strip = [...MARQUEE, ...MARQUEE];

  return (
    <section className="relative flex flex-col overflow-hidden">
      <div className="relative z-10 flex flex-col gap-6 pb-14 md:gap-7 md:pb-16">
        <div className="anim-rise delay-1 mx-auto mt-[25px] flex w-fit flex-col items-center gap-[30px] px-5 md:mt-[50px] md:px-10">
          <div className="relative aspect-[1287/670] w-[clamp(11rem,32vw,19rem)] overflow-hidden">
            <Image
              src="/brand/ryp-logo.png"
              alt="RYP"
              width={1638}
              height={1638}
              priority
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
          <p className="font-display text-center text-[clamp(0.85rem,2vw,1.05rem)] font-medium tracking-[0.42em] text-ink uppercase">
            <mark className="hl">{"\u00A0"}Web Design</mark>
          </p>
        </div>

        <div className="overflow-hidden border-y border-line py-3">
          <div className="hero-marquee gap-10 px-4 text-[0.68rem] font-medium tracking-[0.18em] text-mute uppercase">
            {strip.map((item, i) => (
              <span key={`${item}-${i}`} className="shrink-0">
                {item}
                <span className="ml-10 text-faint">/</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-5 px-5 md:gap-6 md:px-10">
          <h1 className="font-display anim-rise delay-2 text-balance text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.92] tracking-[-0.045em] text-ink">
            Fill the brief.
            <br />
            Fit the frame.
          </h1>
          <p className="anim-rise delay-3 max-w-md text-[1.05rem] leading-relaxed text-pretty text-mute">
            A sized gallery of what I design for the web — landings, emails,
            siderails, shortform motion,{"\u00A0"}&{"\u00A0"}banners.
          </p>
          <div className="anim-rise delay-4 flex flex-wrap items-center justify-center gap-3 pt-1 md:justify-start">
            <a href="#about" className="btn-ink">
              <span className="btn-ink__label">About RYP</span>
            </a>
            <a href="#work" className="btn-ink">
              <span className="btn-ink__label">Browse work</span>
            </a>
            <a href="#inquire" className="btn-ink">
              <span className="btn-ink__label">Inquire</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
