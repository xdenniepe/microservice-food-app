import { useSphere } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import React, { useMemo, useState } from 'react'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { useDragConstraint } from './Drag'

function generateRandomBall() {
  

  return {
    position: [10,300,4800],
    
    radius: 150,
  }
}

export function Balls() {
 
  const [balls, setBalls] = useState(() => Array.from({ length: 1 }).map(generateRandomBall))
  const addRandomBall = () => setBalls((currBalls) => [...currBalls, generateRandomBall()])
  
  return balls.map((ballInfo, i) => <Ball key={i} {...ballInfo} />)
}

function Ball({ position = [0, 1, -10], color, radius }) {
  const texture = useLoader(THREE.TextureLoader, '/BowlingAssets/Texture/RamenNoodleUnwrap.png')
  const [ref] = useSphere(() => ({ mass: 1000, args: [radius], position, friction: 10 }))
  const bind = useDragConstraint(ref)

  return (
    <mesh ref={ref} {...bind}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial map={texture} attach="material"/>
    </mesh>
  )
}