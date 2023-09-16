import React, { useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Vector3, Euler, MathUtils  } from 'three';

import { useDispatch, useSelector } from 'react-redux';
import { updateFurniture } from '../Redux/furnitureSlice';

const Glb = ({ code, url, initialPos, initialRot }) => {
  const { camera, mouse, raycaster, scene } = useThree();
  const [isMoving, setIsMoving] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [modelPosition, setModelPosition] = useState(initialPos);
  const [modelRotation, setModelRotation] = useState(initialRot);
  const [dbRotation, setDbRotation] = useState(initialRot);
  const gltf = useLoader(GLTFLoader, url);
  const dispatch = useDispatch();

  const mappingRotation = (ro) => {
    let newModelRotation = null
      switch(dbRotation[1]) {
        case 0: newModelRotation = [0, 0, 0];
          break;
        case 1: newModelRotation = [0, Math.PI * 0.5, 0];
          break;
        case 2: newModelRotation = [0, Math.PI * 1, 0];
          break;
        case 3: newModelRotation = [0, Math.PI * 1.5, 0];
          break;
        case -1: newModelRotation = [0, Math.PI * 1.5, 0];
          break;
      }
    return newModelRotation
  }

  useEffect(() => {
    const newModelRotation = mappingRotation(dbRotation[1])
    setModelRotation(newModelRotation);
  },[])

  useEffect(() => {
    if (isRotating) {

      const updatedDbRotatio = [...dbRotation];
      if (updatedDbRotatio[1] >= 3) {
        updatedDbRotatio[1] = 0;
      } else {
        updatedDbRotatio[1] += 1;
      }
      setDbRotation(updatedDbRotatio); // 상태 업데이트를 비동기로 예약
      const newModelRotation = mappingRotation(updatedDbRotatio[1]);
      setModelRotation(newModelRotation);
      dispatch(updateFurniture({ code: code, url: url, pos: initialPos, rot: updatedDbRotatio }));
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
      }
    }
  });
  
  useEffect(() => {
    if (isMoving) {
      // Now, update the furniture position in the dispatch only after the state is updated.
      dispatch(updateFurniture({ code: code, url: url, pos: [modelPosition.x, modelPosition.y, modelPosition.z], rot: initialRot }));
    }
  }, [modelPosition]);
  


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
