import React, { useRef } from 'react'
import { easing } from 'maath'
import { useFrame } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'

const Backdrop = () => {
   const shadows = useRef();

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={1000}
      alphaTest={0.85}
      scae={0.01}
      rotation={[Math.PI /120, 0, 0]}
      position={[-0, -0.25, -0]}
    >
      <RandomizedLight 
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[5,5,5]}
        />
      <RandomizedLight />
    </AccumulativeShadows>
  )
}

export default Backdrop