import {Canvas} from '@react-three/fiber'
import {Environment, Center, OrbitControls} from '@react-three/drei'
import { useGLTF } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import state from '../store'


import Backdrop from './Backdrop'
import CameraRig from './CameraRig'

import Room from './Room'
import Candle from './Candle'

const CanvasModel = () => {
  const snap = useSnapshot(state);
  const url = state.url2
  return (
    <Canvas
      shadows
      camera={{ position: [160,90,160], fov:18 }}
      
      className=''
    >
      {state.intro === true ? <OrbitControls /> : <></>}
      
      <ambientLight intensity={1} />
      <pointLight position={[0, 10, 10]} intensity={1.4} />
      <Environment preset='city' />

      {/* <CameraRig> */}
        <Backdrop />
          {state.intro === true ? <OrbitControls /> : <gridHelper args={[40, 10] } position={[0,-20,0]}/>}
          
          <Room pos={[0,0,0]} />
          {
            url.map((url, index) => {
              
              return <Candle idx={index} url={url[0]} mtl={url[1]} pos={url[2]} rotation={url[3]}/>
              
            })
          }
          
        
      {/* </CameraRig> */}

    </Canvas>
  )
}

export default CanvasModel