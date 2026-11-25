import type { ReactNode } from "react";

/** Every capture in `public/screens` is this shape: 390 by 844 points. */
export const SCREEN_RATIO = "390 / 844";

export type ShotName =
  | "landing"
  | "signin"
  | "interests"
  | "build"
  | "build-filled"
  | "plan"
  | "plan-mix"
  | "plan-stack"
  | "read"
  | "reader"
  | "discover"
  | "skills"
  | "saved"
  | "plans";

/**
 * One app screen, in the visitor's theme.
 *
 * Both captures are in the markup and the `dark` class picks. The hidden one
 * is `display: none`, so a lazy image never downloads the theme nobody is
 * looking at. Captures are taken from the real app by driving its own UI.
 */
export function Shot({
  name,
  alt,
  eager = false,
  className = "",
}: {
  name: ShotName;
  alt: string;
  eager?: boolean;
  className?: string;
}) {
  const common = {
    width: 1170,
    height: 2532,
    decoding: "async" as const,
    loading: eager ? ("eager" as const) : ("lazy" as const),
    draggable: false,
  };
  return (
    <>
      <img
        {...common}
        src={`/screens/${name}-dark.webp`}
        alt={alt}
        fetchPriority={eager ? "high" : "auto"}
        className={`hidden h-full w-full object-cover object-top dark:block ${className}`}
      />
      <img
        {...common}
        src={`/screens/${name}-light.webp`}
        alt={alt}
        className={`block h-full w-full object-cover object-top dark:hidden ${className}`}
      />
    </>
  );
}

/**
 * A phone. A thin, near-black bezel so the screen reads as a device on
 * either ground, and nothing else: no notch, no buttons, no reflection.
 *
 * Pass `shot` for a still screen, or `children` to draw the screen yourself
 * (the guided demo does).
 */
export function Phone({
  shot,
  alt = "",
  eager = false,
  children,
  className = "",
  glow = true,
}: {
  shot?: ShotName;
  alt?: string;
  eager?: boolean;
  children?: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div className={`relative mx-auto w-full max-w-[300px] ${className}`}>
      {glow ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-10 -inset-y-6 rounded-[4rem] opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 45%, var(--glow-a), transparent 70%), radial-gradient(50% 40% at 60% 70%, var(--glow-b), transparent 70%)",
          }}
        />
      ) : null}
      <div
        className="relative rounded-[2.5rem] p-[7px]"
        style={{
          backgroundColor: "var(--bezel)",
          boxShadow:
            "0 0 0 1px var(--border-strong), 0 30px 60px -30px rgb(var(--shadow) / 0.55), inset 0 0 0 1px rgb(255 255 255 / 0.06)",
        }}
      >
        <div
          className="relative overflow-hidden rounded-[2.05rem] bg-background"
          style={{ aspectRatio: SCREEN_RATIO }}
        >
          {children ?? (shot ? <Shot name={shot} alt={alt} eager={eager} /> : null)}
        </div>
      </div>
    </div>
  );
}
