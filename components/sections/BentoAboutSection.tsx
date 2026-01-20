"use client";

import { useState } from "react";
import { motion } from "framer-motion";

function CursorGlowCard({
  title,
  description,
  children,
  className = "",
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden rounded-3xl cursor-pointer bg-[#212121] p-6 ${className}`}
    >
      {/* Base Border */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/5" />

      {/* Cursor Border Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl border border-white"
        style={{
          WebkitMaskImage: `radial-gradient(
        120px 120px at ${pos.x}px ${pos.y}px,
        black 0%,
        black 40%,
        transparent 70%
      )`,
          maskImage: `radial-gradient(
        120px 120px at ${pos.x}px ${pos.y}px,
        black 0%,
        black 40%,
        transparent 70%
      )`,
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Cursor Glow */}
      <motion.div
        className="pointer-events-none absolute h-64 w-64 rounded-full bg-white"
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
          filter: "blur(60px)",
        }}
        animate={{ opacity: hovered ? 0.35 : 0 }}
        transition={{ duration: 0.15 }}
      />

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="mt-2 max-w-md text-sm text-white/70">{description}</p>
        {children}
      </div>
    </div>
  );
}

export { CursorGlowCard };

export default function AboutSection() {
  return (
    <section className="bg-[#0a0a0a] flex items-center justify-center px-8 py-20">
      <div className="max-w-6xl">
        {/* Header */}
        <div className="mb-12 items-start grid grid-cols-1 gap-6 md:grid-cols-2">
          <h1 className="text-5xl font-bold leading-tight">
            Built Through Curiosity.
            <br />
            Refined by Craft.
          </h1>
          <p className="max-w-md text-white/60">
            I design and build digital experiences that feel intentional,
            performant, and alive from polished interfaces to animated systems
            that scale.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-6 md:grid-rows-3">
          <CursorGlowCard
            title="Explore My Work"
            description="Dive deeper into my background, process, and experience or view my resume for a focused snapshot."
            className="md:col-span-2 md:row-span-2"
          >
            <div className="mt-6 flex flex-wrap gap-4">
              {/* Resume Button */}
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90"
              >
                View Resume
              </motion.a>

              {/* About Page Button */}
              <motion.a
                href="/about"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
              >
                About Me
              </motion.a>
            </div>
          </CursorGlowCard>

          <CursorGlowCard
            title="Interfaces That Feel Right."
            description="I specialize in modern frontend architecture using React, Next.js, and TypeScript. My focus is on building interfaces that are fast, accessible, and emotionally engaging through thoughtful motion and layout."
            className="md:col-span-4 md:row-span-1"
          />

          <CursorGlowCard
            title="Animation With Purpose."
            description="I use Framer Motion, GSAP, and Three.js to enhance clarity not distract from it. Motion in my work guides attention, reinforces hierarchy, and makes products feel alive."
            className="md:col-span-2"
          />

          <CursorGlowCard
            title="Native Feel. Web Discipline."
            description="As a React Native developer, I build mobile apps that feel truly native while maintaining clean, scalable architecture. Performance and usability are non-negotiable."
            className="md:col-span-2"
          />

          <CursorGlowCard
            title="Consistency at Scale."
            description="I think in systems reusable components, motion tokens, spacing rules, and typography scales. This allows products to grow without losing clarity or identity."
            className="md:col-span-3"
          />

          <CursorGlowCard
            title="Always Learning. Always Shipping."
            description="I’m driven by curiosity and iteration. I learn fast, ship intentionally, and refine relentlessly because great products are built, tested, and improved, not rushed."
            className="md:col-span-3"
          />
        </div>
      </div>
    </section>
  );
}
