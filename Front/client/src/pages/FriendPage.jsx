import '../index.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from "react";
import { CustomButton } from '../components';
import {Link} from "react-router-dom"
import styles from "./FriendPage.module.css"
import { useDispatch, useSelector } from "react-redux";
import { setFurniture } from "../Redux/furnitureSlice";
import { setRoomColor } from '../Redux/userSlice';

import ChatItem from './ChatItem';

import { info, like, comment } from "../apis/room";
import { member } from '../apis/user';



const FriendPage = ({id}) => {
  const dispatch = useDispatch();
  const usersItems = useSelector((state) => state.users);

  const [nickname, setNickname] = useState()
  const [likeCnt, setLikeCnt] = useState()
  const [comments, setComment] = useState(null)
  const [Incomm, setInComm] = useState("")
  const [roomCode, setRoomCode] = useState(null)

  const onChangecomm = (event) => {
    setInComm(event.target.value);
  };
  useEffect(() => {
    function roomInfo(roomcode) {
      info(roomcode, (error, responseData) => {
        if (error) {
          console.log("룸 정보 실패");
          console.log(error);
        } else {
          console.log("룸 정보 성공 :", responseData);
          const { items } = responseData;
          console.log("items", items);
          dispatch(setFurniture(items));
          
          setComment(responseData.comment)
        }
      });
    }
    function userInfo(usercode){
      member(usercode, "", "",  (error, responseData) => {
        if (error) {
          console.log("member 정보 실패");
          console.log(error);
        } else {
          console.log("member 성공 :", responseData.users);
          setRoomCode(responseData.users.room_code)
          setNickname(responseData.users.user_nick)
          setLikeCnt(responseData.users.room_like)
          dispatch(setRoomColor(responseData.users.room_color))
        }
      })
    }
    // roomInfo 함수 호출
    roomInfo(id);
    userInfo(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


    //좋아요 기능
    const likeHandle = () => {
      like(id, (error, responseData) => {
        if (error) {
          console.log("좋아요 실패");
          console.log(error);
        } else {
          console.log("좋아요 성공 :", responseData);
        }
      })
      setLikeCnt(likeCnt + 1)
    }

    //댓글기능
    const commentHandle = () => {
      console.log("댓글기능", roomCode, usersItems.user_code, Incomm)
      comment(roomCode, usersItems.user_code, Incomm, (error, responseData) => {
        if (error) {
          console.log("댓글 실패");
          console.log(error);
          setInComm("")
        } else {
          console.log("댓글 성공 :", responseData);
          setComment(prevComments => [...prevComments, {time: "2023-11-12", user_nick: "myang", content: Incomm}])
          setInComm("")
        }
      })
    }
  return (
    <div className={styles.homcon}>
        <div className="home">
          <header>
            <div className={styles.con}>
              <Link to="/Friends"><button className={styles.backarrow}>➤</button></Link>
              <div className={styles.verti}>
                <button>
                  <h3 className={styles.name}>{nickname}</h3>
                </button>
              </div>
              <button onClick={likeHandle}>
                <div className={styles.likeCom}>
                  <img src='/img/like.png' className={styles.likeImg}/>
                  <div className={styles.likeCnt}>{likeCnt}</div>
                </div>
              </button>
            </div>
            
          </header>
          <div className={styles.chatCom}>
              {comments ? (<div className={styles.chatList}>
                {comments.map((item, index) => (
                  <ChatItem item={item} key={index}/>
                ))}
              </div>): (<div></div>)}
            
              <div className={styles.chatIn}>
                <input 
                  className={`${styles.chatInBox} ${styles.customFont}`}
                  placeholder="댓글을 입력하세요"
                  value={Incomm} 
                  onChange={onChangecomm}/>
                <div className={styles.chatpl}><button onClick={commentHandle}>↑</button></div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default FriendPage