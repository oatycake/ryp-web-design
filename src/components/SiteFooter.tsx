import Image from "next/image";

type SiteFooterProps = {
  brand?: string;
  /** Right-side line after the year; omit for year only */
  note?: string;
  /** Full right-side credit line — replaces © year · note when set */
  credit?: string;
  /** Mark next to brand — defaults to small RYP logo */
  markSrc?: string;
  /** Pixelate mark (emoji / character avatars) */
  markPixelated?: boolean;
};

export function SiteFooter({
  brand = "RYP Web Design",
  note = "Sized to the\u00A0media",
  credit,
  markSrc = "/brand/ryp-logo-sm.png",
  markPixelated = false,
}: SiteFooterProps) {
  return (
    <footer className="relative z-10 border-t border-line px-5 py-10 md:px-10">
      <div className="mx-auto flex max-w-[90rem] flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {markPixelated ? (
            <Image
              src={markSrc}
              alt=""
              width={40}
              height={40}
              unoptimized
              className="h-10 w-10 shrink-0 object-contain [image-rendering:pixelated]"
            />
          ) : (
            <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-line bg-bg-elevated p-[2px]">
              <Image
                src={markSrc}
                alt=""
                width={28}
                height={28}
                className="h-full w-full rounded-full object-contain object-center"
              />
            </span>
          )}
          <span className="hidden text-[0.7rem] font-medium tracking-[0.16em] text-mute uppercase sm:inline">
            {brand}
          </span>
        </div>
        <p className="text-right text-[0.65rem] font-medium leading-snug tracking-[0.08em] text-faint text-pretty sm:text-[0.7rem] sm:tracking-[0.12em]">
          {credit ?? (
            <>
              © {new Date().getFullYear()}
              {note ? <> · {note}</> : null}
            </>
          )}
        </p>
      </div>
    </footer>
  );
}
