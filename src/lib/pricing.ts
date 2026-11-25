/**
 * Plans and prices, copied from the app's `data/pricing.ts`.
 *
 * The app is the source of truth. If a number changes there, change it here in
 * the same commit: this file feeds the pricing page, the home page, the FAQ
 * and the Terms.
 */

export type TierId = "free" | "starter" | "pro";

export type Tier = {
  id: TierId;
  name: string;
  /** US dollars a month. */
  price: number;
  /** US dollars a year: two months free. */
  yearly: number;
  cadence: string;
  tagline: string;
  features: string[];
  recommended?: boolean;
};

/** Build plans a new person gets before paying anything. No card needed. */
export const FREE_PLAN_ALLOWANCE = 3;

export const TIERS: Tier[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    yearly: 0,
    cadence: "for good",
    tagline: "See whether it helps before you pay for it.",
    features: [
      `${FREE_PLAN_ALLOWANCE} build plans to try, no card`,
      "Daily brief, newsletters and podcasts",
      "Skill map and saved items",
      "Pick your tools on the plan map",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    price: 2,
    yearly: 20,
    cadence: "a month",
    tagline: "For one thing you are building right now.",
    features: [
      "8 build plans a month",
      "Everything in Free",
      "Playbook PDF with the tools you picked",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 5,
    yearly: 50,
    cadence: "a month",
    tagline: "For people who build things regularly.",
    recommended: true,
    features: [
      "20 build plans a month",
      "Everything in Starter",
      "A full history of every plan",
      "Plans written for your exact goal by Claude",
    ],
  },
];

export type Cell = string | boolean;

/** The comparison table. A string is shown as written; true is a tick. */
export const FEATURE_ROWS: { label: string; values: Record<TierId, Cell> }[] = [
  { label: "Build plans", values: { free: "3 in total", starter: "8 a month", pro: "20 a month" } },
  { label: "Daily brief", values: { free: true, starter: true, pro: true } },
  { label: "Newsletters and podcasts", values: { free: true, starter: true, pro: true } },
  { label: "Skill map", values: { free: true, starter: true, pro: true } },
  { label: "Save items to read later", values: { free: true, starter: true, pro: true } },
  { label: "Pick your tools on the plan map", values: { free: true, starter: true, pro: true } },
  { label: "Playbook PDF", values: { free: false, starter: true, pro: true } },
  { label: "Full history of every plan", values: { free: false, starter: false, pro: true } },
  {
    label: "Plans written for your goal by Claude",
    values: { free: false, starter: false, pro: true },
  },
];
