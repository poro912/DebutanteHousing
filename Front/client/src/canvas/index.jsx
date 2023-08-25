import React, { useEffect, useState } from 'react';
import {Canvas} from '@react-three/fiber'
import {Environment, Center, OrbitControls, PerspectiveCamera} from '@react-three/drei'
import { useGLTF } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { useDispatch, useSelector } from 'react-redux';
import { addFurniture, updateFurniture, removeFurniture } from '../Redux/furnitureSlice';
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

  const dispatch = useDispatch();
  const furnitureList = useSelector(state => state.furniture.furnitureList);

  const [glburl, setGlburl] = useState("") //링크로 불러오기 성공
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
//링크
  

  return (
    
    <Canvas
      shadows
      camera={{ position: [16, 10, 16], fov:1.7 } }
      
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
          {/* <Glb url={urls[0]} pos={[0,-0.2,0] }/> */}

          {
            furnitureList.map((furnitur) =>{
              return <Glb1 key={furnitur.id} url={furnitur.url} initialPos={furnitur.pos}  initialRot={furnitur.rot} />
            })
          }
          {/* {
            url.map((url, index) => {
              console.log(url[0])
              return <Glb1 key={index} url={url[0]} initialPos={url[1]} initialRot={[0,0,0]}/>
              
            })
          }  */}
          {/* <Test /> */}
        
      {/* </CameraRig> */}

    </Canvas>
  )
}

export default CanvasModel