"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Howl } from "howler";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface BootSequenceProps {
  onComplete: () => void;
}

// Timing orchestration: sound plays at the peak of visual intensity
const TIMINGS = {
  // Fade in and cursor starts blinking
  INTRO_START: 0,
  INTRO_FADE_DURATION: 0.3,

  // Cursor blinks while progress bar fills
  CURSOR_BLINK_START: 0.3,
  CURSOR_BLINK_DURATION: 1.2,

  // Progress bar fills (sound should start ~500ms in for impact)
  PROGRESS_START: 0.3,
  PROGRESS_DURATION: 1.5,

  // Sound plays here (1/3 through the intro, at cursor peak intensity)
  SOUND_PLAY_DELAY: 0.5,

  // Outro fade after sound ends
  OUTRO_DURATION: 0.6,

  // Failsafe: never wait longer than this for sound to finish
  SOUND_FAILSAFE_MS: 5000,
};

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const soundRef = useRef<Howl | null>(null);

  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Check if boot sequence was already shown in this session
    const hasPlayed = sessionStorage.getItem("bootPlayed");
    if (hasPlayed || reducedMotion) {
      onComplete();
      return;
    }

    sessionStorage.setItem("bootPlayed", "true");

    let cancelled = false;
    let failsafeId: ReturnType<typeof setTimeout> | null = null;
    const tlRefs: gsap.core.Timeline[] = [];

    // Initialize sound but don't play yet
    const sound = new Howl({
      src: ["/sounds/mac-startup.mp3"],
      volume: 0.5,
      preload: true,
    });
    soundRef.current = sound;

    // Once sound ends or errors, transition to outro
    const onSoundEnd = () => {
      if (cancelled) return;
      if (failsafeId) clearTimeout(failsafeId);

      // Outro: fade to black
      const outroTl = gsap.timeline({
        onComplete: () => {
          if (!cancelled) onComplete();
        },
      });

      outroTl.to(containerRef.current, {
        opacity: 0,
        duration: TIMINGS.OUTRO_DURATION,
        ease: "power2.in",
      });

      tlRefs.push(outroTl);
    };

    sound.once("end", onSoundEnd);
    sound.once("playerror", onSoundEnd);
    sound.once("loaderror", onSoundEnd);

    // Failsafe: if sound never fires an event, proceed anyway
    failsafeId = setTimeout(onSoundEnd, TIMINGS.SOUND_FAILSAFE_MS);

    // Orchestrate the entire sequence
    const masterTl = gsap.timeline();

    // Fade in container
    masterTl.set(containerRef.current, { opacity: 1 }, TIMINGS.INTRO_START);

    masterTl.to(
      containerRef.current,
      {
        opacity: 1,
        duration: TIMINGS.INTRO_FADE_DURATION,
        ease: "power2.out",
      },
      TIMINGS.INTRO_START
    );

    // Cursor blink: 4 complete cycles (on-off-on-off-on...)
    masterTl.to(
      cursorRef.current,
      {
        opacity: 0,
        repeat: 4,
        yoyo: true,
        duration: 0.15,
        ease: "power1.inOut",
      },
      TIMINGS.CURSOR_BLINK_START
    );

    // Progress bar fills smoothly
    masterTl.to(
      progressRef.current,
      {
        width: "100%",
        duration: TIMINGS.PROGRESS_DURATION,
        ease: "power1.inOut",
      },
      TIMINGS.PROGRESS_START
    );

    // Play sound at the perfect moment (1/3 through intro)
    // This is when visual intensity peaks: cursor is blinking fast,
    // progress is moving, creating a satisfying audio-visual sync
    masterTl.call(
      () => {
        if (!cancelled) {
          sound.play();
        }
      },
      [],
      TIMINGS.SOUND_PLAY_DELAY
    );

    tlRefs.push(masterTl);

    // Cleanup on unmount
    return () => {
      cancelled = true;
      if (failsafeId) clearTimeout(failsafeId);

      sound.off("end", onSoundEnd);
      sound.off("playerror", onSoundEnd);
      sound.off("loaderror", onSoundEnd);
      sound.unload();

      tlRefs.forEach((tl) => tl.kill());
      soundRef.current = null;
    };
  }, [reducedMotion, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 h-screen top-0 flex items-center justify-center bg-black opacity-0"
    >
      <div className="flex flex-col items-center gap-8">
        {/* Logo / Initials with cursor */}
        <div className="text-3xl font-medium tracking-wide text-white">
          KT<span ref={cursorRef} className="inline-block opacity-100">
            ▍
          </span>
        </div>

        {/* Progress bar with subtle glow */}
        <div className="h-1 w-56 overflow-hidden bg-white/10 rounded-full shadow-lg">
          <div
            ref={progressRef}
            className="h-full w-0 bg-white shadow-lg shadow-white/30"
          />
        </div>
      </div>
    </div>
  );
}