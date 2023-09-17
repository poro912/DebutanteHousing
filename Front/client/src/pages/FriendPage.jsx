import '../index.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from "react";
import { CustomButton } from '../components';
import {Link} from "react-router-dom"
import styles from "./FriendPage.module.css"
import { useDispatch, useSelector } from "react-redux";
import { setFurniture } from "../Redux/furnitureSlice";

import { info } from "../apis/room";
import { member } from '../apis/user';



const FriendPage = ({id}) => {
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState()
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
          setNickname(responseData.users.user_nick)
        }
      })
    }
    // roomInfo 함수 호출
    roomInfo(id);
    userInfo(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
    console.log("방페이지 코드", id)
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
            </div>
          </header>
          
        </div>
    </div>
  )
}

export default FriendPage