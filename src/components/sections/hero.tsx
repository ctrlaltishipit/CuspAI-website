import { Link } from "@tanstack/react-router";
import { AppTour } from "@/components/app-tour";
import { Backdrop } from "@/components/backdrop";
import { Parallax } from "@/components/reveal";
import { CadenceMark } from "@/components/typography";
import { WaitlistForm } from "@/components/waitlist-form";
import { HERO_CHAPTERS } from "@/lib/tour-data";

/**
 * The first screen. Copy on the left, the app on the right, already moving:
 * the phone plays a goal turning into a plan.
 *
 * The page arrives in one motion. The two heading lines rise from their own
 * masks, the rest follows in a short stagger, and the phone settles last.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 lg:min-h-svh lg:pt-36">
      <Backdrop />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
        <div>
          <p className="fade-up chip" style={{ ["--d" as string]: "60ms" }}>
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Coming soon to iPhone and Android
          </p>

          <h1 className="t-hero mt-6">
            <span className="line-mask">
              <span style={{ ["--d" as string]: "120ms" }}>Know what's moving.</span>
            </span>
            <span className="line-mask">
              <span className="grad-text" style={{ ["--d" as string]: "200ms" }}>
                Build what's next.
              </span>
            </span>
          </h1>

          <div className="fade-up mt-7" style={{ ["--d" as string]: "360ms" }}>
            <CadenceMark />
          </div>

          <p
            className="fade-up t-lead measure mt-6 text-muted-foreground"
            style={{ ["--d" as string]: "420ms" }}
          >
            CuspAI reads the newsletters and podcasts in your field and hands you the few things
            worth knowing. When you want to build something, it turns your goal into a plan: the
            tools, the costs and the steps.
          </p>

          <dl
            className="fade-up mt-8 flex items-baseline gap-4 border-y border-border py-4"
            style={{ ["--d" as string]: "480ms" }}
          >
            <dt className="whitespace-nowrap font-display text-3xl tracking-tight text-foreground md:text-4xl">
              2 minutes
            </dt>
            <dd className="text-muted-foreground">
              to read it all. Any time of day. Then it ends.
            </dd>
          </dl>

          <div className="fade-up mt-8 max-w-xl" style={{ ["--d" as string]: "540ms" }}>
            <WaitlistForm id="email-hero" source="hero" />
            <p className="mt-4 text-sm text-subtle">
              One email, on the day it opens. Free to try, and you don't need a tech background.
            </p>
            <Link
              to="/use-cases"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground"
            >
              See four worked examples
              <span aria-hidden="true" className="arrow text-accent-text">
                &rarr;
              </span>
            </Link>
          </div>
        </div>

        <div className="settle" style={{ ["--d" as string]: "380ms" }}>
          <Parallax speed={46}>
            <AppTour chapters={HERO_CHAPTERS} variant="hero" />
          </Parallax>
        </div>
      </div>
    </section>
  );
}
