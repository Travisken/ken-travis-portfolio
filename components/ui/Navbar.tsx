"use client";

import { Clock, Home, User, BookOpen, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
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
   Navbar Component
--------------------------------- */

export default function Navbar() {
  const pathname = usePathname();

  const [time, setTime] = useState(new Date());
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      icon: <Home size={18} />,
      path: "/",
    },
    {
      name: "About",
      icon: <User size={18} />,
      path: "/about",
    },
    {
      name: "Experiences",
      icon: <BookOpen size={18} />,
      path: "/experience",
    },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const isContactActive = pathname.startsWith("/contact");

  // Clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Glass morph on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <motion.nav
      key={pathname}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`fixed top-0 z-50 w-full max-md:px-4 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-lg bg-black/20 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 relative">
        {/* LEFT — Clock */}
        <motion.div
          variants={fadeFromLeft}
          className="text-gray-300 font-mono text-sm flex gap-4 items-center"
        >
          <span className="flex gap-2 font-semibold bg-[#181818] px-4 py-3 rounded-lg items-center">
            <Clock size={18} />
            {formatTime(time)}
          </span>

          <span className="hidden md:inline text-sm">{timezone}</span>
        </motion.div>

        {/* CENTER — Desktop Navigation */}
        <motion.ul
          variants={centerContainer}
          className="hidden md:flex gap-9 text-gray-400 uppercase tracking-wide relative"
        >
          {navItems.map((item) => (
            <motion.li
              key={item.name}
              variants={centerItem}
              className="relative"
            >
              <Link
                href={item.path}
                className={`flex items-center gap-2 transition-colors duration-300 ${
                  isActive(item.path)
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>

              {isActive(item.path) && (
                <motion.div
                  layoutId="navbar-active-indicator"
                  className="absolute -bottom-2 left-0 h-[2px] w-full bg-white rounded-full"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  }}
                />
              )}
            </motion.li>
          ))}
        </motion.ul>

        {/* RIGHT — Contact Button / Mobile Menu */}
        <div className="flex items-center gap-4">
          <motion.div
            variants={fadeFromRight}
            className="hidden md:block"
          >
            <Link
              href="/contact"
              className={`font-semibold px-6 py-3 rounded-lg transition-all duration-300 ${
                isContactActive
                  ? "bg-white text-black"
                  : "bg-[#181818] text-white/80 hover:bg-[#131313] hover:text-white"
              }`}
            >
              Contact Me
            </Link>
          </motion.div>

          {/* Mobile Hamburger */}
          <button
            aria-label="Toggle Menu"
            className="md:hidden flex items-center text-white/80"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="md:hidden bg-black/90 backdrop-blur-lg overflow-hidden"
          >
            <ul className="flex flex-col gap-4 px-6 py-6 uppercase font-semibold">
              {navItems.map((item) => (
                <li
                  key={item.name}
                  onClick={() => setMenuOpen(false)}
                >
                  <Link
                    href={item.path}
                    className={`flex items-center gap-2 py-2 transition-colors duration-300 ${
                      isActive(item.path)
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}

              <li
                onClick={() => setMenuOpen(false)}
                className="w-full"
              >
                <Link
                  href="/contact"
                  className={`block py-3 mt-4 border-t border-white/10 transition-colors duration-300 ${
                    isContactActive
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Contact Me
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}