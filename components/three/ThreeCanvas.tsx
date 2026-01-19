'use client'

import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'

export default function ThreeCanvas({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Environment preset="studio" />
      {children}
    </Canvas>
  )
}
