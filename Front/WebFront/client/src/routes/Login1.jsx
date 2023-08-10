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

  <button className={styles.backarrow}>➤</button>
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
    <div>
   
   
    
   <img className={styles.ui} alt="ui" src="./img/ui.png"/>
   <img className={styles.Fbg} alt="Fbg2" src="./img/Fbg2.png" />
  </div>
  </div>;
}




export default Login;