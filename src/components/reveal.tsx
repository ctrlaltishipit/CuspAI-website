import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** True once the element has come into view. Fires once, then stops watching. */
export function useInView<T extends Element>(rootMargin = "0px 0px -12% 0px", threshold = 0.05) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, threshold]);

  return [ref, inView] as const;
}

type Variant = "up" | "left" | "right" | "scale";

/**
 * Scroll-triggered entrance: a short fade and rise, once. Shown at rest when
 * the visitor prefers reduced motion (the CSS handles that), and `delay`
 * staggers a group of siblings.
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
  as?: "div" | "li" | "section" | "figure" | "p" | "span" | "article";
  className?: string;
  variant?: Variant;
}) {
  const [ref, shown] = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref as never}
      data-shown={shown ? "true" : "false"}
      data-variant={variant}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Thin line along the top that tracks how far the page has been read. */
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
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]">
      <div ref={ref} className="progress-bar h-full w-full origin-left scale-x-0" />
    </div>
  );
}

/**
 * Light parallax: the child drifts a little as it crosses the window. Off on
 * small screens and under reduced motion.
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
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 below the fold, 1 above it.
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

/**
 * Keeps a screenshot in focus while it is the thing being read: it fades up
 * and grows toward full size near the middle of the window, and eases back as
 * it leaves. Under reduced motion the child simply sits at rest.
 */
export function ScrollFocus({
  children,
  className = "",
  minOpacity = 0.5,
  minScale = 0.92,
  falloff = 0.72,
}: {
  children: ReactNode;
  className?: string;
  minOpacity?: number;
  minScale?: number;
  /** How far from centre, in window heights, the effect reaches zero. */
  falloff?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const offset = Math.abs(rect.top + rect.height / 2 - vh / 2) / vh;
      const t = Math.min(1, Math.max(0, 1 - offset / falloff));
      // Eased, so it spends longer at full focus than at the edges.
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

/**
 * A number that counts up to its value the first time it is seen. The final
 * value is in the markup from the start, so it reads correctly without
 * JavaScript and for anyone who prefers reduced motion.
 */
export function CountUp({
  to,
  suffix = "",
  duration = 1000,
  className = "",
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>("0px 0px -10% 0px", 0.4);
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView || prefersReducedMotion()) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // Ease out: fast at first, settling into the final figure.
      const eased = 1 - (1 - t) ** 3;
      setValue(Math.round(to * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    setValue(0);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {value}
      {suffix}
    </span>
  );
}

/**
 * A card with a soft light that follows the pointer. The light is drawn by
 * the `.spotlight` rule in styles.css; this only tells it where the pointer is.
 */
export function Spotlight({
  children,
  className = "",
  as: Tag = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
  style?: CSSProperties | undefined;
}) {
  function onMove(e: PointerEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  return (
    <Tag onPointerMove={onMove} className={`spotlight ${className}`} style={style}>
      {children}
    </Tag>
  );
}
