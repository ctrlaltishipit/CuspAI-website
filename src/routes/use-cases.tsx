import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Phone, type ShotName } from "@/components/phone";
import { Reveal } from "@/components/reveal";
import { Accent } from "@/components/typography";

export const Route = createFileRoute("/use-cases")({
  head: () => ({
    meta: [
      { title: "Use cases: four jobs, one app" },
      {
        name: "description",
        content:
          "Four worked examples of CuspAI in use: a product engineer, a sales lead, a hotel operations manager and a brand marketer. What each one opens, and what they come away with.",
      },
      { property: "og:title", content: "Use cases: four jobs, one app" },
      {
        property: "og:description",
        content:
          "Four worked examples across four fields, most of them outside tech. What each person opens in CuspAI and what they leave with.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: UseCasesPage,
});

/*
 * These are worked examples, written to show how the app fits different jobs.
 * They are not customer stories: CuspAI has not opened yet. Everything a
 * person "does" below is something the app does today, and every number is
 * one the app shows on that screen. Keep it that way.
 */
const EXAMPLES: {
  id: string;
  role: string;
  place: string;
  follows: string[];
  title: string;
  before: string;
  steps: string[];
  after: string;
  shot: ShotName;
  alt: string;
  caption: string;
}[] = [
  {
    id: "engineer",
    role: "Product engineer",
    place: "Bengaluru",
    follows: ["AI and ML", "Engineering", "Product", "Design", "Football", "Espresso"],
    title: "A site to ship this weekend, and no idea what it should cost.",
    before:
      "Eleven newsletters, three group chats and a folder of saved posts. None of it answers the one question that matters this week: which tools to use for a site, and what the bill will be.",
    steps: [
      "They open Build and tap Build a website for my business. A plan opens with four steps: design, build, host and measure. Each step has a free tool and a paid tool, with the price on both.",
      "They tap Best mix. The line under the map says all four steps are covered, at about $36 a month. One more tap on All free shows what the same plan looks like at $0.",
    ],
    after: "A plan to start tonight, and the cost of every choice before any money is spent.",
    shot: "plan-mix",
    alt: "A CuspAI plan for building a website, with the Best mix tools picked and the line All 4 phases covered, about $36 a month.",
    caption:
      "The website plan with Best mix picked. Free tools sit on the left, paid on the right.",
  },
  {
    id: "sales",
    role: "Sales lead",
    place: "Chennai",
    follows: ["Marketing", "Finance", "Retail", "B2B sales", "Running"],
    title: "Every list of sales tools is written by someone selling one.",
    before:
      "The team already pays for a tool that nobody opens. Before buying another, they want to see the options next to each other, with prices and the limits on each free plan.",
    steps: [
      "They tap Generate more sales leads, one of the twelve common goals in Build. The plan sets out the steps in order, with a free and a paid tool for each and a line on why each tool was chosen.",
      "On the way home they open Discover, pick Marketing and switch to Podcasts. It shows the top three episodes, how long each one runs, and the reason it was picked.",
    ],
    after:
      "A fair way to compare tools before the next purchase, and three things worth hearing on the commute.",
    shot: "discover",
    alt: "The CuspAI Discover screen with a search box, interest chips, a filter for newsletters and podcasts, and the first result.",
    caption: "Discover: the top three for an interest, with a filter for newsletters and podcasts.",
  },
  {
    id: "hotel",
    role: "Hotel operations manager",
    place: "Goa",
    follows: ["Food", "Finance", "Retail", "Hospitality", "Revenue management", "Photography"],
    title: "Most AI news reads as if it was written for another industry.",
    before:
      "News in the hotel trade travels through trade magazines, group chats and conference corridors. Nothing arrives in one place, and very little of it says what to do next.",
    steps: [
      "They pick Food and Finance from the list, then add Hospitality and Revenue management as interests of their own. The daily brief is built from those, and every item says which interest brought it there.",
      "In the quiet season they type Automate my weekly reports into Build. The plan gives the steps in order, written for someone who has never done it, with the exact link for each one.",
    ],
    after: "One place to look each day, and a plan for a job that kept being put off.",
    shot: "read",
    alt: "The CuspAI Read screen: a short numbered list for the day, each item with its source, its reading time and the reason it was chosen.",
    caption: "Read: a short list for the day. Each item names the interest it came from.",
  },
  {
    id: "marketer",
    role: "Brand marketer",
    place: "Mumbai",
    follows: ["Marketing", "Design", "Fashion", "Music", "D2C brands"],
    title: "Asked to do AI video, with no wish to change careers.",
    before:
      "The founder wants to know why the brand is not making AI video yet. A ten-hour course is too much. What they need is a short list of what to learn, in the job they already have.",
    steps: [
      "On Skills they enter the role they have and the role they want. The app lists four to six skills between the two, says why each one matters, and gives numbered steps under How to get there.",
      "One skill means making something, so it has a Build button. A tap sends that goal to Build, which opens a plan for a first project to learn it on.",
    ],
    after: "A short list of what to learn, in order, and a first project to practise on.",
    shot: "skills",
    alt: "The CuspAI Skills screen showing a skill with its status, a progress bar, why it matters and what has been read on it.",
    caption: "Skills, shown here for a product manager moving to AI product manager.",
  },
];

function UseCasesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Use cases"
        lines={[
          "Four jobs.",
          <>
            Most of them are <Accent>outside tech.</Accent>
          </>,
        ]}
        lead="A product engineer, a sales lead, a hotel operations manager and a brand marketer. Here is what each of them would open in CuspAI, and what they would leave with."
      >
        <p className="max-w-xl rounded-2xl border border-border bg-surface px-5 py-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
          These are worked examples. CuspAI has not opened yet, so they show how the app is meant to
          fit different jobs. Every screen and every figure is taken from the app as it is today.
        </p>
      </PageHero>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {EXAMPLES.map((ex, i) => {
          const flip = i % 2 === 1;
          return (
            <section
              key={ex.id}
              id={ex.id}
              className="grid scroll-mt-24 items-center gap-12 border-t border-border py-16 md:py-24 lg:grid-cols-12 lg:gap-16"
            >
              <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
                <Reveal variant={flip ? "right" : "left"}>
                  <p className="flex items-baseline gap-4">
                    <span className="tnum font-display text-5xl leading-none tracking-tight text-border-strong md:text-6xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-display text-xl tracking-tight">{ex.role}</span>
                      <span className="block text-sm text-subtle">{ex.place}</span>
                    </span>
                  </p>

                  <h2 className="t-h2 mt-7">{ex.title}</h2>

                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Follows">
                    {ex.follows.map((f) => (
                      <li key={f} className="chip">
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 border-l-2 border-border pl-5">
                    <p className="text-sm font-semibold text-foreground">The situation</p>
                    <p className="measure mt-2 leading-relaxed text-muted-foreground">
                      {ex.before}
                    </p>
                  </div>

                  <div className="mt-7 pl-5">
                    <p className="text-sm font-semibold text-foreground">In the app</p>
                    {ex.steps.map((s) => (
                      <p key={s} className="measure mt-2 leading-relaxed text-muted-foreground">
                        {s}
                      </p>
                    ))}
                  </div>

                  <div className="mt-7 border-l-2 border-accent pl-5">
                    <p className="text-sm font-semibold text-accent-text">What they leave with</p>
                    <p className="measure mt-2 text-lg leading-relaxed text-foreground">
                      {ex.after}
                    </p>
                  </div>
                </Reveal>
              </div>

              <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                <Reveal variant="scale" delay={80}>
                  <figure>
                    <Phone shot={ex.shot} alt={ex.alt} className="max-w-[290px]" />
                    <figcaption className="mx-auto mt-6 max-w-[290px] text-center text-sm leading-snug text-subtle">
                      {ex.caption}
                    </figcaption>
                  </figure>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      <section className="hairline-t bg-band py-16 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between md:px-8">
          <Reveal>
            <h2 className="t-h3 max-w-xl">
              Your job is probably different from all four. The app starts from what you follow, so
              it should fit anyway.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <Link to="/how-it-works" className="btn btn-quiet group">
              See how it works
              <ArrowRight size={18} aria-hidden="true" className="arrow" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
