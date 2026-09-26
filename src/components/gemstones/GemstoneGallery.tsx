"use client";

import { useCallback, useId, useState } from "react";
import {
  gemSections,
  type GemSection,
  type Gemstone,
} from "../../data/gemstones";
import { GemstoneOverlay } from "./GemstoneOverlay";
import { GemstoneThumb } from "./GemstoneThumb";

type Active = { section: GemSection; stone: Gemstone };

function SectionBlock({
  section,
  onOpen,
}: {
  section: GemSection;
  onOpen: (active: Active) => void;
}) {
  return (
    <section
      id={section.id}
      className="scroll-mt-16 border-t border-line py-16 md:py-24"
    >
      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        {/* Header + grid share one w-fit column so title/desc flush with thumbs */}
        <div className="mx-auto w-fit max-w-full">
          <div className="mb-10 flex w-full flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-8">
            <h2 className="font-display shrink-0 text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-[-0.04em] text-ink">
              {section.label}
            </h2>
            <p className="max-w-sm text-[0.9rem] leading-relaxed text-pretty text-ink md:text-right">
              <mark className="hl">
                {section.description.map((line, i) => (
                  <span key={line}>
                    {i > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </mark>
            </p>
          </div>

          <div className="gem-grid grid grid-cols-1 justify-items-start gap-x-8 gap-y-12 md:grid-cols-4">
            {section.stones.map((stone) => (
              <GemstoneThumb
                key={stone.id}
                stone={stone}
                onOpen={() => onOpen({ section, stone })}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function GemstoneGallery() {
  const [active, setActive] = useState<Active | null>(null);
  const titleId = useId();
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      {gemSections.map((section) => (
        <SectionBlock
          key={section.id}
          section={section}
          onOpen={setActive}
        />
      ))}

      {active ? (
        <GemstoneOverlay
          section={active.section}
          stone={active.stone}
          titleId={titleId}
          onClose={close}
        />
      ) : null}
    </>
  );
}
