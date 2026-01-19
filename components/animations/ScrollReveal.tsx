'use client'

import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

interface ScrollRevealProps {
  children: React.ReactNode
}

export default function ScrollReveal({ children }: ScrollRevealProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  )
}
