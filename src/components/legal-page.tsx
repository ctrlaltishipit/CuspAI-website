import type { ReactNode } from "react";
import { Backdrop } from "@/components/backdrop";
import { Eyebrow } from "@/components/typography";

export type LegalSection = { id: string; title: string; body: ReactNode };

/**
 * The layout shared by the Privacy Policy and the Terms of Service: a title,
 * the date it last changed, a short plain summary, then numbered sections
 * with a contents list that stays beside them on a wide screen.
 */
export function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  summary,
  sections,
}: {
  eyebrow: string;
  title: string;
  /** Shown as written, e.g. "26 November 2026". */
  updated: string;
  intro: ReactNode;
  /** The short version, as a handful of plain sentences. */
  summary: string[];
  sections: LegalSection[];
}) {
  return (
    <main>
      <section className="relative overflow-hidden pt-28 pb-12 md:pt-40 md:pb-16">
        <Backdrop quiet />
        <div className="relative mx-auto max-w-6xl px-5 md:px-8">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="t-h1 mt-5">{title}</h1>
          <p className="mt-4 text-sm text-subtle">Last updated {updated}</p>
          <p className="t-lead measure mt-6 text-muted-foreground">{intro}</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-24 md:px-8 lg:grid-cols-12 lg:gap-16">
        <aside className="lg:col-span-4">
          <nav aria-label="On this page" className="lg:sticky lg:top-28">
            <p className="text-sm font-semibold text-foreground">On this page</p>
            <ol className="mt-4 space-y-1 border-l border-border">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px flex min-h-[2.5rem] items-center gap-3 border-l border-transparent pl-4 text-[0.9375rem] text-muted-foreground transition-colors duration-150 hover:border-accent hover:text-foreground"
                  >
                    <span className="tnum w-5 text-subtle">{i + 1}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="legal lg:col-span-8">
          <div className="card p-6 md:p-8">
            <p
              className="font-display text-xl tracking-tight text-foreground"
              style={{ marginTop: 0 }}
            >
              The short version
            </p>
            <ul>
              {summary.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          {sections.map((s, i) => (
            <section key={s.id} aria-labelledby={s.id}>
              <h2 id={s.id}>
                <span className="tnum mr-3 text-accent-text">{i + 1}.</span>
                {s.title}
              </h2>
              {s.body}
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
