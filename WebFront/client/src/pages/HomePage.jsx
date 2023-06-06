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
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation('left')}>
          <motion.header {...slideAnimation("down")}>
            <h3>Serbia </h3>
            <Link to="/shop"><button className={styles.shop}>상점</button></Link>
            <Link to="/friends"><button className={styles.shop}>친구 방문</button></Link>
          </motion.header>

          <motion.div
            className='absolute z-10 top-5 right-5'
            {...fadeAnimation} 
          >
            <CustomButton
              type="filled"
              title="Customize"
              handleClick={() => state.intro = false}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default HomePage