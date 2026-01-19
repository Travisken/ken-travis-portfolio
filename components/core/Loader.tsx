'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete
    })

    tl.set(containerRef.current, { opacity: 1 })
      // text fade in
      .fromTo(
        textRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
      // loading line
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left',
          duration: 1.2,
          ease: 'power2.out'
        }
      )
      // fade out
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        delay: 0.2
      })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-0"
    >
      <div className="flex flex-col items-center gap-4">
        <p
          ref={textRef}
          className="text-xs tracking-[0.3em] text-white/60"
        >
          INITIALIZING
        </p>

        <div className="h-[1px] w-40 bg-white/20">
          <div
            ref={lineRef}
            className="h-full w-full bg-white"
          />
        </div>
      </div>
    </div>
  )
}
