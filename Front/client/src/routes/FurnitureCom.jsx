import { Component } from "react";
import styles from "./FurnitureCom.module.css";

function FurnitureCom({ data }) {
  console.log(data)
    return (
      <div className={styles.duiContainer}>
        <div className={styles.sbox}>
          <img className={`${styles.fu} ${styles.fuImage}`} alt="fu" src={data.image} />
          <div className={styles.text}>{data.name}</div>
        </div>
        <img className={styles.heartp} alt="heartp" src="./img/heartp.gif" />
      </div>
    );
}

export default FurnitureCom;
