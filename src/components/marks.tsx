/**
 * Editorial marks. Pure inline SVG / CSS, currentColor only —
 * no hand-drawn squiggles, no illustrations, nothing decorative for its own sake.
 */

/**
 * CadenceMark — the house divider between a headline and its paragraph.
 * A short measured comb: one solid stem, then ticks stepping down in height
 * and weight. Reads as a typographic cadence, not a rule.
 */
export function CadenceMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`cadence flex items-end gap-[7px] ${className}`}
      aria-hidden="true"
    >
      <i style={{ height: 18, opacity: 1 }} />
      <i style={{ height: 12, opacity: 0.75 }} />
      <i style={{ height: 8, opacity: 0.55 }} />
      <i style={{ height: 5, opacity: 0.4 }} />
      <i style={{ height: 5, opacity: 0.25 }} />
      <i style={{ height: 5, opacity: 0.14 }} />
    </span>
  );
}

/** Small stepped tick used to lead eyebrows and list markers. */
export function TickMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`cadence inline-flex items-end gap-[4px] ${className}`}
      aria-hidden="true"
    >
      <i style={{ height: 10, opacity: 1 }} />
      <i style={{ height: 6, opacity: 0.55 }} />
      <i style={{ height: 3, opacity: 0.3 }} />
    </span>
  );
}

/**
 * Emphasis on an inline word — a squared accent block with clipped corners,
 * not a circled scribble.
 */
export function CircleMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`mark-block pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
    />
  );
}

export function CheckMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-4 w-4 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 8.6 6 12l7.5-8.4" />
    </svg>
  );
}

export function CrossMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-4 w-4 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

export function CornerRules({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={`h-10 w-10 text-border ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M0 8h40M8 0v40" />
    </svg>
  );
}

/** Faint ruled-paper backdrop for wide sections. */
export function PaperGrid({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full text-border ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern id="cusp-grid" width="72" height="72" patternUnits="userSpaceOnUse">
          <path d="M72 0H0v72" fill="none" stroke="currentColor" strokeWidth="0.6" />
        </pattern>
        <linearGradient id="cusp-grid-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="cusp-grid-mask">
          <rect width="100%" height="100%" fill="url(#cusp-grid-fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#cusp-grid)" mask="url(#cusp-grid-mask)" />
    </svg>
  );
}
