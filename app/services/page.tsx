import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { STATIC_SERVICES, SITE } from '@/src/content';

export const metadata: Metadata = {
  title: 'Services',
  description: `AI/ML services from ${SITE.name}: strategy, machine learning, LLM development, computer vision, multi-agent systems, BI, automation, and more.`,
};

export default function ServicesPage() {
  return (
    <PageShell>
      <section className="page-hero">
        <div className="container">
          <p className="section-label">Services</p>
          <h1 className="page-hero-title">AI Services That Drive Outcomes</h1>
          <p className="page-hero-subtitle">
            End-to-end capabilities across AI strategy, ML, generative AI, LLMs, computer vision,
            multi-agent systems, data analytics, and intelligent automation.
          </p>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {STATIC_SERVICES.map((service) => (
            <article
              key={service.slug}
              id={service.slug}
              className="card"
              style={{ scrollMarginTop: '6rem' }}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div className="icon-box">{service.icon}</div>
                <div>
                  <h2 style={{ color: 'var(--white)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                    {service.title}
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{service.short_description}</p>
                </div>
              </div>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {service.full_description}
              </p>
              <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <h4 style={{ color: 'var(--cyan)', fontSize: '0.85rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Business Value
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                    {service.business_value}
                  </p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--cyan)', fontSize: '0.85rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Benefits
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {service.benefits.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ color: 'var(--cyan)', fontSize: '0.85rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Technologies
                </h4>
                <div className="tag-list">
                  {service.technologies.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 style={{ color: 'var(--cyan)', fontSize: '0.85rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Typical Projects
                </h4>
                <div className="tag-list">
                  {service.typical_projects.map((p) => (
                    <span key={p} className="tag">
                      {p}
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
          <h2 className="section-title">Need pricing or a scoped proposal?</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 2rem' }}>
            Contact us for details — no login required.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Contact Us →
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
