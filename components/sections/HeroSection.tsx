"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import StaggerText from "@/components/animations/StaggerText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Info } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const purpleRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const aboutBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (
      !headingRef.current ||
      !purpleRef.current ||
      !imgRef.current ||
      !sectionRef.current ||
      !aboutBtnRef.current
    )
      return;

    // Hide button initially
    gsap.set(aboutBtnRef.current, {
      opacity: 0,
      y: 20,
      pointerEvents: "none",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=700",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Heading shrinks
    tl.to(headingRef.current, {
      scale: 0.7,
      transformOrigin: "left center",
      ease: "power2.out",
    });

    // Purple div grows
    tl.to(
      purpleRef.current,
      {
        scale: 1,
        ease: "power2.out",
      },
      "<"
    );

    // Image fades in
    tl.to(
      imgRef.current,
      {
        opacity: 1,
        ease: "power2.out",
      },
      "<"
    );

    // Button appears AFTER scroll animation
    tl.to(aboutBtnRef.current, {
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
      ease: "power3.out",
      duration: 0.4,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      className=" flex overflow-hidden w-full  px-24"
    >
     <div 
      ref={sectionRef}
      className="max-w-7xl relative flex items-center justify-between min-h-screen">
       {/* Heading */}
      <div ref={headingRef} className="relative z-10 max-w-xl">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <StaggerText>
            <p className="text-3xl mb-4 text-gray-500">
              👨🏽‍💻 Kensuomo Travis
            </p>
            <h1 className="text-[10rem] font-bricolage leading-[0.9] font-[1000]">
              Crafting
              <span className="text-gray-500 font-extralight text-[5rem] font-shadows italic mx-8">
                Immersive
              </span>
              <br />
              <span className="text-gray-500 font-extralight text-[5rem] font-shadows italic mx-8">
                Digital
              </span>
              Experiences
            </h1>
          </StaggerText>

          {/* About Button */}
          <button
            ref={aboutBtnRef}
            className="mt-10 px-10 py-3 flex cursor-pointer items-center gap-3 text-gray-200 font-semibold rounded-lg border-2 border-gray-600 transition-all duration-300 hover:bg-gray-700 hover:text-white text-xl"
          >
            <Info className="w-5 h-5 opacity-80" />

            {/* One-word-at-a-time animation */}
            <StaggerText>
              <span>About Me</span>
            </StaggerText>
          </button>
        </motion.div>
      </div>

      {/* Purple Card */}
      <div
        ref={purpleRef}
        className="bg-[#230C33] cursor-pointer h-120 w-80 rounded-lg absolute top-30 right-20 flex items-center justify-center overflow-hidden"
      >
        <Image
          ref={imgRef}
          src="/images/hero-img.JPG"
          alt="Hero"
          fill
          className="opacity-0 object-cover grayscale transition-all duration-500 hover:grayscale-0"
        />
      </div>
     </div>
    </section>
  );
}
