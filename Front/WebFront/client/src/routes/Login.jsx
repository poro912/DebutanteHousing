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
     <Link to="/Join"><button className={styles.btn}>Join</button></Link>
     <Link to="/test"><button className={styles.btn2}>Login</button></Link>
     
       
         <div>
    
            
            
            </div>
 
    <br />
          

    </div>
    <div>
 
   
    
    <img className={styles.heartp} alt="heartp" src="./img/heartp.gif" />
  <img className={styles.ui} alt="ui" src="./img/ui.png" />
  <audio src= "./img/bgm.mp3"
        autoPlay={true}>
      </audio>
  </div>
  </div>;
}




export default Login;