import type { ReactNode } from "react";
import { TickMark } from "@/components/marks";


export function Mono({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-[11px] tracking-[0.08em] uppercase text-muted-foreground md:text-xs ${className}`}
    >
      {children}
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground md:text-xs">
      <TickMark className="translate-y-[1px] text-accent" />
      <span>{children}</span>
    </p>
  );
}

