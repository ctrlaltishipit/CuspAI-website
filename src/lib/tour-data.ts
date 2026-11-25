import type { ShotName } from "@/components/phone";

/** A place on the phone screen, as fractions of its width and height. */
export type Point = { x: number; y: number };
export type Rect = Point & { w: number; h: number };

/** Where the camera looks: a point to centre on, and how far to push in. */
export type Zoom = Point & { scale: number };

/**
 * One move in the guided demo. The screen shows `shot`; the camera settles on
 * `zoom` (or pulls back out); the cursor travels to `cursor` and, if `tap` is
 * set, presses whatever sits inside it; then the demo waits `hold` ms.
 */
export type Beat = {
  shot: ShotName;
  zoom?: Zoom;
  cursor?: Point;
  tap?: Rect;
  hold?: number;
  /** A short line under the phone while this beat plays. */
  note?: string;
};

export type Chapter = {
  id: string;
  title: string;
  body: string;
  beats: Beat[];
};

const centre = (r: Rect): Point => ({ x: r.x + r.w / 2, y: r.y + r.h / 2 });

/*
 * Control positions, measured from the app itself.
 *
 * The capture script (scripts/capture-screenshots.mjs) clicks through the real app
 * and writes each control's rectangle to a manifest. These are those numbers,
 * so the cursor lands on the real button and the zoom frames the real map.
 * Light and dark share one layout, so one set covers both.
 */
const AT = {
  goal: { x: 0.1231, y: 0.5168, w: 0.759, h: 0.0231 },
  buildPlan: { x: 0.5897, y: 0.3789, w: 0.359, h: 0.0521 },
  map: { x: 0.2894, y: 0.2451, w: 0.4211, h: 0.2209 },
  bestMix: { x: 0.3573, y: 0.5772, w: 0.2855, h: 0.042 },
  coverage: { x: 0.0513, y: 0.5447, w: 0.5679, h: 0.0206 },
  readIt: { x: 0.0513, y: 0.6235, w: 0.17, h: 0.0231 },
  reason: { x: 0.0846, y: 0.7231, w: 0.8641, h: 0.0462 },
  skill: { x: 0.0513, y: 0.3587, w: 0.7132, h: 0.0313 },
} satisfies Record<string, Rect>;

/** Push in until the plan map fills the screen's width. */
const MAP_ZOOM: Zoom = { ...centre(AT.map), scale: 2.15 };

export const CHAPTERS: Chapter[] = [
  {
    id: "goal",
    title: "Say what you want to build",
    body: "Type it in your own words, or tap one of twelve common goals. You don't need to know the tools yet.",
    beats: [
      { shot: "build", hold: 900 },
      { shot: "build", cursor: centre(AT.goal), tap: AT.goal },
      { shot: "build-filled", cursor: centre(AT.buildPlan), tap: AT.buildPlan },
    ],
  },
  {
    id: "map",
    title: "See the whole plan on one map",
    body: "Each step from start to finish, with a free tool on the left and a paid one on the right. Every tool shows its real price.",
    beats: [
      { shot: "plan", hold: 700 },
      {
        shot: "plan",
        zoom: MAP_ZOOM,
        hold: 2600,
        note: "Free tools on the left, paid on the right",
      },
    ],
  },
  {
    id: "pick",
    title: "Pick your tools in one tap",
    body: "Tap a tool to add it, or let Best mix choose: free where free is enough, paid where it saves real time. The app checks every step has a tool and adds up the monthly cost.",
    beats: [
      { shot: "plan", cursor: centre(AT.bestMix), tap: AT.bestMix },
      { shot: "plan-mix", zoom: MAP_ZOOM, hold: 2200, note: "The tools you picked light up" },
      {
        shot: "plan-mix",
        zoom: { x: 0.36, y: AT.coverage.y + 0.03, scale: 1.55 },
        hold: 2400,
        note: "Every step covered, and what it costs a month",
      },
    ],
  },
  {
    id: "read",
    title: "Read what changed in two minutes",
    body: "A short list built from the interests you picked. Every item says why it reached you, and then the list ends.",
    beats: [
      { shot: "read", hold: 1500 },
      {
        shot: "read",
        zoom: { ...centre(AT.reason), scale: 1.5 },
        hold: 2300,
        note: "Each item tells you why it is here",
      },
      { shot: "read", cursor: centre(AT.readIt), tap: AT.readIt },
      { shot: "reader", hold: 2200, note: "A short version, with a link to the original" },
    ],
  },
  {
    id: "skills",
    title: "Know which skills to work on next",
    body: "Name your role and the one you want. It lists the skills in between, shows what you have already read on each, and gives you the steps.",
    beats: [
      { shot: "skills", hold: 1300 },
      {
        shot: "skills",
        zoom: { x: 0.5, y: 0.47, scale: 1.4 },
        hold: 2800,
        note: "What you read counts as progress",
      },
    ],
  },
];

/** The hero plays the first three chapters: a goal becoming a plan. */
export const HERO_CHAPTERS = CHAPTERS.slice(0, 3);
