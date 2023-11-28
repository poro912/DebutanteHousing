import React, { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio'

import { useDispatch, useSelector } from 'react-redux';
import { addFurniture, updateFurniture, removeFurniture } from '../Redux/furnitureSlice';



import state from '../store'
import { color } from 'framer-motion';
import styles from "./text.module.css"

const AIpicker = () => {
  const snap = useSnapshot(state);

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

  const newFurnitureData = [
    { id: 1, url: glburl, pos: [0, -0.2, 0], rot: [0,0,0] }
  ];

  const addFurnitureData = data => {
    data.forEach(furniture => {
      dispatch(addFurniture(furniture));
    });
    console.log("Updated furnitureList:", furnitureList);
  };

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
       onClick={() => {
        addFurnitureData(newFurnitureData)
        console.log(zmfflr)
      }}
      >
        <img src= './img/left.png' />
        </button>
      {console.log(state.obj)}
        
      
    </div>
  )
}

export default AIpicker