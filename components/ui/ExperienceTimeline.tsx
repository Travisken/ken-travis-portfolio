import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ExperienceTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={sectionRef} className="absolute inset-0 pointer-events-none">
      <svg
        className="absolute left-1/2 top-0 h-full -translate-x-1/2"
        width="290"
        viewBox="0 0 260 1400"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d="
            M30 40
            C 260 40, 260 220, 130 300
            C 0 400, 0 600, 130 720
            C 260 860, 260 1050, 130 1180
            C 0 1320, 0 1480, 130 1600
          "
          stroke="#230C33"
          strokeWidth="20"
          strokeLinecap="round"
          fill="none"
          style={{ pathLength }}
        />
        
      </svg>
    </div>
  );
}
