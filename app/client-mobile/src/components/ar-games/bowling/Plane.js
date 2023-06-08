import React from 'react'
import { useBox } from '@react-three/cannon'
import * as THREE from 'three'

export function Plane({ size }) {
  const [ref] = useBox(() => ({ args: [...size, -0.001], rotation: [-Math.PI / 2, 0, 0] }))
  return (
    <mesh ref={ref}>
      <planeGeometry args={size} />
      <meshStandardMaterial color="black" transparent={true} opacity={.4} side={THREE.DoubleSide} position={[0, -7, 0]}/>
    </mesh>
  )
}