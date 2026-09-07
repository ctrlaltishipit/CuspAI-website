import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Sceptics } from "@/components/sections/sceptics";
import { Surfaces } from "@/components/sections/surfaces";
import { FounderNote } from "@/components/sections/founder-note";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CuspAI: a dated, reasoned verdict on what to use and what to learn" },
      {
        name: "description",
        content:
          "CuspAI gives working professionals in India one pick, one runner-up, and one thing to stop paying for, with prices in rupees and the dates they were checked.",
      },
      { property: "og:title", content: "CuspAI: the truth about what to use and what to learn" },
      {
        property: "og:description",
        content:
          "A dated, reasoned verdict on the three decisions that cost you the most money and time. One pick. One runner-up. One thing to stop paying for.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Hero />
      <Problem />
      <HowItWorks />
      <Sceptics />
      <Surfaces />
      <FounderNote />
      <Faq />
      <FinalCta />
    </main>
  );
}
