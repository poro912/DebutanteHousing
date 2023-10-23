import '../index.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import state from '../store';
import { CustomButton } from '../components';
import {Link} from "react-router-dom"
import styles from "./Home.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { setRoomColor, setRoomLike } from '../Redux/userSlice';

import { member } from '../apis/user';

import{
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation,
    fadeAnimation
} from '../config/motion';
import { useEffect } from 'react';

const HomePage = () => {
    const dispatch = useDispatch();
    const snap = useSnapshot(state);
    const usersItems = useSelector((state) => state.users);
    useEffect(() => {
      function userInfo(usercode){
        member(usercode, "", "",  (error, responseData) => {
          if (error) {
            console.log("member 정보 실패");
            console.log(error);
          } else {
            console.log("member 성공 :", responseData.users);
            dispatch(setRoomColor(responseData.users.room_color))
            dispatch(setRoomLike(responseData.users.room_like))
          }
        })
      }
      userInfo(usersItems.user_code)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            <div className={styles.likeCom}>
              <img src='./img/like.png' className={styles.likeImg}/>
              <div className={styles.likeCnt}>{usersItems.room_like}</div>
            </div>
            {/* <div >
              <div className={styles.icons}><img src='profileimg.png'></img>프로필</div>
              <div className={styles.icons}><img src='cusimg.png'></img>인테리어</div>
              <div className={styles.icons} ><img src='shopimg.png'></img>shop</div>
              <div className={styles.icons}><img src='frimg.png'></img>친구</div>
            </div> */}
            <div className={styles.iconCon}>
              <div className={styles.shopImg}> <Link to="/shop"><img src=".\img\cart.png"></img>shop</Link></div>
              <div className={styles.firendImg}><Link to="/friends"><img src=".\img\friend.png"></img>friend</Link></div>
            </div>
          </header>
          
        </div>
        
      )}
    </div>
  )
}

export default HomePage