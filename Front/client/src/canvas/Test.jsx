import React from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import state from '../store';

const Test = () => {
    const gltfPath = "https://gateway.pinata.cloud/ipfs/QmRBGkTCdLRvCwjwkRMTi4pXoyrov1CRFMrrBrDwtyiwt3/1.glb"
    console.log(gltfPath)
  const snap = useSnapshot(state);
  //const { nodes, materials } = useGLTF('./jewelbox.glb');
  //const gltf = useLoader(GLTFLoader, './desk_center.glb')

//   const logoTexture = useTexture(snap.logoDecal);
//   const fullTexture = useTexture(snap.fullDecal);

//   useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

  //const stateString = JSON.stringify(snap);

  return (
    <group>
      {/* <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 5]} intensity={1} />
      <primitive object={gltfPath.scene} /> */}
    </group>
  )
}

export default Test