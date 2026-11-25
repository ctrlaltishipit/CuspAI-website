import { createFileRoute } from "@tanstack/react-router";
import { Check, Minus } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Faq, type FaqItem } from "@/components/sections/faq";
import { PricingCards } from "@/components/sections/pricing-cards";
import { SectionHead } from "@/components/typography";
import { FEATURE_ROWS, TIERS, type Cell } from "@/lib/pricing";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "CuspAI pricing" },
      {
        name: "description",
        content:
          "Reading is free for good. You get three build plans to try with no card. After that, Starter is $2 a month and Pro is $5 a month.",
      },
      { property: "og:title", content: "CuspAI pricing" },
      {
        property: "og:description",
        content:
          "Free to read, three build plans to try, then $2 or $5 a month. See what each plan includes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PricingPage,
});

const PRICING_FAQ: FaqItem[] = [
  {
    q: "What counts as a build plan?",
    a: "Each new plan you ask Build to make counts as one. Opening a plan you already have, changing which tools you picked, or reading the steps again does not use another.",
  },
  {
    q: "What happens when I run out?",
    a: "Build tells you, and shows you the plans. Everything you have already made stays where it is, and the daily brief, Discover, Skills and Saved carry on as before.",
  },
  {
    q: "Do I need a card for the free plans?",
    a: "No. Every new person gets three build plans, and you don't enter payment details to use them.",
  },
  {
    q: "Why does only Build cost money?",
    a: "The daily brief, newsletters, podcasts and the skill map are put together once for everyone, so they cost us very little per person. A build plan is written for one person's goal, and each one has a real cost.",
  },
  {
    q: "Are the prices in rupees?",
    a: "Prices are listed in US dollars for now. Checkout is being built around how people pay in each country, including UPI in India.",
  },
  {
    q: "Can I pay today?",
    a: "Paid plans open when the app launches. Nothing is charged before then. Join the waitlist and we will tell you the day it opens.",
  },
  {
    q: "Can I cancel?",
    a: "Yes. When paid plans open you will be able to cancel at any time, and you keep what you paid for until the end of that month or year.",
  },
];

function CellMark({ value }: { value: Cell }) {
  if (typeof value === "string") return <span className="tnum font-medium">{value}</span>;
  return value ? (
    <>
      <Check size={18} strokeWidth={2.25} aria-hidden="true" className="mx-auto text-accent-text" />
      <span className="sr-only">Included</span>
    </>
  ) : (
    <>
      <Minus size={18} aria-hidden="true" className="mx-auto text-border-strong" />
      <span className="sr-only">Not included</span>
    </>
  );
}

function PricingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <main>
      <PageHero
        eyebrow="Pricing"
        lines={["Read for free.", "Pay only when you build a lot."]}
        lead="The daily brief, newsletters, podcasts and your skill map cost nothing on any plan. Build plans are the one thing with a price, and your first three are free."
      >
        <div
          role="group"
          aria-label="Billing period"
          className="inline-flex rounded-full border border-border bg-surface p-1"
        >
          {[
            { v: false, label: "Monthly" },
            { v: true, label: "Yearly, 2 months free" },
          ].map((o) => (
            <button
              key={o.label}
              type="button"
              onClick={() => setYearly(o.v)}
              aria-pressed={yearly === o.v}
              className={`min-h-11 rounded-full px-5 text-[0.9375rem] font-semibold transition-colors duration-150 ${
                yearly === o.v
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <PricingCards yearly={yearly} />
          <p className="mt-6 text-sm text-subtle">
            Prices are in US dollars. Paid plans open when the app launches, and nothing is charged
            before then.
          </p>
        </div>
      </section>

      <section className="hairline-t bg-band py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <SectionHead
              eyebrow="Side by side"
              title="What each plan includes."
              lead="The first six rows are the same on every plan. The last three are what you pay for."
            />
          </Reveal>

          <Reveal delay={80} className="mt-12">
            {/* `relative` matters: without it the table's screen-reader-only labels escape this scroller and widen the page. */}
            <div className="relative -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
              <table className="w-full min-w-[34rem] border-collapse text-left">
                <caption className="sr-only">What each CuspAI plan includes</caption>
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="w-[40%] border-b border-border-strong pb-4 text-sm font-semibold text-subtle"
                    >
                      What you get
                    </th>
                    {TIERS.map((t) => (
                      <th
                        key={t.id}
                        scope="col"
                        className={`border-b border-border-strong px-3 pb-4 text-center font-display text-lg tracking-tight ${
                          t.recommended ? "text-accent-text" : "text-foreground"
                        }`}
                      >
                        {t.name}
                        <span className="tnum mt-0.5 block font-sans text-sm font-normal text-muted-foreground">
                          ${yearly ? t.yearly : t.price}
                          {t.price === 0 ? "" : yearly ? " a year" : " a month"}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FEATURE_ROWS.map((row) => (
                    <tr key={row.label} className="transition-colors duration-150 hover:bg-surface">
                      <th
                        scope="row"
                        className="border-b border-border py-4 pr-4 text-[0.9375rem] font-medium text-foreground"
                      >
                        {row.label}
                      </th>
                      {TIERS.map((t) => (
                        <td
                          key={t.id}
                          className="border-b border-border px-3 py-4 text-center text-[0.9375rem]"
                        >
                          <CellMark value={row.values[t.id]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <Faq
        items={PRICING_FAQ}
        title="Questions about paying"
        eyebrow="Billing"
        idPrefix="pricing-faq"
      />
    </main>
  );
}
