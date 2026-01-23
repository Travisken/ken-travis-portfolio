"use client"

import { motion, cubicBezier } from "framer-motion";
import { experienceData } from "@/data/experience";
import { ExperienceTimeline } from "../ui/ExperienceTimeline";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: cubicBezier(0.22, 1, 0.36, 1) },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.05 },
  }),
};

export default function ExperienceSection() {
  return (
    <section className="relative mx-auto max-w-6xl max-md:px-4 py-32">
      <ExperienceTimeline />

      <h2 className="mb-20 text-3xl font-semibold text-white">
        Experience
      </h2>

      <div className="flex flex-col gap-28">
        {experienceData.map((exp, index) => (
          <motion.div
            key={exp.company}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            className={`flex flex-col gap-10 md:flex-row ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Spacer column */}
            <div className="hidden md:block md:w-1/2" />

            {/* Card */}
            <div className="md:w-1/2 rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <p className="mb-2 text-sm uppercase tracking-wide text-white/40">
                {exp.period}
              </p>

              <h3 className="text-2xl font-semibold text-white">
                {exp.role}
              </h3>

              <p className="mb-4 text-white/60">
                {exp.company} — {exp.location}
              </p>

              <p className="mb-6 text-white/80">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.stack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    custom={i}
                    variants={tagVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="rounded-full bg-white/10 px-4 py-1 text-sm text-white/70"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
