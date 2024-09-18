export interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface Experience {
  role: string;
  company: string;
  companyUrl?: string;
  duration: string;
  description: string[];
  skills: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface PortfolioData {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  avatarUrl?: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
    twitter?: string;
  };
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
}

export const portfolioData: PortfolioData = {
  name: "Avi",
  title: "Avi",
  subtitle: "Full Stack Engineer & Web Enthusiast",
  bio: "I build responsive, high-performance web applications with a focus on modern user interfaces, premium design systems, and robust backend architectures. Passionate about clean code, performance optimization, and creating delightful digital experiences.",
  avatarUrl: "/avatar.jpg",
  socials: {
    github: "https://github.com/avi",
    linkedin: "https://linkedin.com/in/avi",
    email: "mailto:avi@example.com",
  },
  skills: [
    {
      category: "Languages",
      skills: ["TypeScript", "JavaScript", "Python", "HTML5", "CSS3", "SQL"],
    },
    {
      category: "Frontend",
      skills: ["React", "Next.js", "Vite", "Tailwind CSS", "Redux Toolkit", "Framer Motion"],
    },
    {
      category: "Backend & Databases",
      skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "GraphQL"],
    },
    {
      category: "Tools & DevOps",
      skills: ["Git", "Docker", "AWS (S3/EC2)", "Vercel", "Linux", "CI/CD"],
    },
  ],
  experience: [
    {
      role: "Senior Software Engineer",
      company: "InnovateTech Labs",
      duration: "2024 - Present",
      description: [
        "Architected and deployed a multi-tenant SaaS platform utilizing React, Node.js, and PostgreSQL, increasing monthly active users by 40%.",
        "Configured automated CI/CD deployment pipelines on AWS using GitHub Actions and Docker, reducing deployment cycle times by 35%.",
        "Mentored junior developers, introduced comprehensive testing practices, and established frontend coding standards.",
      ],
      skills: ["React", "TypeScript", "Node.js", "AWS", "Docker", "CI/CD"],
    },
    {
      role: "Full Stack Developer",
      company: "PixelPerfect Solutions",
      duration: "2022 - 2024",
      description: [
        "Developed and optimized complex dashboard views with interactive chart visualizers and real-time state management.",
        "Refactored legacy REST APIs into highly performant GraphQL queries, decreasing average response latency from 450ms to under 120ms.",
        "Designed and implemented custom responsive component libraries leveraging Tailwind CSS for premium look-and-feel.",
      ],
      skills: ["Next.js", "GraphQL", "Tailwind CSS", "MongoDB", "Redux"],
    },
    {
      role: "Junior Web Developer",
      company: "WebCraft Studio",
      duration: "2020 - 2022",
      description: [
        "Crafted mobile-first promotional websites and e-commerce frontends, ensuring semantic SEO structures and fast load times.",
        "Collaborated closely with UI/UX designers to translate Figma design tokens into clean, reusable CSS classes.",
        "Maintained client websites and integrated third-party payment gateways like Stripe and PayPal.",
      ],
      skills: ["JavaScript", "HTML5", "CSS3", "REST APIs", "Git"],
    },
  ],
  projects: [
    {
      title: "SudoResume",
      description: "An AI-powered platform for building ATS-friendly, highly optimized resumes. Parses resume drafts and provides real-time score analytics and optimization tips.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "OpenAI API"],
      githubUrl: "https://github.com/avi/sudo-resume",
      liveUrl: "https://sudo-resume.example.com",
      featured: true,
    },
    {
      title: "PromptForge",
      description: "A collaborative prompt engineering studio. Design, version control, and debug LLM prompts with variables, testing suites, and playground UI.",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Prisma"],
      githubUrl: "https://github.com/avi/prompt-forge",
      liveUrl: "https://prompt-forge.example.com",
      featured: true,
    },
    {
      title: "QuickTag QR System",
      description: "A dynamic and static QR code generation tool. Track scans, configure redirect links dynamically, and style QR codes with custom frames and gradients.",
      tags: ["React", "Vite", "Tailwind CSS", "MongoDB", "Express"],
      githubUrl: "https://github.com/avi/quicktag",
      liveUrl: "https://quicktag.example.com",
      featured: false,
    },
    {
      title: "OmniAnalytics Dashboard",
      description: "A drag-and-drop analytics dashboard with real-time web-socket updates. Visualizes server metrics, sales conversions, and geographic usage statistics.",
      tags: ["React", "Tailwind CSS", "ChartJS", "Socket.io", "Redis"],
      githubUrl: "https://github.com/avi/omni-analytics",
      liveUrl: "https://omni-analytics.example.com",
      featured: false,
    },
  ],
};
