import React from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import state from '../store';

const Glb = ({url, pos}) => {
  const snap = useSnapshot(state);
  //const { nodes, materials } = useGLTF('./jewelbox.glb');
  const gltf = useLoader(GLTFLoader, url)

//   const logoTexture = useTexture(snap.logoDecal);
//   const fullTexture = useTexture(snap.fullDecal);

//   useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

  //const stateString = JSON.stringify(snap);

  return (
    <group>
    <mesh>
      <primitive
        object={gltf.scene}
        position={pos}
        
      />
      </mesh>
    </group>
  )
}

export default Glb