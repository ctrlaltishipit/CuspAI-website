import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Bookmark,
  FileText,
  Layers,
  Search,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PageHero } from "@/components/page-hero";
import { Phone, Shot, type ShotName } from "@/components/phone";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/typography";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How CuspAI works" },
      {
        name: "description",
        content:
          "A walk through the CuspAI app: how you start, what each of the five tabs does, and when you would open it. With screenshots of every screen.",
      },
      { property: "og:title", content: "How CuspAI works" },
      {
        property: "og:description",
        content:
          "Every screen in the CuspAI app, what it does, and when you would open it. With screenshots.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorksPage,
});

const START: {
  n: string;
  title: string;
  body: string;
  note: string;
  shot: ShotName;
  alt: string;
}[] = [
  {
    n: "01",
    title: "Open it and go in",
    body: "The first screen tells you what the app does. Tap Get started, then continue as a guest with only a first name.",
    note: "No account needed",
    shot: "signin",
    alt: "The CuspAI sign-in screen, with Continue with Google and a guest option that asks only for a first name.",
  },
  {
    n: "02",
    title: "Pick what to follow",
    body: "Choose from eighteen topics across work, life and ideas, then add your own. Your daily brief is built from these, and you can change them at any time.",
    note: "About a minute",
    shot: "interests",
    alt: "The CuspAI interests screen: topic chips grouped under Work, Life and Ideas, with eight picked.",
  },
  {
    n: "03",
    title: "Start with a goal or a read",
    body: "You land on Build. Type what you want to make, or tap Read at the bottom for today's brief. Both are ready the moment you arrive.",
    note: "You are in",
    shot: "build",
    alt: "The CuspAI Build screen: a greeting, a box to describe what you want to build, and a list of common goals.",
  },
];

const TABS: {
  id: string;
  icon: LucideIcon;
  name: string;
  when: string;
  body: string;
  points: string[];
  shot: ShotName;
  alt: string;
}[] = [
  {
    id: "build",
    icon: Layers,
    name: "Build",
    when: "When you want to make something",
    body: "Describe your goal in a line, or tap one of twelve common ones: a website, a newsletter, a YouTube channel, more sales leads, an online shop. A plan opens straight away.",
    points: [
      "Twelve common goals, one tap each",
      "Your earlier plans are listed underneath",
      "Three plans to try before you pay anything",
    ],
    shot: "build-filled",
    alt: "The Build screen with the goal Build a website for my business filled in, and the Build plan button ready.",
  },
  {
    id: "plan",
    icon: Layers,
    name: "Your plan",
    when: "Straight after you ask for one",
    body: "The whole job on one map. Your goal sits at the top, the steps run down the middle, free tools are on the left and paid tools on the right. Every tool shows its price.",
    points: [
      "Tap a tool to pick it, and hold it to read about it",
      "All free, Best mix or All paid in one tap",
      "A line under the map checks every step has a tool",
      "It adds up what your picks cost a month",
    ],
    shot: "plan-mix",
    alt: "A CuspAI plan for building a website: four steps down a spine, free tools on the left and paid tools on the right, with the Best mix picks lit up.",
  },
  {
    id: "playbook",
    icon: FileText,
    name: "The playbook",
    when: "When you are ready to start",
    body: "Under the map are the steps to follow, written for a beginner, with the exact link or command for each. Your stack lists the tools you picked. On Starter and Pro you can save all of it as an A4 PDF.",
    points: [
      "Numbered steps with commands you can copy",
      "A checklist for running the plan",
      "Your stack, with the monthly total",
    ],
    shot: "plan-stack",
    alt: "The lower half of a CuspAI plan: the free and paid tracks as checklists, and Your stack listing the picked tools with a monthly total.",
  },
  {
    id: "read",
    icon: FileText,
    name: "Read",
    when: "Once a day, whenever suits you",
    body: "A short, numbered list of what changed in the fields you follow. Each item has up to three points and the reason it reached you. After the last one, the app tells you that you are up to date.",
    points: [
      "About two minutes to read it all",
      "Read it opens a short version, with a link to the original",
      "Get notified sets one reminder a day, at 8:00",
    ],
    shot: "read",
    alt: "The CuspAI Read screen: four things worth knowing today, each with a headline, short points, its source and the reason it was chosen.",
  },
  {
    id: "discover",
    icon: Search,
    name: "Discover",
    when: "When you have a few spare minutes",
    body: "The top three newsletters and podcast episodes for what you follow. Narrow it to one interest, search, or switch between newsletters and podcasts.",
    points: [
      "Each one shows its source, its age and how long it takes",
      "Two short points and the reason it was picked",
      "Read or Listen opens the original",
    ],
    shot: "discover",
    alt: "The CuspAI Discover screen: a search box, interest chips, a filter for newsletters and podcasts, and the first newsletter in the list.",
  },
  {
    id: "skills",
    icon: BarChart3,
    name: "Skills",
    when: "When you are planning your next move",
    body: "Enter the role you have and the role you want. You get four to six skills that sit between them, why each one matters, and numbered steps to get there.",
    points: [
      "Mark each skill Not started, In progress or Got it",
      "What you have read on a skill counts as progress",
      "Where a skill means making something, one tap sends it to Build",
    ],
    shot: "skills",
    alt: "The CuspAI Skills screen for moving from product manager to AI product manager: a skill with a progress bar, why it matters, and what has been read on it.",
  },
  {
    id: "saved",
    icon: Bookmark,
    name: "Saved",
    when: "When something is worth keeping",
    body: "One tap on any item saves it here. Each saved item still shows the reason it reached you, so it makes sense when you come back to it weeks later.",
    points: ["Save from Read, Discover or the reader", "Tap again to remove it"],
    shot: "saved",
    alt: "The CuspAI Saved screen with three saved items, each showing its source and the reason it was chosen.",
  },
];

/**
 * The tabs, one after another. On a wide screen the phone stays put on the
 * right and changes as each tab's text reaches the middle of the window. On a
 * small screen each tab simply carries its own phone.
 */
function Walkthrough() {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    // A thin band across the middle of the window: whichever tab crosses it is the one shown.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset["i"]));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-6">
        {TABS.map((t, i) => (
          <article
            key={t.id}
            id={t.id}
            ref={(el) => {
              items.current[i] = el;
            }}
            data-i={i}
            className={`scroll-mt-24 border-t border-border py-12 transition-opacity duration-300 first:border-t-0 first:pt-0 lg:flex lg:min-h-[78vh] lg:flex-col lg:justify-center lg:py-16 ${
              active === i ? "lg:opacity-100" : "lg:opacity-45"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent-text">
                <t.icon size={22} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div>
                <h3 className="t-h3">{t.name}</h3>
                <p className="text-sm font-medium text-accent-text">{t.when}</p>
              </div>
            </div>
            <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">{t.body}</p>
            <ul className="mt-6 space-y-3">
              {t.points.map((p) => (
                <li key={p} className="flex gap-3 leading-snug">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 lg:hidden">
              <Phone shot={t.shot} alt={t.alt} className="max-w-[270px]" />
            </div>
          </article>
        ))}
      </div>

      <div className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-28">
          <Phone className="max-w-[310px]">
            {TABS.map((t, i) => (
              <div
                key={t.id}
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: active === i ? 1 : 0 }}
                aria-hidden={active !== i}
              >
                <Shot name={t.shot} alt={active === i ? t.alt : ""} />
              </div>
            ))}
          </Phone>
          <p className="mt-5 text-center text-sm text-muted-foreground" aria-hidden="true">
            <span className="tnum text-subtle">
              {active + 1} of {TABS.length}
            </span>
            <span className="mx-2 text-border-strong">/</span>
            {TABS[active]!.name}
          </p>
        </div>
      </div>
    </div>
  );
}

function HowItWorksPage() {
  return (
    <main>
      <PageHero
        eyebrow="How it works"
        lines={["The whole app,", "one screen at a time."]}
        lead="CuspAI is a phone app with five tabs along the bottom. Here is how you start, what each tab does, and when you would open it."
      >
        <nav aria-label="On this page" className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className="chip transition-colors duration-150 hover:border-border-strong hover:text-foreground"
            >
              {t.name}
            </a>
          ))}
        </nav>
      </PageHero>

      {/* ---------------- Getting started ---------------- */}
      <section className="hairline-t py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <SectionHead
              eyebrow="Getting started"
              title="Three screens and you are in."
              lead="There is no long sign-up. Picking what you follow is the whole setup."
            />
          </Reveal>

          <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
            {START.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 80}>
                <div className="flex items-baseline gap-3">
                  <span className="tnum font-display text-sm text-accent-text">{step.n}</span>
                  <span className="chip">{step.note}</span>
                </div>
                <h3 className="t-h3 mt-4">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{step.body}</p>
                <Phone
                  shot={step.shot}
                  alt={step.alt}
                  className="mt-8 max-w-[250px]"
                  glow={false}
                />
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- The tabs ---------------- */}
      <section className="hairline-t bg-band py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <SectionHead
              eyebrow="Inside the app"
              title="Five tabs, and what a plan looks like."
              lead="Build, Read, Discover, Skills and Saved sit along the bottom of every screen. A plan gets two stops of its own, because it is the part people ask about most."
            />
          </Reveal>
          <div className="mt-14 md:mt-20">
            <Walkthrough />
          </div>
        </div>
      </section>

      {/* ---------------- Cost ---------------- */}
      <section className="hairline-t py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <SectionHead
              eyebrow="What it costs"
              title="Reading is free. Build plans are where the cost is."
            />
          </Reveal>
          <Reveal delay={80} className="lg:col-span-6">
            <p className="t-lead text-muted-foreground">
              Read, Discover, Skills and Saved are free on every plan, for good. You also get three
              build plans free, with no card. After that, Starter is $2 a month for eight plans and
              Pro is $5 a month for twenty.
            </p>
            <Link to="/pricing" className="btn btn-quiet group mt-8">
              See the plans side by side
              <ArrowRight size={18} aria-hidden="true" className="arrow" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
