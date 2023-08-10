import { Component } from "react";
import styles from "./FurnitureCom.module.css"


class FurnitureCom extends Component {
    render() {
      return (
        <div className={styles.duiContainer}>
          <img className={styles.dui} alt="dui" src="./img/dui.png" />
          <img className={`${styles.fu} ${styles.fuImage}`} alt="fu" src="./img/fu.png" />
          <div className={styles.text}>문</div>
        </div>
      );
    }
  }
export default FurnitureCom;
