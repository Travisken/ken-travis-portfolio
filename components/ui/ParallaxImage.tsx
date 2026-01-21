"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function ParallaxImage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse movement to rotation angles
  const rotateX = useTransform(y, [0, 1], [10, -10]);
  const rotateY = useTransform(x, [0, 1], [-10, 10]);

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize mouse position to 0–1
    const normX = mouseX / rect.width;
    const normY = mouseY / rect.height;

    x.set(normX);
    y.set(normY);
  };

  // Reset rotation on mouse leave
  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className="relative w-full h-full rounded-xl perspective-1000"
      >
        {/* Background Layer */}
        <div className="absolute inset-0 rounded-xl"></div>

        {/* Mid Layer */}
        <motion.div
          style={{
            translateX: x,
            translateY: y,
          }}
          className="absolute inset-0 bg-white rounded-lg shadow-lg"
        >
          {/* Foreground Layer */}
          <motion.img
            src="/images/hero-img.JPG"
            alt="3D"
            className="w-full h-full object-cover rounded-lg pointer-events-none"
            style={{
              translateX: x,
              translateY: y,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
