import { Link } from "react-router-dom";
import styles from "./Profil.module.css";

function Profil() {
    return (
  
      <div >
        <h1 className={styles.Mypage}>Profil</h1>
        <Link to="/Home"><button className={styles.backarrow}>➤</button></Link>
    <div className={styles.box}>
    <div className={styles.itemsContainer}>
    <h1 className={styles.Token}>토큰 잔액: 5000 </h1>
    <h1 className={styles.Eth}>이더 잔액: 5000</h1>
    </div>
    </div>
   </div>
    )
  }
  
  export default Profil;