import React from "react";
import {Link} from "react-router-dom"
import styles from "./Join.module.css"

function Join() {
  return <div>
   <p> <Link to="/"><button className={styles.btn}>뒤로가기</button></Link>

   </p>

    <div>
    <h1 className={styles.title}>Debutante Housing</h1>
        <b></b>
            <input className={styles.id}
            type="text" 
            placeholder="ID" />
            <div>
            <input className={styles.pass}
            type="text" 
            placeholder="PASSWORD" />
            <Link to="/Home"><button className={styles.btn3}>Join</button></Link>
            </div>
            </div>
            <img className={styles.bookcover} alt="bookcover" src="img/bookcover.jpg" />
         </div>
           
      
}

export default Join;