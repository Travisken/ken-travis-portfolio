"use client";

import { Clock, Home, User, BookOpen, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { easeOut } from "framer-motion";

/* --------------------------------
   Animation Variants
--------------------------------- */

const fadeFromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut } },
};

const fadeFromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut } },
};

const centerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.25 } },
};

const centerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
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
  const pathname = usePathname();
  const [time, setTime] = useState(new Date());
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", icon: <Home size={18} />, path: "/" },
    { name: "About", icon: <User size={18} />, path: "/about" },
    { name: "Experience", icon: <BookOpen size={18} />, path: "/experience" },
  ];

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

  // Update active nav index based on pathname
  useEffect(() => {
    const index = navItems.findIndex((item) => item.path === pathname);
    setActiveIndex(index >= 0 ? index : 0);
  }, [pathname]);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const contactMagnetic = useMagnetic(0.35);

  return (
    <motion.nav
      key={pathname}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "backdrop-blur-lg bg-black/20 border-b border-white/30" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 md:px-8 relative">
        {/* LEFT — Clock */}
        <motion.div variants={fadeFromLeft} className="text-gray-300 font-mono text-sm flex gap-4 items-center">
          <span className="flex gap-2 font-semibold bg-[#181818] px-4 py-3 rounded-lg items-center">
            <Clock />
            {formatTime(time)}
          </span>
          <span className="hidden md:inline text-sm">{timezone}</span>
        </motion.div>

        {/* CENTER — Desktop Nav */}
        <motion.ul
          variants={centerContainer}
          className="hidden md:flex gap-9 text-gray-400 uppercase tracking-wide relative"
        >
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              variants={centerItem}
              className="relative cursor-pointer flex items-center gap-2 transition-colors duration-300"
            >
              <Link
                href={item.path}
                className={`flex items-center gap-2 transition-colors duration-300 ${
                  activeIndex === index ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>

              {/* Active underline */}
              {activeIndex === index && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-white rounded"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.li>
          ))}
        </motion.ul>

        {/* RIGHT — Magnetic Contact Button / Mobile Hamburger */}
        <div className="flex items-center gap-4">
          <motion.div
            variants={fadeFromRight}
            ref={contactMagnetic.ref}
            onMouseMove={contactMagnetic.handleMouseMove}
            onMouseLeave={contactMagnetic.reset}
            className="transition-transform duration-300 hidden md:block"
          >
            <button className="text-white/80 font-semibold px-8 py-2 rounded-lg border-2 border-white/80 transition-all duration-300 hover:bg-gray-700 hover:text-white">
              Contact Me
            </button>
          </motion.div>

          {/* Hamburger Menu */}
          <button
            className="md:hidden flex items-center text-white/80"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-lg overflow-hidden"
          >
            <ul className="flex flex-col gap-4 px-6 py-6 text-white uppercase font-semibold">
              {navItems.map((item, index) => (
                <li key={item.name} onClick={() => setMenuOpen(false)}>
                  <Link
                    href={item.path}
                    className={`block py-2 transition-colors duration-300 ${
                      activeIndex === index ? "text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">{item.icon}<span>{item.name}</span></div>
                  </Link>
                </li>
              ))}
              <li>
                <button className="w-full text-left py-2 border-t border-gray-500 mt-4">
                  Contact Me
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
