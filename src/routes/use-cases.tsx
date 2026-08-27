import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal, Parallax } from "@/components/reveal";
import { ScreenshotSlot } from "@/components/screenshot-slot";
import { PaperGrid } from "@/components/marks";
import { WaitlistForm } from "@/components/waitlist-form";

export const Route = createFileRoute("/use-cases")({
  head: () => ({
    meta: [
      { title: "Use cases — one user, one week on CuspAI" },
      {
        name: "description",
        content:
          "Follow Rahul Sharma, a product engineer in Bengaluru, from picking his interests to shipping a website with the tools CuspAI told him to use.",
      },
      { property: "og:title", content: "Use cases — one user, one week on CuspAI" },
      {
        property: "og:description",
        content:
          "A worked example: interests in, a working answer out. AI tools, emerging tech and the chat box that turns a vague ask into a decision.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: UseCasesPage,
});

const steps = [
  {
    n: "01",
    kicker: "Signing up",
    title: "Rahul picks what he actually cares about.",
    body: [
      "Rahul Sharma, 29, builds product at a Bengaluru fintech. On his first screen he does not choose a plan or a persona. He types what he follows — AI tools, emerging tech, model releases, funding in Indian AI — straight into the chat bar.",
      "No checkboxes, no twenty-question onboarding. CuspAI reads the sentence, shows him the topics it heard, and lets him strike out the ones it got wrong.",
    ],
    slot: {
      label: "Screenshot — picking your worlds",
      src: "/screens/welcome-tall-light.webp",
      srcDark: "/screens/welcome-tall-dark.webp",
      alt: "CuspAI's first screen: \u201cWhat do you want to keep up with?\u201d, with the field and interest topics offered as chips and four already picked.",
      caption:
        "The first screen. Your field and your interests, picked in one pass \u2014 and every item CuspAI later shows names which of them it came from.",
      ratio: "phone" as const,
    },
    facts: ["Setup: under 60 seconds", "Topics: 4 typed, 0 chosen from a list"],
  },
  {
    n: "02",
    kicker: "The first open",
    title: "What lands is people and tools, not volume.",
    body: [
      "Next morning Rahul opens CuspAI once. He gets the leading people worth reading on those four topics, the tools that shipped something real, and one line on what each is actually good for — plus what it costs in rupees.",
      "Anything that only made noise is missing on purpose. If a tool paid us and still failed, it goes on the Refusal List with the reason attached.",
    ],
    slot: {
      label: "Screenshot — the day's read",
      src: "/screens/today-tall-light.webp",
      srcDark: "/screens/today-tall-dark.webp",
      alt: "The CuspAI reading surface: the topics being read across the top, then four items for the day, each with its source, its read time and the reason it surfaced.",
      caption:
        "The surface after sign-in. The day is dated and counted — four items, each naming its source, its length and the reason it reached you.",
      ratio: "phone" as const,
    },
    facts: ["Reads: 1 per day", "Items: 9 kept, 214 dropped"],
  },
  {
    n: "03",
    kicker: "The chat box",
    title: '"Build me a website — what should I use?"',
    body: [
      "The chat box is always there. Rahul asks a loose question and CuspAI does not answer it blindly: it rewrites his prompt with the context a good answer needs — his stack, his budget, whether he wants to host it himself — and shows him that better prompt before it runs.",
      "He edits one word, sends it, and gets a shortlist of four tools in the order he should try them, with what each will cost him per month.",
    ],
    slot: {
      label: "Screenshot — the stack CuspAI returns",
      src: "/screens/stack-tall-light.webp",
      srcDark: "/screens/stack-tall-dark.webp",
      alt: "A stack CuspAI built from a one-line ask, split into a free track and a paid track, each tool showing its role, its cost and why it earned the slot.",
      caption:
        "The answer to one typed line. A free track and a paid track for the same outcome, every tool carrying its role, its cost and the reason it's there.",
      ratio: "phone" as const,
    },
    facts: ["Prompt rewritten: 1 tap", "Answer: 4 tools, ranked, ₹0–₹1,29,000/yr"],
  },
  {
    n: "04",
    kicker: "The week after",
    title: "He ships the site and keeps the loop.",
    body: [
      "Rahul builds the site over a weekend using the top two tools on that list. On Wednesday, CuspAI tells him one of them shipped a change that affects his setup — and what to do about it in two sentences.",
      "When he is walking, he plays the audio version of the same thing. Same verdicts, no extra tab.",
    ],
    slot: {
      label: "Screenshot — reading a single item",
      src: "/screens/read-tall-light.webp",
      srcDark: "/screens/read-tall-dark.webp",
      alt: "A single CuspAI item opened: headline, source, read time, the reason it surfaced, then a condensed read of the argument.",
      caption:
        "One item, opened. The reason it reached you stays attached to the piece \u2014 and once it's read, CuspAI doesn't show it to you again.",
      ratio: "phone" as const,
    },
    facts: ["Time to ship: 1 weekend", "Tabs open: 3"],
  },
];

const ticker = [
  "AI tools",
  "Emerging tech",
  "Model releases",
  "Indian AI funding",
  "Prices in ₹",
  "Audio verdicts",
  "Refusal List",
];

function UseCasesPage() {
  return (
    <main className="pt-28 md:pt-36">
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="aurora absolute inset-0 opacity-70" />
          <div className="orb left-[6%] top-[8%] h-56 w-56 bg-accent/40" />
          <div
            className="orb right-[8%] top-[26%] h-64 w-64 bg-accent-2/40"
            style={{ animationDelay: "-6s" }}
          />
          <PaperGrid className="opacity-30" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 pb-20 md:px-8 md:pb-28">
          <Reveal variant="blur">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-card/70 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-accent backdrop-blur md:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Use case 01 · Rahul Sharma, Bengaluru
            </span>
          </Reveal>

          <h1 className="mt-8 max-w-4xl font-display text-[2.6rem] leading-[1.04] tracking-tight text-balance md:text-7xl">
            <Reveal variant="mask" as="span" className="block">
              One person, four interests,
            </Reveal>
            <Reveal variant="mask" as="span" delay={140} className="block">
              <span className="grad-text">one working answer.</span>
            </Reveal>
          </h1>

          <Reveal delay={260}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              The whole journey, start to finish — what Rahul types, what CuspAI
              shows him, and what he had built by Sunday.
            </p>
          </Reveal>

          <Reveal delay={340}>
            <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
              {[
                ["4", "topics typed"],
                ["1", "open per day"],
                ["9", "items kept"],
                ["1", "weekend to ship"],
              ].map(([v, k]) => (
                <div key={k} className="bg-card/80 px-4 py-5 backdrop-blur">
                  <dt className="font-display text-3xl text-accent md:text-4xl">{v}</dt>
                  <dd className="mt-1 font-mono text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
                    {k}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Ticker */}
        <div className="hairline-top relative overflow-hidden py-4">
          <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
            {[...ticker, ...ticker].map((t, i) => (
              <span
                key={`${t}-${i}`}
                className="flex items-center gap-10 font-mono text-[11px] tracking-[0.16em] uppercase text-muted-foreground"
              >
                {t}
                <span className="h-1 w-1 rounded-full bg-accent/60" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Chapters ---------------- */}
      <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        {/* vertical rail */}
        <div
          aria-hidden="true"
          className="rail-line pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
        />

        <div className="space-y-24 md:space-y-40">
          {steps.map((step, i) => {
            const flip = i % 2 === 1;
            return (
              <section
                key={step.n}
                className="grid items-center gap-10 md:grid-cols-12 md:gap-16"
              >
                <div className={`md:col-span-6 ${flip ? "md:order-2" : ""}`}>
                  <Reveal variant={flip ? "right" : "left"}>
                    <div className="flex items-center gap-4">
                      <span className="font-display text-5xl leading-none text-accent/25 md:text-6xl">
                        {step.n}
                      </span>
                      <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
                        {step.kicker}
                      </span>
                    </div>
                    <h2 className="mt-5 font-display text-3xl leading-tight tracking-tight text-balance md:text-[2.7rem]">
                      {step.title}
                    </h2>
                    {step.body.map((p) => (
                      <p key={p} className="mt-5 leading-relaxed text-muted-foreground">
                        {p}
                      </p>
                    ))}
                    <ul className="mt-7 flex flex-wrap gap-2">
                      {step.facts.map((f) => (
                        <li
                          key={f}
                          className="rounded-full border border-accent/20 bg-accent-tint px-3 py-1.5 font-mono text-[10px] tracking-[0.08em] text-foreground md:text-[11px]"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>

                <div className={`md:col-span-6 ${flip ? "md:order-1" : ""}`}>
                  <Reveal variant="scale" delay={80}>
                    <Parallax speed={flip ? 34 : 52}>
                      <div className="glass-card relative flex justify-center rounded-2xl p-5 md:p-7">
                        <div
                          className="pointer-events-none absolute inset-0 rounded-2xl opacity-60"
                          aria-hidden="true"
                        >
                          <div className="orb -right-6 -top-8 h-32 w-32 bg-accent-2/40" />
                        </div>
                        <div className="relative w-full">
                          <ScreenshotSlot {...step.slot} />
                        </div>
                      </div>
                    </Parallax>
                  </Reveal>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* ---------------- CTA ---------------- */}
      <section className="relative overflow-hidden border-t border-border py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="aurora absolute inset-0 opacity-80" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
          <Reveal variant="blur">
            <h2 className="font-display text-3xl tracking-tight text-balance md:text-5xl">
              Your version of Rahul's week{" "}
              <span className="grad-text">starts here.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg leading-relaxed text-muted-foreground">
              Tell us what you follow. We'll tell you what's worth your evening.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="glass-card mx-auto mt-9 max-w-xl rounded-2xl p-5 text-left md:p-6">
              <WaitlistForm id="email-use-cases" />
            </div>
            <p className="mt-6 font-mono text-[11px] tracking-[0.08em] text-muted-foreground md:text-xs">
              Or read{" "}
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
