"use client";

import { Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { Home, User, BookOpen } from "lucide-react";

export default function Navbar() {
  const [time, setTime] = useState(new Date());
  const [scrolled, setScrolled] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Detect scroll for glass morph effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const navItems = [
    { name: "Home", icon: <Home size={18} /> },
    { name: "About", icon: <User size={18} /> },
    { name: "Experience", icon: <BookOpen size={18} /> },
  ];

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled
          ? " backdrop-blur-md border-b border-gray-50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-8">
        {/* Left: Clock + timezone */}
        <div className="text-gray-300 font-mono text-sm flex gap-4 items-center animate-fade-in">
          <span className="flex gap-2 font-semibold bg-[#181818] px-4 py-3 rounded-lg items-center ">
            <Clock className="" />
            {formatTime(time)}
          </span>
          <span className="text-sm">{timezone}</span>
        </div>

        {/* Center: Nav Items */}
        <ul className="flex gap-9 text-gray-400 uppercase tracking-wide">
          {navItems.map((item) => (
            <li
              key={item.name}
              className="relative cursor-pointer flex items-center gap-2 transition-all duration-300 hover:text-gray-100 after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px] after:bg-gray-100 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>

        {/* Right: Contact Button */}
        <button className=" text-gray-400 font-semibold px-8 py-2 rounded-lg border-2 border-gray-600 transition-all duration-300 hover:bg-gray-700 hover:text-white">
          Contact
        </button>
      </div>
    </nav>
  );
}
