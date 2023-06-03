import React from 'react'
import { useSnapshot } from 'valtio'

import state from '../store'

const FilePicker = () => {
  const snap = useSnapshot(state);

  return (
    <div className='absolute left-full ml-3'>
      <button
        onClick={(btn) => state.url2.push(["/jewelbox_lowpoly.obj", "/jewelbox_lowpoly.mtl", [2,-20,2]])}
      >
        보석함</button>
      
        
      
    </div>
  )
}

export default FilePicker