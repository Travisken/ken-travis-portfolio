"use client"

import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, type RefObject } from "react";

interface ExperienceTimelineProps {
  /** Ref to the container wrapping BOTH the heading and the cards — keeps the line's
   *  start point pinned to the heading, and its end pinned to the last card. */
  containerRef: RefObject<HTMLDivElement | null>;
  /** Number of experience cards — drives how many "lobes" the path has */
  count: number;
  /** Rendered height of the heading block (px), so the line starts right beneath it */
  headingHeight: number;
}

const CARD_HEIGHT = 360; // approximate rendered height per card, used only for viewBox proportions
const BOTTOM_PAD = 40;
const VIEWBOX_WIDTH = 260;

/**
 * Builds a path that alternates left/right once per card, so each "lobe"
 * of the curve visually terminates near where that card sits.
 * Starts dead-center at the very top (y=0), which sits just under the heading.
 */
function buildPath(count: number, topPad: number) {
  const segmentHeight = CARD_HEIGHT;
  const totalHeight = topPad + count * segmentHeight + BOTTOM_PAD;
  const centerX = 130;
  const leftX = 0;
  const rightX = 260;

  let d = `M ${centerX} 0`;
  const stops: { y: number; x: number }[] = [];

  for (let i = 0; i < count; i++) {
    const y = topPad + i * segmentHeight + segmentHeight / 2;
    const x = i % 2 === 0 ? rightX : leftX;
    stops.push({ y, x });
  }

  let prevX = centerX;
  let prevY = 0;

  stops.forEach((stop) => {
    const midY = (prevY + stop.y) / 2;
    d += ` C ${prevX} ${midY}, ${stop.x} ${midY}, ${stop.x} ${stop.y}`;
    prevX = stop.x;
    prevY = stop.y;
  });

  d += ` C ${prevX} ${prevY + segmentHeight / 2}, ${centerX} ${totalHeight - BOTTOM_PAD}, ${centerX} ${totalHeight - BOTTOM_PAD}`;

  return { d, totalHeight };
}

/**
 * Deterministic pseudo-random particle layout — fixed seed so particles
 * don't jump around on every re-render, but still feel scattered.
 */
function buildParticles(totalHeight: number, count: number) {
  const seeded = (n: number) => {
    const x = Math.sin(n * 999) * 10000;
    return x - Math.floor(x);
  };

  return Array.from({ length: count }, (_, i) => {
    const r = seeded(i + 1);
    const r2 = seeded(i + 50);
    const r3 = seeded(i + 100);
    // Keep particles off-center, in the wide empty columns either side of the line
    const side = i % 2 === 0 ? 1 : -1;
    const x = 130 + side * (60 + r * 70);
    const y = 40 + r2 * (totalHeight - 80);
    const size = 2 + r3 * 3;
    const duration = 6 + r * 6;
    const delay = r2 * 4;
    return { id: i, x, y, size, duration, delay };
  });
}

export function ExperienceTimeline({ containerRef, count, headingHeight }: ExperienceTimelineProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.6"],
  });

  const topPad = Math.max(headingHeight, 40);

  const { d, totalHeight } = useMemo(
    () => buildPath(count, topPad),
    [count, topPad]
  );

  const particles = useMemo(() => buildParticles(totalHeight, 9), [totalHeight]);

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1], {
    clamp: true,
  });

  const dotGridId = "experience-dot-grid";

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <svg
        className="absolute left-1/2 top-0 h-full -translate-x-1/2"
        width="290"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${totalHeight}`}
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <pattern
            id={dotGridId}
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.6" fill="#ffffff" fillOpacity="0.18" />
          </pattern>
        </defs>

        {/* Quiet dot-grid base layer — sits behind everything, fills the empty desktop space.
            Uses white at low opacity (not the brand purple) so it stays visible against a dark bg. */}
        <rect
          x="0"
          y="0"
          width={VIEWBOX_WIDTH}
          height={totalHeight}
          fill={`url(#${dotGridId})`}
        />

        {/* Drifting particles, loosely scattered in the empty zigzag space */}
        {particles.map((p) => (
          <motion.circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            r={p.size}
            fill="#ffffff"
            animate={{
              cy: [p.y, p.y - 18, p.y],
              opacity: [0.25, 0.6, 0.25],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* faint track underneath so the "drawn" line has something to draw onto */}
        <path
          d={d}
          stroke="#230C33"
          strokeOpacity={0.15}
          strokeWidth="20"
          strokeLinecap="round"
          fill="none"
        />
        <motion.path
          d={d}
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