"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import StaggerText from "@/components/animations/StaggerText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const purpleRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!headingRef.current || !purpleRef.current || !imgRef.current || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",       // when top of section hits top of viewport
        end: "+=800",           // animation will complete over 500px of scroll
        scrub: true,            // smooth scrubbing
        pin: true,              // pin the section during animation
        anticipatePin: 1,       // smoother pinning
      },
    });

    // Heading shrinks and moves left
    tl.to(headingRef.current, {
      scale: 0.7,
      // x: -50,
      transformOrigin: "left center",
      ease: "power2.out",
    });

    // Purple div grows
    tl.to(
      purpleRef.current,
      {
        scale: 1.0,
        ease: "power2.out",
      },
      "<" // start simultaneously
    );

    // Image fades in
    tl.to(
      imgRef.current,
      {
        opacity: 1,
        ease: "power2.out",
        duration: 1,
      },
      "<"
    );

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen overflow-hidden w-full items-center justify-between px-24"
    >
      {/* Heading */}
      <div ref={headingRef} className="relative z-10 max-w-xl">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <StaggerText>
            <p className="text-3xl mb-4 text-gray-500">
             👨🏽‍💻 Kensuomo Travis
            </p>
            <h1 className="text-[10rem] font-bricolage leading-30 font-[1000]">
              Crafting
              <span className="text-gray-500 text-[5rem] font-shadows font-extralight italic mx-8">
                Immersive
              </span>
              <br />
              <span className="text-gray-500 text-[5rem] font-quicksand font-extralight italic mx-8">
                Digital
              </span>
              Experiences
            </h1>
          </StaggerText>
        </motion.div>
      </div>

      {/* Purple div */}
      <div
        ref={purpleRef}
        className="bg-[#230C33] cursor-pointer h-120 w-80 rounded-lg absolute top-30 right-20 flex items-center justify-center overflow-hidden"
      >
        {/* Image */}
        <Image
          ref={imgRef}
          src="/images/hero-img.JPG" // replace with your image path
          alt="Hero"
          fill
          className="opacity-0 w-full h-full object-cover filter grayscale transition-all duration-500 ease-in-out hover:filter-none"
        />
      </div>
    </section>
  );
}
