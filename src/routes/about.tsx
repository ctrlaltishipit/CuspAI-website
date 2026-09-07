import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/typography";
import { PaperGrid } from "@/components/marks";
import { WaitlistForm } from "@/components/waitlist-form";
import {
  FiniteMark,
  MissionMark,
  NorthStarMark,
  PriceMark,
  ReasonMark,
  VisionMark,
} from "@/components/guide-marks";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CuspAI" },
      {
        name: "description",
        content:
          "What CuspAI is, why it exists, and what we are actually trying to do: a daily read that ends and a verdict that commits, priced in rupees.",
      },
      { property: "og:title", content: "About CuspAI" },
      {
        property: "og:description",
        content:
          "A daily read that ends and a verdict that commits. Our vision, our mission, and the one number we judge ourselves on.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    Mark: FiniteMark,
    title: "It ends",
    body: "Every read has a last card. Three to five things, ninety seconds, then a line telling you that you are current. Nothing is waiting behind it.",
  },
  {
    Mark: ReasonMark,
    title: "It shows its reasoning",
    body: "Every item carries the reason it reached you: which of your interests it came from, and why it beat the things we dropped.",
  },
  {
    Mark: PriceMark,
    title: "It names a price",
    body: "In rupees, with the date the price was checked. A recommendation without a number attached is an opinion, not a verdict.",
  },
];

const REASONS = [
  {
    n: "01",
    title: "You are drowning in tools, not short of them",
    body: "There is no shortage of things you could use. There is a shortage of anyone willing to say which one, for your role, at your budget, this month. CuspAI picks one, names the runner-up, and tells you what to stop paying for.",
  },
  {
    n: "02",
    title: "Volume is not value",
    body: "A forty-item newsletter and an infinite feed both fail the same way: you finish neither, and you are no closer to a decision. We would rather send you four things you act on than four hundred you archive.",
  },
  {
    n: "03",
    title: "Prices here are rupee prices",
    body: "Dollar pricing hides the real cost of a stack for someone paid in rupees. Every cost we publish is the number you will actually pay, with the date we checked it, because these prices move.",
  },
  {
    n: "04",
    title: "We tell you what not to buy",
    body: "We publish what we declined to recommend and why, including tools that pay us a commission and that we still tell you to skip. A recommendation you can trust requires a refusal you can read.",
  },
];

function AboutPage() {
  return (
    <main>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="aurora absolute inset-0 opacity-70" />
          <div className="orb left-[6%] top-[10%] h-56 w-56 bg-accent/35" />
          <div
            className="orb right-[8%] top-[30%] h-64 w-64 bg-accent-2/35"
            style={{ animationDelay: "-7s" }}
          />
          <PaperGrid className="opacity-30" />
        </div>

        <div className="relative mx-auto max-w-4xl px-5 md:px-8">
          <Reveal>
            <Eyebrow>About CuspAI</Eyebrow>
          </Reveal>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl">
            <Reveal variant="mask" as="span" className="block">
              Everyone is selling you a tool.
            </Reveal>
            <Reveal variant="mask" as="span" delay={120} className="block">
              Nobody is telling you <span className="grad-text">which one.</span>
            </Reveal>
          </h1>
          <Reveal delay={200}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              CuspAI is a daily read that ends and a verdict that commits. It tells you what
              changed, what to use, and what to learn next. Every answer is dated, reasoned, and
              priced in rupees.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- What it is ---------------- */}
      <section className="seam-top py-[72px] md:py-[110px]">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <Reveal>
            <Eyebrow>What CuspAI is</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-display text-3xl tracking-tight text-balance md:text-5xl">
              A small, finite answer where everyone else ships an archive.
            </h2>
          </Reveal>

          <div className="mt-10 max-w-2xl space-y-6 text-lg leading-relaxed text-muted-foreground">
            <Reveal delay={80}>
              <p>
                Most products in this space hand you volume and call it value: an endless feed, a
                long newsletter, an eighteen-month roadmap with nothing to do about it this week.
                You finish none of them, and none of them leaves you with a decision.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p>
                CuspAI works the other way. Each morning it gives you the few things that genuinely
                changed in the areas you follow, each one stating why it is in front of you. Then
                it stops and tells you so. Nothing accumulates, and there is no backlog to feel
                guilty about.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p>
                When something needs deciding, you ask in one line. Which tool, which subscription
                to cancel, what to learn for your role or before your next role. What comes back is
                a pick, a runner-up, one thing to stop paying for, and the reasoning behind each,
                with rupee costs and the date they were checked.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
            {PRINCIPLES.map(({ Mark, title, body }, i) => (
              <Reveal key={title} delay={i * 90}>
                <article className="card-lift flex h-full flex-col rounded-lg border border-border bg-card p-6 md:p-7">
                  <Mark className="h-6 w-6 text-accent" />
                  <h3 className="mt-5 font-display text-2xl tracking-tight">{title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Why use it ---------------- */}
      <section className="border-t border-border py-[72px] md:py-[110px]">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <Reveal>
            <Eyebrow>Why use CuspAI</Eyebrow>
            <h2 className="mt-5 max-w-xl font-display text-3xl tracking-tight text-balance md:text-5xl">
              Four reasons, and none of them is more content.
            </h2>
          </Reveal>

          <div className="mt-12 divide-y divide-border border-t border-border md:mt-16">
            {REASONS.map((r, i) => (
              <Reveal key={r.n} delay={i * 70}>
                <article className="grid gap-4 py-8 md:grid-cols-12 md:gap-10 md:py-10">
                  <p className="font-mono text-[11px] tracking-[0.18em] text-accent md:col-span-2 md:text-xs">
                    {r.n}
                  </p>
                  <div className="md:col-span-10">
                    <h3 className="font-display text-2xl tracking-tight text-balance md:text-[1.75rem]">
                      {r.title}
                    </h3>
                    <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{r.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Vision / Mission / What we measure ---------------- */}
      <section className="band-deep relative overflow-hidden bg-background py-[80px] text-foreground md:py-[130px]">
        <PaperGrid className="opacity-20" />
        <div className="relative mx-auto max-w-4xl px-5 md:px-8">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground md:text-xs">
              Where this is going
            </p>
          </Reveal>

          <div className="mt-12 space-y-12 md:mt-16 md:space-y-16">
            <Reveal delay={60}>
              <article className="grid gap-5 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-3">
                  <VisionMark className="h-7 w-7 text-accent-2" />
                  <p className="mt-4 font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground md:text-xs">
                    Vision
                  </p>
                </div>
                <div className="md:col-span-9">
                  <h2 className="font-display text-2xl leading-snug tracking-tight text-balance md:text-[2.1rem]">
                    Nobody good at their job should have to guess what is worth their evening.
                  </h2>
                  <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                    Careers now turn on tooling decisions made with bad information, under time
                    pressure, by people with no way to tell a genuine shift from marketing. We want
                    the honest answer to be the easy one to find.
                  </p>
                </div>
              </article>
            </Reveal>

            <Reveal delay={120}>
              <article className="grid gap-5 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-3">
                  <MissionMark className="h-7 w-7 text-accent-2" />
                  <p className="mt-4 font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground md:text-xs">
                    Mission
                  </p>
                </div>
                <div className="md:col-span-9">
                  <h2 className="font-display text-2xl leading-snug tracking-tight text-balance md:text-[2.1rem]">
                    Turn what changed into what to do, in under two minutes a day.
                  </h2>
                  <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                    Read the fields our members work in, drop everything that only made noise, and
                    hand back the few things that move a decision, each with its reasoning, its
                    rupee price, and the date it was checked.
                  </p>
                </div>
              </article>
            </Reveal>

            <Reveal delay={180}>
              <article className="grid gap-5 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-3">
                  <NorthStarMark className="h-7 w-7 text-accent-2" />
                  <p className="mt-4 font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground md:text-xs">
                    What we measure
                  </p>
                </div>
                <div className="md:col-span-9">
                  <h2 className="font-display text-2xl leading-snug tracking-tight text-balance md:text-[2.1rem]">
                    Decisions taken and kept.
                  </h2>
                  <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                    Opens, minutes read and subscriber count all climb when we waste your time, so
                    none of them tell us anything. The number we judge ourselves on is how many
                    members acted on a verdict and were still glad they did ninety days later.
                  </p>
                  <p className="mt-5 font-mono text-[11px] leading-relaxed tracking-[0.06em] text-muted-foreground md:text-xs">
                    If that number falls, the product is wrong, however good everything else looks.
                  </p>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="relative overflow-hidden border-t border-border py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="aurora absolute inset-0 opacity-80" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
          <Reveal variant="blur">
            <h2 className="font-display text-3xl tracking-tight text-balance md:text-5xl">
              Tell us what you follow.
            </h2>
            <p className="mx-auto mt-5 max-w-lg leading-relaxed text-muted-foreground">
              We'll tell you what's worth your evening, and what to stop paying for.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="glass-card mx-auto mt-9 max-w-xl rounded-2xl p-5 text-left md:p-6">
              <WaitlistForm id="email-about" source="about" />
            </div>
            <p className="mt-6 font-mono text-[11px] tracking-[0.08em] text-muted-foreground md:text-xs">
              Or see{" "}
              <Link to="/how-it-works" className="link-underline text-foreground">
                how it works
              </Link>{" "}
              first.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
