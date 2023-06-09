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
     <Link to="Home"><button className={styles.btn}>뒤로가기</button></Link>
  
 <h1 className={styles.search}>친구 검색 ({friends.length})</h1>
      <form onSubmit={onSubmit}>
        <input className={styles.searchbar}
          onChange={onChange}
          value={friend}
          type="text"
          placeholder="이름을 검색하세요"
        />
        <button className={styles.btn2}>검색</button>
      </form>
      <hr />
      <ul>
        {friends.map((fri, index) => (
          <li key={index}>{fri}</li>
        ))}
      </ul>
 <button className={styles.btn3}>친구방이동</button>
  </div>;
}

export default Friends;