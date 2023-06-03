
import {Link} from "react-router-dom"
import styles from "./Home.module.css"

function Home() {
  return <div>
    
    <p className={styles.main}>Serbia
    <Link to="/storage"><button className={styles.storage}>창고</button></Link></p>

    <Link to="/shop"><button  className={styles.shop}>상점</button></Link>
    <Link to="/friends"><button className={styles.friend}>친구 방문</button></Link>
  </div>;
}

export default Home;