import type { ReactNode } from "react";

/**
 * The house divider between a headline and its paragraph: a short comb of
 * bars stepping down in height. The bars rise in turn when it appears.
 */
export function CadenceMark({ className = "" }: { className?: string }) {
  return (
    <span className={`cadence gap-[7px] ${className}`} aria-hidden="true">
      <i style={{ height: 18, opacity: 1 }} />
      <i style={{ height: 12, opacity: 0.75 }} />
      <i style={{ height: 8, opacity: 0.55 }} />
      <i style={{ height: 5, opacity: 0.4 }} />
      <i style={{ height: 5, opacity: 0.25 }} />
      <i style={{ height: 5, opacity: 0.14 }} />
    </span>
  );
}

/** The small label above a heading, led by three stepped ticks. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 text-sm font-semibold text-accent-text ${className}`}>
      <span className="cadence translate-y-[1px] gap-[4px]" aria-hidden="true">
        <i style={{ height: 10, opacity: 1 }} />
        <i style={{ height: 6, opacity: 0.55 }} />
        <i style={{ height: 3, opacity: 0.3 }} />
      </span>
      <span>{children}</span>
    </p>
  );
}

/** A section's label, heading and optional opening line, left-aligned. */
export function SectionHead({
  eyebrow,
  title,
  lead,
  className = "",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={className}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag className={`${Tag === "h1" ? "t-h1" : "t-h2"} ${eyebrow ? "mt-4" : ""} max-w-3xl`}>
        {title}
      </Tag>
      {lead ? <p className="t-lead measure mt-5 text-muted-foreground">{lead}</p> : null}
    </div>
  );
}

/** One phrase in a heading, in the blue gradient. Once per page. */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="grad-text">{children}</span>;
}
