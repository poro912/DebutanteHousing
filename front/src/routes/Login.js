import React from "react";
import {Link} from "react-router-dom"
import styles from "./Login.module.css"
import DB_Module from "../../../Modules/DB/DB_Module"


function Login() {
  return <div><h1 className={styles.title}>Debutante Housing</h1>
      <div/>
     <div>
       
       
            <input className={styles.id} autofocus
            type="text" 
            placeholder="ID" />
            <div>
            <input className={styles.pass} type="text" autofocus
            placeholder="PASSWORD" />
            <Link to="/Home"><button className={styles.btn}>login</button></Link>
            </div>
            </div>
  <div>
    <br />
            <Link to="/non"><button className={styles.btn2}>Guest</button></Link>
    <Link to="/Join"><button className={styles.btn3}>Join</button></Link>

    </div>
    <img className={styles.bookcover} alt="bookcover" src="img/bookcover.jpg" />
  </div>;
}




export default Login;