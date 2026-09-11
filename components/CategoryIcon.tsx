/**
 * Minimal technical-annotation marks for project categories — square geometry,
 * currentColor strokes, no fills/curves, in keeping with the Brutal system's
 * hard-edge visual language. Decorative only; always paired with a visible text label.
 */
export function CategoryIcon({ category, size = 14 }: { category: string; size?: number }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 20 20",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "square" as const,
    strokeLinejoin: "miter" as const,
    "aria-hidden": true,
  };

  switch (category) {
    case "AI / ML":
      return (
        <svg {...props}>
          <rect x="7.5" y="7.5" width="5" height="5" />
          <path d="M10 2.5v5M10 12.5v5M2.5 10h5M12.5 10h5M4.5 4.5l3 3M15.5 4.5l-3 3M4.5 15.5l3-3M15.5 15.5l-3-3" />
        </svg>
      );
    case "Full-Stack":
      return (
        <svg {...props}>
          <path d="M2.5 5h15M2.5 10h11M2.5 15h7" />
        </svg>
      );
    case "Mobile":
      return (
        <svg {...props}>
          <rect x="5.5" y="2.5" width="9" height="15" />
          <path d="M8 15.2h4" />
        </svg>
      );
    case "Web":
      return (
        <svg {...props}>
          <rect x="2.5" y="3.5" width="15" height="13" />
          <path d="M2.5 7h15" />
        </svg>
      );
    default:
      return null;
  }
}

/** A restrained listening/waveform mark — used once, as an annotation on the locked teaser row. */
export function VoiceMark({ size = 13 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="square"
      aria-hidden="true"
    >
      <path d="M4 8v4M8 5v10M12 3v14M16 7v6" />
    </svg>
  );
}
