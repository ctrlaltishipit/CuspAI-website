import { ThemedShot } from "@/components/themed-shot";

type ScreenshotSlotProps = {
  label: string;
  caption?: string;
  /**
   * CuspAI is a mobile app, so product screenshots are always "phone" (9/16).
   * "wide" (16/10) stays available for non-product imagery.
   */
  ratio?: "phone" | "wide";
  /** Screenshot captured in light mode, cut to the chosen ratio. */
  src?: string;
  /** The same screen in dark mode. Falls back to `src`. */
  srcDark?: string;
  alt?: string;
};

/**
 * A reserved, correctly-proportioned frame for a product screenshot.
 * With `src` it shows the real capture; without one it falls back to a
 * labelled placeholder that holds the exact same layout space.
 */
export function ScreenshotSlot({
  label,
  caption,
  ratio = "phone",
  src,
  srcDark,
  alt,
}: ScreenshotSlotProps) {
  return (
    <figure className="w-full">
      <div
        className={`card-lift relative overflow-hidden rounded-xl border border-border bg-card ${
          ratio === "phone" ? "aspect-[9/16] max-w-[280px]" : "aspect-[16/10]"
        }`}
      >
        {src ? (
          <ThemedShot src={src} srcDark={srcDark} alt={alt ?? label} />
        ) : (
          <div className="accent-wash absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-accent/50 text-accent"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
                <path d="M1.5 10.5 5 7l3 2.5L11 6l3.5 3.5" />
              </svg>
            </span>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground md:text-[11px]">
              {label}
            </span>
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-3 font-mono text-[11px] leading-relaxed tracking-[0.06em] text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
