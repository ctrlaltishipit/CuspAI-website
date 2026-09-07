import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/typography";

const ITEMS = [
  {
    q: "Is it free?",
    a: "The Signal is free forever. The Stack and The Gap are ₹249 a month, or ₹499 once for a single Stack Audit.",
  },
  {
    q: "Do you read my email?",
    a: "No. CuspAI does not connect to your inbox. It is the most-requested thing we have decided not to build.",
  },
  {
    q: "How do you pick what to recommend?",
    a: "Editorially, and we say so on every verdict. The full method is published. We never take payment for placement.",
  },
  {
    q: "You take affiliate commissions. Why trust you?",
    a: "Because the Refusal List includes tools that pay us and that we still tell you not to buy.",
  },
  {
    q: "What if you're wrong?",
    a: "It goes in your Decision Ledger, dated, marked wrong, in our words, permanently.",
  },
  {
    q: "Is there an Android version?",
    a: "Yes. India is Android-first and so are we.",
  },
  {
    q: "What happens to my data?",
    a: "Export and delete are self-serve, one tap, in the app. Built to the DPDP Act.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="seam-top py-[72px] md:py-[130px]">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-5 font-display text-3xl tracking-tight md:text-5xl">
            Questions, answered plainly.
          </h2>
        </Reveal>

        <div className="mt-12 space-y-2">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 50}>
                <div
                  className={`rounded-md border bg-card transition-colors duration-300 ${
                    isOpen ? "border-accent/40" : "border-border"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left"
                  >
                    <span className="text-base text-foreground md:text-lg">{item.q}</span>
                    <span
                      aria-hidden
                      className={`font-mono text-sm transition-transform duration-300 ${
                        isOpen ? "rotate-45 text-accent" : "text-muted-foreground"
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl px-5 pb-5 leading-relaxed text-muted-foreground">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
