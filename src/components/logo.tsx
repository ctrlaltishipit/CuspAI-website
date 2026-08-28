/**
 * The CuspAI lockup: three signal arcs converging on a dot, beside the wordmark.
 *
 * Two files rather than one recoloured by CSS — the mark is a gradient, and a
 * gradient can't be re-tinted with `currentColor`. Same swap as <ThemedShot>:
 * the `dark` class on <html> picks, and only the visible one is announced.
 *
 * Height drives the size; width follows the 3.03:1 lockup ratio.
 */
export function Logo({ className = "h-8" }: { className?: string }) {
  return (
    <>
      <img
        src="/brand/cuspai-logo-light.svg"
        alt="CuspAI"
        width={496}
        height={164}
        className={`${className} w-auto dark:hidden`}
      />
      <img
        src="/brand/cuspai-logo-dark.svg"
        alt=""
        aria-hidden="true"
        width={496}
        height={164}
        className={`hidden ${className} w-auto dark:block`}
      />
    </>
  );
}
