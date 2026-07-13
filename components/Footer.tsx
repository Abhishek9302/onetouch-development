'use client';

import { useState } from 'react';
import Link from 'next/link';
import { subscribeNewsletter } from '@/src/api';
import { SITE } from '@/src/content';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubStatus('loading');
    try {
      await subscribeNewsletter({ email });
      setSubStatus('success');
      setEmail('');
    } catch {
      setSubStatus('error');
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: 'linear-gradient(135deg, #0066ff, #00c8e0)',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '0.85rem',
                  color: 'white',
                  letterSpacing: '-0.04em',
                }}
              >
                1t
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--white)' }}>
                {SITE.name}
              </span>
            </div>
            <p className="footer-brand-desc">
              AI/ML consulting, services, and technology licensing. We build production-grade
              machine learning, generative AI, computer vision, LLM, and multi-agent systems.
            </p>
            <form onSubmit={handleSubscribe}>
              <p
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: '0.75rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                AI Intelligence Newsletter
              </p>
              {subStatus === 'success' ? (
                <p style={{ fontSize: '0.875rem', color: '#4ade80' }}>✓ Subscribed — check your email client if prompted</p>
              ) : (
                <div className="newsletter-form">
                  <input
                    className="newsletter-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ padding: '0.75rem 1.25rem', fontSize: '0.875rem', whiteSpace: 'nowrap' }}
                    disabled={subStatus === 'loading'}
                  >
                    {subStatus === 'loading' ? '...' : 'Subscribe'}
                  </button>
                </div>
              )}
              {subStatus === 'error' && (
                <p style={{ fontSize: '0.8125rem', color: '#ff6b6b', marginTop: '0.5rem' }}>
                  Failed to subscribe. Email us at {SITE.email}
                </p>
              )}
            </form>
          </div>

          <div>
            <p className="footer-col-title">Services</p>
            <ul className="footer-links">
              {[
                ['AI Strategy', '/services#ai-strategy-consulting'],
                ['Machine Learning', '/services#machine-learning'],
                ['LLM Development', '/services#llm-development'],
                ['Computer Vision', '/services#computer-vision'],
                ['Multi-Agent Systems', '/services#multi-agent-systems'],
                ['BI & Analytics', '/services#business-intelligence'],
                ['Automation', '/services#automation'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="footer-link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer-col-title">Industries</p>
            <ul className="footer-links">
              {[
                ['Football & Sports', '/industries#football'],
                ['Finance', '/industries#finance'],
                ['Healthcare', '/industries#healthcare'],
                ['Manufacturing', '/industries#manufacturing'],
                ['Retail', '/industries#retail'],
                ['Insurance', '/industries#insurance'],
                ['Energy', '/industries#energy'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="footer-link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer-col-title">Company</p>
            <ul className="footer-links">
              {[
                ['About', '/about'],
                ['Solutions', '/solutions'],
                ['Technology Licensing', '/licensing'],
                ['Insights', '/insights'],
                ['Contact', '/contact'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="footer-link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '2rem' }}>
              <p className="footer-col-title">Contact</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                <br />
                {SITE.locations}
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <div className="footer-legal">
            <Link href="/contact">Privacy</Link>
            <Link href="/contact">Terms</Link>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue-light)' }}>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
