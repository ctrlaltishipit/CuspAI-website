import { Reveal } from "@/components/reveal";
import { CircleMark } from "@/components/marks";

export function Problem() {
  return (
    <section className="seam-top py-[72px] md:py-[130px]">
      <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
        <Reveal>
          <p className="font-display text-3xl leading-snug tracking-tight text-balance md:text-[2.75rem] md:leading-[1.18]">
            You pay for four AI tools. You don't know which one is{" "}
            <span className="relative inline-block px-3 py-1">
              <CircleMark />
              waste.
            </span>{" "}
            And every list that claims to tell you is paid by the tools on it.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mx-auto mt-12 grid max-w-2xl gap-3 sm:grid-cols-2">
            <figure className="card-lift rounded-md border border-border bg-card p-5 text-left">
              <blockquote className="font-mono text-[11px] leading-relaxed tracking-[0.04em] text-foreground md:text-xs">
                “Position determined by bid amount.”
              </blockquote>
              <figcaption className="mt-3 font-mono text-[10px] tracking-[0.12em] uppercase text-muted-foreground">
                There's An AI For That
              </figcaption>
            </figure>
            <figure className="card-lift rounded-md border border-border bg-card p-5 text-left">
              <blockquote className="font-mono text-[11px] leading-relaxed tracking-[0.04em] text-foreground md:text-xs">
                A verified check mark, sold for $497.
              </blockquote>
              <figcaption className="mt-3 font-mono text-[10px] tracking-[0.12em] uppercase text-muted-foreground">
                Futurepedia
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
