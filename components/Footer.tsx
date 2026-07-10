'use client';

import { useState } from 'react';
import { subscribeNewsletter } from '@/src/api';

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
              <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #0066ff, #00c8e0)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.9rem', color: 'white' }}>1T</div>
              <span style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--white)' }}>1Touch Development</span>
            </div>
            <p className="footer-brand-desc">
              Enterprise AI/ML and Data Intelligence consulting. We solve difficult business
              problems using AI — for organizations that demand production-grade results.
            </p>
            <form onSubmit={handleSubscribe}>
              <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>AI Intelligence Newsletter</p>
              {subStatus === 'success' ? (
                <p style={{ fontSize: '0.875rem', color: '#4ade80' }}>✓ Subscribed successfully</p>
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
                <p style={{ fontSize: '0.8125rem', color: '#ff6b6b', marginTop: '0.5rem' }}>Failed to subscribe. Please try again.</p>
              )}
            </form>
          </div>

          <div>
            <p className="footer-col-title">Services</p>
            <ul className="footer-links">
              {['AI Strategy', 'Machine Learning', 'Generative AI', 'LLM Development', 'Computer Vision', 'AI Agents', 'Data Engineering'].map((s) => (
                <li key={s}><span className="footer-link">{s}</span></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer-col-title">Industries</p>
            <ul className="footer-links">
              {['Finance', 'Healthcare', 'Manufacturing', 'Retail', 'Insurance', 'Government', 'Energy', 'Logistics'].map((i) => (
                <li key={i}><span className="footer-link">{i}</span></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer-col-title">Company</p>
            <ul className="footer-links">
              {['About Us', 'Solutions', 'Technology Licensing', 'Insights', 'Careers', 'Contact'].map((c) => (
                <li key={c}><span className="footer-link">{c}</span></li>
              ))}
            </ul>
            <div style={{ marginTop: '2rem' }}>
              <p className="footer-col-title">Contact</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                enterprise@1touchdevelopment.com<br />
                New York · London · Singapore
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} 1Touch Development. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue-light)' }}>LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
