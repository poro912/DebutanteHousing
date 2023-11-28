import '../index.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import state from '../store';
import { CustomButton } from '../components';
import {Link} from "react-router-dom"
import styles from "./Home.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { setRoomColor, setRoomLike } from '../Redux/userSlice';

import ChatItem from './ChatItem';

import { member } from '../apis/user';
import { info } from '../apis/room';

import{
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation,
    fadeAnimation
} from '../config/motion';
import { useEffect, useState } from 'react';

const HomePage = () => {
    const dispatch = useDispatch();
    const snap = useSnapshot(state);
    const usersItems = useSelector((state) => state.users);
    const [comment, setComment] = useState(null)
    
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
      function roomInfo(roomcode){
        info(roomcode, (error, responseData) => {
          if (error) {
            console.log("댓글 정보 실패");
            console.log(error);
          } else {
            console.log("댓글 성공 :", responseData.comment);
            setComment(responseData.comment)
          }
        })
      }
      userInfo(usersItems.user_code)
      roomInfo(usersItems.room_code)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const acomment = [{time: "2023-11-11", user_nick: "gest", content: "와 이쁘다"} ,
    {time: "2023-11-12", user_nick: "gest", content: "와 이쁘다"}, 
    {time: "2023-11-13", user_nick: "gest", content: "와 이쁘다"},
    {time: "2023-11-14", user_nick: "gest", content: "와 이쁘다"},
    {time: "2023-11-15", user_nick: "gest", content: "와 이쁘다"},
    {time: "2023-11-15", user_nick: "gest", content: "와 이쁘다"},
    {time: "2023-11-15", user_nick: "gest", content: "와 이쁘다"},
    {time: "2023-11-15", user_nick: "gest", content: "와 이쁘다"},
    {time: "2023-11-15", user_nick: "gest", content: "와 이쁘다"},
    {time: "2023-11-15", user_nick: "gest", content: "와 이쁘다"},
    {time: "2023-11-15", user_nick: "gest", content: "와 이쁘다"},
    {time: "2023-11-15", user_nick: "gest", content: "와 이쁘다"}]
  

  return (
    <div className={styles.homcon}>
      {snap.intro && (
        <div className="home">
            <div className={styles.verti}>
              <button>
                <h3 className={styles.name}>{usersItems.user_nick}</h3>
              </button>
              <div className={styles.likeCom}>
                <img src='./img/like.png' className={styles.likeImg}/>
                <div className={styles.likeCnt}>{usersItems.room_like}</div>
              </div>
            </div>
            
          <div className={styles.LRcom}>
            <div className={styles.sidebar}>
              <div><button><img src='.\img\room3.png' onClick={() => state.intro = false} />room</button></div>
              <div><button><Link to="/shop"><img src='.\img\shop2.png'/>shop</Link></button></div>
              <div><button><Link to="/Friends"><img src='.\img\fr.png'/>friend</Link></button></div>
              <div><button><Link to="/Mypage"><img src='.\img\setting.png'/>mypage</Link></button></div>
            </div>
            <div className={styles.chatCom}>
              {comment ? (<div className={styles.chatList}>
                {comment.map((item, index) => (
                  <ChatItem item={item} key={index}/>
                ))}
              </div>): (<div></div>)}
            
              <div className={styles.chatIn}>
                <input className={styles.chatInBox}/>
                <div className={styles.chatpl}><button>↑</button></div>
              </div>
            </div>
          </div>
        </div>
        
      )}
    </div>
  )
}

export default HomePage