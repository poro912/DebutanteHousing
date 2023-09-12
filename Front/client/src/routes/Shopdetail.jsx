import { useState } from 'react';
import {Link} from "react-router-dom"
import styles from "./Shopdetail.module.css"

function Shopdetail() {
 
 
  return <div>
    
  
    
 <div>



 </div>
 <div className={styles.sbox} />
 <img className={styles.heartp} alt="heartp" src="./img/heartp.gif" />

 <img className={styles.fu} alt="fu" src="./img/fu.png" />
 <div className={styles.box}>
 <h1 className={styles.detailtext}>It can be placed on the white wall with a modern and neat feel</h1>
 <h1 className={styles.name}>Name:</h1>
 <h1 className={styles.price}>Price:</h1>
 <hr className={styles.hrr} />
 <hr className={styles.hrrr} />
 <button className={styles.buy}>Buy</button>
 <div className={styles.text}>Whtie Door</div>
 <div className={styles.titletext}>Whtie Door</div>
 </div>
 
 <Link to="Home"><button className={styles.backarrow}>➤</button> </Link>
 <h1 className={styles.FurnitureDetails}>Furniture Details</h1>
 
 

 <img className={styles.upheart} alt="upheart" src="./img/upheart.gif" />
      <img className={styles.upheart2} alt="upheart" src="./img/upheart.gif" />

  </div>;
}

export default Shopdetail;