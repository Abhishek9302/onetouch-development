import type {
  Service,
  Industry,
  Solution,
  Insight,
  ContactFormData,
  NewsletterFormData,
  ApiResponse,
  HealthStatus,
} from './types';
import {
  STATIC_SERVICES,
  STATIC_INDUSTRIES,
  STATIC_SOLUTIONS,
  STATIC_INSIGHTS,
  SITE,
} from './content';

const API = process.env.NEXT_PUBLIC_API_URL || '';

async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  if (!API) throw new Error('API not configured');
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

async function withFallback<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export async function getHealth(): Promise<HealthStatus> {
  return withFallback(
    () => fetchJson<HealthStatus>('/health'),
    { status: 'ok', db: 'static', timestamp: new Date().toISOString() }
  );
}

export async function getServices(): Promise<Service[]> {
  return withFallback(() => fetchJson<Service[]>('/api/services'), STATIC_SERVICES);
}

export async function getIndustries(): Promise<Industry[]> {
  return withFallback(() => fetchJson<Industry[]>('/api/industries'), STATIC_INDUSTRIES);
}

export async function getSolutions(): Promise<Solution[]> {
  return withFallback(() => fetchJson<Solution[]>('/api/solutions'), STATIC_SOLUTIONS);
}

export async function getInsights(): Promise<Insight[]> {
  return withFallback(() => fetchJson<Insight[]>('/api/insights'), STATIC_INSIGHTS);
}

export async function getInsightBySlug(slug: string): Promise<Insight | undefined> {
  try {
    return await fetchJson<Insight>(`/api/insights/${slug}`);
  } catch {
    return STATIC_INSIGHTS.find((i) => i.slug === slug);
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const all = await getServices();
  return all.find((s) => s.slug === slug);
}

export async function getIndustryBySlug(slug: string): Promise<Industry | undefined> {
  const all = await getIndustries();
  return all.find((i) => i.slug === slug);
}

export async function getSolutionBySlug(slug: string): Promise<Solution | undefined> {
  const all = await getSolutions();
  return all.find((s) => s.slug === slug);
}

export async function submitContact(
  data: ContactFormData
): Promise<ApiResponse<{ id: number }>> {
  try {
    return await fetchJson<ApiResponse<{ id: number }>>('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch {
    // Fallback: open mailto so leads never drop when API is offline
    const subject = encodeURIComponent(`Consultation request — ${data.company}`);
    const body = encodeURIComponent(
      [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company}`,
        `Role: ${data.role}`,
        data.phone ? `Phone: ${data.phone}` : '',
        `Interest: ${data.service_interest}`,
        data.budget_range ? `Budget: ${data.budget_range}` : '',
        '',
        data.message,
      ]
        .filter(Boolean)
        .join('\n')
    );
    if (typeof window !== 'undefined') {
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    }
    return { message: 'Opened email client', data: { id: 0 } };
  }
}

export async function subscribeNewsletter(
  data: NewsletterFormData
): Promise<ApiResponse<{ id: number }>> {
  try {
    return await fetchJson<ApiResponse<{ id: number }>>('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch {
    if (typeof window !== 'undefined') {
      const subject = encodeURIComponent('Newsletter subscription');
      const body = encodeURIComponent(`Please add me to the 1touch.ai newsletter.\n\nEmail: ${data.email}${data.name ? `\nName: ${data.name}` : ''}`);
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    }
    return { message: 'Opened email client', data: { id: 0 } };
  }
}
