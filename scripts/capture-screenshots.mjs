/**
 * Regenerates `public/screens/*` from the CuspAI app, light and dark.
 *
 * Every capture is the real app. The script exports the app for the web,
 * signs in as the demo guest, and clicks through it the way a person would.
 * Along the way it records where the controls sit, as fractions of the screen,
 * so the guided demo on the site can aim its cursor and its zoom at them.
 *
 * Usage:
 *   1. npm i -D puppeteer-core                     (not a runtime dependency)
 *   2. In the app repo, with Node 22:
 *        npx expo export --platform web --output-dir /tmp/cuspai-web
 *   3. node scripts/capture-screenshots.mjs /tmp/cuspai-web ./public/screens-png
 *   4. for f in public/screens-png/*.png; do \
 *        cwebp -q 86 -m 6 -sharp_yuv "$f" -o "public/screens/$(basename "${f%.png}").webp"; done
 *   5. Copy any changed numbers from public/screens-png/manifest.json into
 *      `AT` in src/lib/tour-data.ts, then delete public/screens-png.
 *
 * Captures are 390 by 844 points at 3x, the shape <Phone> reserves, so they
 * drop in without cropping. 3x matters: the plan map is zoomed on the site,
 * and its labels are 9 points tall.
 */
import puppeteer from "puppeteer-core";
import { createServer } from "node:http";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const ROOT = process.argv[2];
const OUT = process.argv[3];
if (!ROOT || !OUT) {
  console.error("usage: node scripts/capture-screenshots.mjs <expo web export dir> <output dir>");
  process.exit(1);
}

const PORT = 8099;
const BASE = `http://127.0.0.1:${PORT}`;
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PHONE = { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ── A static server for the export: /route serves route.html ─────────────── */
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".ttf": "font/ttf",
};
const isFile = async (p) => {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
};
const server = createServer(async (req, res) => {
  const rel = normalize(decodeURIComponent(new URL(req.url, BASE).pathname)).replace(
    /^(\.\.[/\\])+/,
    "",
  );
  let file = join(ROOT, rel);
  if (!(await isFile(file))) {
    const html = join(ROOT, rel.replace(/\/$/, "") + ".html");
    file = (await isFile(html)) ? html : join(ROOT, "index.html");
  }
  res.writeHead(200, {
    "content-type": TYPES[extname(file)] ?? "application/octet-stream",
    "cache-control": "no-store",
  });
  res.end(await readFile(file));
});
await new Promise((r) => server.listen(PORT, "127.0.0.1", r));

/* ── Finding and pressing controls ────────────────────────────────────────── */
const ROLES = '[role="button"],[role="checkbox"],[role="tab"],[role="link"],a[href]';

/** The smallest on-screen control whose text or label matches. */
async function find(page, text, { exact = false, nth = 0 } = {}) {
  const handle = await page.evaluateHandle(
    (sel, t, ex, n) => {
      const onScreen = (e) => {
        const r = e.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight;
      };
      const matches = (e) => {
        const own = (e.textContent || "").trim();
        const label = (e.getAttribute("aria-label") || "").trim();
        return ex ? own === t || label === t : own.includes(t) || label.includes(t);
      };
      const byRole = [...document.querySelectorAll(sel)]
        .filter(matches)
        .filter(onScreen)
        .sort((a, b) => (a.textContent || "").length - (b.textContent || "").length);
      if (byRole[n]) return byRole[n];
      // A Pressable with no role is a plain focusable div: find the text, climb to what is clickable.
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const hits = [];
      while (walker.nextNode()) {
        const value = walker.currentNode.nodeValue.trim();
        if (!(ex ? value === t : value.includes(t))) continue;
        let e = walker.currentNode.parentElement;
        while (
          e &&
          e !== document.body &&
          !(e.hasAttribute("tabindex") || getComputedStyle(e).cursor === "pointer")
        ) {
          e = e.parentElement;
        }
        if (e && e !== document.body && onScreen(e)) hits.push(e);
      }
      return hits[n] ?? null;
    },
    ROLES,
    text,
    exact,
    nth,
  );
  return handle.asElement();
}

async function tap(page, text, opts) {
  const el = await find(page, text, opts);
  if (!el) throw new Error(`No control "${text}" on ${page.url()}`);
  await el.click();
}

const fraction = (b) => {
  const r = (v) => Number(v.toFixed(4));
  return {
    x: r(b.x / PHONE.width),
    y: r(b.y / PHONE.height),
    w: r(b.width / PHONE.width),
    h: r(b.height / PHONE.height),
  };
};

/** Where a control sits, as fractions of the screen. */
async function rectOf(page, text, opts) {
  const el = await find(page, text, opts);
  return el ? fraction(await el.boundingBox()) : null;
}

/** Where a piece of text sits, whatever it is inside. */
async function rectOfText(page, text) {
  const box = await page.evaluate((t) => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      if (!walker.currentNode.nodeValue.includes(t)) continue;
      const r = walker.currentNode.parentElement.getBoundingClientRect();
      if (r.width > 0 && r.bottom > 0 && r.top < innerHeight) {
        return { x: r.x, y: r.y, width: r.width, height: r.height };
      }
    }
    return null;
  }, text);
  return box ? fraction(box) : null;
}

const union = (rects) => {
  const x1 = Math.min(...rects.map((r) => r.x));
  const y1 = Math.min(...rects.map((r) => r.y));
  const x2 = Math.max(...rects.map((r) => r.x + r.w));
  const y2 = Math.max(...rects.map((r) => r.y + r.h));
  const f = (v) => Number(v.toFixed(4));
  return { x: f(x1), y: f(y1), w: f(x2 - x1), h: f(y2 - y1) };
};

/* ── The walk ─────────────────────────────────────────────────────────────── */
const manifest = {};

async function run(theme) {
  console.log(`\n${theme}`);
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    defaultViewport: PHONE,
    args: ["--hide-scrollbars", "--font-render-hinting=none"],
  });
  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: theme }]);
  // The app's own server refuses cross-origin calls from localhost. Failing
  // them at once lets each screen settle on its built-in content.
  await page.setRequestInterception(true);
  page.on("request", (r) => (/vercel\.app\/api\//.test(r.url()) ? r.abort() : r.continue()));

  const marks = (manifest[theme] = {});
  const shot = async (name, wait = 600) => {
    await page.evaluate(() => document.fonts.ready);
    await sleep(wait);
    await page.screenshot({ path: `${OUT}/${name}-${theme}.png` });
    console.log("  ✓", name);
  };
  const mark = (screen, key, rect) => {
    (marks[screen] ??= {})[key] = rect;
    if (!rect) console.log(`  ! no position for ${screen}.${key}`);
  };

  await page.goto(BASE + "/", { waitUntil: "networkidle2" });
  await sleep(4200); // the landing animation
  // Pin the theme with the app's own toggle. Two presses land back on the
  // starting theme, but stored, so a later full page load keeps it.
  for (let i = 0; i < 2; i++) {
    await tap(page, "reading mode");
    await sleep(500);
  }
  await shot("landing", 900);

  await tap(page, "Get started");
  await sleep(1200);
  await shot("signin");
  await tap(page, "Continue as guest"); // the first-name field is prefilled with the demo persona
  await sleep(1500);
  await shot("interests");
  await tap(page, "Next");
  await sleep(1900);

  // Build
  await shot("build");
  mark("build", "goal", await rectOf(page, "Build a website for my business"));
  await tap(page, "Build a website for my business");
  await sleep(800);
  await shot("build-filled");
  mark("build-filled", "buildPlan", await rectOf(page, "Build plan"));
  await tap(page, "Build plan");
  await sleep(2800);

  // Plan
  await shot("plan");
  const tools = await page.evaluate(
    (w, h) =>
      [...document.querySelectorAll('[role="checkbox"]')].map((e) => {
        const r = e.getBoundingClientRect();
        return { x: r.x / w, y: r.y / h, w: r.width / w, h: r.height / h };
      }),
    PHONE.width,
    PHONE.height,
  );
  mark("plan", "map", union(tools));
  mark("plan", "bestMix", await rectOf(page, "Best mix"));
  await tap(page, "Best mix");
  await sleep(1000);
  await shot("plan-mix");
  mark("plan-mix", "coverage", await rectOfText(page, "phases covered"));

  const found = await page.evaluate(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      if (/^your stack$/i.test(walker.currentNode.nodeValue.trim())) {
        walker.currentNode.parentElement.scrollIntoView({ block: "start" });
        return true;
      }
    }
    return false;
  });
  if (found) {
    await page.mouse.move(195, 400);
    await page.mouse.wheel({ deltaY: -90 });
    await sleep(700);
    await shot("plan-stack");
  }

  // Read and the reader
  await tap(page, "Read", { exact: true });
  await sleep(1700);
  await shot("read");
  mark("read", "readIt", await rectOfText(page, "Read it"));
  mark("read", "reason", await rectOfText(page, "Because you follow"));
  await tap(page, "Read it");
  await sleep(1600);
  await shot("reader");
  await page.goBack();
  await sleep(1200);

  // Discover, Skills, Saved
  await tap(page, "Discover", { exact: true });
  await sleep(1700);
  await shot("discover");
  await tap(page, "Skills", { exact: true });
  await sleep(1700);
  await shot("skills");
  mark("skills", "skill", await rectOfText(page, "Writing evals before features"));
  await tap(page, "Saved", { exact: true });
  await sleep(1500);
  await shot("saved");

  // Plans
  await page.goto(BASE + "/upgrade", { waitUntil: "networkidle2" });
  await sleep(1800);
  await shot("plans");

  await browser.close();
}

await mkdir(OUT, { recursive: true });
for (const theme of ["dark", "light"]) await run(theme);
await writeFile(`${OUT}/manifest.json`, JSON.stringify(manifest, null, 2));
server.close();
console.log(`\nDone. Control positions are in ${OUT}/manifest.json`);
