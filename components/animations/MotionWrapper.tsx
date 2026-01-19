'use client'

import { motion, MotionProps } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface MotionWrapperProps extends MotionProps {
  children: React.ReactNode
}

export function MotionWrapper({
  children,
  ...props
}: MotionWrapperProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <>{children}</>
  }

  return <motion.div {...props}>{children}</motion.div>
}
