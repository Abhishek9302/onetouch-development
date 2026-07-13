import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { SITE, SPECIALTIES, WHY_CHOOSE, PROCESS_STEPS } from '@/src/content';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${SITE.name} — AI/ML consulting firm focused on production systems, services, and technology licensing.`,
};

export default function AboutPage() {
  return (
    <PageShell>
      <section className="page-hero">
        <div className="container">
          <p className="section-label">About</p>
          <h1 className="page-hero-title">{SITE.name}</h1>
          <p className="page-hero-subtitle">
            An AI/ML consulting firm that builds production systems, delivers specialized services,
            and licenses technology you can run under your own brand.
          </p>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="two-col">
            <div>
              <p className="section-label">Mission</p>
              <h2 className="section-title">Solve hard business problems with AI</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
                We focus on what ships: machine learning pipelines, LLM applications, computer
                vision systems, multi-agent platforms, BI & analytics, and intelligent automation —
                delivered as services or licensed products.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                No black-box theatre. Clear scopes, measurable outcomes, and knowledge transfer so
                your team can operate what we build.
              </p>
            </div>
            <div>
              <p className="section-label">Specialties</p>
              <div className="tag-list" style={{ gap: '0.75rem', marginTop: '1rem' }}>
                {SPECIALTIES.map((s) => (
                  <span key={s} className="tag" style={{ padding: '0.65rem 1rem' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-mid">
        <div className="container">
          <p className="section-label">How we work</p>
          <h2 className="section-title" style={{ marginBottom: '2.5rem' }}>
            Delivery philosophy
          </h2>
          <div className="grid-3">
            {WHY_CHOOSE.map((item) => (
              <div key={item.title}>
                <div style={{ fontSize: '1.5rem', color: 'var(--blue-light)', marginBottom: '0.75rem' }}>
                  {item.icon}
                </div>
                <h3 style={{ color: 'var(--white)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <p className="section-label">Methodology</p>
          <h2 className="section-title" style={{ marginBottom: '2.5rem' }}>
            Six-phase engagement
          </h2>
          <div className="process-steps" style={{ border: '1px solid var(--border)', borderRadius: 8 }}>
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="process-step">
                <div className="process-step-num">{step.num}</div>
                <div className="process-step-title">{step.title}</div>
                <div className="process-step-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-mid">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Let&apos;s talk</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 2rem' }}>
            Contact us for pricing, licensing, or a scoped engagement.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Contact {SITE.name} →
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
