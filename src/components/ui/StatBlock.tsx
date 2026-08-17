import { useCountUp } from "../../hooks/useCountUp";
import { FadeInSection } from "./FadeInSection";

interface StatBlockProps {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}

export function StatBlock({ value, suffix = "", label, delay = 0 }: StatBlockProps) {
  const { ref, value: displayValue } = useCountUp(value);

  return (
    <FadeInSection delay={delay}>
      <div className="text-center sm:text-left">
        <span ref={ref} className="font-heading text-4xl font-medium text-accent-soft md:text-5xl">
          {displayValue}
          {suffix}
        </span>
        <p className="mt-2 text-sm uppercase tracking-widest text-ink-soft">{label}</p>
      </div>
    </FadeInSection>
  );
}
