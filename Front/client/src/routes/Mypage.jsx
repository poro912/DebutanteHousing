import styles from "./Mypage.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { setTokenAmount } from "../Redux/userSlice";
import FurnitureCom from "./FurnitureCom";
import { useDispatch, useSelector } from 'react-redux';

import { getNftOwnerList, getSaleOwnerNftList, balanceOf } from "../apis/contract";

function Mypage() {
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);
  const [nickname, setNickname] = useState("nyaaaaaaa");


  const usersItems = useSelector((state) => state.users);

  const handleCopyClick = () => {
    // 복사할 텍스트를 담을 textarea 엘리먼트 생성
    
    const textarea = document.createElement("textarea");
    textarea.value = usersItems.account;

    // textarea를 DOM에 추가
    document.body.appendChild(textarea);

    // textarea 안의 텍스트 선택
    textarea.select();

    // 선택한 텍스트를 클립보드에 복사
    document.execCommand("copy");

    // textarea를 DOM에서 제거
    document.body.removeChild(textarea);

    // 복사 상태를 true로 설정
    setCopied(true);

    // 짧은 지연 시간 후에 복사 상태를 초기화
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };



  const [nftList, setNftList] = useState([]);
  const [fuItems, setfuItems] = useState([]);

  useEffect(() => {
    getNftOwnerList(usersItems.account, (error, responseData) => {
      if (error) {
        console.error('nft 정보 실패');
      } else {
        console.log('nft 정보 성공: ', responseData.data.NFTList);
        setNftList(responseData.data.NFTList)
      }
    })
    async function getbalanceOf(address) {
      try {
        await new Promise((resolve, reject) => {
          balanceOf(address, (error, responseData) => {
            if (error) {
              console.log("토큰 잔액 실패");
              console.log(error);
              reject(error);
            } else {
              dispatch(setTokenAmount(responseData.data.balance));
  
              resolve(responseData); // 룸 정보 성공 시 프로미스를 성공 상태로 해결
            }
          });
        });
      } catch (error) {
        console.error("토큰 잔액 처리 실패", error);
        throw error;
      }
    }
    getbalanceOf(usersItems.account)
  }, []);

  useEffect(() => {
    const fetchData = async (url, code, price) => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        jsonData.code = code;
        jsonData.price = price
        //console.log(jsonData); // JSON 데이터를 콘솔에 출력
        
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
    nftList.forEach((el) => {
      setTimeout(() => {
        // 요청 보내는 코드
        fetchData(el[1], el[0], el[2]);
      }, 800);
    });
  }, [nftList])

  useEffect(() => {
    console.log(fuItems);
  }, [fuItems]);
  

  const [salenftList, setSlaeNftList] = useState([]);
  const [salefuItems, setSalefuItems] = useState([]);

  useEffect(() => {
    getSaleOwnerNftList(usersItems.account, (error, responseData) => {
      if (error) {
        console.error('salenft 정보 실패');
      } else {
        console.log('salenft 정보 성공: ', responseData.data.NFTList);
        setSlaeNftList(responseData.data.NFTList)
      }
    })
  }, []);

  useEffect(() => {
    const fetchData = async (url, code, price) => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        jsonData.code = code;
        jsonData.price = price
        //console.log(jsonData); // JSON 데이터를 콘솔에 출력
        
        // 이전 salefuItems를 복사하고 새로운 데이터를 추가한 후 설정
        setSalefuItems((prevFuItems) => {
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
    salenftList.forEach((el) => {
      setTimeout(() => {
        // 요청 보내는 코드
        fetchData(el[1], el[0], el[2]);
      }, 800);
    });
  }, [salenftList])
  
  useEffect(() => {
    console.log(salefuItems);
  }, [salefuItems]);


  return (
    <div className={styles.background}>
    <div>
      <div className={styles.box}>
     
    
<div>
<div>
        <h1 className={styles.name}>{usersItems.user_nick}</h1>
        <img
          onClick={handleCopyClick}
          title="지갑주소 복사하기"
          className={styles.copy}
          alt="copy"
          src="./img/copy.gif"
        />
        {copied && <p>클립보드에 복사되었습니다!</p>}
        </div>
        <h1 className={styles.have}>Storage</h1>
        </div>



<div>
        <h1 className={styles.Money}>DHT : {usersItems.token_amount}</h1>
        <h1 className={styles.sale}>On sale</h1>
        </div>
        
          <div className={styles.leftContent}>
            {fuItems.map((fu) => (
              <Link to={`/Shopdetail/${fu.code}`}>
                <FurnitureCom key={fu.code} data={fu} />
              </Link>
            ))}
          </div>
          <div className={styles.separator}></div>
          <div className={styles.rightContent}>
            {salefuItems.map((fu) => (
                <Link to={`/Shopdetail/${fu.code}`}>
                  <FurnitureCom key={fu.code} data={fu} />
                </Link>
            ))}
          </div>
        
        
      </div>
      <Link to="/Home"><button className={styles.backarrow}>➤</button></Link>
      <h1 className={styles.Mypage}>My Page</h1>
      <img className={styles.back} alt="back" src="./img/bback.jpg" />

    </div>
    </div>
  );
}

export default Mypage;
