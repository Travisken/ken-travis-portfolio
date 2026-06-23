export interface Project {
  id: number;
  title: string;
  company: string;
  category: string;
  status: string;
  year: string;
  image: string;
  description: string;
  technologies: string[];
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
    image: "/images/3mtt-img.JPG",
    description:
      "Mentoring and training aspiring developers through the 3MTT initiative at Olotu Square. Covering modern web development, version control, frontend frameworks, and industry best practices.",
    technologies: [
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
    image: "/projects/pharmacy.jpg",
    description:
      "A comprehensive pharmacy management platform handling inventory, POS operations, branch management, prescriptions, staff administration, reporting, purchasing, and business analytics.",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind",
      "Zustang",
      "Shadcn",
      "Vite",
    ],
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
    image: "/images/dr-nimbs-img.png",
    description:
      "Designed and developed a professional portfolio website showcasing expertise, achievements, services, and personal branding for Dr. Akinsiku.",
    technologies: ["NextJs", "TypeScript", "Tailwind", "Firebase"],
    link: "#",
  },

  {
    id: 4,
    title: "Upscale",
    company: "Upscale",
    category: "Business Growth Platform",
    status: "Building",
    year: "2026",
    image: "/projects/upscale.jpg",
    description:
      "A digital growth agency platform helping businesses increase visibility through SEO, custom websites, branding, and social media management strategies.",
    technologies: ["Next.js", "SEO", "React", "Tailwind"],
    link: "#",
  },

  {
    id: 5,
    title: "OptiQuest",
    company: "OptiQuest",
    category: "Social Engagement Platform",
    status: "Building",
    year: "2026",
    image: "/images/optiquest-img.png",
    description:
      "A reward-driven engagement platform where users complete social tasks such as follows, likes, comments, and shares to earn points while helping businesses grow their online presence.",
    technologies: ["NextJs", "Firebase", "TypeScript"],
    link: "#",
  },
];