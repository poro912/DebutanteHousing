import styles from "./Friendss.module.css"
import {Link} from "react-router-dom"

function Friendss() {
  return <div>
 
 <Link to="Friends"><img className={styles.Fbgimg} alt="FRIENDSROOM" src="./img/FRIENDROOM.png" /></Link>


  </div>;
}

export default Friendss;