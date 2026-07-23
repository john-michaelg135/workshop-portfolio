import { Project, Experience, SocialLink, NavLink, Certificate } from "@/types";

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certs", href: "#certificates" },
  { label: "Archive", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const heroData = {
  heading: "Hi! I'm KAEL GARCIA",
  subtext:
    "Aspiring Data Analyst eager to explore diverse opportunities to grow technical and analytical skills, while also bringing creativity through a passion for photography that captures inspiring perspectives.",
  ctaPrimary: "See My Work",
  ctaSecondary: "Get In Touch",
};

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Acadence — AI Academic Tasks Tracker",
    description:
      "An academic tracker application enhanced with AI-powered voice-to-text technology, designed to streamline note-taking, progress monitoring, and task management for students and educators.",
    image: "/assets/project1_acadence.png",
    tags: ["Python", "CustomTkinter", "SQLITE3", "AI (Whisper)"],
    year: "2026",
    role: "Fullstack Developer",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/john-michaelg135/acadence-ai-voice-text.git",
  },
];

export const skills: string[] = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "GraphQL",
  "Docker",
  "C#",
  "Figma",
  "Git",
  "Python",
  "REST APIs",
  "Machine Learning",
  "Transcription",
  "Speech Evaluation",
  "Retail",
  "Sales",
];

export const aboutData = {
  description:
    "I am an aspiring Data Analyst eager to explore diverse job opportunities across industries, where I can acquire, apply, and expand my technical and analytical skills while showcasing my expertise along the way; at the same time, I bring a creative dimension through my passion for photography, capturing moments and perspectives that inspire and complement my professional journey.",
  additionalInfo:
    "When I'm not coding, you'll find me exploring new design trends, contributing to open source, or experimenting with creative coding projects. I believe great software starts with understanding people.",
};

export const experiences: Experience[] = [
  {
    id: "exp-1",
    jobTitle: "Data Services Specialist",
    company: "RWS Group",
    startDate: "Jul 2026",
    endDate: "Present",
    description:
      "Collaborated with RWS as a Data Services Specialist, supporting multilingual data annotation and AI workflow optimization projects. Contributed to cross-regional initiatives under the APAC and EMEA time zones, delivering structured datasets and workflow documentation aligned with client standards.",
    skills: ["Artificial Intelligence (AI)", "Machine Learning", "Transcription", "Speech Evaluation"],
  },
  {
    id: "exp-2",
    jobTitle: "Sales Associate",
    company: "Aice Brands Ice Cream Philippines Inc.",
    startDate: "Apr 2020",
    endDate: "Jun 2022",
    description:
      "Delivered personalized customer service by identifying and responding to individual preferences, boosting customer satisfaction and repeat business. Managed product inventory and coordinated supply restocking to ensure consistent availability of popular items. Promoted seasonal and new products to drive sales and meet store targets.",
    skills: ["Retail", "Sales"],
  },
];

export const socialLinks: SocialLink[] = [
  {
    id: "social-github",
    platform: "github",
    url: "https://github.com/john-michaelg135",
    ariaLabel: "Visit GitHub profile",
  },
  {
    id: "social-linkedin",
    platform: "linkedin",
    url: "https://www.linkedin.com/in/garcia-john-michael-n-759450403/",
    ariaLabel: "Visit LinkedIn profile",
  },
  {
    id: "social-instagram",
    platform: "instagram",
    url: "https://instagram.com",
    ariaLabel: "Visit Instagram profile",
  },
];

export const contactData = {
  email: "johnmichaelg046@gmail.com",
  copyright: "© 2026 Kael. All rights reserved.",
};

export const certificates: Certificate[] = [
  {
    id: "cert-mabl",
    title: "mabl Skills Certification: Foundations",
    issuer: "mabl",
    issuedDate: "Jun 2026",
    credentialId: "fuxv7d8tjiv5",
    verifyUrl: "https://verify.skilljar.com/c/fuxv7d8tjiv5",
    skills: ["Artificial Intelligence (AI)", "Automation", "Testing"],
  },
  {
    id: "cert-csharp",
    title: "Foundational C# with Microsoft",
    issuer: "freeCodeCamp",
    issuedDate: "Apr 2025",
    credentialId: "fccd801ea51-8900-4290-86eb-3f42d7d3c5bb-fcswm",
    verifyUrl: "https://freecodecamp.org/certification/fccd801ea51-8900-4290-86eb-3f42d7d3c5bb/foundational-c-sharp-with-microsoft",
    skills: ["C#", "Debugging", ".NET"],
  },
];
