'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Howl } from 'howler'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function BootSequence() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)

  const [isComplete, setIsComplete] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('bootPlayed')

    if (hasPlayed || reducedMotion) {
      setTimeout(() => setIsComplete(true), 0)
      return
    }

    sessionStorage.setItem('bootPlayed', 'true')

    const sound = new Howl({
      src: ['/sounds/mac-startup.mp3'],
      volume: 1.50
    })

    sound.play()

    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true)
      }
    })

    tl.set(containerRef.current, { opacity: 1 })
      // Cursor blink
      .to(cursorRef.current, {
        opacity: 0,
        repeat: 4,
        yoyo: true,
        duration: 0.2
      })
      // Progress bar
      .to(progressRef.current, {
        width: '100%',
        duration: 1.2,
        ease: 'power2.out'
      })
      // Fade logo + elements
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in'
      })

    return () => {
      sound.unload()
      tl.kill()
    }
  }, [reducedMotion])

  if (isComplete) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-0"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo / Initials */}
        <div className="text-2xl font-medium tracking-wide">
          KT<span ref={cursorRef}>▍</span>
        </div>

        {/* Progress bar */}
        <div className="h-[2px] w-48 overflow-hidden bg-white/20">
          <div
            ref={progressRef}
            className="h-full w-0 bg-white"
          />
        </div>
      </div>
    </div>
  )
}
