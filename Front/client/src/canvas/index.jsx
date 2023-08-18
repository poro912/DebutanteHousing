import React, { useEffect, useState } from 'react';
import {Canvas} from '@react-three/fiber'
import {Environment, Center, OrbitControls} from '@react-three/drei'
import { useGLTF } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import state from '../store'


import Backdrop from './Backdrop'
import CameraRig from './CameraRig'
import Glb from './Glb'
import RoomGlb from './RoomGlb'
import Test from './Test'


const CanvasModel = () => {
  const snap = useSnapshot(state);
  const url = state.morden
  const [glburl, setGlburl] = useState("")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://gateway.pinata.cloud/ipfs/QmP25FavCnPjQpuvM9noxxfZNNRKW6cmUYsEg3LwSJ22gm/1.json');
        const jsonData = await response.json();
        console.log(jsonData.animation_url); // JSON 데이터를 콘솔에 출력
        setGlburl(jsonData.animation_url);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <Canvas
      shadows
      camera={{ position: [16,9,16], fov:2 }}
      
      className=''
    >
      {state.intro === true ? <OrbitControls /> : <></>}
      
      <ambientLight intensity={1} />
      <pointLight position={[0, 10, 10]} intensity={1.2} />
      <Environment preset='warehouse' />

      {/* <CameraRig> */}
        <Backdrop />
        {state.intro === true ? <OrbitControls /> : <group scale={[0.04, 0.04, 0.04]}><gridHelper args={[10, 10]} position={[0, -5, 0]} /></group>}
          
        <OrbitControls />
         
          <RoomGlb />
          <Glb url={glburl} pos={[0,-0.2,0] }/>
          {/* {
            url.map((url, index) => {
              console.log(url[0])
              return <Glb key={index} url={url[0]} pos={url[1]}/>
              
            })
          }  */}
          {/* <Test /> */}
        
      {/* </CameraRig> */}

    </Canvas>
  )
}

export default CanvasModel