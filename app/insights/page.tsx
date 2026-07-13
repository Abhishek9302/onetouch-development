import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { STATIC_INSIGHTS, SITE } from '@/src/content';

export const metadata: Metadata = {
  title: 'Insights',
  description: `Enterprise AI insights from ${SITE.name} — LLMs, multi-agent systems, data engineering, computer vision, and governance.`,
};

export default function InsightsPage() {
  return (
    <PageShell>
      <section className="page-hero">
        <div className="container">
          <p className="section-label">Insights</p>
          <h1 className="page-hero-title">Enterprise AI Intelligence</h1>
          <p className="page-hero-subtitle">
            Practical perspectives on shipping AI in production — architecture, ROI, and governance.
          </p>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="grid-3">
            {STATIC_INSIGHTS.map((insight) => (
              <Link key={insight.slug} href={`/insights/${insight.slug}`} className="insight-card">
                <div className="insight-card-body">
                  <div className="insight-meta">
                    <span className="badge badge-cyan">{insight.category}</span>
                    <span>{insight.read_time} min read</span>
                  </div>
                  <h2 className="insight-title">{insight.title}</h2>
                  <p className="insight-excerpt">{insight.excerpt}</p>
                  <div className="insight-read-more">Read Article →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
