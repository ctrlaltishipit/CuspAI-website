/**
 * The CuspAI logo: a hub joined to five points, beside the wordmark.
 *
 * Drawn inline so it can take its colours from the theme (see the --logo-*
 * variables in styles.css) and animate. The wordmark is outlines, drawn from
 * Poppins SemiBold to match the supplied artwork, so it never waits on a font.
 *
 * The app carries the same geometry in components/icons/logoGeometry.ts. If a
 * number changes here, change it there.
 */
import type { CSSProperties } from "react";

export const HUB = { cx: 56.5, cy: 45, r: 14.5 };

/** The five points, clockwise from top-left. `role` picks the colour. */
export const NODES = [
  { id: "tl", cx: 30, cy: 14.5, r: 7.6, role: "b" },
  { id: "tr", cx: 86, cy: 14.5, r: 11.5, role: "a" },
  { id: "br", cx: 88, cy: 69, r: 7.6, role: "a" },
  { id: "bl", cx: 37, cy: 86, r: 11, role: "a" },
  { id: "l", cx: 11.5, cy: 49, r: 9.2, role: "c" },
] as const;

const SPOKE = 3.6;
const LOCKUP_W = 357.8;

const WORD_CUSP =
  "M121.347 50.034Q121.347 43.128 124.464 37.663Q127.582 32.199 132.979 29.148Q138.377 26.098 145.081 26.098Q152.926 26.098 158.826 30.121Q164.726 34.143 167.073 41.250L156.278 41.250Q154.669 37.898 151.752 36.222Q148.836 34.546 145.014 34.546Q140.924 34.546 137.740 36.456Q134.555 38.367 132.778 41.854Q131.001 45.340 131.001 50.034Q131.001 54.660 132.778 58.180Q134.555 61.700 137.740 63.611Q140.924 65.521 145.014 65.521Q148.836 65.521 151.752 63.812Q154.669 62.102 156.278 58.750L167.073 58.750Q164.726 65.924 158.859 69.913Q152.993 73.902 145.081 73.902Q138.377 73.902 132.979 70.852Q127.582 67.801 124.464 62.370Q121.347 56.939 121.347 50.034M199.926 36.356L209.379 36.356L209.379 73.500L199.926 73.500L199.926 68.807Q198.116 71.220 195.199 72.595Q192.282 73.969 188.863 73.969Q184.505 73.969 181.153 72.126Q177.800 70.282 175.889 66.695Q173.979 63.108 173.979 58.146L173.979 36.356L183.365 36.356L183.365 56.805Q183.365 61.230 185.578 63.611Q187.790 65.991 191.612 65.991Q195.501 65.991 197.713 63.611Q199.926 61.230 199.926 56.805M232.041 74.103Q227.482 74.103 223.862 72.461Q220.241 70.818 218.129 68.002Q216.017 65.186 215.816 61.767L225.270 61.767Q225.538 63.912 227.382 65.320Q229.225 66.728 231.974 66.728Q234.656 66.728 236.165 65.655Q237.673 64.583 237.673 62.907Q237.673 61.096 235.830 60.191Q233.986 59.286 229.963 58.213Q225.806 57.208 223.158 56.135Q220.509 55.062 218.598 52.850Q216.688 50.637 216.688 46.882Q216.688 43.798 218.464 41.250Q220.241 38.703 223.560 37.228Q226.879 35.752 231.371 35.752Q238.009 35.752 241.964 39.071Q245.920 42.390 246.322 48.022L237.338 48.022Q237.137 45.810 235.494 44.502Q233.852 43.195 231.103 43.195Q228.555 43.195 227.180 44.133Q225.806 45.072 225.806 46.748Q225.806 48.626 227.683 49.598Q229.561 50.570 233.516 51.576Q237.539 52.581 240.154 53.654Q242.769 54.727 244.680 56.973Q246.591 59.219 246.658 62.907Q246.658 66.125 244.881 68.673Q243.104 71.220 239.785 72.662Q236.466 74.103 232.041 74.103M262.950 41.720Q264.760 39.172 267.945 37.462Q271.130 35.752 275.220 35.752Q279.980 35.752 283.835 38.099Q287.690 40.446 289.937 44.770Q292.183 49.095 292.183 54.794Q292.183 60.493 289.937 64.884Q287.690 69.276 283.835 71.690Q279.980 74.103 275.220 74.103Q271.130 74.103 268.012 72.427Q264.894 70.751 262.950 68.203L262.950 91.200L253.563 91.200L253.563 36.356L262.950 36.356L262.950 41.720M282.595 54.794Q282.595 51.442 281.220 48.994Q279.846 46.547 277.600 45.273Q275.354 43.999 272.739 43.999Q270.191 43.999 267.945 45.307Q265.699 46.614 264.325 49.095Q262.950 51.576 262.950 54.928Q262.950 58.280 264.325 60.761Q265.699 63.242 267.945 64.549Q270.191 65.857 272.739 65.857Q275.354 65.857 277.600 64.516Q279.846 63.175 281.220 60.694Q282.595 58.213 282.595 54.794";
const WORD_AI =
  "M329.997 73.500L326.913 64.583L308.274 64.583L305.190 73.500L295.334 73.500L312.163 26.634L323.091 26.634L339.920 73.500L329.997 73.500M310.822 57.073L324.365 57.073L317.593 37.496M345.418 26.701L354.805 26.701L354.805 73.500L345.418 73.500";

const fill = { a: "var(--logo-a)", b: "var(--logo-b)", c: "var(--logo-c)" } as const;

/** The symbol's shapes, in a 100 by 100 box. */
function MarkShapes({ animated = false }: { animated?: boolean }) {
  return (
    <>
      <g stroke="var(--logo-a)" strokeWidth={SPOKE} strokeLinecap="round">
        {NODES.map((n, i) => {
          const len = Math.hypot(n.cx - HUB.cx, n.cy - HUB.cy);
          return (
            <line
              key={n.id}
              x1={HUB.cx}
              y1={HUB.cy}
              x2={n.cx}
              y2={n.cy}
              className={animated ? "draw" : undefined}
              style={
                animated
                  ? ({ "--len": len, "--d": `${260 + i * 80}ms` } as CSSProperties)
                  : undefined
              }
            />
          );
        })}
      </g>
      {NODES.map((n, i) => (
        <circle
          key={n.id}
          cx={n.cx}
          cy={n.cy}
          r={n.r}
          fill={fill[n.role]}
          className={animated ? "pop" : undefined}
          style={animated ? ({ "--d": `${520 + i * 80}ms` } as CSSProperties) : undefined}
        />
      ))}
      <circle
        cx={HUB.cx}
        cy={HUB.cy}
        r={HUB.r}
        fill="var(--logo-a)"
        className={animated ? "pop" : undefined}
        style={animated ? ({ "--d": "80ms" } as CSSProperties) : undefined}
      />
    </>
  );
}

/**
 * The horizontal lockup. Height drives the size; width follows the artwork.
 * `animated` assembles the mark once, on mount: hub, spokes, then points.
 */
export function Logo({
  className = "h-8",
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox={`0 0 ${LOCKUP_W} 100`}
      className={`${className} w-auto`}
      fill="none"
      role="img"
      aria-label="CuspAI"
    >
      <MarkShapes animated={animated} />
      <path d={WORD_CUSP} fill="var(--logo-word)" />
      <path d={WORD_AI} fill="var(--logo-ai)" />
    </svg>
  );
}

/** The symbol on its own. */
export function LogoMark({
  className = "h-8 w-8",
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
      <MarkShapes animated={animated} />
    </svg>
  );
}
