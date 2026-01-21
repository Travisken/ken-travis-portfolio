"use client";

import { Clock, Home, User, BookOpen } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { easeOut } from "framer-motion";

/* --------------------------------
   Animation Variants
--------------------------------- */

const fadeFromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

const fadeFromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

const centerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.25,
    },
  },
};

const centerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

/* --------------------------------
   Magnetic Hover Hook
--------------------------------- */

function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;

    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.transform = `translate(0px, 0px)`;
  };

  return { ref, handleMouseMove, reset };
}

/* --------------------------------
   Navbar Component
--------------------------------- */

export default function Navbar() {
  const pathname = usePathname(); // Re-animate on route change
  const [time, setTime] = useState(new Date());
  const [scrolled, setScrolled] = useState(false);

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Glass morph on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const navItems = [
    { name: "Home", icon: <Home size={18} /> },
    { name: "About", icon: <User size={18} /> },
    { name: "Experience", icon: <BookOpen size={18} /> },
  ];

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const contactMagnetic = useMagnetic(0.35);

  return (
    <motion.nav
      key={pathname} // 🔥 Forces re-animation on route change
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-lg bg-black/20 border-b border-white/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-8">
        {/* LEFT — Clock */}
        <motion.div
          variants={fadeFromLeft}
          className="text-gray-300 font-mono text-sm flex gap-4 items-center"
        >
          <span className="flex gap-2 font-semibold bg-[#181818] px-4 py-3 rounded-lg items-center">
            <Clock />
            {formatTime(time)}
          </span>
          <span className="text-sm">{timezone}</span>
        </motion.div>

        {/* CENTER — Nav Items */}
        {/* CENTER — Nav Items */}
        <motion.ul
          variants={centerContainer}
          className="flex gap-9 text-gray-400 uppercase tracking-wide"
        >
          {navItems.map((item) => {
            // Determine if this nav item matches the current pathname
            const isActive =
              (item.name === "Home" && pathname === "/home") ||
              (item.name === "About" && pathname === "/about") ||
              (item.name === "Experience" && pathname === "/experience");

            return (
              <motion.li
                key={item.name}
                variants={centerItem}
                whileHover={{ y: -2 }}
                className={`relative cursor-pointer flex items-center gap-2 transition-colors duration-300 
                    ${isActive ? "text-white" : "text-gray-400"}
                    after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px]
                    after:bg-white after:transition-all after:duration-300
                    ${isActive ? "after:w-full" : "hover:after:w-full"}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* RIGHT — Magnetic Contact Button */}
        <motion.div
          variants={fadeFromRight}
          ref={contactMagnetic.ref}
          onMouseMove={contactMagnetic.handleMouseMove}
          onMouseLeave={contactMagnetic.reset}
          className="transition-transform duration-300"
        >
          <button
            className="text-white/80 font-semibold px-8 py-2 rounded-lg border-2 border-white/80
                             transition-all duration-300 hover:bg-gray-700 hover:text-white"
          >
            Contact Me
          </button>
        </motion.div>
      </div>
    </motion.nav>
  );
}
