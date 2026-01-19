'use client'

import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { useRef } from 'react'

export default function HeroObject() {
  const meshRef = useRef<Mesh>(null)

  useFrame(({ clock, mouse }) => {
    if (!meshRef.current) return

    meshRef.current.rotation.y = clock.elapsedTime * 0.15
    meshRef.current.rotation.x = mouse.y * 0.3
    meshRef.current.rotation.z = mouse.x * 0.3
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial
        color="#5eead4"
        wireframe
        roughness={0.4}
        metalness={0.6}
      />
    </mesh>
  )
}
