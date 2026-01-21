// lib/motionTokens.ts
import type { Easing } from "framer-motion";

export const motionTokens = {
  ease: [0.22, 1, 0.36, 1] as Easing,
  duration: {
    fast: 0.4,
    base: 0.8,
    slow: 1.2,
  },
  stagger: 0.12,
  parallax: {
    near: 30,
    mid: 50,
    far: 80,
  },
};
