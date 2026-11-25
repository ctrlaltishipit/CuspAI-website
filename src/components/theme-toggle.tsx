import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function apply(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem("cusp-theme", theme);
  } catch {
    /* storage unavailable: the class still applies for this visit */
  }
}

/**
 * The site opens dark, which is the brand's home look. A visitor who picks
 * light keeps it: the choice is stored, and a small script in the document
 * head applies it before the first paint.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    apply(next);
  }

  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-150 hover:border-border-strong hover:text-foreground ${className}`}
    >
      <Icon key={theme} size={18} strokeWidth={1.75} aria-hidden="true" className="fade-up" />
    </button>
  );
}
