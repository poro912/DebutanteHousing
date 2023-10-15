import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Friends.module.css";
import FriendsCom from "./FriendsCom";

import { useDispatch, useSelector } from "react-redux";
import { setFurniture } from "../Redux/furnitureSlice";

import { member } from "../apis/user";
import { info } from "../apis/room";

function Friends() {
  const dispatch = useDispatch();

  const usersItems = useSelector((state) => state.users);

  const [friend, setFriend] = useState("");
  const [friends, setFriends] = useState([]);

  const onChange = (event) => setFriend(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();
    if (friend === "") {
      return;
    }
    setFriends((currentArray) => [friend, ...currentArray]);
    setFriend("");
  };

  useEffect(() => {
    member( "0", "", "",  (error, responseData) => {
      if (error) {
        console.error('member 정보 실패');
      } else {
        console.log('member 정보 성공: ', responseData.users);
        setFriends(responseData.users)
      }
    })
  }, []);

  function backButton() {
    function roomInfo(room_code) {
      info(room_code, (error, responseData) => {
        if (error) {
          console.log("룸 정보 실패");
          console.log(error);
        } else {
          console.log("룸 정보 성공 :", responseData);
          const { items } = responseData;
          console.log("items", items);
          dispatch(setFurniture(items));
        }
      });
    }
    // roomInfo 함수 호출
    roomInfo(usersItems.room_code);

  }


  return (
    <div className={styles.background}>
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

      <div className={styles.box}>
        <img className={styles.Mag} alt="Mag" src="./img/Mag.png" />
        <hr className={styles.hrr} />
        <div className={styles.friendList}>
          {friends.map((fri, index) => (
            <Link to={`/FriendRoom/${fri.room_code}`}>
              <FriendsCom key={index} frdata={fri} />
            </Link>
          ))}
        </div>
      </div>

      <h1 className={styles.fr}>Friends List</h1>

      <Link to="/Home">
        <button className={styles.backarrow} onClick={backButton}>➤</button>
      </Link>

      <img className={styles.star} alt="star" src="./img/star.gif" />
      <img className={styles.back} alt="back" src="./img/backimg.png" />
     
    </div>
    </div>
  );
}

export default Friends;
