"use client"

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TechMarquee from "../animations/TechMarque";
import { Project, projects } from "@/data/projects";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function UpTo() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Card animations
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".project-card");

        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: index * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#0a0a0a] flex flex-col items-center w-full overflow-hidden justify-center px-4 md:px-8 py-20">
      <div className="mx-auto max-w-56">
        <TechMarquee />
      </div>

      <h1
        ref={headingRef}
        className="capitalize mt-8 font-medium text-3xl text-white text-center"
      >
        Here&apos;s what I&apos;ve been up to.
      </h1>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto mt-20 max-w-7xl w-full"
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project; index: number }) {
  const [imgError, setImgError] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.08,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleButtonTap = () => {
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 1 },
        { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, ease: "power1.inOut" }
      );
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="project-card cursor-pointer group rounded-2xl flex flex-col gap-4 p-4 border border-[#212121] bg-[#111111]/60 backdrop-blur-sm"
    >
      <div className="relative overflow-hidden rounded-xl h-52 bg-[#171717]">
        {imgError || !project.image ? (
          <>
            {/* alternative for failed image */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-bold text-white/10">
                {project.title
                  .split(" ")
                  .map((w: string) => w[0])
                  .join("")}
              </span>
            </div>
          </>
        ) : (
          <div ref={imageRef} className="relative w-full h-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs px-3 py-1 rounded-full bg-[#1b1b1b] text-white/70">
          {project.category}
        </span>

        <span className="text-xs text-white/50">
          {project.status}
        </span>
      </div>

      <h2 className="text-2xl font-semibold text-white">
        {project.title}
      </h2>

      <p className="text-sm text-white/70 leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech: string) => (
          <span
            key={tech}
            className="text-xs px-2 py-1 rounded-md bg-[#1b1b1b] text-white/60"
          >
            {tech}
          </span>
        ))}
      </div>

      <button
        ref={buttonRef}
        onClick={handleButtonTap}
        className="mt-auto bg-[#212121] hover:bg-[#2a2a2a] transition-colors w-fit px-6 py-2 rounded-md text-sm"
      >
        View Project
      </button>
    </div>
  );
}