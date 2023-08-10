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
      <img className={styles.Fbg} alt="Fbg" src="./img/Fbg2.png" />
      <img className={styles.heartp} alt="heartp" src="./img/heartp.gif" />
    </div>
  );
            }

export default Shop;