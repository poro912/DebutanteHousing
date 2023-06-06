import React from 'react'
import { useSnapshot } from 'valtio'

import state from '../store'

const AIpicker = () => {
  const snap = useSnapshot(state);

  return (
    <div className='absolute left-full ml-3'>
      <button
        onClick={(btn) => {
          const arrB =[0, 0, 4];
          state.url2[state.click][2] = state.url2[state.click][2].map((x, y) => x + arrB[y])
        }}
      >
        아래</button>
        <button
        onClick={(btn) => {
          const arrB =[0, 0, -4];
          state.url2[state.click][2] = state.url2[state.click][2].map((x, y) => x + arrB[y])
        }}
      >
        위</button>
        <button
        onClick={(btn) => {
          const arrB =[4, 0, 0];
          state.url2[state.click][2] = state.url2[state.click][2].map((x, y) => x + arrB[y])
        }}
      >
        오른쪽</button>
        <button
        onClick={(btn) => {
          const arrB =[-4, 0, 0];
          state.url2[state.click][2] = state.url2[state.click][2].map((x, y) => x + arrB[y])
        }}
      >
        왼쪽</button>
      {console.log(state.obj)}
        
      
    </div>
  )
}

export default AIpicker