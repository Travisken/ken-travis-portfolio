import { Variants } from "framer-motion";

/**
 * Timing tokens
 */
export const durations = {
  fast: 0.25,
  normal: 0.45,
  slow: 0.8,
};

/**
 * Easing curves (premium feel)
 */
export const easings = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.7, 0, 0.3, 1],
  linear: "linear",
};

/**
 * Generic fade
 */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: durations.normal,
      ease: "easeOut",
    },
  },
};

/**
 * Fade + slide up (most used)
 */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: "easeOut",
    },
  },
};

/**
 * Subtle scale reveal
 */
export const scaleFade: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: durations.normal,
      ease: "easeOut",
    },
  },
};

/**
 * Stagger container
 */
export const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};
