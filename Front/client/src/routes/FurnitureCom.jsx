import { Component } from "react";
import styles from "./FurnitureCom.module.css"

class FurnitureCom extends Component {
  render() {
    return (
      <div className={styles.duiContainer}>
        <div className={styles.sbox}>
          <img className={`${styles.fu} ${styles.fuImage}`} alt="fu" src="./img/fu.png" />
          <div className={styles.text}>White Door</div>
        </div>
        <img className={styles.heartp} alt="heartp" src="./img/heartp.gif" />
      </div>
    );
  }
}

export default FurnitureCom;