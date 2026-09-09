type ThemedShotProps = {
  /** Screenshot captured with the product in light mode. */
  src: string;
  /** The same screen captured in dark mode. Preferred, see below. */
  srcDark?: string | undefined;
  alt: string;
  className?: string;
};

/**
 * A product screenshot.
 *
 * The site opens in light mode, and on a near-white page a light screenshot
 * dissolves into the background: the phone stops reading as a device and the
 * whole section goes flat. The dark capture is used in both themes instead,
 * so the screen always reads as a screen. It is the one deliberate exception
 * to the page following the visitor's theme.
 *
 * Both captures still ship, and `src` is the fallback for any screen that has
 * no dark version yet. Sources live in `public/screens`, regenerated with
 * `scripts/capture-screenshots.mjs`, which drives the product app directly.
 */
export function ThemedShot({ src, srcDark, alt, className = "" }: ThemedShotProps) {
  return (
    <img
      src={srcDark ?? src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`h-full w-full object-cover object-top ${className}`}
    />
  );
}
