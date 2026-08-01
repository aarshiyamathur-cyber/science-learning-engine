import type { ReactNode } from "react";

export interface SectionProps {
  title: string;
  children: ReactNode;
}

/**
 * Shared section wrapper: uppercase label + spaced content, used for every
 * labeled block below a page's header (e.g. "Key Metrics", "Summary").
 */
export function Section({ title, children }: SectionProps) {
  return (
    <section className="mt-8">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
