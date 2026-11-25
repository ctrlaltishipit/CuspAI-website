import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { to: "/how-it-works", label: "How it works" },
      { to: "/use-cases", label: "Use cases" },
      { to: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms of Service" },
    ],
  },
] as const;

const linkClass =
  "inline-flex min-h-[2.75rem] items-center text-[0.9375rem] text-muted-foreground transition-colors duration-150 hover:text-foreground md:min-h-0";

/** The footer, on the page's own ground with a hairline above it. */
export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" aria-label="CuspAI home" className="inline-flex rounded-lg">
              <Logo className="h-9" />
            </Link>
            <p className="mt-5 max-w-xs leading-relaxed text-muted-foreground">
              Know what's moving in your field. Turn what you want to build into a plan.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title} className="md:col-span-2">
              <h2 className="font-sans text-sm font-semibold tracking-normal text-foreground">
                {col.title}
              </h2>
              <ul className="mt-3 md:mt-4 md:space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="md:col-span-3">
            <h2 className="font-sans text-sm font-semibold tracking-normal text-foreground">
              Contact
            </h2>
            <ul className="mt-3 md:mt-4 md:space-y-3">
              <li>
                <a href="mailto:hello@cuspai.io" className={linkClass}>
                  hello@cuspai.io
                </a>
              </li>
              <li>
                <a href="#waitlist" className={linkClass}>
                  Join the waitlist
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 CuspAI. Made in Bengaluru.</p>
          <p>Coming to iPhone and Android.</p>
        </div>
      </div>
    </footer>
  );
}
