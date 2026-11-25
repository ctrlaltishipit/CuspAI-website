import { useRouterState } from "@tanstack/react-router";
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
 * The signup band that closes every page: the deep blue band, centred. The
 * "Join the waitlist" button in the nav scrolls here.
 */
export function WaitlistBand() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const source = SOURCE[pathname] ?? "footer";

  return (
    <section
      id="waitlist"
      className="dark band-deep hairline-t relative overflow-hidden py-20 md:py-32"
    >
      <div
        className="paper-grid pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />
      <div className="accent-wash pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-2xl px-5 text-center md:px-8">
        <Reveal>
          <LogoMark className="mx-auto h-12 w-12" />
          <h2 className="t-h1 mt-6">Be there the day it opens.</h2>
          <p className="t-lead mx-auto mt-5 max-w-lg text-muted-foreground">
            Leave your name and email. We will write to you once, when CuspAI is ready to download.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="glass-card mx-auto mt-10 max-w-xl rounded-2xl p-5 text-left md:p-6">
            <WaitlistForm id={`email-${source}`} source={source} />
          </div>
          <p className="mt-6 text-sm text-subtle">
            One email from us, and that is all. You can ask us to delete your details at any time.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
