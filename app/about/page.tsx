"use client";

import Image from "next/image";
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
      ease: cubicBezier(0.22, 1, 0.36, 1), // smooth, fluid ease
    },
  },
};

export default function AboutSection() {
  return (
    <>
    <section className="w-full relative flex justify-center items-start min-h-screen py-30">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-6xl space-y-8 text-white/60"
      >
         <h3 className="font-semibold text-2xl flex  text-white ">
          <Image
            src="/images/handGif.svg"
            height={40}
            width={40}
            alt="waving hand"
            className="waveHand"
          />
          Hello I&apos;m Travis Kensuomo
        </h3>
        <motion.p variants={item}>
          I’m a <strong className="text-white">frontend-focused engineer</strong> who
          thrives at the intersection of <strong className="text-white">design,
          motion, and performance</strong>. I care deeply about how products feel
          just as much as how they function, crafting interfaces that are
          intentional, intuitive, and refined.
        </motion.p>

        <motion.p variants={item}>
          Over the years, I’ve gained <strong className="text-white">proven experience
          building successful products</strong> for clients across
          <strong className="text-white"> several countries</strong>, collaborating
          across time zones and cultures to ship reliable, scalable digital
          solutions that solve real problems.
        </motion.p>

        <motion.p variants={item}>
          My approach blends <strong className="text-white">strong technical
          execution</strong> with a sharp visual sensibility. I enjoy transforming
          complex requirements into clean systems, paying close attention to
          structure, micro-interactions, and long-term maintainability.
        </motion.p>

        <motion.p variants={item}>
          I’ve worked across a broad range of problem spaces, which has shaped my
          ability to adapt quickly and think holistically about products rather
          than isolated features.
        </motion.p>

        <motion.div variants={item}>
          <p className="mb-3 text-sm uppercase tracking-wide text-neutral-400">
            Project Scope
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-white">Marketing & portfolio websites</strong>
            </li>
            <li>
              <strong className="text-white">SaaS dashboards</strong> and internal tools
            </li>
            <li>
              <strong className="text-white">E-commerce experiences</strong>
            </li>
            <li>
              <strong className="text-white">Data-driven web applications</strong>
            </li>
            <li>
              <strong className="text-white">Animated, interaction-heavy interfaces</strong>
            </li>
          </ul>
        </motion.div>

        <motion.p variants={item}>
          I’m also <strong className="text-white">highly adaptable</strong> and
          <strong className="text-white"> quick to learn</strong>. I’m comfortable
          stepping into new codebases, rapidly understanding a company’s framework,
          and catching up fast to deliver value without slowing the team down.
        </motion.p>
      </motion.div>


      <div className="bg-red-400 max-w-7xl ">

      </div>
    </section>
    </>
    
  );
}
