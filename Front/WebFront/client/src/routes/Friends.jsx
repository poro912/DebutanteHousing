import { useState } from 'react';
import {Link} from "react-router-dom"
import styles from "./Friends.module.css"
import FriendsCom from './FriendsCom';

function Friends() {
  const [friend, setfriend] = useState("");
  const [friends, setfriends] = useState([]);
  const onChange = (event) => setfriend(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (friend === "") {
      return;
    }
    setfriends((currentArray) => [friend, ...currentArray]);
    setfriend("");
  };
  return <div>
    


      <form onSubmit={onSubmit}>
        <input className={styles.searchbar}
          onChange={onChange}
          value={friend}
          type="text"
          placeholder=""
        />
        
      </form>
     
     <div className={styles.listContainer}>
     <div className={styles.listWrapper}>
      <ul className={styles.friendList} >
        {friends.map((fri, index) => (
          <li className={styles.list} key={index}>{fri}</li>
        ))}
      </ul>
     </div>
     </div>
      <hr />
      
      <FriendsCom />
      
      <img className={styles.Fbg} alt="Fbg" src="./img/Fbg2.png" />
      <img className={styles.Mag} alt="Mag" src="./img/Mag.png" />
      <Link to="/Home"><button className={styles.backarrow}>➤</button></Link>
      <img className={styles.heartp} alt="heartp" src="./img/heartp.gif" />
      <div className={styles.box}></div> {/* 흰색 불투명한 박스 */}

  </div>;
}

export default Friends;