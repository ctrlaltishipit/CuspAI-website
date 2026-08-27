import { WaitlistForm } from "@/components/waitlist-form";
import { Reveal } from "@/components/reveal";
import { PaperGrid } from "@/components/marks";

export function FinalCta() {
  return (
    <section className="band-deep seam-top relative overflow-hidden py-[80px] md:py-[140px]">
      <PaperGrid className="opacity-40" />
      <div className="accent-wash absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-2xl px-5 text-center md:px-8">
        <Reveal>
          <h2 className="font-display text-4xl tracking-tight text-balance md:text-6xl">
            One verdict beats forty tabs.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="mx-auto mt-10 max-w-xl text-left">
            <WaitlistForm id="email-final" source="final-cta" />
          </div>
          <p className="mt-6 font-mono text-[11px] tracking-[0.08em] text-muted-foreground md:text-xs">
            We'll email you once, when it opens.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
