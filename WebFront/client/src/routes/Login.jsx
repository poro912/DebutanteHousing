import {Link} from "react-router-dom"
import styles from "./Login.module.css"



function Login() {
  return <div >
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
            <Link to="/Home"><button className={styles.btn}>Enter</button></Link>
            </div>
            
  <div>
    <br />
            <Link to="/non"><button className={styles.btn2}>Guest</button></Link>
    <Link to="/Join"><button className={styles.btn3}>Join</button></Link>

    </div>
    <div>
  <img className={styles.bookcover} alt="bookcover" src="./img/bookcover.jpg" />
  <img className={styles.bgimg} alt="bgimg" src="./img/bgimg.png" />
  </div>
  </div>;
}




export default Login;