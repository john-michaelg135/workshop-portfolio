import { Project, Experience, SocialLink, NavLink } from "@/types";

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
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
    tags: ["Python", "TypeScript", "D3.js"],
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
  "Pyhon",
  "REST APIs",
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
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    startDate: "2022",
    endDate: "Present",
    description:
      "Leading frontend architecture for a SaaS platform serving 50K+ users. Implemented design system, improved Core Web Vitals by 40%, and mentored junior developers.",
  },
  {
    id: "exp-2",
    jobTitle: "Fullstack Developer",
    company: "StartupXYZ",
    startDate: "2020",
    endDate: "2022",
    description:
      "Built and shipped 3 client-facing products from ideation to launch. Worked across the stack with React, Node.js, and PostgreSQL in an agile team.",
  },
  {
    id: "exp-3",
    jobTitle: "Junior Developer",
    company: "Digital Agency Co.",
    startDate: "2019",
    endDate: "2020",
    description:
      "Developed responsive websites and interactive experiences for various clients. Gained expertise in modern CSS, accessibility, and performance optimization.",
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
