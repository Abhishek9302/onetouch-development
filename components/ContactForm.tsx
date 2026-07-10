'use client';

import { useState } from 'react';
import { submitContact } from '@/src/api';
import type { ContactFormData } from '@/src/types';

const SERVICES = [
  'AI Strategy & Consulting',
  'Machine Learning',
  'Generative AI',
  'LLM Development',
  'Computer Vision',
  'AI Agents & Multi-Agent Systems',
  'Data Engineering',
  'Business Intelligence',
  'Predictive Analytics',
  'Custom AI Software',
  'Technology Licensing',
  'Enterprise Integration',
  'Other',
];

const BUDGETS = [
  'Under $100K',
  '$100K – $500K',
  '$500K – $1M',
  '$1M – $5M',
  '$5M+',
  'Prefer not to say',
];

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    phone: '',
    service_interest: '',
    message: '',
    budget_range: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitContact(form);
      setSuccess(true);
      setForm({ name: '', email: '', company: '', role: '', phone: '', service_interest: '', message: '', budget_range: '' });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
        <h3 style={{ color: 'var(--white)', marginBottom: '0.75rem' }}>Consultation Request Received</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Thank you for reaching out. Our enterprise team will contact you within one business day.
        </p>
        <button
          className="btn btn-secondary"
          style={{ marginTop: '1.5rem' }}
          onClick={() => setSuccess(false)}
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input
            className="form-input"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Work Email *</label>
          <input
            className="form-input"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="jane@company.com"
            required
          />
        </div>
      </div>
      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Company *</label>
          <input
            className="form-input"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Acme Corporation"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Your Role *</label>
          <input
            className="form-input"
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="CTO / VP Engineering"
            required
          />
        </div>
      </div>
      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Service Interest *</label>
          <select
            className="form-select"
            name="service_interest"
            value={form.service_interest}
            onChange={handleChange}
            required
          >
            <option value="">Select a service</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Budget Range</label>
          <select
            className="form-select"
            name="budget_range"
            value={form.budget_range}
            onChange={handleChange}
          >
            <option value="">Select range</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Message *</label>
        <textarea
          className="form-textarea"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Describe your business challenge and what you're hoping to achieve with AI..."
          required
          rows={5}
        />
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
        style={{ alignSelf: 'flex-start', minWidth: 180 }}
      >
        {loading ? (
          <><div className="spinner" /> Submitting...</>
        ) : (
          'Request Consultation →'
        )}
      </button>
    </form>
  );
}
