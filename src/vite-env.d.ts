/// <reference types="vite/client" />

/**
 * Build-time environment exposed to the browser.
 *
 * Declaring each key here is not decoration. `noPropertyAccessFromIndexSignature`
 * is on, so without a real property the only legal access is
 * `import.meta.env["VITE_X"]` — and Vite statically replaces the dotted form
 * only. Bracket access survives the build as a lookup against an object that is
 * empty in the SSR bundle, so the value silently disappears in production.
 * Declare the key, then read it with a dot.
 */
interface ImportMetaEnv {
  /** GA4 Measurement ID, e.g. G-XXXXXXXXXX. Unset means no analytics tag. */
  readonly VITE_GA_MEASUREMENT_ID?: string;
  /** Search Console "HTML tag" token, the content value on its own. */
  readonly VITE_GOOGLE_SITE_VERIFICATION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
