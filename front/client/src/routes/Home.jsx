//import DHM from "../../../../Modules/DHModule"
import {Link} from "react-router-dom"
import styles from "./Home.module.css"

//DHM.init()

function Home() {
  
  //var user = DHM.login("", "")
  //user.nick ="hello"
  return <div>

    <p className={styles.main}>
    <Link to="/storage"><button className={styles.storage}>창고</button></Link></p>

    <Link to="/shop"><button  className={styles.shop}>상점</button></Link>
    <Link to="/friends"><button className={styles.friend}>친구 방문</button></Link>
  </div>;
}

export default Home;