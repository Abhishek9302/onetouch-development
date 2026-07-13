import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import { STATIC_INSIGHTS, SITE } from '@/src/content';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return STATIC_INSIGHTS.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const insight = STATIC_INSIGHTS.find((i) => i.slug === params.slug);
  if (!insight) return { title: 'Insight' };
  return {
    title: insight.title,
    description: insight.excerpt,
  };
}

export default function InsightDetailPage({ params }: Props) {
  const insight = STATIC_INSIGHTS.find((i) => i.slug === params.slug);
  if (!insight) notFound();

  const paragraphs = insight.content.split(/\n\n+/);

  return (
    <PageShell>
      <article>
        <section className="page-hero">
          <div className="container" style={{ maxWidth: 800 }}>
            <Link
              href="/insights"
              style={{ color: 'var(--cyan)', fontSize: '0.875rem', display: 'inline-block', marginBottom: '1.5rem' }}
            >
              ← All Insights
            </Link>
            <div className="insight-meta" style={{ marginBottom: '1rem' }}>
              <span className="badge badge-cyan">{insight.category}</span>
              <span>{insight.read_time} min read</span>
              <span>{insight.author}</span>
            </div>
            <h1 className="page-hero-title" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
              {insight.title}
            </h1>
            <p className="page-hero-subtitle">{insight.excerpt}</p>
          </div>
        </section>

        <section className="section section-dark">
          <div className="container" style={{ maxWidth: 720 }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.85 }}>
              {paragraphs.map((block, idx) => {
                if (block.startsWith('## ')) {
                  return (
                    <h2
                      key={idx}
                      style={{
                        color: 'var(--white)',
                        fontSize: '1.35rem',
                        marginTop: '2.5rem',
                        marginBottom: '1rem',
                      }}
                    >
                      {block.replace(/^## /, '')}
                    </h2>
                  );
                }
                return (
                  <p key={idx} style={{ marginBottom: '1.25rem' }}>
                    {block}
                  </p>
                );
              })}
            </div>
            <div className="tag-list" style={{ marginTop: '2.5rem' }}>
              {insight.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Want help applying this at your company?
              </p>
              <Link href="/contact" className="btn btn-primary">
                Contact {SITE.name} →
              </Link>
            </div>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
