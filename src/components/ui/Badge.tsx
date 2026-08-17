import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-paper-dim px-3 py-1 text-xs font-medium text-ink-soft">
      {children}
    </span>
  );
}
