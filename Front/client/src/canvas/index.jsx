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
  const url = state.url2
  return (
    <Canvas
      shadows
      camera={{ position: [16,9,16], fov:2 }}
      
      className=''
    >
      {state.intro === true ? <OrbitControls /> : <></>}
      
      <ambientLight intensity={1} />
      <pointLight position={[0, 10, 10]} intensity={1.4} />
      <Environment preset='warehouse' />

      {/* <CameraRig> */}
        <Backdrop />
        {state.intro === true ? <OrbitControls /> : <group scale={[0.04, 0.04, 0.04]}><gridHelper args={[10, 10]} position={[0, -5, 0]} /></group>}
          
        <OrbitControls />
         
          <RoomGlb />
          <Glb />
          <Test />
        
      {/* </CameraRig> */}

    </Canvas>
  )
}

export default CanvasModel