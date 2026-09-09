import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal, Parallax } from "@/components/reveal";
import { ScreenshotSlot } from "@/components/screenshot-slot";
import { PaperGrid } from "@/components/marks";
import { WaitlistForm } from "@/components/waitlist-form";

export const Route = createFileRoute("/use-cases")({
  head: () => ({
    meta: [
      { title: "Use cases: four people, four fields" },
      {
        name: "description",
        content:
          "An engineer, a sales lead, a hotel operations manager and a brand marketer. What each of them stopped doing once CuspAI told them what to use and what to skip.",
      },
      { property: "og:title", content: "Use cases: four people, four fields" },
      {
        property: "og:description",
        content:
          "Four worked examples across four fields, most of them not technical. Interests in, a working answer out, priced in rupees.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: UseCasesPage,
});

const people = [
  {
    n: "01",
    name: "Rahul Sharma",
    meta: "29 · Product engineer · Bengaluru",
    title: "He stopped paying for the second coding tool.",
    interests: [
      "AI coding tools",
      "Model releases",
      "Indian AI funding",
      "Emerging tech",
      "Football tactics",
      "Home espresso",
    ],
    problem:
      "Eleven newsletters, three Discord servers and a saved-posts folder he never reopened. He was current on none of it, and still could not decide whether a second AI coding subscription was worth ₹1,780 a month.",
    body: [
      "He typed what he follows into the first screen and left it there. Next morning he got four things: two model releases that changed what his team could ship, one funding round that mattered to his roadmap, and a football piece for the walk home.",
      "Then he asked the chat box a real question. Build me a marketing site, what should I use? It came back with a free track and a paid track for the same outcome, each tool carrying its cost in rupees and one line on why it earned the slot.",
    ],
    gain: "He shipped the site over a weekend on the free track, and cancelled the subscription he had been renewing out of guilt.",
    facts: ["Weekend to ship", "₹21,360 a year cancelled", "1 open a day"],
    slot: {
      label: "Screenshot: the stack CuspAI returns",
      src: "/screens/stack-tall-light.webp",
      srcDark: "/screens/stack-tall-dark.webp",
      alt: "A stack CuspAI built from a one-line ask, split into a free track and a paid track, each tool showing its role, its cost and why it earned the slot.",
      caption:
        "The answer to one typed line. A free track and a paid track for the same outcome, every tool carrying its role, its cost and the reason it is there.",
      ratio: "phone" as const,
    },
  },
  {
    n: "02",
    name: "Meera Nair",
    meta: "34 · Enterprise sales lead · Chennai",
    title: "She knows sales. She did not know which tool to trust.",
    interests: [
      "B2B SaaS sales",
      "AI for outreach",
      "Pricing and packaging",
      "Sales enablement",
      "Long-distance running",
      "Filter coffee",
    ],
    problem:
      "Every recommendation she found was a listicle written by someone being paid to recommend it. Her team had already bought a tool nobody used, and she had no way to tell the next one apart from the last.",
    body: [
      "She is not technical and does not want to be. She opened Discover and asked what was actually moving in AI for outreach. She got three podcasts and two newsletters worth her commute, not the forty that would have shown up in a search.",
      "Then she described her problem in one line: research an account properly before a first call, without adding another subscription. CuspAI built the workflow out of two tools her company already pays for and one free one, in the order to use them.",
    ],
    gain: "Account research went from most of an hour to about ten minutes, and the tool nobody used got cancelled with a reason she could show her finance team.",
    facts: ["40 minutes to 10", "0 new subscriptions", "3 sources, not 40"],
    slot: {
      label: "Screenshot: Discover",
      src: "/screens/discover-tall-light.webp",
      srcDark: "/screens/discover-tall-dark.webp",
      alt: "The CuspAI Discover screen: a short set of reads just outside the daily list, each naming the interest it belongs to, with the topics not yet picked shown below.",
      caption:
        "Discover, asked a direct question. A short answer for one interest, and it tells you when that is the whole set.",
      ratio: "phone" as const,
    },
  },
  {
    n: "03",
    name: "Faisal Rahman",
    meta: "38 · Operations manager, hotel group · Goa",
    title: "His industry does not have a feed. Now it does.",
    interests: [
      "Revenue management",
      "Guest experience",
      "Hospitality tech",
      "Goan produce",
      "Cooking",
      "Travel photography",
    ],
    problem:
      "Hospitality news moves through trade magazines, WhatsApp groups and conference corridors. Nothing arrives in one place, and the entire AI conversation felt like it was happening in an industry that was not his.",
    body: [
      "He picked his field and the things he cooks for pleasure on the same screen. The daily read now carries occupancy and pricing news alongside a piece on monsoon produce, each one naming which of his interests it came from.",
      "He asked how to turn a year of guest feedback into something he could act on before the next season. He got three tools in order, two of them free, and the reason each was there. No code, no consultant.",
    ],
    gain: "He replaced a paid analytics add-on his group had been renewing, and now checks one place instead of four.",
    facts: ["4 places to 1", "2 of 3 tools free", "No code written"],
    slot: {
      label: "Screenshot: the day's read",
      src: "/screens/today-tall-light.webp",
      srcDark: "/screens/today-tall-dark.webp",
      alt: "The CuspAI daily read: a dated headline count, the interests being covered across the top, then a short list of items each with its source, its length and the reason it was chosen.",
      caption:
        "The day, dated and counted. Work and the things you read for pleasure in the same short list, each naming where it came from.",
      ratio: "phone" as const,
    },
  },
  {
    n: "04",
    name: "Ananya Iyer",
    meta: "26 · Brand marketer · Mumbai",
    title: "She did not want a new job. She wanted to be ready for this one.",
    interests: [
      "Performance marketing",
      "AI video and image tools",
      "D2C brand building",
      "Indian consumer trends",
      "Indie music",
      "Sustainable fashion",
    ],
    problem:
      "Her founder asked why the brand was not making AI video yet. She did not want to switch careers or buy a ten-hour course. She wanted to be the person who could already do it, in the role she has.",
    body: [
      "The Gap screen named three skills for the job she is actually in, written as things to be able to do rather than a score or a progress ring. Each one says what would close it and what has not closed yet.",
      "One of them closed in a fortnight, using a tool she found in her daily read and a free tier she did not know existed. The others are still open, and the screen says so plainly.",
    ],
    gain: "She shipped the brand's first AI video campaign without buying a course, and can name exactly what she still cannot do.",
    facts: ["1 skill closed in 2 weeks", "₹0 on courses", "Named, not scored"],
    slot: {
      label: "Screenshot: the Gap",
      src: "/screens/gap-tall-light.webp",
      srcDark: "/screens/gap-tall-dark.webp",
      alt: "The CuspAI Gap screen showing the distance to the role being aimed at as three named skills, each with its status and what would close it.",
      caption:
        "The Gap, for the job you already have. Three named skills, each saying what closed it or what still has not.",
      ratio: "phone" as const,
    },
  },
];

const ticker = [
  "AI coding tools",
  "B2B sales",
  "Revenue management",
  "Performance marketing",
  "Cooking",
  "Indie music",
  "Prices in ₹",
  "Refusal List",
];

function UseCasesPage() {
  return (
    <main>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden pt-28 md:pt-36">
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
              Four people · Four fields · One place to look
            </span>
          </Reveal>

          <h1 className="mt-8 max-w-4xl font-display text-[2.6rem] leading-[1.04] tracking-tight text-balance md:text-7xl">
            <Reveal variant="mask" as="span" className="block">
              Not everyone here
            </Reveal>
            <Reveal variant="mask" as="span" delay={140} className="block">
              <span className="grad-text">works in tech.</span>
            </Reveal>
          </h1>

          <Reveal delay={260}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              An engineer, a sales lead, a hotel operations manager and a brand
              marketer. Same app, four different problems, and what each of them
              stopped doing afterwards.
            </p>
          </Reveal>

          <Reveal delay={340}>
            <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
              {[
                ["4", "fields, not one"],
                ["1", "open per day"],
                ["6", "interests each"],
                ["0", "extra tabs"],
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
          {people.map((person, i) => {
            const flip = i % 2 === 1;
            return (
              <section
                key={person.n}
                className="grid items-center gap-10 md:grid-cols-12 md:gap-16"
              >
                <div className={`md:col-span-6 ${flip ? "md:order-2" : ""}`}>
                  <Reveal variant={flip ? "right" : "left"}>
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-5xl leading-none text-accent/25 md:text-6xl">
                        {person.n}
                      </span>
                      <span>
                        <span className="block font-display text-xl tracking-tight md:text-2xl">
                          {person.name}
                        </span>
                        <span className="mt-1 block font-mono text-[11px] tracking-[0.1em] uppercase text-muted-foreground">
                          {person.meta}
                        </span>
                      </span>
                    </div>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {person.interests.map((interest) => (
                        <li
                          key={interest}
                          className="rounded-full border border-border px-3 py-1 font-mono text-[10px] tracking-[0.06em] text-muted-foreground"
                        >
                          {interest}
                        </li>
                      ))}
                    </ul>

                    <h2 className="mt-7 font-display text-3xl leading-tight tracking-tight text-balance md:text-[2.5rem]">
                      {person.title}
                    </h2>

                    <p className="mt-6 border-l-2 border-border pl-4 leading-relaxed text-muted-foreground">
                      <span className="mb-1 block font-mono text-[10px] tracking-[0.14em] uppercase text-foreground/70">
                        Before
                      </span>
                      {person.problem}
                    </p>

                    {person.body.map((paragraph) => (
                      <p key={paragraph} className="mt-5 leading-relaxed text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}

                    <p className="mt-6 border-l-2 border-accent pl-4 leading-relaxed text-foreground">
                      <span className="mb-1 block font-mono text-[10px] tracking-[0.14em] uppercase text-accent">
                        After
                      </span>
                      {person.gain}
                    </p>

                    <ul className="mt-7 flex flex-wrap gap-2">
                      {person.facts.map((f) => (
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
                      <div className="relative flex justify-center">
                        <div
                          className="pointer-events-none absolute inset-0 rounded-2xl opacity-60"
                          aria-hidden="true"
                        >
                          <div className="orb -right-6 -top-8 h-32 w-32 bg-accent-2/40" />
                        </div>
                        <div className="relative w-full">
                          <ScreenshotSlot {...person.slot} />
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
              Your field is on that list{" "}
              <span className="grad-text">too.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg leading-relaxed text-muted-foreground">
              Tell us what you follow. We'll tell you what's worth your evening.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="glass-card mx-auto mt-9 max-w-xl rounded-2xl p-5 text-left md:p-6">
              <WaitlistForm id="email-use-cases" source="use-cases" />
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
