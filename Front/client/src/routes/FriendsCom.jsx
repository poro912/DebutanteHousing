import { Component } from "react";
import styles from "./FriendsCom.module.css";

class FriendsCom extends Component {
  render() {
    const { name } = this.props; // name prop 받아옴

    return (
      <div className={styles.container}>
        {/* name prop 사용 */}
        <h1 className={styles.Name}>{name}</h1>
        <button className={styles.goarrow}>➤</button>
        <img className={styles.heartp} alt="heartp" src="./img/heartp.gif" />
      </div>
    );
  }
}

export default FriendsCom;