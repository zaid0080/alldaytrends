'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function AnimationWrapper({
  children,
  className = '',
  yOffset = 24,
  duration = 0.4,
  delay = 0
}: {
  children: React.ReactNode
  className?: string
  yOffset?: number
  duration?: number
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })

  return (
    <div ref={ref} className={className}>
      {isInView && (
        <motion.div
          initial={{ opacity: 0, y: yOffset }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, delay, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}