import styles from "./Login1.module.css"
import { useState } from "react";
import {Link} from "react-router-dom"


function Login() {

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