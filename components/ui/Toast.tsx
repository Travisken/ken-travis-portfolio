"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error";
  duration?: number; // ms
  onClose: () => void;
};

export default function Toast({
  message,
  type = "success",
  duration = 3000,
  onClose,
}: ToastProps) {
  // Automatically hide after duration
  useState(() => {
    const timer = setTimeout(() => onClose(), duration);
    return () => clearTimeout(timer);
  });

  const isSuccess = type === "success";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`fixed bottom-5 md:right-5 right-0 w-80 rounded-xl shadow-lg p-4 flex items-center space-x-3
          ${isSuccess ? "bg-black text-white" : "bg-red-600 text-white"}`}
      >
        {/* Icon with pulsing shadow */}
        <div className="relative">
          {isSuccess ? (
            <CheckCircle
              className="w-6 h-6 text-green-400 animate-pulse"
            />
          ) : (
            <XCircle
              className="w-6 h-6 text-white animate-pulse"
            />
          )}

          {/* Circular loader ring */}
          <svg className="absolute -top-1 -left-1 w-8 h-8">
            <circle
              className={`stroke-white opacity-30`}
              strokeWidth="2"
              fill="none"
              cx="16"
              cy="16"
              r="15"
            />
            <circle
              className={`stroke-${isSuccess ? "green-400" : "white"}`}
              strokeWidth="2"
              fill="none"
              cx="16"
              cy="16"
              r="15"
              strokeDasharray="94.2"
              strokeDashoffset="0"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="94.2"
                to="0"
                dur={`${duration / 1000}s`}
                repeatCount="1"
              />
            </circle>
          </svg>
        </div>

        <span className="flex-1">{message}</span>
      </motion.div>
    </AnimatePresence>
  );
}
