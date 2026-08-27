import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function apply(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem("cusp-theme", theme);
  } catch {
    /* storage unavailable — the class still applies for this session */
  }
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    apply(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-200 hover:border-foreground/30 hover:text-foreground ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="transition-transform duration-500"
        style={{ transform: theme === "dark" ? "rotate(-90deg)" : "rotate(0deg)" }}
      >
        {theme === "dark" ? (
          <circle cx="12" cy="12" r="4.2">
            <animate attributeName="r" from="3" to="4.2" dur="0.3s" fill="freeze" />
          </circle>
        ) : (
          <path d="M20 14.2A8 8 0 0 1 9.8 4a8.2 8.2 0 1 0 10.2 10.2Z" />
        )}
        {theme === "dark" && (
          <g>
            <path d="M12 3.2v1.6M12 19.2v1.6M3.2 12h1.6M19.2 12h1.6M5.8 5.8l1.1 1.1M17.1 17.1l1.1 1.1M18.2 5.8l-1.1 1.1M6.9 17.1l-1.1 1.1" />
          </g>
        )}
      </svg>
    </button>
  );
}
