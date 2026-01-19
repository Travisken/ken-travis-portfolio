'use client'

import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/motion'
import React from 'react'

interface StaggerTextProps {
  children: React.ReactNode
  as?: React.ElementType<{ children?: React.ReactNode; className?: string }>
  className?: string
}

export default function StaggerText({
  children,
  as: Component = 'span',
  className = '',
}: StaggerTextProps) {
  return (
    <motion.span
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="inline-block"
    >
      <Component className={className}>
        {React.Children.map(children, (child) => {
          // Animate text nodes
          if (typeof child === 'string') {
            return child.split(' ').map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                variants={fadeUp}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))
          }

          // Pass through non-text children untouched
          return child
        })}
      </Component>
    </motion.span>
  )
}
