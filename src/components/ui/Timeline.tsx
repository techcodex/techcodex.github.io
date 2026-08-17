import type { ReactNode } from "react";

export function Timeline({ children }: { children: ReactNode }) {
  return <ol className="relative border-l border-border pl-8">{children}</ol>;
}

export function TimelineItem({ children }: { children: ReactNode }) {
  return (
    <li className="relative mb-12 last:mb-0">
      <span className="absolute -left-[calc(2rem+4.5px)] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-paper bg-accent" />
      {children}
    </li>
  );
}
