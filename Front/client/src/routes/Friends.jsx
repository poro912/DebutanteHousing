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
    
    
    <h1 className={styles.fname}>Mare</h1>
    <h1 className={styles.ffname}>Debut</h1>


<hr className={styles.line} />
<hr className={styles.linee}/>

      <form onSubmit={onSubmit}>
        <input className={styles.searchbar}
          onChange={onChange}
          value={friend}
          type="text"
          placeholder=""
        />
        
      </form>
     
      <ul>
        {friends.map((fri, index) => (
          <li key={index}>{fri}</li>
        ))}
      </ul>
     
      <hr />
      <div className={styles.box}></div>

      <Link to="Friendss"><img className={styles.Aro} alt="Aro" src="./img/Aro.png" /></Link>

      <img className={styles.Aroo} alt="Aro" src="./img/Aro.png" />
 <img className={styles.Fbgimg} alt="Fbgimg" src="./img/Fbgimg.png" />
 <img className={styles.Doorplate} alt="Doorplate" src="./img/Doorplate.png" />
 <img className={styles.Mag} alt="Mag" src="./img/Mag.png" />
 <Link to="/DeHaPrototype/Home"><img className={styles.back} alt="back" src="./img/back.png" /></Link>
  </div>;
}

export default Friends;