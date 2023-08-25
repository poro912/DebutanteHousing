import { Component } from "react";
import styles from "./FriendsCom.module.css"


class FriendsCom extends Component {
    render() {
      return (
       <div>
        <h1 className={styles.Name}>hello</h1>
        <button className={styles.goarrow}>➤</button>
        <img className={styles.heartp} alt="heartp" src="./img/heartp.gif" />
      </div>
      );
    }
  }
export default FriendsCom;
