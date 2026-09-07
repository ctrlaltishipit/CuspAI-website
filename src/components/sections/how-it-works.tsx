import { PhoneFrame } from "@/components/phone-frame";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/typography";

const STEPS = [
  {
    n: "01",
    title: "Tell us what you're doing",
    body: "A role, a thing you're shipping, a date. Fifteen seconds, no account.",
    shot: {
      src: "/screens/welcome-phone-light.webp",
      srcDark: "/screens/welcome-phone-dark.webp",
      alt: "CuspAI asking what you want to keep up with, with your industry and your interests offered as chips.",
    },
  },
  {
    n: "02",
    title: "Read what changed",
    body: "Ninety seconds a day, covering only what changed since you last looked. Then it ends. Free forever.",
    shot: {
      src: "/screens/today-phone-light.webp",
      srcDark: "/screens/today-phone-dark.webp",
      alt: "The day's read in CuspAI: four things worth knowing, each carrying the reason it reached you.",
    },
  },
  {
    n: "03",
    title: "Get the verdict",
    body: "One pick, one runner-up, one thing to stop paying for. Dated rupee prices throughout.",
    shot: {
      src: "/screens/stack-phone-light.webp",
      srcDark: "/screens/stack-phone-dark.webp",
      alt: "A CuspAI verdict: the free track and the paid track side by side, priced, with a reason on every tool.",
    },
  },
];

export function HowItWorks() {
  return (
    <section className="seam-top py-[72px] md:py-[130px]">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-5 max-w-xl font-display text-3xl tracking-tight text-balance md:text-5xl">
            Three steps, then it gets out of your way.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 100}>
              <article className="card-lift flex h-full flex-col rounded-lg border border-border bg-card p-6 md:p-7">
                <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
                  {step.n}
                </span>
                <h3 className="mt-5 font-display text-2xl tracking-tight md:text-[1.65rem]">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{step.body}</p>
                <div className="relative mt-8 h-52 overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
                  <div className="origin-top scale-[0.9]">
                    <PhoneFrame {...step.shot} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
