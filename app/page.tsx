'use client';

import { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import NetworkCanvas from '@/components/NetworkCanvas';
import { getServices, getIndustries, getInsights, getSolutions } from '@/src/api';
import type { Service, Industry, Insight, Solution } from '@/src/types';

const TECH_LOGOS = [
  'AWS', 'Azure', 'Google Cloud', 'OpenAI', 'Anthropic',
  'Databricks', 'Snowflake', 'Python', 'TensorFlow',
  'PyTorch', 'LangChain', 'MCP Protocol',
];

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery', desc: 'Deep-dive into your business context, data assets, and strategic objectives.' },
  { num: '02', title: 'Strategy', desc: 'Define AI roadmap, ROI models, and prioritized use-case portfolio.' },
  { num: '03', title: 'Architecture', desc: 'Design scalable, secure AI infrastructure aligned to your cloud stack.' },
  { num: '04', title: 'Development', desc: 'Build production-grade models, pipelines, and intelligent applications.' },
  { num: '05', title: 'Deployment', desc: 'MLOps-driven deployment with monitoring, versioning, and CI/CD.' },
  { num: '06', title: 'Optimization', desc: 'Continuous performance tuning, retraining, and business impact measurement.' },
];

const WHY_CHOOSE = [
  { icon: '⬡', title: 'Enterprise-Grade Delivery', desc: 'We operate at Fortune 500 scale — rigorous engineering, security-first architecture, and enterprise change management.' },
  { icon: '◈', title: 'Outcome-Focused Engagements', desc: 'Every engagement is scoped around measurable business outcomes, not technology for its own sake.' },
  { icon: '◎', title: 'Full-Stack AI Capability', desc: 'From raw data pipelines to production LLM applications — we cover the entire AI value chain in-house.' },
  { icon: '◇', title: 'Proprietary Accelerators', desc: 'Proprietary frameworks and pre-built components reduce time-to-value by 40–60% versus greenfield builds.' },
  { icon: '△', title: 'Domain Expertise', desc: 'Deep vertical expertise across 16 industries ensures AI solutions that understand your business context.' },
  { icon: '□', title: 'Transparent Partnership', desc: 'No black-box consulting. We transfer knowledge, build internal capability, and document everything.' },
];

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
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="stat-card">
      <div className="counter-value">
        {count}<span className="counter-suffix">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    Promise.all([
      getServices(),
      getIndustries(),
      getInsights(),
      getSolutions(),
    ]).then(([s, i, ins, sol]) => {
      setServices(s);
      setIndustries(i);
      setInsights(ins.slice(0, 3));
      setSolutions(sol.slice(0, 6));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navigation activePage={activePage} setActivePage={setActivePage} />

      {/* HERO */}
      <section className="hero" id="home">
        <NetworkCanvas />
        <div className="hero-content">
          <div className="animate-fade-up">
            <div className="hero-eyebrow">
              <span>●</span> Enterprise AI Consulting
            </div>
          </div>
          <h1 className="hero-title animate-fade-up delay-100">
            Enterprise AI.<br />
            <span className="hero-title-accent">Built for Real Business.</span>
          </h1>
          <p className="hero-subtitle animate-fade-up delay-200">
            We solve difficult business problems using AI. Production-grade machine learning,
            generative AI, and data intelligence systems for organizations that demand results.
          </p>
          <div className="hero-actions animate-fade-up delay-300">
            <button className="btn btn-primary" onClick={() => scrollTo('contact')}>
              Book a Consultation →
            </button>
            <button className="btn btn-secondary" onClick={() => scrollTo('services')}>
              Explore Services
            </button>
          </div>
          <div className="hero-stats animate-fade-up delay-400">
            <div className="hero-stat">
              <span className="hero-stat-value">150+</span>
              <span className="hero-stat-label">Enterprise Deployments</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">16</span>
              <span className="hero-stat-label">Industries Served</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">$2.4B+</span>
              <span className="hero-stat-label">Client Value Generated</span>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* TRUSTED TECHNOLOGIES */}
      <section className="logos-strip">
        <div className="container">
          <p className="logos-label">Trusted Technology Partners & Platforms</p>
          <div className="logos-track">
            {TECH_LOGOS.map((logo) => (
              <span key={logo} className="logo-item">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section section-dark" id="services">
        <div className="container">
          <div style={{ marginBottom: '3.5rem' }}>
            <p className="section-label">What We Do</p>
            <h2 className="section-title">AI Services That Drive<br />Measurable Outcomes</h2>
            <p className="section-subtitle">
              From strategy through deployment, our end-to-end AI capabilities address
              the full spectrum of enterprise intelligence challenges.
            </p>
          </div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
              <div className="spinner" style={{ width: 40, height: 40 }} />
            </div>
          ) : (
            <div className="grid-4">
              {services.slice(0, 8).map((service) => (
                <div key={service.id} className="card">
                  <div className="icon-box">{service.icon}</div>
                  <h4 style={{ color: 'var(--white)', marginBottom: '0.75rem' }}>{service.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {service.short_description}
                  </p>
                </div>
              ))}
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button className="btn btn-secondary" onClick={() => setActivePage('services')}>
              View All 14 Services →
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section section-mid">
        <div className="container">
          <div className="grid-4">
            <StatCounter value={150} suffix="+" label="Enterprise Deployments" />
            <StatCounter value={98} suffix="%" label="Client Retention Rate" />
            <StatCounter value={16} suffix="" label="Industries Served" />
            <StatCounter value={40} suffix="%" label="Avg. Time-to-Value Reduction" />
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section section-light" id="industries">
        <div className="container">
          <div style={{ marginBottom: '3.5rem' }}>
            <p className="section-label">Industry Expertise</p>
            <h2 className="section-title">Deep Vertical Knowledge</h2>
            <p className="section-subtitle">
              AI solutions that understand the nuances of your industry — not generic
              technology applied without context.
            </p>
          </div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
              <div className="spinner" style={{ width: 40, height: 40 }} />
            </div>
          ) : (
            <div className="grid-4">
              {industries.slice(0, 8).map((industry) => (
                <div key={industry.id} className="card-dark">
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{industry.icon}</div>
                  <h4 style={{ color: 'var(--white)', marginBottom: '0.5rem' }}>{industry.name}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {industry.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ marginBottom: '3.5rem' }}>
            <p className="section-label">Why 1Touch</p>
            <h2 className="section-title">The Enterprise AI Partner<br />You Can Rely On</h2>
          </div>
          <div className="grid-3">
            {WHY_CHOOSE.map((item) => (
              <div key={item.title} style={{ padding: '0.5rem 0' }}>
                <div style={{ fontSize: '1.5rem', color: 'var(--blue-light)', marginBottom: '1rem' }}>{item.icon}</div>
                <h4 style={{ color: 'var(--white)', marginBottom: '0.75rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section section-mid">
        <div className="container">
          <div style={{ marginBottom: '3.5rem' }}>
            <p className="section-label">Our Methodology</p>
            <h2 className="section-title">From Discovery to Optimization</h2>
            <p className="section-subtitle">
              A proven six-phase engagement model that delivers predictable outcomes
              and sustainable AI capability.
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

      {/* SOLUTIONS */}
      <section className="section section-dark" id="solutions">
        <div className="container">
          <div style={{ marginBottom: '3.5rem' }}>
            <p className="section-label">Featured Solutions</p>
            <h2 className="section-title">Pre-Built AI Solutions</h2>
            <p className="section-subtitle">
              Accelerate deployment with our library of battle-tested AI solution
              frameworks, customized for your enterprise context.
            </p>
          </div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
              <div className="spinner" style={{ width: 40, height: 40 }} />
            </div>
          ) : (
            <div className="grid-3">
              {solutions.map((sol) => (
                <div key={sol.id} className="card">
                  <span className="badge badge-blue" style={{ marginBottom: '1rem' }}>Solution</span>
                  <h4 style={{ color: 'var(--white)', marginBottom: '0.75rem' }}>{sol.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {sol.description}
                  </p>
                  <div className="tag-list">
                    {sol.tech_stack.slice(0, 3).map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TECHNOLOGY LICENSING TEASER */}
      <section className="section section-mid">
        <div className="container">
          <div className="highlight-box">
            <div className="two-col">
              <div>
                <p className="section-label">Technology Licensing</p>
                <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--white)', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
                  License Our AI Platforms
                </h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  Deploy 1Touch proprietary AI platforms under enterprise license. White-label our
                  technology, integrate via API, or embed our models into your products.
                </p>
                <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
                  Explore Licensing Options
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {['Platform Licensing', 'API Access', 'White-Label Software', 'Enterprise Integration'].map((item) => (
                  <div key={item} style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.2)', borderRadius: 6, border: '1px solid var(--border)' }}>
                    <div style={{ color: 'var(--cyan)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>◈</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--white)' }}>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="section section-dark" id="insights">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p className="section-label">Insights</p>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Enterprise AI Intelligence</h2>
            </div>
            <button className="btn btn-secondary" onClick={() => setActivePage('insights')}>View All Insights →</button>
          </div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
              <div className="spinner" style={{ width: 40, height: 40 }} />
            </div>
          ) : (
            <div className="grid-3">
              {insights.map((insight) => (
                <div key={insight.id} className="insight-card">
                  <div className="insight-card-body">
                    <div className="insight-meta">
                      <span className="badge badge-cyan">{insight.category}</span>
                      <span>{insight.read_time} min read</span>
                    </div>
                    <h3 className="insight-title">{insight.title}</h3>
                    <p className="insight-excerpt">{insight.excerpt}</p>
                    <div className="insight-read-more">Read Article →</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section className="section section-mid" id="contact">
        <div className="container">
          <div className="two-col">
            <div>
              <p className="section-label">Get Started</p>
              <h2 className="section-title">Book an Executive<br />Consultation</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Speak with our AI strategy team about your specific business challenges.
                We'll assess your AI readiness and outline a path to measurable outcomes.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: 'var(--cyan)' }}>✉</span>
                  <span style={{ color: 'var(--text-secondary)' }}>enterprise@1touchdevelopment.com</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: 'var(--cyan)' }}>◎</span>
                  <span style={{ color: 'var(--text-secondary)' }}>New York · London · Singapore · Toronto</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: 'var(--cyan)' }}>in</span>
                  <span style={{ color: 'var(--text-secondary)' }}>linkedin.com/company/1touch-development</span>
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
