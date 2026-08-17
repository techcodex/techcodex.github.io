import type { ReactNode } from "react";
import clsx from "clsx";

interface SectionContainerProps {
  id?: string;
  title: string;
  children: ReactNode;
  className?: string;
  bordered?: boolean;
}

export function SectionContainer({
  id,
  title,
  children,
  className,
  bordered = false,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={clsx("py-16 md:py-24", bordered && "border-t border-border", className)}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12">
          <h2 className="font-heading text-3xl font-medium text-ink md:text-4xl !text-accent">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
