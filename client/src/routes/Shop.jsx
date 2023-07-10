import { useState } from 'react';
import {Link} from "react-router-dom"
import styles from "./Shop.module.css"

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
  return <div>
     <Link to="Home"><button className={styles.btn}>뒤로가기</button></Link>
  
     <h1 className={styles.search}>가구 검색 ({Sitem.length})</h1>
      <form onSubmit={onSubmit}>
        <input className={styles.searchbar}
          onChange={onChange}
          value={Sitem}
          type="text"
          placeholder="가구를 검색하세요"
        />
        <button className={styles.btn2}>검색</button>
      </form>
      <hr />
      <ul>
        {Sitems.map((sitem, index) => (
          <li key={index}>{sitem}</li>
        ))}
      </ul>
 <div>

 </div>
  </div>;
}

export default Shop;