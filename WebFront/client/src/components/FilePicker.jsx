import React from 'react'
import { useSnapshot } from 'valtio'

import state from '../store'

const FilePicker = () => {
  const snap = useSnapshot(state);

  return (
    <div className='absolute left-full ml-3'>
      <div className='text-white'>
        dgdgdfgdgddggdgdasd</div>
      <img src='./img/furniture/chair.png' onClick={(btn) => state.url2.push(["/sm_chair_final.obj", "/sm_chair_final.mtl", [0,-12,0], [0, 0, 0]])}></img>
      
      <img src='./img/furniture/closet.png'></img>
      <img src='./img/furniture/desk.png'></img>
      <img src='./img/furniture/jewelbox.png' onClick={(btn) => state.url2.push(["/jewelbox_lowpoly.obj", "/jewelbox_lowpoly.mtl", [2,-20,2], [0, 1.55, 0]])}></img>
      
        
      
    </div>
  )
}

export default FilePicker