export interface Service {
  id: number;
  slug: string;
  title: string;
  short_description: string;
  full_description: string;
  business_value: string;
  technologies: string[];
  industries: string[];
  benefits: string[];
  typical_projects: string[];
  icon: string;
  created_at: string;
}

export interface Industry {
  id: number;
  slug: string;
  name: string;
  description: string;
  problems: string[];
  ai_opportunities: string[];
  solutions: string[];
  example_applications: string[];
  icon: string;
  created_at: string;
}

export interface Solution {
  id: number;
  slug: string;
  title: string;
  description: string;
  capabilities: string[];
  use_cases: string[];
  tech_stack: string[];
  created_at: string;
}

export interface Insight {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  published_at: string;
  read_time: number;
  created_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  role: string;
  phone?: string;
  service_interest: string;
  message: string;
  budget_range?: string;
}

export interface NewsletterFormData {
  email: string;
  name?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface HealthStatus {
  status: string;
  db: string;
  timestamp: string;
}
