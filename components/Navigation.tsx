'use client';

import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Industries', id: 'industries' },
  { label: 'Solutions', id: 'solutions' },
  { label: 'Insights', id: 'insights' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

interface NavigationProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Navigation({ activePage, setActivePage }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setActivePage(id);
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className="nav"
        style={{
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <div className="nav-inner">
          <div className="nav-logo">
            <div className="nav-logo-mark">1T</div>
            <span>1Touch Development</span>
          </div>

          <ul className="nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-link ${activePage === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  style={{ background: 'none', border: 'none', fontFamily: 'inherit' }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="nav-cta">
            <button
              className="btn btn-primary"
              style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}
              onClick={() => handleNavClick('contact')}
            >
              Book Consultation
            </button>
            <button
              className="nav-mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className="mobile-nav-link"
            onClick={() => handleNavClick(item.id)}
            style={{ background: 'none', border: 'none', fontFamily: 'inherit', textAlign: 'left', width: '100%' }}
          >
            {item.label}
          </button>
        ))}
        <button
          className="btn btn-primary"
          style={{ marginTop: '1.5rem' }}
          onClick={() => handleNavClick('contact')}
        >
          Book Consultation
        </button>
      </div>
    </>
  );
}
