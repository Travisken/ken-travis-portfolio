"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import StaggerText from "@/components/animations/StaggerText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Info } from "lucide-react";
import ParallaxImage from "../ui/ParallaxImage";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const aboutBtnRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (
      !containerRef.current ||
      !headingRef.current ||
      !cardRef.current ||
      !imgWrapperRef.current ||
      !aboutBtnRef.current
    )
      return;

    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, { scale: 0.85 });
      gsap.set(imgWrapperRef.current, { opacity: 0 });
      gsap.set(aboutBtnRef.current, {
        opacity: 0,
        y: 20,
        pointerEvents: "none",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=800",
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      tl.to(headingRef.current, {
        scale: 0.72,
        transformOrigin: "left center",
        ease: "power3.out",
      });

      tl.to(
        cardRef.current,
        {
          scale: 1,
          ease: "power3.out",
        },
        "<",
      );

      tl.to(
        imgWrapperRef.current,
        {
          opacity: 1,
          ease: "power2.out",
        },
        "-=0.2",
      );

      tl.to(aboutBtnRef.current, {
        opacity: 1,
        y: 0,
        pointerEvents: "auto",
        ease: "power3.out",
        duration: 0.4,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="relative md:flex hidden w-full items-center justify-center overflow-hidden">
        <section
          ref={containerRef}
          className="relative flex min-h-screen md:w-7xl items-center justify-between overflow-hidden"
        >
          {/* LEFT */}
          <div className="relative z-10 flex flex-1 items-center">
            <div ref={headingRef} className="max-w-xl">
              <motion.div variants={fadeUp} initial="hidden" animate="visible">
                <StaggerText>
                  <p className="mb-4 text-3xl text-gray-500">
                    👨🏽‍💻 Kensuomo Travis
                  </p>
                  <h1 className="text-[10rem] font-bricolage font-[1000] leading-[0.9]">
                    Crafting
                    <span className="mx-8 text-[5rem] font-shadows font-extralight italic text-gray-500">
                      Immersive
                    </span>
                    <br />
                    <span className="mx-8 text-[5rem] font-shadows font-extralight italic text-gray-500">
                      Digital
                    </span>
                    Experiences
                  </h1>
                </StaggerText>

                <button
                  ref={aboutBtnRef}
                  className="mt-10 flex items-center gap-3 rounded-lg border-2 border-gray-600 px-10 py-3 text-xl font-semibold text-gray-200 transition hover:bg-gray-700 hover:text-white"
                >
                  <Info className="h-5 w-5 opacity-80" />
                  <StaggerText>
                    <span>About Me</span>
                  </StaggerText>
                </button>
              </motion.div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-1 items-center justify-end">
            <div
              ref={cardRef}
              className="relative z-0 h-[30rem] w-[22rem] overflow-hidden rounded-xl bg-[#230C33] shadow-2xl"
            >
              <div ref={imgWrapperRef}>
                {/* <Image
                  src="/images/hero-img.JPG"
                  alt="Hero"
                  fill
                  className="object-cover grayscale transition duration-500 hover:grayscale-0"
                  priority
                /> */}
                <ParallaxImage />
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* mobile view */}
      <section className="flex md:hidden h-screen flex-col gap-8 px-4 pt-30">
        <div className="w-full relative rounded-lg flex overflow-hidden bg-red-500 h-[80vh]">
          <Image
            src="/images/hero-img.JPG"
            alt="Hero"
            height={1000}
            width={1000}
            className="object-cover !h-[150%] !w-[150%]"
          />
        </div>
        <div>
          <div className="flex gap-2 mb-4 flex-col">
            <h1 className="font-semibold text-2xl ">
              👨🏽‍💻 Kensuomo Travis
              <br />
            </h1>
            <h2 className="font-medium capitalize text-lg">
              Frontend web and mobile developer
            </h2>
          </div>

          <p className="text-white/60 font-normal text-sm leading-6">
            Creative Frontend Developer dedicated to designing interfaces that
            are both intuitive and visually compelling. I strive to bring ideas
            to life in ways that resonate with users.
          </p>
        </div>
      </section>
    </>
  );
}
