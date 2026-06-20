"use client";

import { useEffect, useState } from "react";
import BootSequence from "@/components/core/BootSequence";

export default function BootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bootComplete, setBootComplete] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  // Once boot completes and children mount, flip opacity on the next
  // tick so the transition class actually animates from 0 -> 100
  // instead of mounting already at full opacity.
  useEffect(() => {
    if (!bootComplete) return;
    const id = requestAnimationFrame(() => setContentVisible(true));
    return () => cancelAnimationFrame(id);
  }, [bootComplete]);

  return (
    <>
      {!bootComplete && (
        <BootSequence onComplete={() => setBootComplete(true)} />
      )}

      {/*
        Children (Navbar, page content, Footer) are NOT mounted until
        boot finishes. This avoids running their effects, fetches, or
        autoplaying media underneath the boot screen, and guarantees a
        true sequential load: boot screen completes, THEN the real
        layout mounts and fades in.
      */}
      {bootComplete && (
        <div
          className={`transition-opacity duration-500 ${
            contentVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {children}
        </div>
      )}
    </>
  );
}