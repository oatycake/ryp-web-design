import type { Metadata } from "next";
import { GemstoneGallery } from "../../components/gemstones/GemstoneGallery";
import { GemstoneHero } from "../../components/gemstones/GemstoneHero";
import { SiteFooter } from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "Gemstones — Cabochon & Freeform",
  description:
    "Local gallery of cabochon and freeform gemstones — square thumbnails with full media overlay.",
};

export default function GemstonesPage() {
  return (
    <>
      <header className="relative z-30 h-14">
        <div className="mx-auto flex h-full max-w-[90rem] items-center justify-center px-5 md:justify-end md:px-10">
          <nav
            className="type-heavy anim-soft flex items-center gap-6 text-[0.7rem] tracking-[0.2em] text-mute uppercase"
            aria-label="Primary"
          >
            <a href="#cabochon" className="transition-colors hover:text-ink">
              Cabochons
            </a>
            <a href="#freeform" className="transition-colors hover:text-ink">
              Freeforms
            </a>
          </nav>
        </div>
      </header>

      <main>
        <GemstoneHero />
        <GemstoneGallery />
      </main>

      <SiteFooter
        brand="RYP Gemstones"
        credit="STACKING STONES SINCE © 2026"
        markSrc="/brand/ryp-mustache-guy-icon.png"
        markPixelated
      />
    </>
  );
}
