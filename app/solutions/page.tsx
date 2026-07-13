import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { STATIC_SOLUTIONS, SITE } from '@/src/content';

export const metadata: Metadata = {
  title: 'Solutions',
  description: `Pre-built AI solutions from ${SITE.name}: agents, enterprise search, computer vision, predictive analytics, document intelligence, and more.`,
};

export default function SolutionsPage() {
  return (
    <PageShell>
      <section className="page-hero">
        <div className="container">
          <p className="section-label">Solutions</p>
          <h1 className="page-hero-title">Pre-Built AI Solutions</h1>
          <p className="page-hero-subtitle">
            Battle-tested frameworks you can deploy faster — customized to your data, systems, and
            compliance requirements.
          </p>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="grid-3">
            {STATIC_SOLUTIONS.map((sol) => (
              <article
                key={sol.slug}
                id={sol.slug}
                className="card"
                style={{ scrollMarginTop: '6rem' }}
              >
                <span className="badge badge-blue" style={{ marginBottom: '1rem' }}>
                  Solution
                </span>
                <h2 style={{ color: 'var(--white)', fontSize: '1.25rem', marginBottom: '0.75rem' }}>
                  {sol.title}
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                  {sol.description}
                </p>
                <h4 style={{ color: 'var(--cyan)', fontSize: '0.75rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Capabilities
                </h4>
                <ul style={{ margin: '0 0 1rem', paddingLeft: '1.1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.65 }}>
                  {sol.capabilities.slice(0, 4).map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <div className="tag-list">
                  {sol.tech_stack.slice(0, 4).map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-mid">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Ready to deploy?</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 2rem' }}>
            Contact us for pricing, timelines, and fit assessment.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Contact Us →
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
