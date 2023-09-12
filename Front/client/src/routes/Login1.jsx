import styles from "./Login1.module.css"
import { useState } from "react";
import {Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setProfileImg } from '../Redux/userSlice';

import { login } from "../apis/user"


function Login() {

    const dispatch = useDispatch();

    const [id, setid] = useState();
    const onChangeid = (event) => {
      setid(event.target.value);
    }
    const [pass, setpass] = useState();
    const onChangepass = (event) => {
      setpass(event.target.value);
    }
  
    const LogSubmit = (event) => {
      event.preventDefault();
      logins(id, pass)
    }

    function logins(id, pass){
      //API 함수 실행
      //id, pw를 변수로 안쓰고 진짜 아이디 직접 넣어도됨
      login(id, pass, (error, responseData) => {
          if(error){
              console.log("로그인 실패")
              console.log(error)
          }
          else{
              console.log("로그인 성공 :", responseData.users);
              const { room_code , room_like, room_name , user_code, user_id, user_nick, user_profile } = responseData.users;
              dispatch(
                setLogin({
                  room_code,
                  room_like,
                  room_name,
                  user_code,
                  user_id,
                  user_nick,
                  user_profile,
                })
              )
          }
      }) 
  }

    
  
  return <div>

<Link to="/"><button className={styles.backarrow}>➤</button></Link>
     <div>
     <h1 className={styles.Login}>Login</h1>
     <button className={styles.btn}>Join</button>
     <button className={styles.btn2}>Login</button>
     
       
         <div>
     <form onSubmit={LogSubmit}>
      <h4 className={styles.ID}>ID :</h4>
            <input className={styles.id} 
            type="text" 
            placeholder="" 
            name="id"
            value={id}
            onChange={onChangeid} />

              <h4 className={styles.PASS}>PASS :</h4>
            <input className={styles.pass} 
            type="Password" 
            placeholder=""
            name="pass"
            value={pass}
            onChange={onChangepass} />
            <button className={styles.btn3}>Enter</button>
            </form>
            
            
            
            </div>
 
    <br />
          

    </div>
    <div className={styles.sbox}>
   
  
  </div>
  </div>;
}




export default Login;