import { PhoneFrame } from "@/components/phone-frame";
import { WaitlistForm } from "@/components/waitlist-form";
import { Reveal, Parallax } from "@/components/reveal";
import { CadenceMark, PaperGrid } from "@/components/marks";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section
      id="early-access"
      className="relative flex min-h-svh items-center overflow-hidden pt-24 pb-16 md:pt-16 md:pb-0"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="aurora absolute inset-0 opacity-70" />
        <div className="orb left-[4%] top-[14%] h-64 w-64 bg-accent/35" />
        <div
          className="orb right-[6%] bottom-[10%] h-72 w-72 bg-accent-2/35"
          style={{ animationDelay: "-8s" }}
        />
        <PaperGrid className="opacity-40" />
      </div>
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 md:grid-cols-[1.15fr_1fr] md:gap-12 md:px-8">
        <div>
          <h1 className="font-display text-balance text-[2.75rem] leading-[1.03] tracking-tight md:text-6xl lg:text-[4.25rem]">
            <Reveal variant="mask" as="span" className="block">
              The truth about what to use
            </Reveal>
            <Reveal variant="mask" as="span" delay={130} className="block">
              and <span className="grad-text">what to learn.</span>
            </Reveal>
          </h1>

          <Reveal delay={220}>
            <CadenceMark className="mt-7" />
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              One pick. One runner-up. One thing to stop paying for. Dated,
              reasoned, priced in rupees.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-10 max-w-xl">
              <WaitlistForm id="email-hero" source="hero" />
              <p className="mt-4 font-mono text-[11px] tracking-[0.08em] text-muted-foreground md:text-xs">
                One email when CuspAI opens. Nothing else.
              </p>
              <Link
                to="/use-cases"
                className="link-underline mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground"
              >
                See a real week on CuspAI
                <span aria-hidden="true" className="text-accent">&rarr;</span>
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={320} variant="scale">
          <Parallax speed={46}>
            <div className="glass-card rounded-[2.25rem] p-4">
              <PhoneFrame
                src="/screens/stack-phone-light.webp"
                srcDark="/screens/stack-phone-dark.webp"
                alt="The CuspAI app showing a stack it built: a free track and a paid track, each tool listed with what it costs and the one line explaining why it was chosen."
                caption="An actual verdict. 26 Aug 2026."
              />
            </div>
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}
