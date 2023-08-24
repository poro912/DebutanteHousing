import React, { useEffect, useState } from 'react';
import {Canvas} from '@react-three/fiber'
import {Environment, Center, OrbitControls} from '@react-three/drei'
import { useGLTF } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import state from '../store'


import Backdrop from './Backdrop'
import CameraRig from './CameraRig'
import Glb from './Glb'
import Glb1 from './Glb1'
import RoomGlb from './RoomGlb'
import Test from './Test'


const CanvasModel = () => {
  const snap = useSnapshot(state);
  const url = state.green
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
      camera={{ position: [16,12,16], fov:1.7 }}
      
      className=''
      onContextMenu={(event) => {
        event.preventDefault();
      }}
    >
      
      
      <ambientLight intensity={0.5} />
      <spotLight position={[0, 50, 50]} intensity={1} penumbra={1} castShadow />
      <Environment preset="warehouse" />

      {/* <CameraRig> */}
        
        {state.intro === true ? <OrbitControls enablePan={false}/> : <></>}
          
        
         
          <RoomGlb />
          {/* <Glb url={"/glb/closet1/closet1_lightgreen.glb"} pos={[0,-0.2,0] }/> */}
          {
            url.map((url, index) => {
              console.log(url[0])
              return <Glb1 key={index} url={url[0]} initialPos={url[1]} initialRot={[0,0,0]}/>
              
            })
          } 
          {/* <Test /> */}
        
      {/* </CameraRig> */}

    </Canvas>
  )
}

export default CanvasModel