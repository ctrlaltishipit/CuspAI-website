import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <Link to="/" aria-label="CuspAI — home" className="inline-flex items-center">
          <Logo className="h-8" />
        </Link>

        <nav
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8"
          aria-label="Footer"
        >
          <Link
            to="/use-cases"
            className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            Use cases
          </Link>
          <Link
            to="/privacy"
            className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            Terms
          </Link>
          <Link
            to="/how-it-works"
            className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            How it works
          </Link>
          <Link
            to="/about"
            className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            About
          </Link>
        </nav>

        <a
          href="mailto:hello@cusp.app"
          className="mt-8 inline-block text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
        >
          hello@cusp.app
        </a>

        <p className="mt-6 font-mono text-[11px] tracking-[0.08em] text-muted-foreground md:text-xs">
          Made in Bengaluru. Prices in INR including GST.
        </p>
      </div>
    </footer>
  );
}
