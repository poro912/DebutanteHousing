import '../index.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import state from '../store';
import { CustomButton } from '../components';
import {Link} from "react-router-dom"
import styles from "./Home.module.css"
import { useDispatch, useSelector } from 'react-redux';

import{
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation,
    fadeAnimation
} from '../config/motion';

const HomePage = () => {
    const snap = useSnapshot(state);
    const usersItems = useSelector((state) => state.users);
  return (
    <div className={styles.homcon}>
      {snap.intro && (
        <div className="home">
          <header>
            <div className={styles.verti}>
              <button>
                <Link to="/mypage"><h3 className={styles.name}>{usersItems.user_nick}</h3></Link>
              </button>
              <button>
                <img
                    src=".\img\setting.png"
                    className={styles.setting}
                    onClick={() => state.intro = false}
                /> 
              </button>
                
              
            </div>
            <div className={styles.iconCon}>
              <div className={styles.shopImg}><Link to="/shop"><img src=".\img\cart.png"></img>shop</Link></div>
              <div className={styles.firendImg}><Link to="/friends"><img src=".\img\friend.png"></img>friend</Link></div>
            </div>
          </header>
          
        </div>
        
      )}
    </div>
  )
}

export default HomePage