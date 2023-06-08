import { useState } from 'react';
import {Link} from "react-router-dom"
import styles from "./Friends.module.css"

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
    <i className="fa-solid fa-house fa-2x"></i>
     <Link to="Home"><button className={styles.btn}>뒤로가기</button></Link>
    <h1 className={styles.fname}>Serbia</h1>
    <h1 className={styles.ffname}>Debut</h1>
 <h1 className={styles.search}>친구 검색(2)</h1>

<hr className={styles.line} />
<hr className={styles.linee}/>
      <form onSubmit={onSubmit}>
        <input className={styles.searchbar}
          onChange={onChange}
          value={friend}
          type="text"
          placeholder=""
        />
        <button className={styles.btn2}>검색</button>
      </form>
     
      <ul>
        {friends.map((fri, index) => (
          <li key={index}>{fri}</li>
        ))}
      </ul>
      <Link to="Friendss"><button className={styles.btn3}>친구방이동</button></Link>
 <img className={styles.bgimg} alt="bgimg" src="./img/bgimg.png" />
  </div>;
}

export default Friends;