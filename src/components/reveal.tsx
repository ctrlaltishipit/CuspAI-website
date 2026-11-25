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
      <div ref={ref} className="h-full w-full origin-left scale-x-0 bg-accent" />
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
