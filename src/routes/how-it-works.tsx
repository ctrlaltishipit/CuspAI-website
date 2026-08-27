import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal, Parallax } from "@/components/reveal";
import { Eyebrow } from "@/components/typography";
import { PaperGrid } from "@/components/marks";
import { ScreenshotSlot } from "@/components/screenshot-slot";
import { WaitlistForm } from "@/components/waitlist-form";
import { LoopDiagram, SurfaceIcon, type SurfaceKey } from "@/components/guide-marks";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How it works — CuspAI" },
      {
        name: "description",
        content:
          "A guide to the CuspAI app: the daily loop, the five surfaces — Build, Today, Discover, Gap and Saved — and what is free versus paid.",
      },
      { property: "og:title", content: "How it works — CuspAI" },
      {
        property: "og:description",
        content:
          "Every surface in the CuspAI app, what it does, and when you'd open it. With screenshots.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorksPage,
});

const START = [
  {
    n: "01",
    title: "Pick your worlds",
    body: "Choose the field you work in and the things you love outside it. There is no twenty-question onboarding and no plan to choose — the picks are the whole setup, and you can change them any time.",
    shot: {
      label: "Screenshot — picking your worlds",
      src: "/screens/welcome-tall-light.webp",
      srcDark: "/screens/welcome-tall-dark.webp",
      alt: "The CuspAI setup screen asking what you want to keep up with, with field and interest topics offered as chips.",
    },
    note: "Under 60 seconds",
  },
  {
    n: "02",
    title: "Read the day",
    body: "Next morning you get a short, dated list — the few things that changed in those worlds. Each one names its source, its length, and the reason it reached you. At the bottom is a card telling you that you're current.",
    shot: {
      label: "Screenshot — the day's read",
      src: "/screens/today-tall-light.webp",
      srcDark: "/screens/today-tall-dark.webp",
      alt: "The CuspAI daily read: a dated headline count, topic chips, then items each carrying the reason it surfaced.",
    },
    note: "About 90 seconds",
  },
  {
    n: "03",
    title: "Ask for a stack",
    body: "When you need to decide something, describe it in one line — type it or say it out loud. CuspAI comes back with the tools, the order to try them in, and the reading behind each choice.",
    shot: {
      label: "Screenshot — the Build intake",
      src: "/screens/build-tall-light.webp",
      srcDark: "/screens/build-tall-dark.webp",
      alt: "The CuspAI Build screen asking what you want to build, with a text field, a dictate button and example prompts.",
    },
    note: "One line in",
  },
];

const SURFACES: {
  key: SurfaceKey;
  name: string;
  when: string;
  body: string;
  points: string[];
  shot: { label: string; src: string; srcDark: string; alt: string };
}[] = [
  {
    key: "build",
    name: "Build",
    when: "When you need to decide",
    body: "The answer to a one-line ask, split into a free track and a paid track for the same outcome. Every tool carries its role, its cost and the reason it earned the slot — then the steps in order, and the thing you end up with.",
    points: [
      "Free track and paid track side by side",
      "A reason on every tool, not just a ranking",
      "Numbered steps you can tick off",
    ],
    shot: {
      label: "Screenshot — a generated stack",
      src: "/screens/stack-tall-light.webp",
      srcDark: "/screens/stack-tall-dark.webp",
      alt: "A CuspAI stack: free and paid tracks, each tool showing its role, its cost and why it was chosen.",
    },
  },
  {
    key: "today",
    name: "Today",
    when: "Once each morning",
    body: "The finite daily read. Open an item and you get a condensed version of the argument with the reason still attached at the top. Once you've read it, CuspAI won't show it to you again.",
    points: [
      "Three to five items, then it ends",
      "Every item states which of your worlds it came from",
      "Read once, never re-served",
    ],
    shot: {
      label: "Screenshot — reading an item",
      src: "/screens/read-tall-light.webp",
      srcDark: "/screens/read-tall-dark.webp",
      alt: "A single CuspAI item opened: headline, source, read time, the reason it surfaced, then a condensed read.",
    },
  },
  {
    key: "discover",
    name: "Discover",
    when: "When you have five spare minutes",
    body: "A small set of pieces just outside your daily read, chosen for adjacency rather than volume, plus the worlds you haven't picked yet. Adding one changes tomorrow's read, not today's.",
    points: [
      "Chosen for adjacency, never for trending",
      "Still finite — it tells you when that's the whole set",
      "Add a world and tomorrow shifts",
    ],
    shot: {
      label: "Screenshot — Discover",
      src: "/screens/discover-tall-light.webp",
      srcDark: "/screens/discover-tall-dark.webp",
      alt: "The CuspAI Discover surface: adjacent reads outside the daily list, and the topics not yet picked.",
    },
  },
  {
    key: "gap",
    name: "Gap",
    when: "When you're planning a move",
    body: "The distance between the work you do now and the role you're aiming at, written as a handful of named skills — not a score, not a progress ring. Each one says what closed it or what still hasn't.",
    points: [
      "Named plainly, never scored out of ten",
      "Marked open, closing, or already yours",
      "Moves when your reading does",
    ],
    shot: {
      label: "Screenshot — the Gap",
      src: "/screens/gap-tall-light.webp",
      srcDark: "/screens/gap-tall-dark.webp",
      alt: "The CuspAI Gap surface showing the move from one role to another as three named skills with their status.",
    },
  },
  {
    key: "saved",
    name: "Saved",
    when: "When something is worth keeping",
    body: "A short shelf of what you kept. Every piece still carries the reason it reached you in the first place, so a thing you saved in March still explains itself in June.",
    points: ["One tap from any item", "Reasons stay attached", "A shelf, not another inbox"],
    shot: {
      label: "Screenshot — Saved",
      src: "/screens/saved-tall-light.webp",
      srcDark: "/screens/saved-tall-dark.webp",
      alt: "The CuspAI Saved surface listing the pieces kept, each still showing the reason it was surfaced.",
    },
  },
];

function HowItWorksPage() {
  return (
    <main className="pt-28 md:pt-36">
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden pb-14 md:pb-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="aurora absolute inset-0 opacity-70" />
          <div className="orb left-[5%] top-[12%] h-56 w-56 bg-accent/35" />
          <div
            className="orb right-[7%] top-[28%] h-64 w-64 bg-accent-2/35"
            style={{ animationDelay: "-5s" }}
          />
          <PaperGrid className="opacity-30" />
        </div>

        <div className="relative mx-auto max-w-4xl px-5 md:px-8">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
          </Reveal>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl">
            <Reveal variant="mask" as="span" className="block">
              Five surfaces.
            </Reveal>
            <Reveal variant="mask" as="span" delay={120} className="block">
              One <span className="grad-text">two-minute habit.</span>
            </Reveal>
          </h1>
          <Reveal delay={200}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              CuspAI is a mobile app. Here is the loop it runs on, what every screen does, and when
              you would actually open it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- The loop ---------------- */}
      <section className="seam-top py-[64px] md:py-[100px]">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <Reveal>
            <Eyebrow>The loop</Eyebrow>
            <h2 className="mt-5 max-w-xl font-display text-3xl tracking-tight text-balance md:text-4xl">
              It closes. That is the whole idea.
            </h2>
          </Reveal>

          <Reveal delay={100} variant="scale">
            <div className="glass-card mt-10 overflow-x-auto rounded-2xl p-6 md:mt-14 md:p-10">
              <div className="min-w-[620px]">
                <LoopDiagram className="text-foreground" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-8 max-w-2xl leading-relaxed text-muted-foreground">
              Every other product in this space is built to accumulate — an archive that grows
              whether you open it or not. CuspAI is built to finish. What you read closes out, what
              you build gets marked done, and what closes in your gap map changes what arrives
              tomorrow.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Getting started ---------------- */}
      <section className="border-t border-border py-[72px] md:py-[110px]">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <Eyebrow>Getting started</Eyebrow>
            <h2 className="mt-5 max-w-xl font-display text-3xl tracking-tight text-balance md:text-5xl">
              Three screens and you're running.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
            {START.map((step, i) => (
              <Reveal key={step.n} delay={i * 100}>
                <article className="flex h-full flex-col">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
                      {step.n}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted-foreground">
                      {step.note}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl tracking-tight md:text-[1.65rem]">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{step.body}</p>
                  <div className="mt-8 flex justify-center">
                    <ScreenshotSlot {...step.shot} />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- The five surfaces ---------------- */}
      <section className="border-t border-border py-[72px] md:py-[110px]">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <Eyebrow>The five surfaces</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-display text-3xl tracking-tight text-balance md:text-5xl">
              Everything in the app, and nothing behind a padlock.
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
              These are the five tabs along the bottom of the app. There is no sixth one teasing a
              feature you can't reach.
            </p>
          </Reveal>

          <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
            {SURFACES.map((s, i) => {
              const flip = i % 2 === 1;
              return (
                <article key={s.key} className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
                  <div className={`md:col-span-6 ${flip ? "md:order-2" : ""}`}>
                    <Reveal>
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/25 bg-accent-tint text-accent">
                          <SurfaceIcon name={s.key} className="h-[18px] w-[18px]" />
                        </span>
                        <h3 className="font-display text-3xl tracking-tight md:text-[2.25rem]">
                          {s.name}
                        </h3>
                      </div>
                      <p className="mt-4 font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground md:text-xs">
                        {s.when}
                      </p>
                      <p className="mt-5 leading-relaxed text-muted-foreground">{s.body}</p>
                      <ul className="mt-6 space-y-2.5">
                        {s.points.map((p) => (
                          <li key={p} className="flex gap-3 leading-relaxed text-muted-foreground">
                            <span
                              aria-hidden="true"
                              className="mt-[0.6em] h-px w-4 shrink-0 bg-accent/50"
                            />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  </div>

                  <div className={`md:col-span-6 ${flip ? "md:order-1" : ""}`}>
                    <Reveal variant="scale" delay={80}>
                      <Parallax speed={flip ? 30 : 44}>
                        <div className="glass-card relative flex justify-center rounded-2xl p-5 md:p-7">
                          <div
                            className="pointer-events-none absolute inset-0 rounded-2xl opacity-60"
                            aria-hidden="true"
                          >
                            <div className="orb -right-6 -top-8 h-32 w-32 bg-accent-2/40" />
                          </div>
                          <div className="relative w-full">
                            <ScreenshotSlot {...s.shot} />
                          </div>
                        </div>
                      </Parallax>
                    </Reveal>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Free vs paid ---------------- */}
      <section className="border-t border-border py-[72px] md:py-[110px]">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <Reveal>
            <Eyebrow>What it costs</Eyebrow>
            <h2 className="mt-5 max-w-xl font-display text-3xl tracking-tight text-balance md:text-5xl">
              The daily read is free forever.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-5">
            <Reveal>
              <article className="card-lift flex h-full flex-col rounded-lg border border-border bg-card p-6 md:p-8">
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground md:text-xs">
                  Free
                </p>
                <p className="mt-4 font-display text-3xl tracking-tight md:text-4xl">₹0</p>
                <ul className="mt-6 space-y-2.5 leading-relaxed text-muted-foreground">
                  {["Today — the finite daily read", "Discover", "Saved", "Your gap map"].map(
                    (x) => (
                      <li key={x} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-[0.6em] h-px w-4 shrink-0 bg-accent/50"
                        />
                        <span>{x}</span>
                      </li>
                    ),
                  )}
                </ul>
                <p className="mt-6 font-mono text-[11px] leading-relaxed tracking-[0.06em] text-muted-foreground md:text-xs">
                  A commitment, not a promotion.
                </p>
              </article>
            </Reveal>

            <Reveal delay={90}>
              <article className="card-lift flex h-full flex-col rounded-lg border border-accent/50 bg-card p-6 md:p-8">
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground md:text-xs">
                  CuspAI Pro
                </p>
                <p className="mt-4 font-display text-3xl tracking-tight md:text-4xl">
                  ₹249<span className="text-lg text-muted-foreground">/mo</span>
                </p>
                <ul className="mt-6 space-y-2.5 leading-relaxed text-muted-foreground">
                  {[
                    "Build — stacks on demand, free and paid tracks",
                    "The monthly Gap credential verdict",
                    "Subscription audit: what to stop paying for",
                  ].map((x) => (
                    <li key={x} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.6em] h-px w-4 shrink-0 bg-accent/50"
                      />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-mono text-[11px] leading-relaxed tracking-[0.06em] text-muted-foreground md:text-xs">
                  Most people find more than ₹249 in the first audit.
                </p>
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
              Two minutes tomorrow morning.
            </h2>
            <p className="mx-auto mt-5 max-w-lg leading-relaxed text-muted-foreground">
              Tell us what you follow and the first read lands when CuspAI opens.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="glass-card mx-auto mt-9 max-w-xl rounded-2xl p-5 text-left md:p-6">
              <WaitlistForm id="email-how-it-works" source="how-it-works" />
            </div>
            <p className="mt-6 font-mono text-[11px] tracking-[0.08em] text-muted-foreground md:text-xs">
              Or read{" "}
              <Link to="/about" className="link-underline text-foreground">
                what we're building and why
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
