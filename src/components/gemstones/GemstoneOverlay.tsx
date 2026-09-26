"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { GemMedia, Gemstone, GemSection } from "../../data/gemstones";
import { gemWash } from "./GemstoneThumb";

type Props = {
  section: GemSection;
  stone: Gemstone;
  titleId: string;
  onClose: () => void;
};

function StageMedia({
  media,
  hue,
}: {
  media: GemMedia;
  hue: number;
}) {
  if (media.type === "video") {
    return (
      <div
        className="relative flex aspect-square w-full max-h-[min(70vh,36rem)] items-center justify-center overflow-hidden bg-ink"
        style={gemWash(hue, true)}
      >
        <div className="absolute inset-0 bg-ink/45" />
        <div className="relative z-10 flex flex-col items-center gap-3 text-bg-elevated">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-full border border-bg-elevated/40 bg-ink/30 text-lg"
            aria-hidden
          >
            ▶
          </span>
          <span className="text-[0.65rem] tracking-[0.22em] uppercase opacity-80">
            Video placeholder
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="aspect-square w-full max-h-[min(70vh,36rem)] overflow-hidden"
      style={gemWash(hue, true)}
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-2">
        <span className="h-px w-12 bg-ink/25" aria-hidden />
        <span className="px-4 text-center text-[0.7rem] tracking-[0.2em] text-ink/50 uppercase">
          {media.label}
        </span>
      </div>
    </div>
  );
}

export function GemstoneOverlay({ section, stone, titleId, onClose }: Props) {
  const [index, setIndex] = useState(0);
  const media = stone.media;
  const active = media[index] ?? media[0];

  useEffect(() => {
    setIndex(0);
  }, [stone.id]);

  useEffect(() => {
    const { body, documentElement } = document;
    const prevHtmlOverflow = documentElement.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    const scrollbar = window.innerWidth - documentElement.clientWidth;

    documentElement.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        setIndex((i) => (i + 1) % media.length);
      }
      if (e.key === "ArrowLeft") {
        setIndex((i) => (i - 1 + media.length) % media.length);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      documentElement.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.paddingRight = prevPaddingRight;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, media.length]);

  const go = (dir: -1 | 1) => {
    setIndex((i) => (i + dir + media.length) % media.length);
  };

  return createPortal(
    <div
      data-lightbox
      className="fixed inset-0 z-[100] flex items-center justify-center p-5 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        tabIndex={-1}
        className="absolute inset-0 bg-ink/55 backdrop-blur-[2px]"
        aria-label="Close"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col gap-5 overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-10 right-0 text-[0.7rem] tracking-[0.22em] text-bg-elevated uppercase transition-colors hover:text-signal md:-top-12"
        >
          Close
        </button>

        <div className="rounded-sm bg-bg p-4 md:p-6">
          <div className="relative">
            <StageMedia media={active} hue={stone.hue} />
            <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-2 md:px-3">
              <button
                type="button"
                onClick={() => go(-1)}
                className="pointer-events-auto flex h-10 w-10 items-center justify-center bg-bg/85 text-ink text-[1.1rem] transition-colors hover:bg-signal"
                aria-label="Previous media"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="pointer-events-auto flex h-10 w-10 items-center justify-center bg-bg/85 text-ink text-[1.1rem] transition-colors hover:bg-signal"
                aria-label="Next media"
              >
                ›
              </button>
            </div>
          </div>

          {/* Carousel: main + 3 images + video — all selectable */}
          <ul className="mt-4 flex gap-2 overflow-x-auto pb-1 md:gap-3">
            {media.map((item, i) => {
              const selected = i === index;
              return (
                <li key={item.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-current={selected ? "true" : undefined}
                    aria-label={item.label}
                    className={`relative h-[72px] w-[72px] overflow-hidden border transition-colors ${
                      selected
                        ? "border-ink"
                        : "border-frame-edge opacity-80 hover:opacity-100"
                    }`}
                  >
                    <span
                      className="absolute inset-0"
                      style={gemWash(stone.hue + i * 12, true)}
                      aria-hidden
                    />
                    {item.type === "video" ? (
                      <span className="absolute inset-0 flex items-center justify-center bg-ink/40 text-[0.65rem] text-bg-elevated">
                        ▶
                      </span>
                    ) : null}
                    {i === 0 ? (
                      <span className="absolute bottom-1 left-1 bg-bg/90 px-1 text-[0.5rem] tracking-[0.14em] text-ink uppercase">
                        Main
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex items-start justify-between gap-6 px-1 text-bg-elevated">
          <div>
            <p className="text-[0.65rem] tracking-[0.22em] text-signal uppercase">
              {section.label}
            </p>
            <h3
              id={titleId}
              className="font-display mt-2 text-[1.6rem] tracking-[-0.03em]"
            >
              {stone.name}
            </h3>
            <p className="mt-1 text-[0.9rem] text-bg-elevated/70">{stone.note}</p>
            <p className="mt-2 text-[0.7rem] text-bg-elevated/50">
              {active.label}
              {" · "}
              {index + 1}/{media.length}
            </p>
          </div>
          <p className="max-w-[9rem] text-right text-[0.7rem] leading-snug text-bg-elevated/55">
            Placeholder — drop final photos{"\u00A0"}&{"\u00A0"}video when ready
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
