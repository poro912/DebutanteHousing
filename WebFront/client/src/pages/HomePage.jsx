import '../index.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import state from '../store';
import { CustomButton } from '../components';
import {Link} from "react-router-dom"
import styles from "./Home.module.css"

import{
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation,
    fadeAnimation
} from '../config/motion';

const HomePage = () => {
    const snap = useSnapshot(state);

  return (
    <div>
      {snap.intro && (
        <div className="home">
          <header>
            <div className={styles.verti}>
              <h3 className={styles.name}>Serbia </h3>
              <img
                  src="\img\Customize.png"
                  onClick={() => state.intro = false}
                  className={styles.varti_img}
              > 
              </img>
            </div>
            <Link to="/shop"><img src="\img\shop.png" className={styles.shopImg}></img></Link>
            <Link to="/friends"><img src="\img\friend.png" className={styles.firendImg}></img></Link>
          </header>
          
        </div>
        
      )}
    </div>
  )
}

export default HomePage