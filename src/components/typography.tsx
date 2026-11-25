import type { ReactNode } from "react";

/**
 * The small label above a heading. Sentence case, with the logo's odd point
 * in front of it: one dot in the theme's lead colour.
 */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-2.5 text-sm font-semibold text-accent-text ${className}`}>
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
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

/** One word or phrase in a heading, in the theme's lead colour. Once per page. */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="text-accent">{children}</span>;
}
