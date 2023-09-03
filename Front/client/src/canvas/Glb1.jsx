import React, { useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Vector3, Euler, MathUtils  } from 'three';

const Glb = ({ url, initialPos, initialRot }) => {
  const { camera, mouse, raycaster, scene } = useThree();
  const [isMoving, setIsMoving] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [modelPosition, setModelPosition] = useState(initialPos);
  const [modelRotation, setModelRotation] = useState(initialRot);
  const gltf = useLoader(GLTFLoader, url);

  useEffect(() => {
    if (isRotating) {
      const arrB =[0, 1.57, 0];
      setModelRotation(modelRotation.map((x, y) => x + arrB[y]))
    }
  }, [isRotating]);

  useFrame(() => {
    if (isMoving) {
      raycaster.setFromCamera(mouse, camera);

      const intersect = raycaster.intersectObject(scene, true);

      if (intersect.length > 0) {
        const { point } = intersect[0];

        const minLimit = new Vector3(-0.16, -0.2, -0.16);
        const maxLimit = new Vector3(0.16, 0.2, 0.16);

        const clampedPosition = new Vector3(
          Math.min(Math.max(point.x, minLimit.x), maxLimit.x),
          -0.2,
          Math.min(Math.max(point.z, minLimit.z), maxLimit.z)
        );

        if (
          clampedPosition.equals(minLimit) ||
          clampedPosition.equals(maxLimit)
        ) {
          setIsMoving(false);
        }

        setModelPosition(clampedPosition);
        console.log('Model Position:', clampedPosition);

        
      }
    }
  });


  return (
    <group>
      <mesh
        castShadow  // 이 메쉬가 그림자를 만들어낸다고 지정
        receiveShadow  // 이 메쉬가 그림자를 받아들인다고 지정
        onPointerDown={(e) => {
          e.stopPropagation();
          if (e.buttons === 1) {
            setIsMoving(true);
          }
          if (e.buttons === 2) {
            setIsRotating(true)
            console.log(isRotating);
          }
          
        }}
        onPointerUp={() => {
          setIsMoving(false)
          setIsRotating(false)
        }}
      >

        <primitive object={gltf.scene} position={modelPosition} rotation={modelRotation} />
      </mesh>
    </group>
  );
};

export default Glb;
