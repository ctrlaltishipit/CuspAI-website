import type { ReactNode } from "react";
import { ThemedShot } from "@/components/themed-shot";

/**
 * Neutral device frame holding a screenshot of the product.
 *
 * Pass `src`/`srcDark` for a real capture (the images in `public/screens` are
 * cut to this frame's 9/19 ratio), or `children` for bespoke content. With
 * neither, <PlaceholderVerdict /> holds the layout space.
 */
export function PhoneFrame({
  children,
  src,
  srcDark,
  alt,
  caption,
  className = "",
}: {
  children?: ReactNode;
  src?: string;
  srcDark?: string;
  alt?: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="mx-auto w-full max-w-[300px] rounded-[2rem] border border-border bg-card p-2 shadow-[0_1px_2px_color-mix(in_oklab,var(--color-foreground)_6%,transparent)]">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[1.6rem] border border-border bg-muted">
          {children ??
            (src ? (
              <ThemedShot src={src} srcDark={srcDark} alt={alt ?? ""} />
            ) : (
              <PlaceholderVerdict />
            ))}
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-4 text-center font-mono text-[11px] tracking-[0.08em] text-muted-foreground md:text-xs">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function PlaceholderVerdict() {
  return (
    <div className="flex h-full flex-col gap-2 p-4" aria-label="Screenshot placeholder — replace with a real verdict screen">
      <div className="h-2 w-16 rounded-sm bg-border" />
      <div className="mt-2 rounded-md border border-border bg-card p-3">
        <div className="h-1.5 w-10 rounded-sm bg-border" />
        <div className="mt-2 h-2.5 w-3/4 rounded-sm bg-border" />
        <div className="mt-1.5 h-1.5 w-1/2 rounded-sm bg-border" />
      </div>
      <div className="rounded-md border border-border bg-card p-3">
        <div className="h-1.5 w-14 rounded-sm bg-border" />
        <div className="mt-2 h-2.5 w-2/3 rounded-sm bg-border" />
        <div className="mt-1.5 h-1.5 w-1/3 rounded-sm bg-border" />
      </div>
      <div className="rounded-md border border-border bg-card p-3">
        <div className="h-1.5 w-12 rounded-sm bg-border" />
        <div className="mt-2 h-2.5 w-1/2 rounded-sm bg-border" />
        <div className="mt-1.5 h-1.5 w-2/3 rounded-sm bg-border" />
      </div>
      <p className="mt-auto text-center font-mono text-[10px] tracking-[0.08em] text-muted-foreground">
        Screenshot goes here
      </p>
    </div>
  );
}
