import { Pause, Play } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Phone, Shot, type ShotName } from "@/components/phone";
import type { Beat, Chapter, Point, Rect, Zoom } from "@/lib/tour-data";

/* Timings, in ms. The cursor arrives just before the camera settles. */
const CAMERA_MS = 900;
const CURSOR_MS = 820;
const PRESS_AT = CURSOR_MS + 140;
const PRESS_MS = 460;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * The camera, as a transform on the screen layer. It centres on the zoom
 * point, then clamps so the screen's edges never come into view.
 */
function cameraFor(zoom?: Zoom) {
  if (!zoom) return { s: 1, tx: 0, ty: 0 };
  const s = zoom.scale;
  return {
    s,
    tx: clamp(0.5 - zoom.x * s, 1 - s, 0),
    ty: clamp(0.5 - zoom.y * s, 1 - s, 0),
  };
}

/** Where a point on the app screen sits once the camera has moved. */
const project = (p: Point, cam: { s: number; tx: number; ty: number }): Point => ({
  x: p.x * cam.s + cam.tx,
  y: p.y * cam.s + cam.ty,
});

const beatLength = (b: Beat) =>
  b.tap
    ? PRESS_AT + PRESS_MS
    : Math.max(b.zoom ? CAMERA_MS : 0, b.cursor ? CURSOR_MS : 0) + (b.hold ?? 1600);

/**
 * A guided demo of the app, played on real screenshots.
 *
 * A cursor travels to a control and presses it, the screen changes the way
 * the app's does, and the camera pushes in on the part being explained. It
 * plays on its own while it is on screen, and the visitor can pause it or
 * jump to any chapter.
 *
 * Nothing here is drawn to look like the app: every frame is a capture of it,
 * and every position comes from the app's own layout (see lib/tour-data.ts).
 *
 * With reduced motion it does not play. Each chapter shows its closing frame,
 * and the chapter buttons still work.
 */
export function AppTour({
  chapters,
  variant = "full",
}: {
  chapters: Chapter[];
  variant?: "full" | "hero";
}) {
  const root = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ c: 0, b: 0 });
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [press, setPress] = useState(0);
  // The first frame is in the server markup. The rest load once the page is up.
  const [ready, setReady] = useState(false);

  const shots = useMemo(() => {
    const seen: ShotName[] = [];
    for (const ch of chapters)
      for (const b of ch.beats) if (!seen.includes(b.shot)) seen.push(b.shot);
    return seen;
  }, [chapters]);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const id = window.setTimeout(() => setReady(true), 400);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(!!e?.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const chapter = chapters[pos.c]!;
  // With reduced motion a chapter rests on its last beat: the finished picture.
  const beat = reduced ? chapter.beats[chapter.beats.length - 1]! : chapter.beats[pos.b]!;
  const active = playing && inView && !reduced;

  useEffect(() => {
    if (!active) return;
    const b = chapters[pos.c]!.beats[pos.b]!;
    const timers: number[] = [];
    if (b.tap) timers.push(window.setTimeout(() => setPress((k) => k + 1), PRESS_AT));
    timers.push(
      window.setTimeout(() => {
        setPos(({ c, b: i }) => {
          const last = i >= chapters[c]!.beats.length - 1;
          return last ? { c: (c + 1) % chapters.length, b: 0 } : { c, b: i + 1 };
        });
      }, beatLength(b)),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [pos, active, chapters]);

  const cam = cameraFor(beat.zoom);
  const cursor = beat.cursor && !reduced ? project(beat.cursor, cam) : null;
  const tapRect: Rect | null = beat.tap
    ? { ...project(beat.tap, cam), w: beat.tap.w * cam.s, h: beat.tap.h * cam.s }
    : null;
  // The cursor rests where it last was, so it glides from there to the next target.
  const lastCursor = useRef<Point>({ x: 0.78, y: 0.86 });
  if (cursor) lastCursor.current = cursor;
  const at = cursor ?? lastCursor.current;

  const go = (c: number) => {
    setPos({ c, b: 0 });
    setPlaying(true);
  };

  const screen = (
    <Phone
      className={
        variant === "hero" ? "max-w-[280px] sm:max-w-[300px]" : "max-w-[290px] md:max-w-[320px]"
      }
    >
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transformOrigin: "0 0",
          transform: `translate(${(cam.tx * 100).toFixed(3)}%, ${(cam.ty * 100).toFixed(3)}%) scale(${cam.s})`,
          transition: reduced ? "none" : `transform ${CAMERA_MS}ms var(--ease-travel)`,
        }}
      >
        {shots.map((name, i) =>
          i === 0 || ready ? (
            <div
              key={name}
              className="absolute inset-0 transition-opacity duration-300"
              style={{ opacity: name === beat.shot ? 1 : 0 }}
              aria-hidden={name !== beat.shot}
            >
              <Shot name={name} alt="" eager={i === 0 && variant === "hero"} />
            </div>
          ) : null,
        )}
      </div>

      {/* The press: an outline on the control, and a ring where the cursor lands. */}
      {tapRect && press > 0 ? (
        <span
          key={`flash-${press}`}
          aria-hidden="true"
          className="tap-flash pointer-events-none absolute rounded-xl border-2 border-accent"
          style={{
            left: `${tapRect.x * 100 - 1.5}%`,
            top: `${tapRect.y * 100 - 0.7}%`,
            width: `${tapRect.w * 100 + 3}%`,
            height: `${tapRect.h * 100 + 1.4}%`,
          }}
        />
      ) : null}
      {cursor && press > 0 ? (
        <span
          key={`ring-${press}`}
          aria-hidden="true"
          className="tap-ring pointer-events-none absolute h-14 w-14 rounded-full border-2 border-accent"
          style={{ left: `${at.x * 100}%`, top: `${at.y * 100}%` }}
        />
      ) : null}

      {/* The cursor. Its tip is the hot spot, so it is drawn from its top-left corner. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute z-10"
        style={{
          left: `${at.x * 100}%`,
          top: `${at.y * 100}%`,
          opacity: cursor ? 1 : 0,
          transition: reduced
            ? "none"
            : `left ${CURSOR_MS}ms var(--ease-travel), top ${CURSOR_MS}ms var(--ease-travel), opacity 260ms var(--ease-ui)`,
        }}
      >
        <svg
          key={`cursor-${press}`}
          width="26"
          height="26"
          viewBox="0 0 26 26"
          className={press > 0 ? "cursor-press" : undefined}
          style={{ filter: "drop-shadow(0 3px 5px rgb(0 0 0 / 0.45))" }}
        >
          <path
            d="M3 2.5v17.2l4.7-4.2 3 7 3.3-1.4-3-6.9h6.4L3 2.5Z"
            fill="#ffffff"
            stroke="#081a21"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Phone>
  );

  const control = (
    <button
      type="button"
      onClick={() => setPlaying((p) => !p)}
      aria-label={playing ? "Pause the demo" : "Play the demo"}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors duration-150 hover:border-border-strong hover:text-foreground"
    >
      {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
    </button>
  );

  const label = `A demo of the CuspAI app. ${chapters.map((c) => c.title).join(". ")}.`;

  if (variant === "hero") {
    return (
      <div ref={root} className="relative">
        <div role="img" aria-label={label}>
          {screen}
        </div>
        {reduced ? null : (
          <div className="mx-auto mt-5 flex max-w-[320px] items-center gap-3">
            {control}
            <p className="min-h-[2.75rem] text-sm leading-snug text-muted-foreground">
              <span className="block font-medium text-foreground">{chapter.title}</span>
              <span className="tnum">
                Step {pos.c + 1} of {chapters.length}
              </span>
            </p>
          </div>
        )}
      </div>
    );
  }

  const chapterLength = chapter.beats.reduce((n, b) => n + beatLength(b), 0);

  return (
    <div ref={root} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      {/* Phone first in the markup, so on a small screen you see it before the list. */}
      <div className="lg:order-2 lg:col-span-6">
        <div role="img" aria-label={label}>
          {screen}
        </div>
        <div className="mx-auto mt-5 flex min-h-[2.75rem] max-w-[340px] items-center justify-center gap-3">
          {reduced ? null : control}
          <p className="text-sm leading-snug text-muted-foreground" aria-hidden={!beat.note}>
            {beat.note ?? chapter.title}
          </p>
        </div>
      </div>

      {/* The list keeps the height of its tallest state, so nothing below it shifts as chapters change. */}
      <ol className="min-h-[29.5rem] lg:order-1 lg:col-span-6 lg:min-h-[24.5rem]">
        {chapters.map((ch, i) => {
          const on = i === pos.c;
          return (
            <li key={ch.id}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={on ? "step" : undefined}
                className={`group relative block w-full rounded-2xl px-4 py-4 text-left transition-colors duration-200 md:px-5 ${
                  on ? "bg-surface-2/70" : "hover:bg-surface-2/40"
                }`}
              >
                <span className="flex items-baseline gap-4">
                  <span
                    className={`tnum font-display text-sm transition-colors duration-200 ${
                      on ? "text-accent-text" : "text-subtle"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block font-display text-lg leading-snug transition-colors duration-200 md:text-xl ${
                        on ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {ch.title}
                    </span>
                    {/* The body opens with a grid-row transition, so nothing jumps. */}
                    <span
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <span className="overflow-hidden">
                        <span className="block pt-2 text-base leading-relaxed text-muted-foreground">
                          {ch.body}
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
                {on && active ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-4 bottom-1.5 h-[2px] overflow-hidden rounded-full bg-border md:inset-x-5"
                  >
                    <span
                      key={`${pos.c}`}
                      className="progress-fill block h-full w-full bg-accent"
                      style={{ ["--dur" as string]: `${chapterLength}ms` }}
                    />
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
