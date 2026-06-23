"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, cubicBezier } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: cubicBezier(0.22, 1, 0.36, 1),
    },
  },
};

const AnimatedGridPattern = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none"
    viewBox="0 0 1000 1000"
    preserveAspectRatio="none"
  >
    <defs>
      <motion.pattern
        id="grid"
        width="50"
        height="50"
        patternUnits="userSpaceOnUse"
        animate={{
          y: [0, 50],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <circle cx="25" cy="25" r="1" fill="white" />
      </motion.pattern>
    </defs>
    <rect width="1000" height="1000" fill="url(#grid)" />
  </svg>
);

const AnimatedZigzag = () => (
  <motion.svg
    className="absolute -top-20 -right-32 w-96 h-96 opacity-[0.05] pointer-events-none"
    viewBox="0 0 200 200"
    preserveAspectRatio="none"
    animate={{
      rotate: [0, 360],
    }}
    transition={{
      duration: 25,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <polyline
      points="10,50 30,10 50,50 70,10 90,50 110,10 130,50 150,10 170,50 190,10"
      stroke="white"
      strokeWidth="2"
      fill="none"
    />
  </motion.svg>
);

const AnimatedDots = () => (
  <motion.svg
    className="absolute -bottom-40 -left-40 w-80 h-80 opacity-[0.04] pointer-events-none"
    viewBox="0 0 200 200"
    animate={{
      scale: [1, 1.1, 1],
      opacity: [0.04, 0.08, 0.04],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <circle cx="30" cy="30" r="3" fill="white" />
    <circle cx="70" cy="30" r="3" fill="white" />
    <circle cx="110" cy="30" r="3" fill="white" />
    <circle cx="150" cy="30" r="3" fill="white" />
    <circle cx="30" cy="70" r="3" fill="white" />
    <circle cx="70" cy="70" r="3" fill="white" />
    <circle cx="110" cy="70" r="3" fill="white" />
    <circle cx="150" cy="70" r="3" fill="white" />
    <circle cx="30" cy="110" r="3" fill="white" />
    <circle cx="70" cy="110" r="3" fill="white" />
    <circle cx="110" cy="110" r="3" fill="white" />
    <circle cx="150" cy="110" r="3" fill="white" />
    <circle cx="30" cy="150" r="3" fill="white" />
    <circle cx="70" cy="150" r="3" fill="white" />
    <circle cx="110" cy="150" r="3" fill="white" />
    <circle cx="150" cy="150" r="3" fill="white" />
  </motion.svg>
);

const skillsData = [
  {
    category: "Frontend Architecture",
    skills: ["React", "Next.js", "TypeScript", "Vue.js", "Angular"],
  },
  {
    category: "State Management",
    skills: ["Zustand", "Redux Toolkit", "Context API"],
  },
  {
    category: "UI Systems",
    skills: ["Tailwind CSS", "Styled Components", "Design Systems", "Sass"],
  },
  {
    category: "Performance",
    skills: ["SSR", "Caching", "Memoization", "Code Splitting", "Lazy Loading"],
  },
  {
    category: "Testing",
    skills: ["Jest", "React Testing Library", "E2E Testing"],
  },
  {
    category: "Tools & DevOps",
    skills: ["Git", "GitHub", "Chrome DevTools", "GraphQL", "RESTful APIs"],
  },
];

export default function AboutSection() {
  return (
    <>
      <section className="flex flex-col items-center justify-center w-full">
        <section className="relative md:w-7xl min-h-screen items-center justify-center flex overflow-hidden">
          {/* Animated Background Patterns */}
          <AnimatedGridPattern />
          <AnimatedZigzag />
          <AnimatedDots />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-md:px-4 w-full py-30 md:max-w-4xl space-y-10 text-white/60 relative z-10"
          >
            {/* Greeting */}
            <motion.h3
              variants={item}
              className="font-semibold text-2xl md:text-3xl flex items-center gap-3 text-white"
            >
              <Image
                src="/images/handGif.svg"
                height={40}
                width={40}
                alt="waving hand"
                className="waveHand"
              />
              Hello I&apos;m Travis Kensuomo
            </motion.h3>

            {/* Main Description */}
            <motion.div variants={item} className="space-y-4">
              <p>
                I&apos;m a{" "}
                <strong className="text-white">frontend-focused engineer</strong>{" "}
                who thrives at the intersection of{" "}
                <strong className="text-white">
                  design, motion, and performance
                </strong>
                . I care deeply about how products feel just as much as how they
                function, crafting interfaces that are intentional, intuitive,
                and refined.
              </p>

              <p>
                Over the years, I&apos;ve gained{" "}
                <strong className="text-white">
                  proven experience building successful products
                </strong>{" "}
                for clients across
                <strong className="text-white"> several countries</strong>,
                collaborating across time zones and cultures to ship reliable,
                scalable digital solutions that solve real problems.
              </p>

              <p>
                My approach blends{" "}
                <strong className="text-white">
                  strong technical execution
                </strong>{" "}
                with a sharp visual sensibility. I enjoy transforming complex
                requirements into clean systems, paying close attention to
                structure, micro-interactions, and long-term maintainability.
              </p>

              <p>
                I&apos;ve worked across a broad range of problem spaces, which has
                shaped my ability to adapt quickly and think holistically about
                products rather than isolated features.
              </p>
            </motion.div>

            {/* Skills Grid */}
            <motion.div variants={item} className="space-y-5">
              <div>
                <p className="mb-4 text-sm uppercase tracking-wide text-white font-semibold">
                  Core Competencies
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillsData.map((skillGroup, idx) => (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.5,
                          delay: idx * 0.08,
                          ease: cubicBezier(0.22, 1, 0.36, 1),
                        },
                      },
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="p-4 rounded-lg bg-[#202020] transition-all duration-300"
                  >
                    <h4 className="text-sm font-semibold text-white mb-3">
                      {skillGroup.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.skills.map((skill, skillIdx) => (
                        <span
                          key={skillIdx}
                          className="text-xs px-4 py-2 rounded-lg bg-[#181818] text-white/80  transition-colors duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Project Scope */}
            <motion.div variants={item}>
              <p className="mb-4 text-sm uppercase tracking-wide text-neutral-400 font-semibold">
                Project Scope
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-white">
                    Marketing & portfolio websites
                  </strong>
                </li>
                <li>
                  <strong className="text-white">SaaS dashboards</strong> and
                  internal tools
                </li>
                <li>
                  <strong className="text-white">E-commerce experiences</strong>
                </li>
                <li>
                  <strong className="text-white">
                    Data-driven web applications
                  </strong>
                </li>
                <li>
                  <strong className="text-white">
                    Animated, interaction-heavy interfaces
                  </strong>
                </li>
              </ul>
            </motion.div>

            {/* Closing Statement */}
            <motion.p variants={item}>
              I&apos;m also <strong className="text-white">highly adaptable</strong>{" "}
              and
              <strong className="text-white"> quick to learn</strong>. I&apos;m
              comfortable stepping into new codebases, rapidly understanding a
              company&apos;s framework, and catching up fast to deliver value without
              slowing the team down.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={item} className="pt-4">
              <Link
                href="/resume"
                className="inline-block  rounded-lg  text-white bg-[#181818] font-semibold py-3 px-8 hover:text-white hover:border-white duration-300 ease-in-out hover:bg-white/2 transition-all"
              >
                View My Resume
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </section>
    </>
  );
}