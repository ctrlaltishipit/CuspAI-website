import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/hero";
import {
  Audience,
  Features,
  PricingTeaser,
  Promises,
  Tour,
  Why,
} from "@/components/sections/home-sections";
import { Faq } from "@/components/sections/faq";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CuspAI: know what's moving, build what's next" },
      {
        name: "description",
        content:
          "CuspAI gives you a two-minute daily brief on the fields you follow, and turns what you want to build into a plan with the tools, the costs and the steps. Coming soon to iPhone and Android.",
      },
      { property: "og:title", content: "CuspAI: know what's moving, build what's next" },
      {
        property: "og:description",
        content:
          "A two-minute daily brief on the fields you follow. A step-by-step plan for whatever you want to build. Free to read, and three build plans to try.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/**
 * The home page, in the order a visitor asks the questions: what is it, why
 * does it exist, what does it look like, what is in it, is it for me, can I
 * trust it, what does it cost, and what else should I know. The signup band
 * that closes every page comes from the root layout.
 */
function Index() {
  return (
    <main>
      <Hero />
      <Why />
      <Tour />
      <Features />
      <Audience />
      <Promises />
      <PricingTeaser />
      <Faq />
    </main>
  );
}
