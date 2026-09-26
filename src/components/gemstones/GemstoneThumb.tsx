import type { Gemstone } from "../../data/gemstones";

/** Placeholder wash — swap for real `<Image>` when assets land. */
export function gemWash(hue: number, lit = false) {
  const s = lit ? 42 : 34;
  const l1 = lit ? 72 : 64;
  const l2 = lit ? 48 : 42;
  return {
    background: `
      radial-gradient(120% 90% at 30% 20%, hsla(${hue}, ${s + 20}%, ${l1}%, 0.95), transparent 55%),
      linear-gradient(160deg, hsl(${hue}, ${s}%, ${l1}%) 0%, hsl(${(hue + 28) % 360}, ${s - 8}%, ${l2}%) 100%)
    `,
  };
}

export function GemstoneThumb({
  stone,
  onOpen,
}: {
  stone: Gemstone;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex w-[250px] cursor-zoom-in flex-col gap-3 text-left outline-none"
    >
      <div className="unit-shell h-[250px] w-[250px] shrink-0">
        <div
          className="unit-placeholder"
          style={gemWash(stone.hue)}
          aria-hidden
        >
          <span className="h-px w-8 bg-ink/20" />
          <span className="px-3 text-center text-[0.58rem] tracking-[0.2em] text-ink/45 uppercase">
            Placeholder
          </span>
        </div>
      </div>
      <div className="w-[250px]">
        <h3 className="font-display text-[1.05rem] tracking-[-0.03em] text-ink">
          {stone.name}
        </h3>
        <p className="mt-1 text-[0.8rem] text-pretty text-mute">{stone.note}</p>
      </div>
    </button>
  );
}
