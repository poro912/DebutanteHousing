import React, { useState } from 'react';
import {Link} from "react-router-dom"

function Friends() {
  const [fiend, setfriend] = useState("");
  const [friends, setfriends] = useState([]);
  const onChange = (event) => setfriend(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (fiend === "") {
      return;
    }
    setfriends((currentArray) => [fiend, ...currentArray]);
    setfriend("");
  };
  return <span>
     <Link to="Home"><button>뒤로가기</button></Link>
  
 <h1>친구 검색 ({friends.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={fiend}
          type="text"
          placeholder="이름을 검색하세요"
        />
        <button>검색</button>
      </form>
      <hr />
      <ul>
        {friends.map((fri, index) => (
          <li key={index}>{fri}</li>
        ))}
      </ul>
 <button>친구방이동</button>
  </span>;
}

export default Friends;