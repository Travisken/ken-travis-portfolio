"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Howl } from "howler";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface BootSequenceProps {
  onComplete: () => void;
}

// Safety net in case the audio file fails to load/play (e.g. autoplay
// blocked, file missing, slow network) — we never want the boot screen
// to hang forever waiting for a sound event that will never fire.
const SOUND_FAILSAFE_MS = 4000;

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem("bootPlayed");

    if (hasPlayed || reducedMotion) {
      onComplete();
      return;
    }

    sessionStorage.setItem("bootPlayed", "true");

    let cancelled = false;
    let failsafeId: ReturnType<typeof setTimeout> | null = null;
    let tl: gsap.core.Timeline | null = null;

    const sound = new Howl({
      src: ["/sounds/mac-startup.mp3"],
      volume: 0.5,
    });

    // Runs the fade/progress-bar animation, then signals completion.
    // This only starts once we know the sound has either finished,
    // errored, or timed out — so "sound first, then layout" holds even
    // on slow networks or autoplay-restricted browsers.
    const runOutroAndComplete = () => {
      if (cancelled) return;

      tl = gsap.timeline({
        onComplete: () => {
          if (!cancelled) onComplete();
        },
      });

      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
      });
    };

    const finishSound = () => {
      if (failsafeId) clearTimeout(failsafeId);
      runOutroAndComplete();
    };

    sound.once("end", finishSound);
    sound.once("playerror", finishSound);
    sound.once("loaderror", finishSound);

    // Failsafe: if no sound event fires within SOUND_FAILSAFE_MS
    // (file never loads, browser blocks playback silently, etc.),
    // proceed anyway rather than leaving the user stuck on a boot screen.
    failsafeId = setTimeout(finishSound, SOUND_FAILSAFE_MS);

    sound.play();

    // Intro animation: fade in, blink cursor, fill progress bar.
    // This plays immediately and independently of sound load time —
    // it's the visual "booting up" feedback while we wait on audio.
    const introTl = gsap.timeline();

    introTl
      .set(containerRef.current, { opacity: 1 })
      .to(cursorRef.current, {
        opacity: 0,
        repeat: 4,
        yoyo: true,
        duration: 0.2,
      })
      .to(progressRef.current, {
        width: "100%",
        duration: 0.2,
        ease: "power2.out",
      });

    return () => {
      cancelled = true;
      if (failsafeId) clearTimeout(failsafeId);
      sound.off("end", finishSound);
      sound.off("playerror", finishSound);
      sound.off("loaderror", finishSound);
      sound.unload();
      introTl.kill();
      tl?.kill();
    };
  }, [reducedMotion, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 h-screen top-0 flex items-center justify-center bg-black opacity-0"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo / Initials */}
        <div className="text-2xl font-medium tracking-wide">
          KT<span ref={cursorRef}>▍</span>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 w-48 overflow-hidden bg-white/20">
          <div ref={progressRef} className="h-full w-0 bg-white" />
        </div>
      </div>
    </div>
  );
}