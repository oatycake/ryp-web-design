import type { Format } from "../data/work";
import { formatSpec } from "../data/work";

type UnitFrameProps = {
  format: Format;
  /** Max height of the displayed frame in px */
  maxHeight: number;
  /** Optional max width clamp */
  maxWidth?: number;
  motion?: boolean;
  className?: string;
};

export function UnitFrame({
  format,
  maxHeight,
  maxWidth,
  motion = false,
  className = "",
}: UnitFrameProps) {
  const ratio = format.width / format.height;
  let height = maxHeight;
  let width = height * ratio;
  if (maxWidth && width > maxWidth) {
    width = maxWidth;
    height = width / ratio;
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div
        className="unit-shell shrink-0"
        style={{ width, height }}
      >
        <div
          className={`unit-placeholder${motion ? " unit-placeholder--motion" : ""}`}
        >
          {motion ? (
            <span
              className="unit-placeholder__dot h-2 w-2 rounded-full bg-signal"
              aria-hidden
            />
          ) : (
            <span
              className="h-px w-8 bg-frame-edge"
              aria-hidden
            />
          )}
          <span className="text-[0.58rem] tracking-[0.24em] text-faint uppercase">
            {format.label}
          </span>
        </div>
      </div>
      <p className="text-[0.62rem] tracking-[0.12em] text-faint tabular-nums">
        {formatSpec(format)}
      </p>
    </div>
  );
}
