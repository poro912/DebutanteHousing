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
      frames={60}
      alphaTest={0.1}
      scale={44}
      rotation={[0,0,0]}
      position={[-4,-25,-4]}
    >
      <RandomizedLight 
        amount={3}
        radius={50}
        intensity={2}
        ambient={0.25}
        position={[5,5, -10]}
        />
      <RandomizedLight />
    </AccumulativeShadows>
  )
}

export default Backdrop