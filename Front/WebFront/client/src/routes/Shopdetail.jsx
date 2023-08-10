import { useState } from 'react';
import {Link} from "react-router-dom"
import styles from "./Shopdetail.module.css"

function Shopdetail() {
 
 
  return <div>
     <Link to="Home"><button>뒤로가기</button></Link>
  
 
        <button>검색</button>
    
 <div>
 <furniture />
<button className={styles.btn}>수량 up</button>
<button>수량 down</button>
<button>구매</button>
 </div>
 <img className={styles.Fbg} alt="Fbg" src="./img/Fbg2.png" />
 <img className={styles.dui} alt="dui" src="./img/dui.png" />
  </div>;
}

export default Shopdetail;