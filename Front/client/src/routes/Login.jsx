import {Link} from "react-router-dom"
import styles from "./Login.module.css"

import { setToken } from "../apis/contract";
import { useEffect } from "react";

function Login() {
  useEffect(() => {
    setToken("0xE9DC2024e6C63e65A8a481473878803237873797", (error, responseData) => {
      if (error) {
        console.error('setToken 실패');
      } else {
        console.log('setToken 성공: ', responseData);
      }
    })
  },[])
  
  
  return <div className={styles.background}>
    
    <div>
    <div className={styles.sbox}>
      <div>
<h1 className={styles.title}>Debutant</h1>
<h1 className={styles.titlee}>Housing</h1>
</div>
<h1 className={styles.Login}>Login</h1>
      <div>
      </div>
     <div>
      <div>
     <Link to="/Join"><button className={styles.btn}>Join</button></Link>
     <Link to="/test"><button className={styles.btn2}>Login</button></Link>
     </div>
     
 
    <br />
          

    </div>
    <div>
 
   
    
    
    
  
    </div>
  </div>
  </div>
  <img className={styles.heartp} alt="heartp" src="./img/heartp.gif" />
  </div>;
}




export default Login;