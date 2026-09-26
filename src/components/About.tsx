import Image from "next/image";

export function About() {
  return (
    <section
      id="about"
      className="section-invert relative z-10 border-t px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-[90rem] gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/ryp-mustache-guy-icon.png"
              alt=""
              width={40}
              height={40}
              unoptimized
              className="h-10 w-10 shrink-0 object-contain [image-rendering:pixelated]"
            />
            <p className="text-[1.3rem] font-bold tracking-[0.24em] text-ink uppercase">
              <mark className="hl">About RYP</mark>
            </p>
          </div>
          <h2 className="font-display mt-4 text-balance text-[clamp(1.9rem,3.5vw,2.85rem)] leading-[1.05] tracking-[-0.04em] text-ink">
            The human
            <br />
            behind the{"\u00A0"}frames.
          </h2>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="text-[1rem] leading-[1.7] font-semibold text-pretty text-mute">
            I&apos;m Ryan — a front-end web designer who builds sized units that
            actually fit the brief. Landings, email, siderails, shortform
            motion, and banners: each one measured, paced, and made to work in
            the frame it&apos;s{"\u00A0"}given.
          </p>
          <p className="mt-6 text-[1rem] leading-[1.7] font-semibold text-pretty text-mute">
            RYP is the practice name. The craft is mine — clear layouts, honest
            motion, and no filler when a unit already says{"\u00A0"}enough.
          </p>
        </div>
      </div>
    </section>
  );
}
