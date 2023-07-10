import { useState } from 'react';
import {Link} from "react-router-dom"
import styles from "./Storage.module.css"

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
  return <div>
    
    <div>
    <Link to="Home"><button className={styles.btn}>방꾸미기 페이지로 가기</button></Link>
    <button className={styles.btn2}>저장</button>
    <button className={styles.btn3}>초기화</button>
    <p className={styles.storage}>창고</p>
    
    </div>
    <button className={styles.btn4}>이동</button>
    <button className={styles.btn5}>회전</button>
  <button className={styles.btn6}>확대</button>
  <button className={styles.btn7}>축소</button>
  


  <div>

  
  <h1 className={styles.search}>가구 목록 ({Items.length})</h1>
  
   <form onSubmit={onSubmit}>
   <button className={styles.btn9}>검색뒤로가기</button>
    <input className={styles.searchbar}
    onChange={onChange} 
    value={Item} 
    type="text" 
    placeholder="가구를 검색하세요" />
      <button className={styles.btn8}>가구 검색</button>
      
      </form>
      <hr />
      <ul className={styles.ul}>
      {Items.map((list, index) => 
      <li key={index}>{list}</li>) }
      </ul>
  </div>
  <div>
   
  </div>
  </div>;
}


export default Storage;