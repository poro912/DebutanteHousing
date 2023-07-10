import React from 'react'
import { useSnapshot } from 'valtio'


import state from '../store'
import { color } from 'framer-motion';
import styles from "./text.module.css"

const AIpicker = () => {
  const snap = useSnapshot(state);

  return (
    <div className='absolute left-full ml-3'>
      <div className={styles.a}>ddkddk</div>
      <button
        onClick={(btn) => {
          const arrB =[-4, 0, 0];
          state.url2[state.click][2] = state.url2[state.click][2].map((x, y) => x + arrB[y])
        }}
      >
        <img src= './img/move1.png' />
        </button>
        <button
        onClick={(btn) => {
          const arrB =[0, 0, -4];
          state.url2[state.click][2] = state.url2[state.click][2].map((x, y) => x + arrB[y])
        }}
      >
        <img src= './img/move2.png' /></button>
        <button
        onClick={(btn) => {
          const arrB =[4, 0, 0];
          state.url2[state.click][2] = state.url2[state.click][2].map((x, y) => x + arrB[y])
        }}
      >
        <img src= './img/move4.png' /></button>
        <button
        onClick={(btn) => {
          const arrB =[0, 0, 4];
          state.url2[state.click][2] = state.url2[state.click][2].map((x, y) => x + arrB[y])
        }}
      >
        <img src= './img/move3.png' />
        </button>
        <button
        onClick={(btn) => {
          const arrB =[0, 1.55, 0];
          state.url2[state.click][3] = state.url2[state.click][3].map((x, y) => x + arrB[y])
        }}
      >
        <img src= './img/right.png' />
        </button>
        <button
        onClick={(btn) => {
          const arrB =[0, -1.55, 0];
          state.url2[state.click][3] = state.url2[state.click][3].map((x, y) => x + arrB[y])
        }}
      >
        <img src= './img/left.png' />
        </button>
      {console.log(state.obj)}
        
      
    </div>
  )
}

export default AIpicker