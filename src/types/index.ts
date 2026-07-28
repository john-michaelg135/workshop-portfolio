export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  year: string;
  role: string;
  status: string;
  type: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  skills?: string[];
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  ariaLabel: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuedDate: string;
  credentialId: string;
  verifyUrl: string;
  skills: string[];
}
