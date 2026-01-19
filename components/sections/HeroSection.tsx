"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import StaggerText from "@/components/animations/StaggerText";
// import ThreeCanvas from '@/components/three/ThreeCanvas'
// import HeroObject from '@/components/three/HeroObject'

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen  overflow-hidden w-full items-center justify-between px-24">
      {/* LEFT: TEXT */}
      <div className="relative z-10 max-w-xl">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <StaggerText>
            <h1 className="text-[8rem] font-bricolage leading-30 font-[1000]">
              Crafting  
              <span className="text-gray-500 text-[5rem] font-shadows font-extralight italic mx-8">Immersive</span><br />
              <span className="text-gray-500 text-[5rem] font-quicksand font-extralight italic mx-8">Digital</span>
              Experiences
            </h1>
          </StaggerText>
        </motion.div>
      </div>
      {/* Image */}
      <div className="rounded-lg bg-red-500 md:w-60 h-100 "></div>
    </section>
  );
}
