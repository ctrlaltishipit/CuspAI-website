import { useEffect, useRef, useState, type ReactNode } from "react";

type Variant = "up" | "left" | "right" | "mask" | "scale" | "blur";

/**
 * Scroll-triggered entrance. Renders visible immediately when the user
 * prefers reduced motion, or when IntersectionObserver is unavailable.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  variant = "up",
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "li" | "section" | "figure" | "p" | "span";
  className?: string;
  variant?: Variant;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-shown={shown ? "true" : "false"}
      data-variant={variant}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${className}`}
    >
      {variant === "mask" ? (
        <span className="mask-inner" style={{ transitionDelay: `${delay}ms` }}>
          {children}
        </span>
      ) : (
        children
      )}
    </Tag>
  );
}

/**
 * Light-weight parallax: translates its child as the element crosses the
 * viewport. Disabled entirely under reduced-motion and on small screens.
 */
export function Parallax({
  children,
  speed = 40,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 (below fold) → 1 (above fold)
      const p = (rect.top + rect.height / 2 - vh / 2) / vh;
      el.style.transform = `translate3d(0, ${(-p * speed).toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

/** Thin accent progress line that tracks how far the page has been read. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent"
    >
      <div ref={ref} className="progress-bar h-full w-full origin-left scale-x-0" />
    </div>
  );
}

/**
 * Continuous scroll-linked emphasis for a screenshot.
 *
 * Unlike <Reveal>, which fires once, this keeps tracking: the child fades up
 * and scales toward full size as it approaches the middle of the viewport, and
 * eases back down as it leaves. That gives the screenshots a sense of focus
 * while they are the thing being read, without a frame drawn around them.
 *
 * Disabled under reduced motion, where the child simply renders at rest.
 */
export function ScrollFocus({
  children,
  className = "",
  minOpacity = 0.45,
  minScale = 0.9,
  /** How far from centre, in viewport heights, the effect reaches zero. */
  falloff = 0.72,
}: {
  children: ReactNode;
  className?: string;
  minOpacity?: number;
  minScale?: number;
  falloff?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when the element's centre sits on the viewport centre, 1 at falloff.
      const offset = Math.abs(rect.top + rect.height / 2 - vh / 2) / vh;
      const t = Math.min(1, Math.max(0, 1 - offset / falloff));
      // Ease so the element spends longer at full focus than at the edges.
      const eased = t * t * (3 - 2 * t);
      el.style.opacity = String(minOpacity + (1 - minOpacity) * eased);
      el.style.transform = `scale(${(minScale + (1 - minScale) * eased).toFixed(4)})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [minOpacity, minScale, falloff]);

  return (
    <div ref={ref} className={`scroll-focus ${className}`}>
      {children}
    </div>
  );
}
