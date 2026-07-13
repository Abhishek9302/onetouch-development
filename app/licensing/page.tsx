import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { LICENSING_OPTIONS, SITE } from '@/src/content';

export const metadata: Metadata = {
  title: 'Technology Licensing',
  description: `License ${SITE.name} AI platforms — API access, white-label software, enterprise integration, and custom OEM agreements.`,
};

export default function LicensingPage() {
  return (
    <PageShell>
      <section className="page-hero">
        <div className="container">
          <p className="section-label">Technology Licensing</p>
          <h1 className="page-hero-title">License Our AI Platforms</h1>
          <p className="page-hero-subtitle">
            Deploy {SITE.name} proprietary AI platforms under enterprise license. White-label our
            technology, integrate via API, or embed our models into your products.
          </p>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="grid-3">
            {LICENSING_OPTIONS.map((opt) => (
              <div key={opt.title} className="card">
                <div style={{ color: 'var(--cyan)', marginBottom: '0.75rem', fontSize: '1.5rem' }}>◈</div>
                <h3 style={{ color: 'var(--white)', marginBottom: '0.75rem', fontSize: '1.15rem' }}>
                  {opt.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                  {opt.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-mid">
        <div className="container">
          <div className="highlight-box" style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Contact us for licensing terms</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
              Every agreement includes SLA options, technical support, and regular capability
              updates. Tell us your use case and we&apos;ll share pricing and options.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Request Licensing Details →
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
