"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CursorGlowCard({
  title,
  description,
  children,
  className = "",
  animateFrom = "bottom",
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
  animateFrom?: "top" | "left" | "right" | "bottom";
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
  if (!cardRef.current) return;

  const directionMap = {
    top: { y: -60, x: 0 },
    bottom: { y: 60, x: 0 },
    left: { x: -60, y: 0 },
    right: { x: 60, y: 0 },
  };

  const ctx = gsap.context(() => {
    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        ...directionMap[animateFrom],
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          end: "top 40%",
          scrub: true, // 👈 this makes it fluid & reversible
        },
      }
    );
  }, cardRef);

  return () => ctx.revert();
}, [animateFrom]);


  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return (
    <div
      ref={cardRef}
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
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
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
            animateFrom="left"
          >
            <div className="mt-6 flex flex-wrap gap-4">
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black"
              >
                View Resume
              </motion.a>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white"
              >
                Contact Me
              </motion.a>
            </div>
          </CursorGlowCard>

          <CursorGlowCard
            title="Interfaces That Feel Right."
            description="I specialize in modern frontend architecture using React, Next.js, and TypeScript."
            className="md:col-span-4"
            animateFrom="top"
          />

          <CursorGlowCard
            title="Animation With Purpose."
            description="Motion that guides attention and reinforces hierarchy."
            className="md:col-span-2"
            animateFrom="bottom"
          />

          <CursorGlowCard
            title="Native Feel. Web Discipline."
            description="React Native apps with native performance and clean architecture."
            className="md:col-span-2"
            animateFrom="right"
          />

          <CursorGlowCard
            title="Consistency at Scale."
            description="Design systems that grow without losing identity."
            className="md:col-span-3"
            animateFrom="left"
          />

          <CursorGlowCard
            title="Always Learning. Always Shipping."
            description="Curiosity-driven iteration and refinement."
            className="md:col-span-3"
            animateFrom="right"
          />
        </div>
      </div>
    </section>
  );
}
