import { useState } from 'react';
import {Link} from "react-router-dom"
import styles from "./Shop.module.css"
import FurnitureCom from './FurnitureCom';

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
  return (
    <div>
      <Link to="Home"><button className={styles.backarrow}>➤</button></Link>
      <form onSubmit={onSubmit}>
        <input className={styles.searchbar}
          onChange={onChange}
          value={Sitem}
          type="text"
          placeholder=""
        />
      </form>
      
      <div className={styles.itemsContainer}>
        <ul className={styles.listContainer}>
          {Sitems.map((sitem, index) => (
            <li key={index}>{sitem}</li>
          ))}
        </ul>
        <div className={styles.imageContainer}>
          {Sitems.map((sitem, index) => (
            <img key={index} className={styles.dui} alt="dui" src="./img/dui.png" />
          ))}
        </div>
        <FurnitureCom />
      </div>
      
  
      <img className={styles.Mag} alt="Mag" src="./img/Mag.png" />
      <div className={styles.box}></div>
      <h1 className={styles.Shop}>Shop</h1>
      <hr className={styles.hrr} />
      <img className={styles.upheart} alt="upheart" src="./img/upheart.gif" />
      <img className={styles.upheart2} alt="upheart" src="./img/upheart.gif" />
    </div>
  );
            }

export default Shop;