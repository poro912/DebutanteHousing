import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const RoomGlb = () => {
  const gltf = useLoader(GLTFLoader, './glb/room/room_green.glb');

  return (
    <group>
      <mesh receiveShadow>
        <primitive object={gltf.scene} position={[0, 0, 0]} />
      </mesh>

      {/* 조명 설정 */}
    </group>
  );
};

export default RoomGlb;
