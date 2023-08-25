import React, { useState, useEffect } from 'react';
import state from '../store';
import { useSnapshot } from 'valtio'

import styles from "./Customizer.module.css"


const Customizer = () => {
  const snap = useSnapshot(state);
  const [index, setIndex] = useState(snap.intro)
  useEffect(() => {
    setIndex(snap.intro ? -1 : 1)
  },[])

  return (
    <>
   
    {snap.intro ?
    <div className={styles.customizerContainer} style={{ zIndex: -1 }}>
    </div>
    : <div className={styles.customizerContainer} style={{ zIndex: 1 }}>
      <div className={styles.buttonContainer }>
        <div className={styles.backBtn} onClick={() => state.intro = true} >뒤로가기 버튼</div>
        <div className={styles.saveBtn}>저장 버튼</div>
      </div>
      <div className={styles.fuListContainer}>
        <div className={styles.furniture}><img src='./img/furniture/chair.png'/></div>
        <div className={styles.furniture}><img src='./img/furniture/closet.png'/></div>
        <div className={styles.furniture}><img src='./img/furniture/closet.png'/></div>
        <div className={styles.furniture}><img src='./img/furniture/closet.png'/></div>
        <div className={styles.furniture}><img src='./img/furniture/closet.png'/></div>
        <div className={styles.furniture}><img src='./img/furniture/closet.png'/></div>
        
      </div>
      
      </div>}
    

   </>
  )
}

export default Customizer