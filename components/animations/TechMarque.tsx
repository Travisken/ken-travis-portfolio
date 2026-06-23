import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaGitAlt,
  FaGithub,
  FaAngular,
  FaReact,
} from "react-icons/fa";

import {
  SiTypescript,
  SiFirebase,
  SiIonic,
  SiExpo,
  SiVite,
  SiNextdotjs,
} from "react-icons/si";

const technologies = [
  { name: "HTML", icon: FaHtml5 },
  { name: "CSS", icon: FaCss3Alt },
  { name: "JavaScript", icon: FaJs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Git", icon: FaGitAlt },
  { name: "GitHub", icon: FaGithub },
  { name: "Firebase", icon: SiFirebase },
  { name: "Angular", icon: FaAngular },
  { name: "Ionic", icon: SiIonic },
  { name: "Expo", icon: SiExpo },
  { name: "React Native", icon: FaReact },
  { name: "Vite", icon: SiVite },
  { name: "Next.js", icon: SiNextdotjs },
];

export default function TechMarquee() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
      }}
    >
      {/* Marquee */}
      <div className="animate-marquee flex w-max gap-6">
        {[...technologies, ...technologies].map((tech, index) => {
          const Icon = tech.icon;

          return (
            <div key={index} className="flex items-center justify-center">
              <Icon className="h-10 w-10 grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100" />
            </div>
          );
        })}
      </div>
    </div>
  );
}