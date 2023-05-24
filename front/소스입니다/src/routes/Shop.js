import React, { useState } from 'react';
import {Link} from "react-router-dom"

function Shop() {
  const [Sitem, setSitem] = useState("");
  const [Sitems, setSitems] = useState([]);
  const onChange = (event) => setSitem(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (Sitem === "") {
      return;
    }
    setSitems((currentArray) => [Sitem, ...currentArray]);
    setSitem("");
  };
  return <span>
     <Link to="Home"><button>뒤로가기</button></Link>
  
 <h1>가구 검색 ({Sitems.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={Sitem}
          type="text"
          placeholder="가구를 검색하세요"
        />
        <button>검색</button>
      </form>
      <hr />
      <ul>
        {Sitems.map((sitem, index) => (
          <li key={index}>{sitem}</li>
        ))}
      </ul>
 <div>

 </div>
  </span>;
}

export default Shop;