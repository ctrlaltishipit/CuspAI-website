import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/typography";
import { CrossMark } from "@/components/marks";

const REFUSALS = [
  "No inbox access. We never ask for it.",
  "No infinite feed. The daily list ends, on purpose.",
  "No full articles. We send you to the people who wrote them.",
  "No streaks, badges, levels, or red dots.",
  "No payment for placement. Not once, not for any reason.",
  "No blanket praise. Every set includes one thing we tell you to skip.",
];

export function Sceptics() {
  return (
    <section className="seam-top bg-tinted py-[72px] md:py-[130px]">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal>
          <Eyebrow>For the sceptic</Eyebrow>
          <h2 className="mt-5 font-display text-3xl tracking-tight text-balance md:text-5xl">
            What CuspAI doesn't do.
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2">
          {REFUSALS.map((line, i) => (
            <Reveal as="li" key={line} delay={i * 70}>
              <div className="card-lift flex h-full items-start gap-3 rounded-md border border-border bg-card px-5 py-4">
                <CrossMark className="mt-1 shrink-0 text-accent" />
                <span className="leading-relaxed text-foreground">{line}</span>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <p className="mt-16 max-w-2xl font-display text-2xl leading-snug tracking-tight text-balance md:text-[2rem] md:leading-snug">
            We take affiliate commissions — and we publish everything we
            refused to recommend, including the ones that pay us.
          </p>
        </Reveal>

        {/* The one editorial accent mark */}
        <Reveal delay={180}>
          <div className="mt-10 border-l-2 border-accent pl-6">
            <Link
              to="/about"
              className="link-underline text-lg font-medium text-foreground md:text-xl"
            >
              Read what we refuse →
            </Link>
            <span className="ml-3 font-mono text-[11px] tracking-[0.08em] text-muted-foreground md:text-xs">
              Vision, mission, north star
            </span>
            <div className="mt-3">
              <Link
                to="/how-it-works"
                className="link-underline text-sm text-muted-foreground hover:text-foreground"
              >
                How it works
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
