import {Link} from "react-router-dom"
import styles from "./Login.module.css"



function Login() {
  return(
  <div >
    <h1 className={styles.title}>Debutante</h1>

    <h1 className={styles.titlee}>Housing</h1>

    <div>
      <div className={styles.nbox}></div>
    </div>
    <div>
      <input className={styles.id} 
        type="text" 
        placeholder="ID" />
    </div>
    <div>
             
      <input className={styles.pass} type="Password" 
        placeholder="PASSWORD"
        autoComplete="current-password" />
      <Link to="/DeHaPrototype/Home"><button className={styles.btn}>Enter</button></Link>
    </div>
            
 
    <br />
    <div>
      <Link to="/DeHaPrototype/non"><button className={styles.btn2}>Guest</button></Link>
      <Link to="/DeHaPrototype/Join"><button className={styles.btn3}>Join</button></Link>
    </div>
    <div>
      <img className={styles.background} alt="background" src="./img/background." />
      <img className={styles.ui} alt="ui" src="./img/ui.png" />
    </div>
  </div>
  )
}




export default Login;