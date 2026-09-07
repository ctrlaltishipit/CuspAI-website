import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "CuspAI Privacy Policy" },
      { name: "description", content: "How CuspAI handles your data. Built to the DPDP Act." },
      { property: "og:title", content: "CuspAI Privacy Policy" },
      { property: "og:description", content: "How CuspAI handles your data. Built to the DPDP Act." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 pt-28 pb-24 md:px-8 md:pt-36 md:pb-32">
      <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground md:text-xs">
        Draft · Last updated 26 Aug 2026
      </p>
      <h1 className="mt-6 font-display text-4xl tracking-tight md:text-6xl">
        Privacy Policy.
      </h1>
      <div className="mt-10 space-y-6 leading-relaxed text-muted-foreground">
        <p>
          This is a placeholder. The full policy is being drafted and will be
          published here before CuspAI opens.
        </p>
        <p>
          What will not change: CuspAI does not connect to your inbox, does not
          sell your data, and offers self-serve export and delete in the app.
          The policy is being written to the Digital Personal Data Protection
          Act, 2023.
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
