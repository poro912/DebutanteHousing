import { useState } from 'react';
import {Link} from "react-router-dom"
import styles from "./Shopdetail.module.css"

function Shopdetail() {
 
 
  return <div>
    
  
    
 <div>


<button className={styles.buy}>Buy</button>
 </div>
 <div className={styles.sbox} />
 <img className={styles.heartp} alt="heartp" src="./img/heartp.gif" />
 <div className={styles.text}>Whtie Door</div>
 <div className={styles.titletext}>Whtie Door</div>
 <img className={styles.fu} alt="fu" src="./img/fu.png" />
 <div className={styles.box}></div>
 <h1 className={styles.detailtext}>It can be placed on the white wall with a modern and neat feel</h1>
 <Link to="Home"><button className={styles.backarrow}>➤</button> </Link>
 <h1 className={styles.FurnitureDetails}>Furniture Details</h1>
 <h1 className={styles.name}>Name:</h1>
 <h1 className={styles.price}>Price:</h1>
 <hr className={styles.hrr} />
 <hr className={styles.hrrr} />
 <img className={styles.upheart} alt="upheart" src="./img/upheart.gif" />
      <img className={styles.upheart2} alt="upheart" src="./img/upheart.gif" />

  </div>;
}

export default Shopdetail;