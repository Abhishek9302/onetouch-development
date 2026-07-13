import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import ContactForm from '@/components/ContactForm';
import { SITE } from '@/src/content';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact ${SITE.name} for AI/ML consulting, services, licensing, and pricing details.`,
};

export default function ContactPage() {
  return (
    <PageShell>
      <section className="page-hero">
        <div className="container">
          <p className="section-label">Contact</p>
          <h1 className="page-hero-title">Contact Us for Pricing & Details</h1>
          <p className="page-hero-subtitle">
            No login or signup required. Tell us what you need — services, licensing, or a custom
            build — and we&apos;ll follow up.
          </p>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="two-col">
            <div>
              <h2 className="section-title" style={{ fontSize: '1.75rem' }}>
                How to reach us
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Prefer email? Write directly and we&apos;ll respond with next steps.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                    Email
                  </p>
                  <a href={`mailto:${SITE.email}`} style={{ color: 'var(--white)', fontSize: '1.1rem' }}>
                    {SITE.email}
                  </a>
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                    Location
                  </p>
                  <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{SITE.locations}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                    LinkedIn
                  </p>
                  <a
                    href={SITE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Follow {SITE.name}
                  </a>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
