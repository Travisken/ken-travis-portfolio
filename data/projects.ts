export interface Project {
  id: number;
  title: string;
  company: string;
  category: string;
  status: string;
  year: string;
  image: string;
  description: string;
  achievements: string[];
  technologies: string[];
  stack: string[];
  period: string;
  location: string;
  role: string;
  link: string;
  featured?: boolean;
}
export const projects: Project[] = [
  {
    id: 1,
    title: "3MTT Instructor",
    company: "Olotu Square",
    category: "Education",
    status: "Active",
    year: "2026",
    period: "2026 - Present",
    role: "Technical Instructor",
    location: "Nigeria",
    image: "/images/3mtt-img.JPG",
    description:
      "Mentoring and training aspiring developers through the 3MTT initiative.",
    achievements: [
      "Delivered frontend development training.",
      "Mentored aspiring developers.",
      "Created practical learning materials.",
      "Conducted hands-on coding sessions.",
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Git",
      "GitHub",
    ],
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Git",
      "GitHub",
    ],
    link: "#",
  },

  {
    id: 2,
    title: "Pharmacy Management System",
    company: "Spako",
    category: "Healthcare SaaS",
    status: "In Development",
    year: "2026",
    period: "2026 - Present",
    role: "Frontend Engineer",
    location: "Remote",
    image: "/projects/pharmacy.jpg",
    description: "A comprehensive pharmacy management platform.",
    achievements: [
      "Built inventory management.",
      "Developed POS modules.",
      "Implemented branch management.",
      "Created analytics dashboards.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind",
      "Zustand",
      "Shadcn",
      "Vite",
    ],
    stack: ["React", "TypeScript", "Tailwind", "Zustand", "Shadcn", "Vite"],
    link: "#",
    featured: true,
  },

  {
    id: 3,
    title: "Dr. Akinsiku Portfolio",
    company: "Personal Brand",
    category: "Portfolio Website",
    status: "Completed",
    year: "2026",
    period: "2026",
    role: "Frontend Developer",
    location: "Remote",
    image: "/images/dr-nimbs-img.png",
    description:
      "Professional portfolio website showcasing expertise and achievements.",
    achievements: [
      "Designed responsive layouts.",
      "Optimized performance.",
      "Implemented Firebase integration.",
      "Delivered SEO-friendly pages.",
    ],
    technologies: ["NextJs", "TypeScript", "Tailwind", "Firebase"],
    stack: ["NextJs", "TypeScript", "Tailwind", "Firebase"],
    link: "https://www.drnimbs.com/",
  },

  {
    id: 4,
    title: "Upscale",
    company: "Upscale",
    category: "Business Growth Platform",
    status: "Building",
    year: "2026",
    period: "2026 - Present",
    role: "Founder & Frontend Engineer",
    location: "Remote",
    image: "/projects/upscale.jpg",
    description:
      "A digital growth agency platform helping businesses increase visibility.",
    achievements: [
      "Built scalable landing pages.",
      "Focused on SEO optimization.",
      "Implemented reusable UI architecture.",
      "Designed business-focused experiences.",
    ],
    technologies: ["Next.js", "SEO", "React", "Tailwind"],
    stack: ["Next.js", "SEO", "React", "Tailwind"],
    link: "#",
  },

  {
    id: 5,
    title: "OptiQuest",
    company: "OptiQuest",
    category: "Social Engagement Platform",
    status: "Building",
    year: "2026",
    period: "2026 - Present",
    role: "Founder & Frontend Engineer",
    location: "Remote",
    image: "/images/optiquest-img.png",
    description:
      "A reward-driven engagement platform where users complete social tasks to earn points.",
    achievements: [
      "Designed the complete UI/UX.",
      "Implemented authentication.",
      "Integrated Firebase backend.",
      "Built responsive task dashboards.",
    ],
    technologies: ["NextJs", "Firebase", "TypeScript"],
    stack: ["NextJs", "Firebase", "TypeScript"],
    link: "https://optiquest.vercel.app/home",
  },
];
