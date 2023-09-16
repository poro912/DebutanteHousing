import React, { useEffect, useState } from 'react';
import {Canvas} from '@react-three/fiber'
import {Environment, Center, OrbitControls, PerspectiveCamera} from '@react-three/drei'
import { useGLTF } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { useDispatch, useSelector } from 'react-redux';
import { addFurniture, updateFurniture, removeFurniture } from '../Redux/furnitureSlice';
import state from '../store'




import Glb1 from './Glb1'
import RoomGlb from './RoomGlb'



const CanvasModel = () => {
  const snap = useSnapshot(state);
  //const url = state.green

  const dispatch = useDispatch();
  const furnitureList = useSelector(state => state.furniture.items);

  const [glburl, setGlburl] = useState("") //링크로 불러오기 성공
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://gateway.pinata.cloud/ipfs/QmWvpY9w2DtQbRJcETM3WQuGhXwZYMUGTayCUbRsNNFAmz/1.json');
        const jsonData = await response.json();
        console.log(jsonData); // JSON 데이터를 콘솔에 출력
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

      
      
      
      <Environment preset="warehouse" />

        
        {state.intro === true ? <OrbitControls enablePan={false}/> : <></>}
        
          
        
         
          <RoomGlb receiveShadow />

          {

            furnitureList.map((furnitur) =>{
              return <Glb1 key={furnitur.code} code={furnitur.code} url={furnitur.url} initialPos={furnitur.pos}  initialRot={furnitur.rot} receiveShadow/>
            })
          }


    </Canvas>
  )
}

export default CanvasModel