export interface Experience {
  id: number;
  company: string;
  location: string;
  role: string;
  period: string;
  year: string;
  description: string;
  achievements: string[];
  stack: string[];
  image: string;
  status: string;
  category: string;
  link: string;
  featured?: boolean;
}

export const experienceData: Experience[] = [
  {
    id: 1,
    company: "Olotu Square",
    location: "Rivers State, Nigeria",
    role: "Contract Frontend Developer",
    period: "Mar 2025 — Jun 2025",
    year: "2025",
    category: "Healthcare SaaS",
    status: "Completed",
    image: "/images/olotu-square.png",
    description:
      "Architected and delivered a multi-module pharmacy management system supporting inventory tracking, prescription management, sales monitoring, and operational workflows.",
    achievements: [
      "Led frontend architecture for a pharmacy management platform spanning inventory, prescriptions, sales, and reporting modules.",
      "Designed reusable component patterns and shared UI systems that accelerated feature development across modules.",
      "Translated complex pharmacy workflows into intuitive interfaces that reduced operational friction for end users.",
      "Collaborated closely with stakeholders to refine requirements and deliver production-ready solutions aligned with business objectives.",
    ],
    stack: ["React", "Next.js", "TypeScript", "TailwindCSS"],
    link: "#",
    featured: true,
  },

  {
    id: 2,
    company: "Jadaad Technologies",
    location: "Ghana",
    role: "Web Developer Intern",
    period: "Sep 2024 — May 2025",
    year: "2025",
    category: "Dashboard Development",
    status: "Completed",
    image: "/images/jadaad.png",
    description:
      "Built and maintained dashboard applications while contributing to scalable frontend systems and cross-functional product delivery.",
    achievements: [
      "Converted business requirements into production-ready dashboard experiences.",
      "Implemented reusable UI components that improved consistency.",
      "Collaborated with product and engineering teams.",
      "Improved frontend code quality through abstraction and reviews.",
    ],
    stack: ["React", "Next.js", "TypeScript"],
    link: "#",
  },

  {
    id: 3,
    company: "Olotu Square",
    location: "Rivers State, Nigeria",
    role: "Outsource Frontend Developer",
    period: "Apr 2024 — Sep 2024",
    year: "2024",
    category: "E-Commerce",
    status: "Completed",
    image: "/images/olotu-admin.png",
    description:
      "Designed and developed a responsive e-commerce administration platform.",
    achievements: [
      "Built a scalable administration dashboard.",
      "Implemented responsive layouts.",
      "Established reusable frontend architecture.",
      "Optimized administrative workflows.",
    ],
    stack: ["React", "Next.js", "TypeScript", "TailwindCSS"],
    link: "#",
  },

  {
    id: 4,
    company: "Shopbot Africa",
    location: "Remote",
    role: "Contract Frontend Developer",
    period: "May 2024",
    year: "2024",
    category: "Corporate Website",
    status: "Completed",
    image: "/images/shopbot-corporate.png",
    description:
      "Delivered a modern corporate website focused on performance, responsiveness, and brand presentation.",
    achievements: [
      "Developed a high-performance marketing website.",
      "Implemented accessibility best practices.",
      "Translated branding requirements into polished UI.",
      "Delivered within tight timelines.",
    ],
    stack: ["Next.js", "TypeScript", "TailwindCSS"],
    link: "#",
  },

  {
    id: 5,
    company: "Shopbot Africa",
    location: "Bayelsa State, Nigeria",
    role: "Frontend Developer",
    period: "Oct 2023 — Apr 2024",
    year: "2024",
    category: "Logistics",
    status: "Completed",
    image: "/images/shopbot-logistics.png",
    description:
      "Developed customer-facing logistics solutions for delivery tracking and order management.",
    achievements: [
      "Built delivery and tracking applications.",
      "Created reusable frontend patterns.",
      "Optimized performance.",
      "Collaborated across teams.",
    ],
    stack: [
      "Angular",
      "Ionic",
      "TypeScript",
      "TailwindCSS",
      "Styled Components",
    ],
    link: "#",
  },

  {
    id: 6,
    company: "Bayelsa Tech Hub",
    location: "Bayelsa State, Nigeria",
    role: "Frontend Developer Intern",
    period: "Jan 2023 — Aug 2023",
    year: "2023",
    category: "Internship",
    status: "Completed",
    image: "/images/bth.png",
    description:
      "Built foundational frontend engineering skills through collaborative web application development.",
    achievements: [
      "Developed responsive web applications.",
      "Applied accessibility best practices.",
      "Worked on real-world collaborative projects.",
      "Strengthened component architecture skills.",
    ],
    stack: ["React", "Vue.js", "Angular", "JavaScript", "TailwindCSS"],
    link: "#",
  },
];
