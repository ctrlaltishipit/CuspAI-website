import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  Bookmark,
  FileDown,
  Headphones,
  ListChecks,
  Map as MapIcon,
  Newspaper,
  Route,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { AppTour } from "@/components/app-tour";
import { Phone } from "@/components/phone";
import { CountUp, Reveal, Spotlight } from "@/components/reveal";
import { PricingCards } from "@/components/sections/pricing-cards";
import { SectionHead } from "@/components/typography";
import { CHAPTERS } from "@/lib/tour-data";

const wrap = "mx-auto max-w-6xl px-5 md:px-8";

/* ---------------------------------------------------------------------- */
/* Why: three published numbers, and what the app does about each          */
/* ---------------------------------------------------------------------- */

/*
 * Every figure here was traced to its primary source before it went on the
 * page. Do not add a number to this list without doing the same.
 */
const FACTS = [
  {
    value: 92,
    suffix: "%",
    claim:
      "of employees in India use generative AI at work every week, the highest rate measured anywhere. Only 36% of employees worldwide feel adequately trained for it.",
    source: "BCG, AI at Work 2025",
    tab: "Build",
    answer:
      "Tell CuspAI what you want to make and it lays out which tools to use, in what order, and what each one costs.",
  },
  {
    value: 6,
    suffix: " in 10",
    claim: "people who subscribe to news newsletters don't read most of what arrives.",
    source: "Pew Research Center, February 2026",
    tab: "Read",
    answer:
      "CuspAI picks the few things that matter from the fields you follow. It takes two minutes, and then the list ends.",
  },
  {
    value: 46,
    suffix: "%",
    claim: "of professionals say what they need most is guidance on which skills to learn.",
    source: "LinkedIn and Censuswide, more than 20,000 professionals in 11 countries",
    tab: "Skills",
    answer:
      "Name your role and the one you want. CuspAI lists the skills in between and gives you steps for each.",
  },
];

export function Why() {
  return (
    <section className="hairline-t py-20 md:py-28">
      <div className={wrap}>
        <Reveal>
          <SectionHead
            eyebrow="Why we are building this"
            title="Almost everyone uses AI at work now. Very few were shown how."
            lead="Three published numbers explain the gap. Each one is a job CuspAI does."
          />
        </Reveal>

        <div className="mt-14 md:mt-16">
          {FACTS.map((f, i) => (
            <Reveal key={f.source} delay={i * 60}>
              <article className="grid gap-6 border-t border-border py-9 md:grid-cols-12 md:gap-10 md:py-11">
                <p className="font-display text-6xl leading-none tracking-tight md:col-span-3 md:text-7xl">
                  <CountUp to={f.value} suffix={f.suffix} />
                </p>
                <div className="md:col-span-5">
                  <p className="text-lg leading-relaxed text-foreground">{f.claim}</p>
                  <p className="mt-3 text-sm text-subtle">Source: {f.source}</p>
                </div>
                <div className="md:col-span-4">
                  <p className="chip">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {f.tab}
                  </p>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{f.answer}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* The guided demo                                                         */
/* ---------------------------------------------------------------------- */

export function Tour() {
  return (
    <section id="demo" className="hairline-t relative overflow-hidden bg-band py-20 md:py-28">
      <div className="accent-wash pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className={`relative ${wrap}`}>
        <Reveal>
          <SectionHead
            eyebrow="See it work"
            title="Five things it does, shown on the real app."
            lead="Watch the cursor go through each one, or press a step to jump to it. Every frame is a screenshot of the app."
          />
        </Reveal>
        <Reveal delay={100} className="mt-12 md:mt-14">
          <AppTour chapters={CHAPTERS} />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* Features                                                                */
/* ---------------------------------------------------------------------- */

function Feature({
  icon: Icon,
  title,
  children,
  className = "",
  delay = 0,
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className={className}>
      <Spotlight as="article" className="card card-hover h-full p-6 md:p-7">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-text">
          <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <h3 className="t-h3 mt-5">{title}</h3>
        <div className="mt-3 leading-relaxed text-muted-foreground">{children}</div>
      </Spotlight>
    </Reveal>
  );
}

const TOPICS = [
  "AI and ML",
  "Product",
  "Design",
  "Engineering",
  "Data",
  "Marketing",
  "Retail",
  "Finance",
  "Fashion",
  "Film",
  "Music",
  "Food",
  "Dance",
  "Sport",
  "Society",
  "Philosophy",
  "Science",
  "Climate",
];

export function Features() {
  return (
    <section id="features" className="hairline-t py-20 md:py-28">
      <div className={wrap}>
        <Reveal>
          <SectionHead
            eyebrow="What is inside"
            title="One app for keeping up and for getting on with it."
            lead="Here is everything it does today. All of it is in the app now."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-12">
          {/* The big one: build plans, with the plan map beside the words. */}
          <Reveal className="md:col-span-8">
            <Spotlight as="article" className="card h-full overflow-hidden">
              <div className="grid h-full md:grid-cols-[1.1fr_0.9fr]">
                <div className="p-6 md:p-8">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-text">
                    <MapIcon size={22} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="t-h3 mt-5">A plan for whatever you want to build</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    Type a goal. You get every step on one map, with a free tool and a paid tool for
                    each.
                  </p>
                  <ul className="mt-6 space-y-3 text-[0.9375rem]">
                    {[
                      "Twelve common goals built in, from a website to a newsletter",
                      "Real prices and free-plan limits on every tool",
                      "One tap for All free, Best mix or All paid",
                      "A check that every step has a tool, and the monthly total",
                    ].map((line) => (
                      <li key={line} className="flex gap-3 leading-snug">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative h-72 overflow-hidden border-t border-border bg-deep md:h-auto md:border-l md:border-t-0">
                  <div className="absolute inset-x-6 top-8 [mask-image:linear-gradient(to_bottom,black_70%,transparent)] md:inset-x-8">
                    <Phone
                      shot="plan-mix"
                      glow={false}
                      alt="A CuspAI build plan for a website: the steps down the middle, free tools on the left, paid tools on the right, with the picked tools lit up."
                    />
                  </div>
                </div>
              </div>
            </Spotlight>
          </Reveal>

          <Feature
            icon={FileDown}
            title="A playbook you can print"
            className="md:col-span-4"
            delay={60}
          >
            <p>
              Save the plan as an A4 PDF: the tools you picked, the steps in order, and the exact
              links and commands. Included on Starter and Pro.
            </p>
          </Feature>

          <Feature icon={Newspaper} title="A daily brief that ends" className="md:col-span-4">
            <p>
              A short list from the fields you follow. Each item says why it reached you. When you
              finish, it tells you that you are up to date.
            </p>
          </Feature>

          <Feature
            icon={Headphones}
            title="Newsletters and podcasts, sorted"
            className="md:col-span-4"
            delay={60}
          >
            <p>
              Discover shows the top three for each interest. Search, filter by newsletter or
              podcast, and open the original in one tap.
            </p>
          </Feature>

          <Feature
            icon={Route}
            title="A skill map for your next role"
            className="md:col-span-4"
            delay={120}
          >
            <p>
              Say where you are and where you want to be. You get four to six skills, why each
              matters, and numbered steps to get there.
            </p>
          </Feature>

          {/* Interests, with the topic list drifting past. */}
          <Reveal className="md:col-span-7">
            <Spotlight as="article" className="card h-full overflow-hidden">
              <div className="p-6 md:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-text">
                  <ListChecks size={22} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="t-h3 mt-5">Built from what you choose to follow</h3>
                <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">
                  Pick from eighteen topics across work, life and ideas, then add your own. You can
                  follow up to twenty-five, and change them whenever you like.
                </p>
              </div>
              <div
                className="marquee-wrap overflow-hidden border-t border-border py-4"
                tabIndex={0}
                aria-label="Topics you can follow"
              >
                <ul className="marquee gap-3 pl-3">
                  {[...TOPICS, ...TOPICS].map((t, i) => (
                    <li
                      key={`${t}-${i}`}
                      className="chip whitespace-nowrap"
                      aria-hidden={i >= TOPICS.length}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Spotlight>
          </Reveal>

          <Reveal delay={60} className="md:col-span-5">
            <Spotlight as="article" className="card h-full p-6 md:p-8">
              <h3 className="t-h3">And the small things</h3>
              <ul className="mt-5 space-y-5">
                {[
                  {
                    icon: UserRound,
                    t: "Try it as a guest",
                    d: "No account needed. Everything stays on your phone.",
                  },
                  {
                    icon: Bell,
                    t: "A reminder, if you want one",
                    d: "One notification a day at 8:00. Tap again to turn it off.",
                  },
                  {
                    icon: Bookmark,
                    t: "Save for later",
                    d: "Keep any item. It still shows why it reached you.",
                  },
                ].map(({ icon: Icon, t, d }) => (
                  <li key={t} className="flex gap-4">
                    <Icon
                      size={20}
                      strokeWidth={1.75}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-accent-text"
                    />
                    <div>
                      <p className="font-medium text-foreground">{t}</p>
                      <p className="mt-0.5 text-[0.9375rem] leading-snug text-muted-foreground">
                        {d}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Spotlight>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <Link
            to="/how-it-works"
            className="group mt-10 inline-flex items-center gap-2 font-semibold text-foreground"
          >
            Go through the app screen by screen
            <ArrowRight size={18} aria-hidden="true" className="arrow text-accent-text" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* Who it is for                                                           */
/* ---------------------------------------------------------------------- */

const PEOPLE = [
  {
    id: "engineer",
    role: "Product engineer",
    line: "Wants to ship a site this weekend and know what it will cost.",
  },
  {
    id: "sales",
    role: "Sales lead",
    line: "Wants a way to find leads that the whole team will use.",
  },
  {
    id: "hotel",
    role: "Hotel operations manager",
    line: "Wants news from the hotel trade in one place.",
  },
  {
    id: "marketer",
    role: "Brand marketer",
    line: "Wants to learn AI video without leaving the current job.",
  },
];

export function Audience() {
  return (
    <section className="hairline-t py-20 md:py-28">
      <div className={`grid gap-12 lg:grid-cols-12 lg:gap-16 ${wrap}`}>
        <Reveal className="lg:col-span-5">
          <SectionHead eyebrow="Who it is for" title="Made for people outside tech too." />
          <p className="t-lead mt-5 text-muted-foreground">
            In 2025, 77% of the demand for AI upskilling in India came from industries outside
            technology.
          </p>
          <p className="mt-3 text-sm text-subtle">
            Source: Great Learning, over a million learners
          </p>
          <Link to="/use-cases" className="btn btn-quiet group mt-8">
            Read four worked examples
            <ArrowRight size={18} aria-hidden="true" className="arrow" />
          </Link>
        </Reveal>

        <ul className="lg:col-span-7">
          {PEOPLE.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 50}>
              <Link
                to="/use-cases"
                hash={p.id}
                className="group flex items-center gap-5 border-b border-border py-5 transition-colors duration-150 first:border-t hover:bg-surface-2/60 md:px-3"
              >
                <span className="tnum w-8 font-display text-sm text-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-xl tracking-tight">{p.role}</span>
                  <span className="mt-1 block text-muted-foreground">{p.line}</span>
                </span>
                <ArrowRight
                  size={20}
                  aria-hidden="true"
                  className="arrow shrink-0 text-subtle group-hover:text-accent-text"
                />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* What you can count on                                                   */
/* ---------------------------------------------------------------------- */

const PROMISES = [
  {
    t: "The reading stays free",
    d: "The daily brief, newsletters, podcasts, your skill map and saved items are free on every plan, for good.",
  },
  {
    t: "Three plans before you pay",
    d: "Every new person gets three build plans. You don't enter a card to use them.",
  },
  { t: "It ends", d: "The daily list is short and it stops. There is nothing endless to scroll." },
  {
    t: "It shows its reasons",
    d: "Every item says which of your interests brought it to you. Every tool says why it was chosen.",
  },
  {
    t: "It sends you to the source",
    d: "You read a short version in the app, with a link to the original from the people who wrote it.",
  },
];

export function Promises() {
  return (
    <section className="hairline-t bg-band py-20 md:py-28">
      <div className={`grid gap-12 lg:grid-cols-12 lg:gap-16 ${wrap}`}>
        <Reveal className="lg:col-span-4">
          <SectionHead
            eyebrow="What you can count on"
            title="Five things that hold on every plan."
          />
        </Reveal>
        <ol className="lg:col-span-8">
          {PROMISES.map((p, i) => (
            <Reveal as="li" key={p.t} delay={i * 50}>
              <div className="grid gap-2 border-b border-border py-6 first:pt-0 md:grid-cols-[14rem_1fr] md:gap-8">
                <h3 className="font-display text-xl tracking-tight">{p.t}</h3>
                <p className="leading-relaxed text-muted-foreground">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* Pricing, in brief                                                       */
/* ---------------------------------------------------------------------- */

export function PricingTeaser() {
  return (
    <section className="hairline-t py-20 md:py-28">
      <div className={wrap}>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHead
              eyebrow="Pricing"
              title="Free to read. A few dollars to build more."
              lead="You pay only for build plans, because each one costs us money to write."
            />
          </Reveal>
          <Reveal delay={80}>
            <Link
              to="/pricing"
              className="group inline-flex items-center gap-2 font-semibold text-foreground"
            >
              Compare the plans in full
              <ArrowRight size={18} aria-hidden="true" className="arrow text-accent-text" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12">
          <PricingCards />
        </div>
        <Reveal>
          <p className="mt-6 text-sm text-subtle">
            Prices are in US dollars. Paid plans open when the app launches.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
