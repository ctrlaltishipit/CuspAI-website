import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CircleStop, Eye, Mail, MessageSquareText, Wallet } from "lucide-react";
import { LogoMark } from "@/components/logo";
import { PageHero } from "@/components/page-hero";
import { Reveal, Spotlight } from "@/components/reveal";
import { Accent, Eyebrow, SectionHead } from "@/components/typography";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CuspAI" },
      {
        name: "description",
        content:
          "What CuspAI is, why we are building it, and the rules it is built to: a daily brief that ends, plans that show their costs, and reading that stays free.",
      },
      { property: "og:title", content: "About CuspAI" },
      {
        property: "og:description",
        content:
          "A daily brief that ends and a plan for whatever you want to build. What we are making, why, and how we judge it.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    icon: CircleStop,
    title: "It ends",
    body: "The daily brief is a short list with a last item. When you reach it, the app tells you that you are up to date. Nothing is waiting behind it.",
  },
  {
    icon: Eye,
    title: "It shows its reasons",
    body: "Every item says which of your interests brought it to you. Every tool in a plan says why it was chosen and where its free plan stops.",
  },
  {
    icon: Wallet,
    title: "It names the cost",
    body: "A plan shows the price of every tool and adds up your picks into a monthly total, so you know the bill before you start.",
  },
];

const REASONS = [
  {
    title: "There are too many tools, and too little advice on which to pick",
    body: "There are plenty of tools. What is hard to find is someone willing to say which one, for this job, at this budget. A CuspAI plan gives you one free tool and one paid tool for every step, and lets you choose.",
  },
  {
    title: "More to read does not mean more understood",
    body: "A long newsletter and an endless feed fail the same way. You finish neither. We would rather hand you four things you read than four hundred you archive.",
  },
  {
    title: "AI at work is no longer only for engineers",
    body: "So the plans are written for beginners, with the exact link or command at every step, and the interests you can follow include food, film and sport next to data and design.",
  },
  {
    title: "Learning should be tied to a real job",
    body: "A list of courses is easy to ignore. The skill map starts from the role you have and the one you want, and where a skill means making something, it sends you straight to a plan for it.",
  },
];

function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About CuspAI"
        lines={[
          "Everyone is selling you a tool.",
          <>
            Very few will help you <Accent>choose one.</Accent>
          </>,
        ]}
        lead="CuspAI is a phone app that keeps you current on the fields you follow, in two minutes a day, and turns what you want to build into a plan you can follow."
      />

      {/* ---------------- What it is ---------------- */}
      <section className="hairline-t py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHead
              eyebrow="What it is"
              title="A short answer, where most apps give you a long list."
            />
          </Reveal>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground lg:col-span-7">
            <Reveal>
              <p>
                Most products in this space hand you volume: an endless feed, a long newsletter, a
                course catalogue. You finish none of them, and none of them leaves you knowing what
                to do this week.
              </p>
            </Reveal>
            <Reveal delay={60}>
              <p>
                CuspAI works the other way. Each day it gives you the few things that changed in the
                areas you follow, and each one says why it is in front of you. Then the list ends,
                and the app says so.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p>
                When you want to make something, you say it in a line. You get the steps in order, a
                free tool and a paid tool for each, real prices, and a playbook written for someone
                doing it for the first time.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-5 px-5 md:grid-cols-3 md:px-8">
          {PRINCIPLES.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 60} className="h-full">
              <Spotlight as="article" className="card card-hover h-full p-6 md:p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-text">
                  <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="t-h3 mt-5">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{body}</p>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Why ---------------- */}
      <section className="hairline-t bg-band py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <SectionHead
              eyebrow="Why we are building it"
              title="Four things we kept running into."
            />
          </Reveal>
          <ol className="mt-12 md:mt-16">
            {REASONS.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 50}>
                <article className="grid gap-4 border-t border-border py-9 md:grid-cols-12 md:gap-10 md:py-11">
                  <p className="tnum font-display text-sm text-accent-text md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="t-h3 md:col-span-5">{r.title}</h3>
                  <p className="leading-relaxed text-muted-foreground md:col-span-6">{r.body}</p>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- Where this is going ---------------- */}
      <section className="dark relative overflow-hidden bg-deep py-20 text-foreground md:py-28">
        <div className="glow-centre pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <LogoMark className="h-12 w-12" />
            <div className="mt-6">
              <Eyebrow>Where this is going</Eyebrow>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-12 md:grid-cols-3 md:gap-10">
            {[
              {
                label: "Vision",
                title: "Nobody good at their job should have to guess what is worth their evening.",
                body: "Careers now turn on choices about tools, made in a hurry and with poor information. We want the clear answer to be the easy one to find.",
              },
              {
                label: "Mission",
                title: "Turn what changed into what to do, in two minutes a day.",
                body: "Read the fields people work in, keep the few things that matter, and give each person a plan for the thing they want to build next.",
              },
              {
                label: "What we measure",
                title: "Plans started, and things finished.",
                body: "Time spent in the app goes up when we waste your time, so we don't count it as success. We look at how many people start a plan and how many say they finished what they set out to build.",
              },
            ].map((x, i) => (
              <Reveal key={x.label} delay={i * 70}>
                <article className="border-t border-border pt-6">
                  <p className="text-sm font-semibold text-accent-text">{x.label}</p>
                  <h2 className="mt-3 font-display text-2xl leading-snug tracking-tight">
                    {x.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{x.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Contact ---------------- */}
      <section id="contact" className="scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHead
              eyebrow="Contact"
              title="Write to us."
              lead="CuspAI is made in Bengaluru. Every message to this address reaches a person."
            />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            <Reveal>
              <a href="mailto:hello@cuspai.io" className="card card-hover group block h-full p-6">
                <Mail
                  size={22}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  className="text-accent-text"
                />
                <h3 className="mt-4 font-display text-xl tracking-tight">Email</h3>
                <p className="mt-1 text-muted-foreground">
                  Questions, press, or a problem with the site.
                </p>
                <p className="mt-4 inline-flex items-center gap-2 font-semibold">
                  hello@cuspai.io
                  <ArrowRight size={18} aria-hidden="true" className="arrow text-accent-text" />
                </p>
              </a>
            </Reveal>
            <Reveal delay={60}>
              <Link to="/privacy" className="card card-hover group block h-full p-6">
                <MessageSquareText
                  size={22}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  className="text-accent-text"
                />
                <h3 className="mt-4 font-display text-xl tracking-tight">Your data</h3>
                <p className="mt-1 text-muted-foreground">
                  Ask to see, correct or delete what we hold about you.
                </p>
                <p className="mt-4 inline-flex items-center gap-2 font-semibold">
                  Read the Privacy Policy
                  <ArrowRight size={18} aria-hidden="true" className="arrow text-accent-text" />
                </p>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
