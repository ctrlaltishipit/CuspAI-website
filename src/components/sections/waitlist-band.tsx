import { useRouterState } from "@tanstack/react-router";
import { Backdrop } from "@/components/backdrop";
import { LogoMark } from "@/components/logo";
import { Reveal } from "@/components/reveal";
import { WaitlistForm } from "@/components/waitlist-form";

/** Which form a signup came from, so the admin page can tell pages apart. */
const SOURCE: Record<string, string> = {
  "/": "final-cta",
  "/about": "about",
  "/how-it-works": "how-it-works",
  "/use-cases": "use-cases",
  "/pricing": "pricing",
  "/privacy": "privacy",
  "/terms": "terms",
};

/**
 * The signup band that closes every page. Always dark, in either theme. The
 * "Join the waitlist" button in the nav scrolls here.
 */
export function WaitlistBand() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const source = SOURCE[pathname] ?? "footer";

  return (
    <section
      id="waitlist"
      className="dark relative overflow-hidden border-t border-border bg-background py-20 text-foreground md:py-28"
    >
      <Backdrop quiet />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <LogoMark className="h-12 w-12" />
          <h2 className="t-h2 mt-6">Be there the day it opens.</h2>
          <p className="t-lead mt-5 text-muted-foreground">
            Leave your name and email. We will write to you once, when CuspAI is ready to download.
          </p>
        </Reveal>
        <Reveal delay={90} className="lg:col-span-7">
          <div className="card p-6 md:p-8">
            <WaitlistForm id={`email-${source}`} source={source} />
            <p className="mt-5 text-sm text-subtle">
              One email from us, and that is all. You can ask us to delete your details at any time.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
