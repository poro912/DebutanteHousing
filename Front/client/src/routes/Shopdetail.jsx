import { useState } from 'react';
import {Link} from "react-router-dom"
import styles from "./Shopdetail.module.css"

function Shopdetail() {
  const [Sditem, setSditem] = useState("");
  const [Sditems, setSditems] = useState([]);
  const onChange = (event) => setSditem(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (Sditem === "") {
      return;
    }
    setSditems((currentArray) => [Sditem, ...currentArray]);
    setSditem("");
  };
  return <div>
     <Link to="Home"><button>뒤로가기</button></Link>
  
 <h1>가구 검색 ({Sditems.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={Sditem}
          type="text"
          placeholder="가구를 검색하세요"
        />
        <button>검색</button>
      </form>
      <hr />
      <ul>
        {Sditems.map((sditem, index) => (
          <li key={index}>{sditem}</li>
        ))}
      </ul>
 <div>
<button className={styles.btn}>수량 up</button>
<button>수량 down</button>
<button>구매</button>
 </div>
  </div>;
}

export default Shopdetail;