'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import NetworkCanvas from '@/components/NetworkCanvas';
import {
  SITE,
  TECH_LOGOS,
  PROCESS_STEPS,
  WHY_CHOOSE,
  SPECIALTIES,
  STATIC_SERVICES,
  STATIC_INDUSTRIES,
  STATIC_SOLUTIONS,
  STATIC_INSIGHTS,
} from '@/src/content';
import { getServices, getIndustries, getInsights, getSolutions } from '@/src/api';
import type { Service, Industry, Insight, Solution } from '@/src/types';

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, 2000, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="stat-card">
      <div className="counter-value">
        {count}
        <span className="counter-suffix">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function HomePage() {
  const [services, setServices] = useState<Service[]>(STATIC_SERVICES);
  const [industries, setIndustries] = useState<Industry[]>(STATIC_INDUSTRIES);
  const [insights, setInsights] = useState<Insight[]>(STATIC_INSIGHTS.slice(0, 3));
  const [solutions, setSolutions] = useState<Solution[]>(STATIC_SOLUTIONS.slice(0, 6));

  useEffect(() => {
    Promise.all([getServices(), getIndustries(), getInsights(), getSolutions()]).then(
      ([s, i, ins, sol]) => {
        if (s.length) setServices(s);
        if (i.length) setIndustries(i);
        if (ins.length) setInsights(ins.slice(0, 3));
        if (sol.length) setSolutions(sol.slice(0, 6));
      }
    );
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navigation />

      <section className="hero" id="home">
        <NetworkCanvas />
        <div className="hero-content">
          <div className="animate-fade-up">
            <div className="hero-eyebrow">
              <span>●</span> AI / ML Consulting · Services · Licensing
            </div>
          </div>
          <h1 className="hero-title animate-fade-up delay-100">
            {SITE.name}
            <br />
            <span className="hero-title-accent">Enterprise AI. Built for Real Business.</span>
          </h1>
          <p className="hero-subtitle animate-fade-up delay-200">
            We build production-grade machine learning, generative AI, computer vision, LLM
            systems, multi-agent platforms, and data intelligence — then license the tech you can
            run yourself.
          </p>
          <div className="hero-actions animate-fade-up delay-300">
            <Link href="/contact" className="btn btn-primary">
              Contact Us for Details →
            </Link>
            <button className="btn btn-secondary" type="button" onClick={() => scrollTo('services')}>
              Explore Services
            </button>
          </div>
          <div className="hero-stats animate-fade-up delay-400">
            <div className="hero-stat">
              <span className="hero-stat-value">14</span>
              <span className="hero-stat-label">AI Service Lines</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">16</span>
              <span className="hero-stat-label">Industries</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">7</span>
              <span className="hero-stat-label">Core Specialties</span>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <section className="logos-strip">
        <div className="container">
          <p className="logos-label">Trusted Technology Partners & Platforms</p>
          <div className="logos-track">
            {TECH_LOGOS.map((logo) => (
              <span key={logo} className="logo-item">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-mid">
        <div className="container">
          <p className="section-label">Specialties</p>
          <h2 className="section-title" style={{ marginBottom: '2rem' }}>
            What We Build
          </h2>
          <div className="tag-list" style={{ gap: '0.75rem' }}>
            {SPECIALTIES.map((s) => (
              <span key={s} className="tag" style={{ padding: '0.65rem 1.1rem', fontSize: '0.9rem' }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" id="services">
        <div className="container">
          <div style={{ marginBottom: '3.5rem' }}>
            <p className="section-label">What We Do</p>
            <h2 className="section-title">
              AI Services That Drive
              <br />
              Measurable Outcomes
            </h2>
            <p className="section-subtitle">
              From strategy through deployment, end-to-end AI capabilities across ML, LLMs,
              vision, agents, analytics, and automation.
            </p>
          </div>
          <div className="grid-4">
            {services.slice(0, 8).map((service) => (
              <Link key={service.id} href={`/services#${service.slug}`} className="card">
                <div className="icon-box">{service.icon}</div>
                <h4 style={{ color: 'var(--white)', marginBottom: '0.75rem' }}>{service.title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {service.short_description}
                </p>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/services" className="btn btn-secondary">
              View All {services.length} Services →
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-mid">
        <div className="container">
          <div className="grid-4">
            <StatCounter value={14} suffix="" label="AI Service Lines" />
            <StatCounter value={16} suffix="" label="Industries Covered" />
            <StatCounter value={9} suffix="" label="Solution Platforms" />
            <StatCounter value={6} suffix="" label="Licensing Models" />
          </div>
        </div>
      </section>

      <section className="section section-light" id="industries">
        <div className="container">
          <div style={{ marginBottom: '3.5rem' }}>
            <p className="section-label">Industry Expertise</p>
            <h2 className="section-title">Deep Vertical Knowledge</h2>
            <p className="section-subtitle">
              From football & sports to finance and beyond — AI that understands your domain, not
              generic technology applied without context.
            </p>
          </div>
          <div className="grid-4">
            {industries.slice(0, 8).map((industry) => (
              <Link key={industry.id} href={`/industries#${industry.slug}`} className="card-dark">
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{industry.icon}</div>
                <h4 style={{ color: 'var(--white)', marginBottom: '0.5rem' }}>{industry.name}</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {industry.description}
                </p>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/industries" className="btn btn-secondary">
              Explore All Industries →
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div style={{ marginBottom: '3.5rem' }}>
            <p className="section-label">Why {SITE.name}</p>
            <h2 className="section-title">
              The Enterprise AI Partner
              <br />
              You Can Rely On
            </h2>
          </div>
          <div className="grid-3">
            {WHY_CHOOSE.map((item) => (
              <div key={item.title} style={{ padding: '0.5rem 0' }}>
                <div style={{ fontSize: '1.5rem', color: 'var(--blue-light)', marginBottom: '1rem' }}>
                  {item.icon}
                </div>
                <h4 style={{ color: 'var(--white)', marginBottom: '0.75rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-mid">
        <div className="container">
          <div style={{ marginBottom: '3.5rem' }}>
            <p className="section-label">Our Methodology</p>
            <h2 className="section-title">From Discovery to Optimization</h2>
            <p className="section-subtitle">
              A six-phase engagement model that delivers predictable outcomes and sustainable AI
              capability.
            </p>
          </div>
          <div className="process-steps" style={{ border: '1px solid var(--border)', borderRadius: 8 }}>
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="process-step">
                <div className="process-step-num">{step.num}</div>
                <div className="process-step-title">{step.title}</div>
                <div className="process-step-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" id="solutions">
        <div className="container">
          <div style={{ marginBottom: '3.5rem' }}>
            <p className="section-label">Featured Solutions</p>
            <h2 className="section-title">Pre-Built AI Solutions</h2>
            <p className="section-subtitle">
              Accelerate deployment with battle-tested AI solution frameworks, customized for your
              context.
            </p>
          </div>
          <div className="grid-3">
            {solutions.map((sol) => (
              <Link key={sol.id} href={`/solutions#${sol.slug}`} className="card">
                <span className="badge badge-blue" style={{ marginBottom: '1rem' }}>
                  Solution
                </span>
                <h4 style={{ color: 'var(--white)', marginBottom: '0.75rem' }}>{sol.title}</h4>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    marginBottom: '1.25rem',
                  }}
                >
                  {sol.description}
                </p>
                <div className="tag-list">
                  {sol.tech_stack.slice(0, 3).map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/solutions" className="btn btn-secondary">
              View All Solutions →
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-mid">
        <div className="container">
          <div className="highlight-box">
            <div className="two-col">
              <div>
                <p className="section-label">Technology Licensing</p>
                <h2
                  style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                    fontWeight: 800,
                    color: 'var(--white)',
                    marginBottom: '1rem',
                    letterSpacing: '-0.03em',
                  }}
                >
                  License Our AI Platforms
                </h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  Deploy {SITE.name} proprietary AI platforms under enterprise license. White-label
                  our technology, integrate via API, or embed our models into your products.
                </p>
                <Link href="/licensing" className="btn btn-outline">
                  Explore Licensing Options
                </Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {['Platform Licensing', 'API Access', 'White-Label Software', 'Enterprise Integration'].map(
                  (item) => (
                    <div
                      key={item}
                      style={{
                        padding: '1.25rem',
                        background: 'rgba(0,0,0,0.2)',
                        borderRadius: 6,
                        border: '1px solid var(--border)',
                      }}
                    >
                      <div style={{ color: 'var(--cyan)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>
                        ◈
                      </div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--white)' }}>
                        {item}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="insights">
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '3rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <p className="section-label">Insights</p>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                Enterprise AI Intelligence
              </h2>
            </div>
            <Link href="/insights" className="btn btn-secondary">
              View All Insights →
            </Link>
          </div>
          <div className="grid-3">
            {insights.map((insight) => (
              <Link key={insight.id} href={`/insights/${insight.slug}`} className="insight-card">
                <div className="insight-card-body">
                  <div className="insight-meta">
                    <span className="badge badge-cyan">{insight.category}</span>
                    <span>{insight.read_time} min read</span>
                  </div>
                  <h3 className="insight-title">{insight.title}</h3>
                  <p className="insight-excerpt">{insight.excerpt}</p>
                  <div className="insight-read-more">Read Article →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-mid" id="contact">
        <div className="container">
          <div className="two-col">
            <div>
              <p className="section-label">Get Started</p>
              <h2 className="section-title">
                Contact Us for
                <br />
                Pricing & Details
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Tell us about your challenge. We&apos;ll respond with how we can help — no login
                required.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: 'var(--cyan)' }}>✉</span>
                  <a href={`mailto:${SITE.email}`} style={{ color: 'var(--text-secondary)' }}>
                    {SITE.email}
                  </a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: 'var(--cyan)' }}>◎</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{SITE.locations}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: 'var(--cyan)' }}>in</span>
                  <a
                    href={SITE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
