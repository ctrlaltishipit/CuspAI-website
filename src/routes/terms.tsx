import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — CuspAI" },
      { name: "description", content: "The terms that govern use of CuspAI." },
      { property: "og:title", content: "Terms of Service — CuspAI" },
      { property: "og:description", content: "The terms that govern use of CuspAI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 pt-40 pb-24 md:px-8 md:pt-48 md:pb-32">
      <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground md:text-xs">
        Draft · Last updated 26 Aug 2026
      </p>
      <h1 className="mt-6 font-display text-4xl tracking-tight md:text-6xl">
        Terms of Service.
      </h1>
      <div className="mt-10 space-y-6 leading-relaxed text-muted-foreground">
        <p>
          This is a placeholder. The full terms are being drafted and will be
          published here before CuspAI opens.
        </p>
        <p>
          What will not change: CuspAI Pro is ₹249 a month, billed monthly,
          with no annual plan and no lock-in. Prices are in INR and include
          GST. You can cancel whenever you like.
        </p>
        <p>
          Questions in the meantime:{" "}
          <a
            href="mailto:hello@cuspai.io"
            className="text-foreground underline decoration-border underline-offset-4"
          >
            hello@cuspai.io
          </a>
          .
        </p>
      </div>
    </main>
  );
}
