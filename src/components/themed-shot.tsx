type ThemedShotProps = {
  /** Screenshot captured with the product in light mode. */
  src: string;
  /** The same screen captured in dark mode. Falls back to `src`. */
  srcDark?: string | undefined;
  alt: string;
  className?: string;
};

/**
 * A product screenshot that follows the site's theme.
 *
 * Screenshots are raster, so one image would always fight the mode it wasn't
 * captured in. We ship both captures and let the `dark` class on <html> pick;
 * only the visible one is announced, the other is decorative.
 *
 * Sources live in `public/screens` — regenerate with
 * `scripts/capture-screenshots.mjs`, which drives the product app directly.
 */
export function ThemedShot({ src, srcDark, alt, className = "" }: ThemedShotProps) {
  const base = `h-full w-full object-cover object-top ${className}`;
  return (
    <>
      <img src={src} alt={alt} loading="lazy" decoding="async" className={`${base} dark:hidden`} />
      <img
        src={srcDark ?? src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className={`hidden ${base} dark:block`}
      />
    </>
  );
}
