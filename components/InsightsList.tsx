'use client';

import { useState, useEffect } from 'react';
import { getInsights, getInsightBySlug } from '@/src/api';
import type { Insight } from '@/src/types';

export default function InsightsList() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [selected, setSelected] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(true);
  const [articleLoading, setArticleLoading] = useState(false);

  useEffect(() => {
    getInsights()
      .then(setInsights)
      .finally(() => setLoading(false));
  }, []);

  const openArticle = async (slug: string) => {
    setArticleLoading(true);
    try {
      const article = await getInsightBySlug(slug);
      setSelected(article);
    } finally {
      setArticleLoading(false);
    }
  };

  if (selected) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <button
          className="btn btn-secondary"
          style={{ marginBottom: '2rem' }}
          onClick={() => setSelected(null)}
        >
          ← Back to Insights
        </button>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
            <span className="badge badge-cyan">{selected.category}</span>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{selected.read_time} min read</span>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              {new Date(selected.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900, color: 'var(--white)', letterSpacing: '-0.03em', marginBottom: '1rem', lineHeight: 1.2 }}>
            {selected.title}
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
            {selected.excerpt}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--graphite-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 700 }}>
              {selected.author.charAt(0)}
            </div>
            <span style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{selected.author}</span>
          </div>
        </div>
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: selected.content.replace(/\n/g, '<br/>') }}
        />
        <div className="tag-list" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
          {selected.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          <div className="spinner" style={{ width: 40, height: 40 }} />
        </div>
      ) : (
        <div className="grid-3">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="insight-card"
              onClick={() => openArticle(insight.slug)}
            >
              <div className="insight-card-body">
                <div className="insight-meta">
                  <span className="badge badge-cyan">{insight.category}</span>
                  <span>{insight.read_time} min read</span>
                </div>
                <h3 className="insight-title">{insight.title}</h3>
                <p className="insight-excerpt">{insight.excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.25rem' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--graphite-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
                    {insight.author.charAt(0)}
                  </div>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{insight.author}</span>
                </div>
                <div className="insight-read-more">Read Article →</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {articleLoading && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,14,26,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div className="spinner" style={{ width: 48, height: 48 }} />
        </div>
      )}
    </div>
  );
}
