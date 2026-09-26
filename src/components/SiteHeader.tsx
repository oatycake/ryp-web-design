export function SiteHeader() {
  return (
    <header className="relative z-30 h-14">
      <div className="mx-auto flex h-full max-w-[90rem] items-center justify-center px-5 md:justify-end md:px-10">
        <nav
          className="type-heavy anim-soft flex items-center gap-6 text-[0.7rem] tracking-[0.2em] text-mute uppercase"
          aria-label="Primary"
        >
          <a href="#about" className="transition-colors hover:text-ink">
            About
          </a>
          <a href="#work" className="transition-colors hover:text-ink">
            Work
          </a>
          <a href="#inquire" className="transition-colors hover:text-ink">
            Inquire
          </a>
        </nav>
      </div>
    </header>
  );
}
