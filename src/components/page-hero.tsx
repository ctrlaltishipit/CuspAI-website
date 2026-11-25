import type { ReactNode } from "react";
import { Backdrop } from "@/components/backdrop";
import { Eyebrow } from "@/components/typography";

/**
 * The opening of every page after the home page: a label, a heading whose
 * lines rise in turn, and one opening paragraph. Left-aligned, like the rest
 * of the site.
 */
export function PageHero({
  eyebrow,
  lines,
  lead,
  children,
}: {
  eyebrow: string;
  /** The heading, one entry per line. A line may carry an accent. */
  lines: ReactNode[];
  lead: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-28 pb-14 md:pt-40 md:pb-20">
      <Backdrop quiet />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="fade-up" style={{ ["--d" as string]: "40ms" }}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1 className="t-h1 mt-5 max-w-4xl">
          {lines.map((line, i) => (
            <span key={i} className="line-mask">
              <span style={{ ["--d" as string]: `${100 + i * 80}ms` }}>{line}</span>
            </span>
          ))}
        </h1>
        <p
          className="fade-up t-lead measure mt-6 text-muted-foreground"
          style={{ ["--d" as string]: `${260 + lines.length * 80}ms` }}
        >
          {lead}
        </p>
        {children ? (
          <div
            className="fade-up mt-8"
            style={{ ["--d" as string]: `${340 + lines.length * 80}ms` }}
          >
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
