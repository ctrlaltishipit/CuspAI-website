import type { CSSProperties } from "react";

/*
 * A loose constellation in the shape language of the logo: points, and lines
 * between some of them. Fixed positions, so it is the same picture every
 * visit. Coordinates are in a 1200 by 700 box.
 */
const POINTS: { x: number; y: number; r: number; role: "a" | "b" | "c" }[] = [
  { x: 905, y: 210, r: 9, role: "a" },
  { x: 1010, y: 96, r: 5, role: "b" },
  { x: 1120, y: 250, r: 6, role: "a" },
  { x: 800, y: 110, r: 4, role: "c" },
  { x: 990, y: 380, r: 5, role: "a" },
  { x: 720, y: 300, r: 3.5, role: "b" },
  { x: 1150, y: 470, r: 4, role: "c" },
  { x: 610, y: 150, r: 3, role: "a" },
  { x: 150, y: 520, r: 4, role: "c" },
  { x: 60, y: 380, r: 3, role: "a" },
  { x: 290, y: 610, r: 5, role: "b" },
];

/** Pairs of point indexes joined by a line. The first is the hub. */
const LINKS: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [2, 6],
  [3, 7],
  [8, 9],
  [8, 10],
];

const colour = { a: "var(--logo-a)", b: "var(--logo-b)", c: "var(--logo-c)" } as const;

/**
 * The atmosphere behind a page's first screen, as the site has always had it:
 * soft washes of blue, two blurred orbs that drift slowly, and faint ruled
 * paper. The home page adds the constellation, which echoes the logo. All of
 * it sits still under reduced motion.
 */
export function Backdrop({ quiet = false }: { quiet?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="aurora absolute inset-0 opacity-70" />
      <div
        className="orb left-[5%] top-[12%] h-64 w-64"
        style={{ backgroundColor: "color-mix(in oklab, var(--tone-1) 35%, transparent)" }}
      />
      <div
        className="orb right-[7%] top-[30%] h-72 w-72"
        style={{
          backgroundColor: "color-mix(in oklab, var(--tone-2) 35%, transparent)",
          animationDelay: "-8s",
        }}
      />
      <div className="paper-grid absolute inset-0 opacity-40" />
      {quiet ? null : (
        <svg
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full opacity-45"
        >
          <g stroke="var(--border-strong)" strokeWidth="1">
            {LINKS.map(([a, b]) => {
              const p = POINTS[a]!;
              const q = POINTS[b]!;
              return <line key={`${a}-${b}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} />;
            })}
          </g>
          {/* Travelling points: three lines carry one each, out of step. */}
          {[LINKS[0]!, LINKS[3]!, LINKS[5]!].map(([a, b], i) => {
            const p = POINTS[a]!;
            const q = POINTS[b]!;
            return (
              <circle
                key={`pulse-${a}-${b}`}
                r="2.4"
                fill="var(--accent)"
                className="pulse-dot"
                style={
                  {
                    offsetPath: `path("M ${p.x} ${p.y} L ${q.x} ${q.y}")`,
                    "--d": `${i * 900}ms`,
                  } as CSSProperties
                }
              />
            );
          })}
          {POINTS.map((p, i) => (
            <circle
              key={`${p.x}-${p.y}`}
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill={colour[p.role]}
              opacity={i === 0 ? 0.9 : 0.55}
              className="breathe"
              style={{ "--d": `${(i * 430) % 3000}ms` } as CSSProperties}
            />
          ))}
        </svg>
      )}
    </div>
  );
}
