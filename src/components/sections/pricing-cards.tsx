import { Check } from "lucide-react";
import { Reveal, Spotlight } from "@/components/reveal";
import { TIERS } from "@/lib/pricing";

/**
 * The three plans, side by side. `yearly` swaps in the yearly price; the
 * pricing page owns that toggle, and the home page always shows monthly.
 */
export function PricingCards({ yearly = false }: { yearly?: boolean }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {TIERS.map((tier, i) => {
        const amount = yearly ? tier.yearly : tier.price;
        const per = tier.price === 0 ? tier.cadence : yearly ? "a year" : tier.cadence;
        return (
          <Reveal key={tier.id} delay={i * 50} className="h-full">
            <Spotlight
              as="article"
              className="card card-hover flex h-full flex-col p-6 md:p-7"
              style={tier.recommended ? { borderColor: "var(--accent)" } : undefined}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-xl tracking-tight">{tier.name}</h3>
                {tier.recommended ? (
                  <span className="rounded-full bg-action px-2.5 py-1 text-xs font-semibold text-action-foreground">
                    Recommended
                  </span>
                ) : null}
              </div>
              <p className="mt-5 flex items-baseline gap-2">
                <span className="tnum font-display text-5xl tracking-tight">${amount}</span>
                <span className="text-muted-foreground">{per}</span>
              </p>
              <p className="mt-3 text-muted-foreground">{tier.tagline}</p>
              <ul className="mt-6 space-y-3 border-t border-border pt-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-3 text-[0.9375rem] leading-snug">
                    <Check
                      size={18}
                      strokeWidth={2.25}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-accent-text"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Spotlight>
          </Reveal>
        );
      })}
    </div>
  );
}
