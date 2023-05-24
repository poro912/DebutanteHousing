import React, { useState } from 'react';
import {Link} from "react-router-dom"

function Storage() {
  const [Item, setItem] = useState("");
  const [Items, setItems] = useState([]);
  const onChange = (event) => setItem(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (Item === "") {
      return;
    }
  
  setItems((currentArray) => [Item, ...currentArray])
  setItem("");
}
  return <span>
    
    <div>
    <Link to="Home"><button>방꾸미기 페이지로 가기</button></Link>
    창고 
    </div>
    <div>
     <button>저장</button>
  <button>초기화</button>
  </div>
    <button>이동</button>
    <button>회전</button>
  <button>확대</button>
  <button>축소</button>
  


  <div>

  
  <h1>가구 목록 ({Items.length})</h1>
  
   <form onSubmit={onSubmit}>
    <input 
    onChange={onChange} 
    value={Item} 
    type="text" 
    placeholder="가구를 검색하세요" />
      <button>가구 검색</button>
      <button>검색뒤로가기</button>
      </form>
      <hr />
      <ul>
      {Items.map((list, index) => 
      <li key={index}>{list}</li>) }
      </ul>
  </div>
  <div>
   
  </div>
  </span>;
}


export default Storage;