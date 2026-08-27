/**
 * Illustration set for the About and How it works pages.
 *
 * Drawn to the same rules as `marks.tsx`: hairline strokes, no fills, colour
 * taken from `currentColor` so every mark inverts correctly in dark mode.
 */

export type SurfaceKey = "build" | "today" | "discover" | "gap" | "saved";

/**
 * The five glyphs CuspAI uses in its own tab bar, redrawn at site scale so the
 * guide names each surface with the icon the reader will actually tap.
 */
const SURFACE_PATHS: Record<SurfaceKey, string> = {
  build: "M12 4v16M4 12h16",
  today: "M4 6h16M4 12h10M4 18h13",
  discover: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM16 16l4 4",
  gap: "M5 19V9M12 19V5M19 19v-6",
  saved: "M6 3.75h12v16.5L12 15.6l-6 4.65V3.75Z",
};

export function SurfaceIcon({ name, className = "" }: { name: SurfaceKey; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d={SURFACE_PATHS[name]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Horizon with something rising over it — the long view. */
export function VisionMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <path d="M2.5 16.5h19" />
        <path d="M6.5 16.5a5.5 5.5 0 0 1 11 0" />
        <path d="M12 4.5v2M6.4 6.9l1.4 1.4M17.6 6.9l-1.4 1.4" />
      </g>
    </svg>
  );
}

/** Concentric rings closing on a point — the thing being aimed at. */
export function MissionMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.3">
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/** A fixed star — the one number that decides whether any of this worked. */
export function NorthStarMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2.5 13.9 10.1 21.5 12 13.9 13.9 12 21.5 10.1 13.9 2.5 12 10.1 10.1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A read that stops — a run of ticks that ends in a full stop, not an ellipsis. */
export function FiniteMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <path d="M3.5 8h9M3.5 12h6M3.5 16h11" />
        <circle cx="19" cy="16" r="1.2" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/** A price tag — every recommendation arrives with what it costs. */
export function PriceMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
        <path d="M3.5 11.4V4.5h6.9l9.1 9.1-6.9 6.9-9.1-9.1Z" />
        <circle cx="7.6" cy="8.4" r="1.4" />
      </g>
    </svg>
  );
}

/** A line of reasoning attached to a claim — the "why" that rides along. */
export function ReasonMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <path d="M4.5 4.5v15" />
        <path d="M8.5 8h11M8.5 12h8M8.5 16h11" />
      </g>
    </svg>
  );
}

/** Each stage carries the glyph of the surface it actually happens on. */
const LOOP_STAGES = [
  { label: "Pick your worlds", icon: "discover" },
  { label: "Read the day", icon: "today" },
  { label: "Build something", icon: "build" },
  { label: "Close the gap", icon: "gap" },
] as const;

/**
 * The weekly shape of CuspAI, drawn as one figure: four stages left to right,
 * then a return arc — the loop restarts tomorrow rather than accumulating.
 */
export function LoopDiagram({ className = "" }: { className?: string }) {
  const xs = [95, 285, 475, 665];
  const cy = 86;
  const r = 30;

  return (
    <svg
      viewBox="0 0 760 232"
      className={`h-auto w-full ${className}`}
      role="img"
      aria-label="The CuspAI loop: pick your worlds, read the day, build something, close the gap — then it starts again tomorrow."
    >
      {/* connectors between stages */}
      {xs.slice(0, -1).map((x, i) => {
        const from = x + r + 10;
        const to = xs[i + 1]! - r - 10;
        return (
          <g key={x} className="text-border" stroke="currentColor" strokeWidth="1.2" fill="none">
            <path d={`M${from} ${cy}H${to}`} />
            <path
              d={`M${to - 7} ${cy - 4.5}L${to} ${cy}L${to - 7} ${cy + 4.5}`}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );
      })}

      {/* return arc — the read ends and comes back tomorrow */}
      <g className="text-accent/45" stroke="currentColor" strokeWidth="1.2" fill="none">
        <path
          d={`M${xs[3]} ${cy + r + 10}C${xs[3]} 196 ${xs[0]} 196 ${xs[0]} ${cy + r + 10}`}
          strokeDasharray="3 5"
          strokeLinecap="round"
        />
        <path
          d={`M${xs[0]! - 4.5} ${cy + r + 17}L${xs[0]} ${cy + r + 10}L${xs[0]! + 4.5} ${cy + r + 17}`}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {LOOP_STAGES.map((stage, i) => {
        const x = xs[i]!;
        return (
          <g key={stage.label}>
            <circle
              cx={x}
              cy={cy}
              r={r}
              className="text-border"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <g transform={`translate(${x - 11} ${cy - 11}) scale(0.92)`} className="text-accent">
              <path
                d={SURFACE_PATHS[stage.icon]}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <text
              x={x}
              y="32"
              textAnchor="middle"
              className="fill-current font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground"
            >
              {stage.label}
            </text>
          </g>
        );
      })}

      <text
        x="380"
        y="222"
        textAnchor="middle"
        className="fill-current font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground"
      >
        Then it ends. Tomorrow it starts again.
      </text>
    </svg>
  );
}
