import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-line px-5 py-10 md:px-10">
      <div className="mx-auto flex max-w-[90rem] flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-line bg-bg-elevated p-[2px]">
            <Image
              src="/brand/ryp-logo-sm.png"
              alt="RYP Web Design"
              width={28}
              height={28}
              className="h-full w-full rounded-full object-contain object-center"
            />
          </span>
          <span className="hidden text-[0.7rem] font-medium tracking-[0.16em] text-mute uppercase sm:inline">
            RYP Web Design
          </span>
        </div>
        <p className="text-right text-[0.65rem] font-medium leading-snug tracking-[0.08em] text-faint text-pretty sm:text-[0.7rem] sm:tracking-[0.12em]">
          © {new Date().getFullYear()} · Sized to the{"\u00A0"}media
        </p>
      </div>
    </footer>
  );
}
