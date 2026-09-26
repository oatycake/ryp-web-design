import { categories } from "../data/work";

export function CategoryNav() {
  return (
    <div
      id="work"
      className="sticky top-0 z-20 border-y border-line bg-bg/90 backdrop-blur-md"
    >
      {/* Mobile: compact jump menu — horizontal strip overflows on phone */}
      <details className="group mx-auto max-w-[90rem] md:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 text-[0.68rem] tracking-[0.18em] text-ink uppercase [&::-webkit-details-marker]:hidden">
          <span className="text-mute">Browse work</span>
          <span className="text-ink transition-transform group-open:rotate-180">
            ↓
          </span>
        </summary>
        <nav
          className="flex flex-col border-t border-line px-2 pb-2"
          aria-label="Work categories"
        >
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="px-3 py-2.5 text-[0.68rem] tracking-[0.18em] text-mute uppercase transition-colors hover:text-ink"
            >
              {cat.short}
            </a>
          ))}
        </nav>
      </details>

      {/* Desktop: horizontal category links */}
      <nav
        className="cat-nav mx-auto hidden max-w-[90rem] gap-1 overflow-x-auto px-5 py-3 md:flex md:px-10"
        aria-label="Work categories"
      >
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            className="shrink-0 px-3 py-2 text-[0.68rem] tracking-[0.18em] text-mute uppercase transition-colors hover:text-ink"
          >
            {cat.short}
          </a>
        ))}
      </nav>
    </div>
  );
}
