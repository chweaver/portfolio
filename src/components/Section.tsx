import { ReactNode } from 'react';

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
}

export function Section({ id, eyebrow, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20 py-20 md:py-28">
      <div className="container-narrow">
        <header className="mb-10 max-w-3xl">
          <p className="section-eyebrow">{eyebrow}</p>
          <h2 className="section-title mt-3">{title}</h2>
          {subtitle && <p className="mt-4 text-ink-dim leading-relaxed">{subtitle}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
