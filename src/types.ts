export interface SocialLink {
  label: string;
  href: string;
  iconName: 'github' | 'linkedin' | 'twitter' | 'mail';
  username: string;
}

export interface StatItem {
  label: string;
  value: string;
  description: string;
}

export interface UserProfile {
  name: string;
  role: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  availableForHire: boolean;
  avatarUrl: string;
  socialLinks: SocialLink[];
  stats: StatItem[];
  aboutParagraphs: string[];
  education: Array<{
    degree: string;
    institution: string;
    period: string;
  }>;
  experience: Array<{
    role: string;
    company: string;
    period: string;
    description: string;
  }>;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: Array<{
    name: string;
    level: string; // e.g., 'Expert', 'Advanced', 'Proficient'
    years: string;
  }>;
}

export interface Project {
  id: string;
  title: string;
  category: 'Web Application' | 'Design System' | 'Mobile & SaaS' | 'Developer Tool';
  shortDescription: string;
  fullDescription: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  year: string;
  clientOrContext: string;
  highlights: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
