"use client";

import { experienceData } from "@/data/experience";
import { motion, cubicBezier } from "framer-motion";
import { CheckCheck, Mail, MapPinHouse, Smartphone } from "lucide-react";
import Link from "next/link";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
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

const AnimatedAccentLine = () => (
  <motion.div
    className="absolute top-0 left-0 h-1 bg-linear-to-r from-purple-500/50 via-purple-400/30 to-transparent"
    initial={{ width: 0 }}
    animate={{ width: "100%" }}
    transition={{ duration: 1.5, ease: "easeOut" }}
  />
);

export default function ResumeSection() {
  return (
    <section className="flex flex-col items-center justify-center w-full min-h-screen py-20">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-md:px-4 w-full md:max-w-4xl flex flex-col gap-8 text-white/70"
      >
        {/* Header */}
        <motion.div variants={item} className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Travis Kensuomo
          </h1>
          <p className="text-lg text-white/50 font-light">Frontend Developer</p>
          <div className="h-px bg-linear-to-r from-purple-500/30 to-transparent mt-4" />
        </motion.div>

        {/* Contact Info */}
        <motion.div
          variants={item}
          className="flex flex-wrap gap-6 text-sm text-white/60"
        >
          <div className="flex items-center gap-2">
            <span className="text-white">
              <MapPinHouse size={20} />
            </span>
            <span>Yenagoa, Bayelsa State, Nigeria</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white">
              <Mail size={20} />
            </span>
            <a
              href="mailto:kentravis37@gmail.com"
              className="hover:text-white transition-colors"
            >
              kentravis37@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white">
              <Smartphone size={20} />
            </span>
            <span>(234) 703-944-4495</span>
          </div>
        </motion.div>

        {/* Professional Summary */}
        <motion.div variants={item} className="space-y-4">
          <div className="relative">
            <motion.div
              className="absolute -left-4 top-0 bottom-0 w-1 bg-linear-to-b from-purple-500/50 to-purple-400/20"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 0.8 }}
              style={{ transformOrigin: "top" }}
            />
            <h2 className="text-xl font-semibold text-white mb-3">
              Professional Summary
            </h2>
          </div>
          <ul className="space-y-3 text-white/60">
            <li className="flex gap-3">
              <span className="text-white shrink-0 mt-1">
                <CheckCheck size={20} />
              </span>
              <span>
                Accomplished Certified Frontend Developer with extensive
                experience in developing and standardizing world-class projects
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-white shrink-0 mt-1">
                <CheckCheck size={20} />
              </span>
              <span>
                Proven track record of initiating and delivering successful
                projects to improve systems and performance in large, complex
                production environments
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-white shrink-0 mt-1">
                <CheckCheck size={20} />
              </span>
              <span>
                Dedicated Frontend Developer with a passion for creating
                seamless, intuitive user experiences with keen attention to
                design and functionality
              </span>
            </li>
          </ul>
        </motion.div>

        {/* Work Experience */}
        <motion.div variants={item} className="space-y-6">
          <div className="relative">
            <motion.div
              className="absolute -left-4 top-0 bottom-0 w-1 bg-linear-to-b from-purple-500/50 to-purple-400/20"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ transformOrigin: "top" }}
            />
            <h2 className="text-xl font-semibold text-white mb-4">
              Work Experience
            </h2>
          </div>

          <div className="space-y-6">
            {experienceData.map((experience, index) => (
              <motion.div
                key={`${experience.company}-${index}`}
                variants={item}
                className="p-4 rounded-lg border border-white/5 bg-white/[0.02]"
              >
                <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-white">
                    {experience.role}
                  </h3>

                  <span className="text-sm text-white font-mono">
                    {experience.period}
                  </span>
                </div>

                <p className="text-white/60 mb-3 flex text-sm items-baseline font-medium">
                  <span className="text-white mr-2 text-base">{experience.company},</span>
                  {experience.location}
                </p>

                <p className="text-white/60 text-sm mb-4">
                  {experience.description}
                </p>

                <ul className="space-y-2">
                  {experience.achievements.map((achievement) => (
                    <li
                      key={achievement}
                      className="flex gap-2 text-sm text-white/60"
                    >
                      <span className="text-purple-400/50">▪</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mt-4">
                  {experience.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-md text-white bg-[#181818]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills & Technical */}
        <motion.div
          variants={item}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Technical Skills */}
          <div className="space-y-4">
            <div className="relative">
              <motion.div
                className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500/50 to-purple-400/20"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ transformOrigin: "top" }}
              />
              <h3 className="text-lg font-semibold text-white mb-4">
                Technical Skills
              </h3>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-white/50 mb-2">
                  Languages & Core
                </p>
                <p className="text-white">
                  HTML, CSS, JavaScript, TypeScript
                </p>
              </div>
              <div>
                <p className="text-white/50 mb-2">Frameworks</p>
                <p className="text-white">React, Next.js, Vue.js, Angular</p>
              </div>
              <div>
                <p className="text-white/50 mb-2">Styling</p>
                <p className="text-white">
                  TailwindCSS, Styled Components, Sass
                </p>
              </div>
              <div>
                <p className="text-white/50 mb-2">
                  State Management
                </p>
                <p className="text-white">
                  Redux Toolkit, Zustand, Context API
                </p>
              </div>
              <div>
                <p className="text-white/50 mb-2">APIs & Data</p>
                <p className="text-white">
                  RESTful APIs, GraphQL, JSON, XML
                </p>
              </div>
              <div>
                <p className="text-white/50 mb-2">Tools & DevOps</p>
                <p className="text-white">
                  Git, GitHub, Chrome DevTools, Jest, React Testing Library
                </p>
              </div>
            </div>
          </div>

          {/* Soft Skills */}
          <div className="space-y-4">
            <div className="relative">
              <motion.div
                className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500/50 to-purple-400/20"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ transformOrigin: "top" }}
              />
              <h3 className="text-lg font-semibold text-white mb-4">
                Soft Skills
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-2 text-sm">
              {[
                "Communication",
                "Problem Solving",
                "Time Management",
                "Fast Learner",
                "Attention to Detail",
                "Natural Leadership",
                "Creative Thinking",
                "Collaboration",
              ].map((skill, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-2 text-white/70"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <span>{skill}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/5"
        >
          <Link
            href="/about"
            className="h-fit flex-1 sm:flex-none  rounded-lg text-white bg-[#181818] font-medium py-3 px-6 duration-300 ease-in-out transition-all text-center"
          >
            Back to About
          </Link>
          <a
            href="https://docs.google.com/document/d/1vyCjovN5lD63TgtXZ62T3E0pHjKs8b10R3kABVOpPR8/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none h-fit rounded-lg px-6 py-3 bg-white text-[#181818] font-medium duration-300 ease-in-out transition-all text-center"
          >
            Download PDF
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
