import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

const LINKS = [
  { to: "/how-it-works", label: "How it works" },
  { to: "/use-cases", label: "Use cases" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
] as const;

/**
 * Fixed bar: logo, the four pages, theme, and the one call to action. It is
 * see-through over the first screen and turns solid, with a hairline, once
 * the page has moved. Below 768px the links fold into a full-screen menu.
 */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A new page closes the menu.
  useEffect(() => setOpen(false), [pathname]);

  // While the menu is open the page behind it stays put, and Escape closes it.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || open ? "border-border bg-background" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-[4.5rem] md:px-8">
        <Link to="/" aria-label="CuspAI home" className="flex shrink-0 items-center rounded-lg">
          <Logo className="h-7 md:h-8" animated />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="nav-link text-[0.9375rem] font-medium">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="#waitlist" className="btn btn-primary btn-sm hidden sm:inline-flex">
            Join the waitlist
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground md:hidden"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-background md:hidden"
        >
          <nav className="flex min-h-full flex-col px-5 pb-10 pt-4" aria-label="Menu">
            <ul>
              {[{ to: "/", label: "Home" }, ...LINKS].map((l, i) => (
                <li
                  key={l.to}
                  className="fade-up border-b border-border"
                  style={{ ["--d" as string]: `${i * 45}ms` }}
                >
                  <Link
                    to={l.to}
                    className="group flex min-h-[4rem] items-center justify-between font-display text-2xl tracking-tight text-foreground"
                    activeProps={{ className: "text-accent-text" }}
                    activeOptions={{ exact: true }}
                  >
                    {l.label}
                    <ArrowRight size={20} aria-hidden="true" className="arrow text-subtle" />
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href="#waitlist"
              onClick={() => setOpen(false)}
              className="btn btn-primary fade-up mt-8 w-full"
              style={{ ["--d" as string]: "260ms" }}
            >
              Join the waitlist
            </a>
            <p className="mt-auto pt-10 text-sm text-subtle">
              Questions?{" "}
              <a href="mailto:hello@cuspai.io" className="link">
                hello@cuspai.io
              </a>
            </p>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
