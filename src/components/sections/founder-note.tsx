import { Reveal } from "@/components/reveal";
import { CadenceMark } from "@/components/marks";

export function FounderNote() {
  return (
    <section className="band-deep seam-top py-[72px] md:py-[120px]">
      <div className="mx-auto max-w-2xl px-5 md:px-8">
        <Reveal>
          <p className="font-display text-2xl leading-snug tracking-tight text-balance md:text-[2rem] md:leading-snug">
            I wanted a second opinion from someone who was not being paid by
            the thing being recommended.
          </p>
          <CadenceMark className="mt-7" />
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-8 space-y-5 leading-relaxed text-muted-foreground">
            <p>
              Last year I paid for six AI tools and could not have told you
              which two were doing the work. Every list I found was written by
              someone the tools were paying.
            </p>
            <p>
              So you pay me instead, which means I have to be right often
              enough to be worth ₹249. The Refusal List and the Decision Ledger
              exist so you can check whether I am.
            </p>
          </div>
          <p className="mt-8 font-mono text-[11px] tracking-[0.08em] text-muted-foreground md:text-xs">
            Founder, CuspAI · Bengaluru
          </p>
        </Reveal>
      </div>
    </section>
  );
}
