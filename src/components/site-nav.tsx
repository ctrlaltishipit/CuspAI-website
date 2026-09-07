import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-sm"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link to="/" aria-label="CuspAI — home" className="flex items-center">
          <Logo className="h-7 md:h-8" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          <Link
            to="/about"
            className="link-underline text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            About Us
          </Link>
          <Link
            to="/how-it-works"
            className="link-underline text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            How it works
          </Link>
          <Link
            to="/use-cases"
            className="link-underline text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Use cases
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          <a href="#early-access" className="btn-accent rounded-full px-4 py-2 text-sm font-medium">
            Get early access
          </a>
        </div>
      </div>
    </header>
  );
}
