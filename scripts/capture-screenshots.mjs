/**
 * Regenerates `public/screens/*` from the Cusp product app.
 *
 * Cusp is a mobile app, so every capture is taken at a phone viewport — the
 * site never shows a desktop browser view of it.
 *
 * Everything is driven through the app's own UI — sign in, generate a build,
 * flip the reading theme — so the images are real screens, not mock-ups. Each
 * screen is captured twice, light and dark, because <ThemedShot> serves the
 * capture that matches the visitor's theme.
 *
 * Usage:
 *   1. npm i -D puppeteer-core                 (not a runtime dependency)
 *   2. in the Cusp app:  npm run dev -- --port 8099 --strictPort
 *   3. node scripts/capture-screenshots.mjs ./public/screens-png
 *   4. for f in public/screens-png/*.png; do \
 *        cwebp -lossless -z 9 "$f" -o "public/screens/$(basename "${f%.png}").webp"; done
 *
 * Viewports below are cut to the exact aspect ratios the slots reserve, so the
 * captures drop in without cropping.
 */
import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";

const BASE = "http://localhost:8099";
const OUT = process.argv[2];
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const PHONE = { width: 390, height: 823, deviceScaleFactor: 2 }; // 9/19 → <PhoneFrame>
const TALL = { width: 390, height: 693, deviceScaleFactor: 2 }; // 9/16 → <ScreenshotSlot ratio="phone">

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Click the first element of `selector` whose text contains `text`. */
async function clickByText(page, selector, text) {
  const handle = await page.evaluateHandle(
    (sel, txt) =>
      [...document.querySelectorAll(sel)].find((el) => el.textContent.trim().includes(txt)),
    selector,
    text,
  );
  const el = handle.asElement();
  if (!el) throw new Error(`No ${selector} containing "${text}"`);
  await el.click();
}

/**
 * The app is server-rendered, so markup lands before React attaches handlers and
 * an early click is silently dropped. Click until the page reaches `predicate`.
 */
async function clickUntil(page, selector, text, predicate, label) {
  for (let attempt = 1; attempt <= 10; attempt++) {
    if (await page.evaluate(predicate)) return;
    try {
      await clickByText(page, selector, text);
      await page.waitForFunction(predicate, { timeout: 2000 });
      return;
    } catch {
      await sleep(500);
    }
  }
  throw new Error(`"${text}" never reached ${label}`);
}

/** Webfonts loaded and the app's 150ms colour transitions finished. */
async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  await sleep(700);
}

async function shot(page, { name, path, viewport }) {
  await page.setViewport(viewport);
  if (path) await page.goto(BASE + path, { waitUntil: "networkidle2" });
  await settle(page);
  await page.screenshot({ path: `${OUT}/${name}.png`, captureBeyondViewport: false });
  console.log("  ✓", name, `${viewport.width}×${viewport.height}`);
}

const isDark = () => document.documentElement.classList.contains("dark");

async function run(theme) {
  console.log(`\n${theme}:`);
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    defaultViewport: PHONE,
    args: ["--hide-scrollbars", "--font-render-hinting=none"],
  });
  const page = await browser.newPage();

  // --- sign in exactly as a visitor would ---
  await page.goto(BASE + "/signin", { waitUntil: "networkidle2" });
  await settle(page);
  // The signin effect races the button's own navigate(), so either landing spot
  // is fine: leaving /signin is what proves the account exists.
  await clickUntil(
    page,
    "button",
    "Continue with Google",
    () => location.pathname !== "/signin",
    "a signed-in route",
  );

  await page.goto(BASE + "/welcome", { waitUntil: "networkidle2" });
  await settle(page);

  // --- flip the reading theme with the app's own toggle; the store persists it ---
  if (theme === "dark") {
    await clickUntil(page, "button", "Dark", isDark, "dark mode");
    await settle(page);
  }

  await shot(page, { name: `welcome-${theme}`, viewport: PHONE });
  await shot(page, { name: `welcome-tall-${theme}`, viewport: TALL });

  // --- generate a real stack so /build/$buildId has something to show ---
  await page.setViewport(PHONE);
  await page.goto(BASE + "/build", { waitUntil: "networkidle2" });
  await settle(page);
  await clickByText(page, "button", "A pattern set for showing when a model is unsure");
  await sleep(300);
  await clickUntil(
    page,
    "button",
    "Build it",
    () => /^\/build\/b/.test(location.pathname),
    "a generated stack",
  );
  await settle(page);

  // The two viewports share a width, so re-shooting at TALL only re-crops the
  // height — no reflow, and no need to reload the route.
  await shot(page, { name: `stack-${theme}`, viewport: PHONE });
  await shot(page, { name: `stack-tall-${theme}`, viewport: TALL });
  await shot(page, { name: `today-${theme}`, path: "/today", viewport: PHONE });
  await shot(page, { name: `today-tall-${theme}`, viewport: TALL });
  await shot(page, { name: `gap-${theme}`, path: "/gap", viewport: PHONE });
  await shot(page, { name: `gap-tall-${theme}`, viewport: TALL });
  await shot(page, { name: `read-tall-${theme}`, path: "/read/t1", viewport: TALL });
  await shot(page, { name: `build-tall-${theme}`, path: "/build", viewport: TALL });
  await shot(page, { name: `discover-tall-${theme}`, path: "/discover", viewport: TALL });

  // /saved is empty until something is kept, so keep two pieces first.
  await page.goto(BASE + "/today", { waitUntil: "networkidle2" });
  await settle(page);
  await page.evaluate(() => {
    document
      .querySelectorAll('button[aria-label^="Save "]')
      .forEach((b, i) => i < 2 && b.click());
  });
  await sleep(400);
  await shot(page, { name: `saved-tall-${theme}`, path: "/saved", viewport: TALL });

  await browser.close();
}

await mkdir(OUT, { recursive: true });
for (const theme of ["light", "dark"]) await run(theme);
console.log("\ndone");
