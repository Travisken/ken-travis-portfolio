// lib/motionVariants.ts
import type { Variants } from "framer-motion";
import { motionTokens } from "./motionTokens";

type FadeSlideCustom = {
  dir: "up" | "down" | "left" | "right";
  depth: number;
};

export const fadeSlideParallax: Variants = {
  hidden: (custom: FadeSlideCustom) => ({
    opacity: 0,
    x:
      custom.dir === "left"
        ? -custom.depth
        : custom.dir === "right"
        ? custom.depth
        : 0,
    y:
      custom.dir === "up"
        ? custom.depth
        : custom.dir === "down"
        ? -custom.depth
        : 0,
  }),

  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: motionTokens.duration.base,
      ease: motionTokens.ease,
    },
  },
};
