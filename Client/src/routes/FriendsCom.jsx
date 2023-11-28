import { Component } from "react";
import styles from "./FriendsCom.module.css";

class FriendsCom extends Component {
  render() {
    const { frdata } = this.props; // name prop 받아옴
    console.log(frdata)
    return (
      <div className={styles.container}>
        {/* name prop 사용 */}
        <img className={styles.heartp} alt="heartp" src="./img/heartp.gif" />
        <h1 className={styles.Name}>{frdata.user_nick}</h1>
        <button className={styles.goarrow}>➤</button>
        
      </div>
    );
  }
}

export default FriendsCom;