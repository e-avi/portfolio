export type Project = {
  title: string;
  description: string;
  stack: string[];
  status: string;
  link?: string;
  repo?: string;
};

export type Experience = {
  role: string;
  organization: string;
  period: string;
  location: string;
  summary: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export const portfolio = {
  profile: {
    name: "Avi",
    handle: "avi@portfolio",
    headline: "Software engineer building useful products with a playful edge.",
    roleLine: "Full-stack developer | Systems thinker | Retro OS enjoyer",
    location: "India",
    availability: "Open to internships, collaborations, and ambitious side quests.",
    intro:
      "I like turning rough ideas into calm, usable interfaces. This portfolio has a normal front door for recruiters and a weird little Linux desktop for people who click the shiny button.",
    about:
      "I work across frontend, backend, and product details, with a bias toward clean interaction design and practical engineering. Replace this copy with your real story when you are ready.",
  },
  links: {
    github: "https://github.com",
    linkedin: "https://www.linkedin.com",
    email: "mailto:hello@example.com",
    resumeUrl: "",
    resumeLabel: "Resume PDF not added yet",
  },
  projects: [
    {
      title: "Portfolio OS",
      description:
        "A portfolio split between a polished landing page and a Retro Linux desktop with draggable windows.",
      stack: ["React", "TypeScript", "Vite", "CSS"],
      status: "Building now",
      repo: "https://github.com",
    },
    {
      title: "Signal Board",
      description:
        "A focused dashboard concept for tracking projects, notes, and decisions without drowning in tabs.",
      stack: ["React", "Data modeling", "UX"],
      status: "Prototype",
    },
    {
      title: "Prompt Lab",
      description:
        "A small tool for iterating on prompts, comparing outputs, and keeping the experiments worth repeating.",
      stack: ["TypeScript", "LLMs", "Product"],
      status: "Idea stage",
    },
  ] as Project[],
  experience: [
    {
      role: "Full-stack Developer",
      organization: "Personal Projects",
      period: "2025 - Present",
      location: "Remote",
      summary:
        "Designing and building small, complete products while sharpening frontend systems, APIs, and deployment basics.",
    },
    {
      role: "Student Developer",
      organization: "Learning Lab",
      period: "2024 - Present",
      location: "India",
      summary:
        "Exploring software engineering fundamentals, UI craft, and the habit of shipping work that can be inspected.",
    },
  ] as Experience[],
  skillGroups: [
    {
      label: "Frontend",
      items: ["React", "TypeScript", "CSS", "Responsive UI", "Interaction design"],
    },
    {
      label: "Backend",
      items: ["Node.js", "APIs", "Databases", "Authentication", "System design"],
    },
    {
      label: "Tools",
      items: ["Git", "Vite", "Linux", "Figma", "AI-assisted development"],
    },
  ] as SkillGroup[],
  terminal: {
    motd: "AviOS 0.1 booted. Kernel vibes: stable enough.",
  },
};
