// Resume Data Types
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date?: string;
}

export interface ResumeData {
  id?: string;
  personalInfo: PersonalInfo;
  education: Education[];
  skills: string[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  template: TemplateType;
  createdAt?: string;
  updatedAt?: string;
}

export type TemplateType = 'minimal' | 'corporate' | 'creative' | 'tech' | 'executive';

export type FormStep = 
  | 'personal'
  | 'education'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'certifications'
  | 'achievements';

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  plan: 'free' | 'pro' | 'enterprise';
  resumeCount: number;
}

export interface PricingTier {
  name: string;
  price: number;
  period: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

export interface AIResponse {
  improved: string;
  suggestions: string[];
  atsScore?: number;
  keywords?: string[];
}

export const FORM_STEPS: { key: FormStep; label: string; icon: string }[] = [
  { key: 'personal', label: 'Personal Info', icon: '👤' },
  { key: 'education', label: 'Education', icon: '🎓' },
  { key: 'skills', label: 'Skills', icon: '⚡' },
  { key: 'experience', label: 'Experience', icon: '💼' },
  { key: 'projects', label: 'Projects', icon: '🚀' },
  { key: 'certifications', label: 'Certifications', icon: '📜' },
  { key: 'achievements', label: 'Achievements', icon: '🏆' },
];

export const TEMPLATES: { key: TemplateType; name: string; description: string }[] = [
  { key: 'minimal', name: 'Minimal', description: 'Clean and simple design' },
  { key: 'corporate', name: 'Corporate', description: 'Professional business style' },
  { key: 'creative', name: 'Creative', description: 'Bold and colorful design' },
  { key: 'tech', name: 'Tech', description: 'Modern developer-focused' },
  { key: 'executive', name: 'Executive', description: 'Sophisticated premium look' },
];
