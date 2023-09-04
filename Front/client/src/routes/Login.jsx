import {Link} from "react-router-dom"
import styles from "./Login.module.css"



function Login() {
  
  return <div>
<h1 className={styles.title}>Debutant</h1>
<h1 className={styles.titlee}>housing</h1>
<h1 className={styles.Login}>Login</h1>
      <div>
      </div>
     <div>
     <Link to="/DeHaPrototype/Join"><button className={styles.btn}>Join</button></Link>
     <Link to="/DeHaPrototype/test"><button className={styles.btn2}>Login</button></Link>
     
       
         <div>
    
           
            
            </div>
 
    <br />
          

    </div>
    <div>
 
   
    
    <img className={styles.heartp} alt="heartp" src="./img/heartp.gif" />
  
  <div className={styles.sbox}>
  </div>
  </div>
  </div>;
}




export default Login;