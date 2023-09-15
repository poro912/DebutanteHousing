import { useState, useEffect } from 'react';
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

  const meataurl = [
    'https://gateway.pinata.cloud/ipfs/QmWvpY9w2DtQbRJcETM3WQuGhXwZYMUGTayCUbRsNNFAmz/1.json',
    'https://gateway.pinata.cloud/ipfs/QmWvpY9w2DtQbRJcETM3WQuGhXwZYMUGTayCUbRsNNFAmz/2.json'
  ]

  const [fuItems, setfuItems] = useState([]);

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        console.log(jsonData); // JSON 데이터를 콘솔에 출력
        
        // 이전 fuItems를 복사하고 새로운 데이터를 추가한 후 설정
        setfuItems((prevFuItems) => {
          if (!prevFuItems.some(item => item.name === jsonData.name)) {
            return [...prevFuItems, jsonData];
          }
          return prevFuItems;
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // meataurl 배열을 순회하면서 fetchData 함수를 호출
    meataurl.forEach((el) => {
      console.log(el);
      fetchData(el);
    });
  }, []);

  useEffect(() => {
    console.log("상점", fuItems);
  }, [fuItems]);

  return (
    <div>
      <Link to="/Home"><button className={styles.backarrow}>➤</button></Link>
      <div>
      
      
      <div className={styles.itemsContainer}>
      <div className={styles.box}>
      <form onSubmit={onSubmit}>
        <input className={styles.searchbar}
          onChange={onChange}
          value={Sitem}
          type="text"
          placeholder=""
        />
      </form>
      <hr className={styles.hrr} />
      <img className={styles.Mag} alt="Mag" src="./img/Mag.png" />
      <div className={styles.furnitureWrapper}>
        {fuItems.map((fu, index) => (
          <Link to={`/Shopdetail/${index}`}>
            <FurnitureCom key={index} data={fu} />
          </Link>
        ))}
      </div>
      </div>

      </div>
  
      
      <h1 className={styles.Shop}>Shop</h1>
      </div>
      <img className={styles.upheart} alt="upheart" src="./img/upheart.gif" />
      <img className={styles.upheart2} alt="upheart" src="./img/upheart.gif" />
    </div>
  );
            }

export default Shop;