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

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
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

export async function getHealth(): Promise<HealthStatus> {
  return fetchJson<HealthStatus>('/health');
}

export async function getServices(): Promise<Service[]> {
  return fetchJson<Service[]>('/api/services');
}

export async function getIndustries(): Promise<Industry[]> {
  return fetchJson<Industry[]>('/api/industries');
}

export async function getSolutions(): Promise<Solution[]> {
  return fetchJson<Solution[]>('/api/solutions');
}

export async function getInsights(): Promise<Insight[]> {
  return fetchJson<Insight[]>('/api/insights');
}

export async function getInsightBySlug(slug: string): Promise<Insight> {
  return fetchJson<Insight>(`/api/insights/${slug}`);
}

export async function submitContact(
  data: ContactFormData
): Promise<ApiResponse<{ id: number }>> {
  return fetchJson<ApiResponse<{ id: number }>>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function subscribeNewsletter(
  data: NewsletterFormData
): Promise<ApiResponse<{ id: number }>> {
  return fetchJson<ApiResponse<{ id: number }>>('/api/newsletter', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
