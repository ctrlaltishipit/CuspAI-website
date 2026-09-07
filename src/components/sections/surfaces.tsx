import { Eyebrow } from "@/components/typography";
import { PhoneFrame } from "@/components/phone-frame";
import { Reveal } from "@/components/reveal";
import { CheckMark, CrossMark, PaperGrid } from "@/components/marks";

function VerdictCard({
  label,
  name,
  detail,
  tone = "neutral",
}: {
  label: string;
  name: string;
  detail: string;
  tone?: "pick" | "neutral" | "skip";
}) {
  return (
    <div
      className={`card-lift rounded-lg border bg-card p-5 ${
        tone === "pick" ? "border-accent/50" : "border-border"
      }`}
    >
      <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground md:text-[11px]">
        {tone === "pick" && <CheckMark className="h-3.5 w-3.5 text-accent" />}
        {tone === "skip" && <CrossMark className="h-3.5 w-3.5 text-muted-foreground" />}
        {label}
      </p>
      <p className="mt-3 font-display text-xl tracking-tight md:text-2xl">{name}</p>
      <p className="mt-2 font-mono text-[11px] tracking-[0.06em] text-muted-foreground md:text-xs">
        {detail}
      </p>
    </div>
  );
}

const SURFACES = [
  {
    eyebrow: "The Signal · Daily · Free forever",
    title: "What changed that affects you.",
    body: "Three to five things, ninety seconds, then it ends.",
    fact: "Free forever. A commitment, not a promotion.",
    shot: {
      src: "/screens/today-phone-light.webp",
      srcDark: "/screens/today-phone-dark.webp",
      alt: "The Signal in CuspAI: the day's short list, each item stating the topic it came from and why it was chosen.",
    },
  },
  {
    eyebrow: "The Gap · Monthly · Paid",
    title: "The one thing worth learning next.",
    body: "One credential a month, with what it costs and what it's actually worth in Indian roles.",
    fact: "14 Indian role maps and counting.",
    shot: {
      src: "/screens/gap-phone-light.webp",
      srcDark: "/screens/gap-phone-dark.webp",
      alt: "The Gap in CuspAI: the distance from your current role to the one you're aiming at, named as three skills instead of a score.",
    },
  },
];

export function Surfaces() {
  return (
    <section className="seam-top">
      {/* THE STACK: the commercial centre */}
      <div className="relative overflow-hidden py-[80px] md:py-[150px]">
        <PaperGrid className="opacity-40" />
        <div className="relative mx-auto max-w-4xl px-5 md:px-8">
          <Reveal>
            <Eyebrow>The Stack · On demand · Paid</Eyebrow>
            <h2 className="mt-5 font-display text-4xl tracking-tight text-balance md:text-6xl">
              What you should use, and what you should be paying.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Ask a real question, such as “do I need Lovable if I already pay
              for Cursor?”, and get one pick, one runner-up, and one card that
              says skip this.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { label: "The pick", name: "Cursor · Pro", detail: "₹1,780/mo", tone: "pick" as const },
              { label: "Runner-up", name: "Claude Code · Pro", detail: "₹1,700/mo" },
              {
                label: "Skip this",
                name: "GitHub Copilot",
                detail: "₹890/mo · unopened for six weeks",
                tone: "skip" as const,
              },
            ].map((card, i) => (
              <Reveal key={card.name} delay={i * 100}>
                <VerdictCard {...card} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <p className="mt-6 font-mono text-[11px] leading-relaxed tracking-[0.06em] text-muted-foreground md:text-xs">
              Verdict 26 Aug 2026 · prices checked 24 Aug 2026 · Cursor pays us
              a commission; the other two pay us nothing.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-16 font-display text-3xl tracking-tight text-balance md:mt-24 md:text-5xl">
              It usually finds more than it costs.
            </p>
            <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">
              CuspAI Pro is{" "}
              <span className="font-mono text-foreground">₹249</span> a month.
              Most people find more than that in the first audit.
            </p>
          </Reveal>
        </div>
      </div>

      {/* THE SIGNAL + THE GAP */}
      <div className="border-t border-border py-[72px] md:py-[120px]">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 md:grid-cols-2 md:gap-6 md:px-8">
          {SURFACES.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <article className="card-lift flex h-full flex-col rounded-lg border border-border bg-card p-6 md:p-8">
                <Eyebrow>{s.eyebrow}</Eyebrow>
                <h2 className="mt-5 font-display text-2xl tracking-tight text-balance md:text-[2rem]">
                  {s.title}
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{s.body}</p>
                <p className="mt-6 font-mono text-[11px] tracking-[0.08em] text-muted-foreground md:text-xs">
                  {s.fact}
                </p>
                <div className="relative mt-10 h-56 overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
                  <PhoneFrame {...s.shot} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
