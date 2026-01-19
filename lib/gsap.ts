import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Global GSAP defaults
 */
gsap.defaults({
  ease: 'power3.out',
  duration: 0.8
})

export const easings = {
  out: 'power3.out',
  inOut: 'power2.inOut'
}

/**
 * Cleanup helper
 */
export const killScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}
