import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { STATIC_INDUSTRIES, SITE } from '@/src/content';

export const metadata: Metadata = {
  title: 'Industries',
  description: `${SITE.name} delivers AI across football & sports, finance, healthcare, manufacturing, and 12+ other industries.`,
};

export default function IndustriesPage() {
  return (
    <PageShell>
      <section className="page-hero">
        <div className="container">
          <p className="section-label">Industries</p>
          <h1 className="page-hero-title">Deep Vertical Knowledge</h1>
          <p className="page-hero-subtitle">
            AI solutions shaped by industry context — starting with football & sports and financial
            services, expanding across every major vertical.
          </p>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {STATIC_INDUSTRIES.map((industry) => (
            <article
              key={industry.slug}
              id={industry.slug}
              className="card-dark"
              style={{ scrollMarginTop: '6rem', padding: '2rem' }}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2rem' }}>{industry.icon}</span>
                <h2 style={{ color: 'var(--white)', fontSize: '1.5rem', margin: 0 }}>{industry.name}</h2>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {industry.description}
              </p>
              <div className="grid-2" style={{ gap: '1.5rem' }}>
                <div>
                  <h4 style={{ color: 'var(--cyan)', fontSize: '0.8rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Common Problems
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {industry.problems.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 style={{ color: 'var(--cyan)', fontSize: '0.8rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    AI Opportunities
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {industry.ai_opportunities.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div style={{ marginTop: '1.25rem' }}>
                <h4 style={{ color: 'var(--cyan)', fontSize: '0.8rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Example Applications
                </h4>
                <div className="tag-list">
                  {industry.example_applications.map((a) => (
                    <span key={a} className="tag">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-mid">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Don&apos;t see your industry?</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 2rem' }}>
            We expand into adjacent verticals quickly. Tell us your domain.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Contact Us →
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
