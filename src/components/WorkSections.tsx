"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import {
  categories,
  type Category,
  type WorkItem,
} from "../data/work";
import { UnitFrame } from "./UnitFrame";

type Active = { category: Category; item: WorkItem };

function frameScale(categoryId: string): {
  desktop: { maxHeight: number; maxWidth?: number };
  mobile: { maxHeight: number; maxWidth?: number };
  single: { maxHeight: number; maxWidth?: number };
} {
  switch (categoryId) {
    case "landing":
      return {
        desktop: { maxHeight: 300, maxWidth: 360 },
        mobile: { maxHeight: 360, maxWidth: 170 },
        single: { maxHeight: 300 },
      };
    case "email":
      return {
        desktop: { maxHeight: 360, maxWidth: 240 },
        mobile: { maxHeight: 360, maxWidth: 170 },
        single: { maxHeight: 360 },
      };
    case "siderail":
      return {
        desktop: { maxHeight: 180 },
        mobile: { maxHeight: 180 },
        single: { maxHeight: 180, maxWidth: 520 },
      };
    case "interstitial":
      return {
        desktop: { maxHeight: 300 },
        mobile: { maxHeight: 300 },
        single: { maxHeight: 300, maxWidth: 340 },
      };
    case "banner":
      return {
        desktop: { maxHeight: 120 },
        mobile: { maxHeight: 120 },
        single: { maxHeight: 120, maxWidth: 560 },
      };
    default:
      return {
        desktop: { maxHeight: 300 },
        mobile: { maxHeight: 300 },
        single: { maxHeight: 300 },
      };
  }
}

function WorkCard({
  category,
  item,
  onOpen,
}: {
  category: Category;
  item: WorkItem;
  onOpen: () => void;
}) {
  const scale = frameScale(category.id);
  const isPair = category.formats.length > 1;
  const isMotion = category.id === "interstitial";

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex w-max cursor-zoom-in flex-col gap-4 text-left outline-none"
    >
      <div className="flex items-end gap-4">
        {isPair ? (
          <>
            <UnitFrame
              format={category.formats[0]}
              maxHeight={scale.desktop.maxHeight}
              maxWidth={scale.desktop.maxWidth}
            />
            <UnitFrame
              format={category.formats[1]}
              maxHeight={scale.mobile.maxHeight}
              maxWidth={scale.mobile.maxWidth}
            />
          </>
        ) : (
          <UnitFrame
            format={category.formats[0]}
            maxHeight={scale.single.maxHeight}
            maxWidth={scale.single.maxWidth}
            motion={isMotion}
          />
        )}
      </div>
      <div className="max-w-[16rem]">
        <h3 className="font-display text-[1.15rem] tracking-[-0.03em] text-ink">
          {item.title}
        </h3>
        <p className="mt-1 text-[0.8rem] text-mute">{item.note}</p>
      </div>
    </button>
  );
}

function WorkModal({
  active,
  titleId,
  onClose,
}: {
  active: Active;
  titleId: string;
  onClose: () => void;
}) {
  const { category, item } = active;
  const isMotion = category.id === "interstitial";

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
    };
    window.addEventListener("keydown", onKey);

    return () => {
      documentElement.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.paddingRight = prevPaddingRight;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

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

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col gap-6 overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-10 right-0 text-[0.7rem] tracking-[0.22em] text-bg-elevated uppercase transition-colors hover:text-signal md:-top-12"
        >
          Close
        </button>

        <div className="flex flex-wrap items-end justify-center gap-6 rounded-sm bg-bg p-6 md:gap-8 md:p-10">
          {category.formats.map((format) => {
            const mobile = format.id === "mobile";
            const wide =
              category.id === "banner" || category.id === "siderail";
            const maxHeight = wide ? 200 : mobile ? 480 : 420;
            const maxWidth = wide ? 720 : mobile ? 220 : undefined;
            return (
              <UnitFrame
                key={format.id}
                format={format}
                maxHeight={maxHeight}
                maxWidth={maxWidth}
                motion={isMotion}
              />
            );
          })}
        </div>

        <div className="flex items-start justify-between gap-6 px-1 text-bg-elevated">
          <div>
            <p className="text-[0.65rem] tracking-[0.22em] text-signal uppercase">
              {category.label}
            </p>
            <h3
              id={titleId}
              className="font-display mt-2 text-[1.6rem] tracking-[-0.03em]"
            >
              {item.title}
            </h3>
            <p className="mt-1 text-[0.9rem] text-bg-elevated/70">{item.note}</p>
          </div>
          <p className="max-w-[10rem] text-right text-[0.7rem] leading-snug text-bg-elevated/55">
            Placeholder — drop final art when ready
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function CategorySection({
  category,
  onOpen,
}: {
  category: Category;
  onOpen: (active: Active) => void;
}) {
  return (
    <section
      id={category.id}
      className="scroll-mt-16 border-t border-line py-16 md:py-24"
    >
      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        <div className="mb-10 flex flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-[-0.04em] text-ink">
              {category.label}
            </h2>
          </div>
          <p className="max-w-sm text-[0.9rem] leading-relaxed text-pretty text-ink">
            <mark className="hl">{category.description}</mark>
          </p>
        </div>

        <div className="work-rail -mx-5 flex gap-10 overflow-x-auto px-5 pb-4 md:-mx-10 md:gap-14 md:px-10">
          {category.items.map((item) => (
            <WorkCard
              key={item.id}
              category={category}
              item={item}
              onOpen={() => onOpen({ category, item })}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function WorkSections() {
  const [active, setActive] = useState<Active | null>(null);
  const titleId = useId();
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      {categories.map((category) => (
        <CategorySection
          key={category.id}
          category={category}
          onOpen={setActive}
        />
      ))}
      {active ? (
        <WorkModal active={active} titleId={titleId} onClose={close} />
      ) : null}
    </>
  );
}
