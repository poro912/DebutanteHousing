import { useState } from 'react';
import { Link } from "react-router-dom"
import styles from "./Friends.module.css";
import FriendsCom from './FriendsCom';

function Friends() {
  const [friend, setFriend] = useState("");
  const [friends, setFriends] = useState([]);
  const [name, setName] = useState("chaeyeon"); // 이름을 저장할 상태 변수 추가

  const onChange = (event) => setFriend(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();
    if (friend === "") {
      return;
    }
    setFriends((currentArray) => [friend, ...currentArray]);
    setFriend("");
  };

  // 이름을 저장하는 함수
  const saveName = () => {
    setName(friend);
    setFriend(""); // 입력 필드 초기화
  };

  return (
    <div className={styles.friendsContainer}>
      <form onSubmit={onSubmit}>
        <input
          className={styles.searchbar}
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
      
      <div className={styles.box}>
      <img className={styles.Mag} alt="Mag" src="./img/Mag.png" />
      <hr className={styles.hrr} />
        {friends.map((fri, index) => (
          <FriendsCom key={index} name={fri} />
        ))}
        
        <div className={styles.furnitureWrapper}>
        
        <FriendsCom name={name} />
        </div>
        
        </div>
 
      

      <h1 className={styles.fr}>Friends List</h1>
      
      <Link to="/Home"><button className={styles.backarrow}>➤</button></Link>
      
      <img className={styles.star} alt="star" src="./img/star.gif" />
      <img className={styles.upstar} alt="downstar" src="./img/upstar.gif" />
      <img className={styles.upstarr} alt="downstarr" src="./img/upstar.gif" />
      <img className={styles.upstarrr} alt="downstarrr" src="./img/upstar.gif" />
      <img className={styles.upstarrrr} alt="downstarrrr" src="./img/upstar.gif" />
    </div>
  );
}

export default Friends;
