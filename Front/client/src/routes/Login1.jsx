import styles from "./Login1.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setTokenAmount } from "../Redux/userSlice";
import { setFurniture } from "../Redux/furnitureSlice";

import { login } from "../apis/user";
import { info } from "../apis/room";
import { balanceOf } from "../apis/contract";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, setid] = useState();
  const onChangeid = (event) => {
    setid(event.target.value);
  };
  const [pass, setpass] = useState();
  const onChangepass = (event) => {
    setpass(event.target.value);
  };
  const [roomCode, setRoomCode] = useState();

  const LogSubmit = async (event) => {
    event.preventDefault();
    try {
      await logins(id, pass);
      await roomInfo(roomCode);
    } catch (error) {
      console.error("로그인 또는 룸 정보 처리 실패", error);
    }
  };

  async function logins(id, pass) {
    try {
      await new Promise((resolve, reject) => {
        login(id, pass, (error, responseData) => {
          if (error) {
            console.log("로그인 실패");
            console.log(error);
            reject(error);
          } else {
            console.log("로그인 성공 :", responseData);
            const {
              user_code,
              user_id,
              user_nick,
              user_profile,
              room_code,
              room_name,
              room_like,
            } = responseData.users;
            const { account, privateKey } = responseData.wallet;
            roomInfo(room_code);
            const bal = getbalanceOf(account);
            dispatch(
              setLogin({
                room_code,
                room_like,
                room_name,
                user_code,
                user_id,
                user_nick,
                user_profile,
                account,
                privateKey,
              })
            );
            resolve(responseData); // 로그인 성공 시 프로미스를 성공 상태로 해결
          }
        });
      });

      // responseData에 room_code가 있다고 가정
    } catch (error) {
      console.error("로그인 또는 룸 정보 처리 실패", error);
      throw error;
    }
  }

  async function roomInfo(room_code) {
    try {
      await new Promise((resolve, reject) => {
        console.log(room_code);
        info(room_code, (error, responseData) => {
          if (error) {
            console.log("룸 정보 실패");
            console.log(error);
            reject(error);
          } else {
            console.log("룸 정보 성공 :", responseData);
            const { items } = responseData;
            console.log("itwms", items);
            dispatch(setFurniture(items));
            setTimeout(() => {
              navigate("/Home");
            }, 1000); // 5초를 밀리초로 변환하여 설정

            resolve(responseData); // 룸 정보 성공 시 프로미스를 성공 상태로 해결
          }
        });
      });
    } catch (error) {
      console.error("룸 정보 처리 실패", error);
      throw error;
    }
  }

  async function getbalanceOf(address) {
    try {
      await new Promise((resolve, reject) => {
        balanceOf(address, (error, responseData) => {
          if (error) {
            console.log("토큰 잔액 실패");
            console.log(error);
            reject(error);
          } else {
            dispatch(setTokenAmount(responseData.data.balance));

            resolve(responseData); // 룸 정보 성공 시 프로미스를 성공 상태로 해결
          }
        });
      });
    } catch (error) {
      console.error("토큰 잔액 처리 실패", error);
      throw error;
    }
  }

  return (
    <div>
      <Link to="/">
        <button className={styles.backarrow}>➤</button>
      </Link>
      <div>
        <div className={styles.sbox}>
          <h1 className={styles.Login}>Login</h1>
          <button className={styles.btn}>Join</button>
          <button className={styles.btn2}>Login</button>

          <div>
            <form onSubmit={LogSubmit}>
              <h4 className={styles.ID}>ID :</h4>
              <input
                className={styles.id}
                type="text"
                placeholder=""
                name="id"
                value={id}
                onChange={onChangeid}
              />

              <h4 className={styles.PASS}>PASS :</h4>
              <input
                className={styles.pass}
                type="Password"
                placeholder=""
                name="pass"
                value={pass}
                onChange={onChangepass}
              />
              <button className={styles.btn3}>Enter</button>
            </form>
          </div>

          <br />
        </div>
      </div>
    </div>
  );
}

export default Login;
