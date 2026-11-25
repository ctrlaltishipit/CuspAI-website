import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/typography";

export type FaqItem = { q: string; a: ReactNode };

/** The questions people ask before signing up, answered against the real app. */
export const HOME_FAQ: FaqItem[] = [
  {
    q: "What is CuspAI?",
    a: "A phone app that does two jobs. It gives you a two-minute daily brief on the fields you follow, and it turns something you want to build into a step-by-step plan with the tools and what they cost.",
  },
  {
    q: "Is it free?",
    a: "Reading is free for good: the daily brief, newsletters, podcasts, your skill map and saved items. You also get three build plans to try, with no card. After that, plans start at $2 a month.",
  },
  {
    q: "Do I need a tech background?",
    a: "No. Plans are written for beginners. Each step tells you what to do and gives you the exact link or command, so you can copy it and move on.",
  },
  {
    q: "When can I use it?",
    a: "We are finishing the app now. Join the waitlist and we will email you once, on the day it opens.",
  },
  {
    q: "Which phones does it work on?",
    a: "iPhone and Android. It is one app, built for both.",
  },
  {
    q: "Where do the build plans come from?",
    a: "Common goals, like building a website or starting a newsletter, have a plan built in, so it opens straight away. On Pro, the plan is written for your exact goal by Claude, an AI model made by Anthropic.",
  },
  {
    q: "Does CuspAI read my email?",
    a: "No. It never connects to your inbox. You pick your interests from a list, and that is all it needs.",
  },
  {
    q: "What happens to my data?",
    a: (
      <>
        In guest mode, everything you do stays on your phone. When you ask for a plan, the goal you
        typed is sent to our server and to the AI model that writes it. We don't sell your data. The{" "}
        <Link to="/privacy" className="link">
          Privacy Policy
        </Link>{" "}
        has the details.
      </>
    ),
  },
];

/** Questions that open in place. One open at a time, and the panel is a real region. */
export function Faq({
  items = HOME_FAQ,
  title = "Questions, answered plainly",
  eyebrow = "FAQ",
  idPrefix = "faq",
}: {
  items?: FaqItem[];
  title?: string;
  eyebrow?: string;
  idPrefix?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="hairline-t py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <SectionHead eyebrow={eyebrow} title={title} />
          <p className="mt-5 text-muted-foreground">
            Something else on your mind? Write to{" "}
            <a href="mailto:hello@cuspai.io" className="link">
              hello@cuspai.io
            </a>
            .
          </p>
        </Reveal>

        <div className="lg:col-span-8">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={Math.min(i, 6) * 40}>
                <div className="border-b border-border">
                  <h3 className="font-sans text-base font-normal tracking-normal">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`${idPrefix}-panel-${i}`}
                      id={`${idPrefix}-button-${i}`}
                      className="group flex min-h-[4rem] w-full items-center justify-between gap-6 py-4 text-left"
                    >
                      <span
                        className={`font-display text-lg tracking-tight transition-colors duration-150 md:text-xl ${
                          isOpen
                            ? "text-foreground"
                            : "text-foreground/90 group-hover:text-foreground"
                        }`}
                      >
                        {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color] duration-300 ${
                          isOpen
                            ? "border-transparent bg-action text-action-foreground"
                            : "border-border text-muted-foreground group-hover:border-border-strong"
                        }`}
                      >
                        {/* The plus turns into a cross. Only the glyph turns, so the circle never grows past its box. */}
                        <Plus
                          size={18}
                          className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`${idPrefix}-panel-${i}`}
                    role="region"
                    aria-labelledby={`${idPrefix}-button-${i}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden" inert={!isOpen}>
                      <p className="measure pb-6 leading-relaxed text-muted-foreground">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
