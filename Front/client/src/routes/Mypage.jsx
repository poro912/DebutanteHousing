import styles from "./Mypage.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import FurnitureCom from "./FurnitureCom";

function Mypage() {
  const [copied, setCopied] = useState(false);
  const [nickname, setNickname] = useState("nyaaaaaaa");

  const handleCopyClick = () => {
    // 복사할 텍스트를 담을 textarea 엘리먼트 생성
    const textarea = document.createElement("textarea");
    textarea.value = "ASDF1234";

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

  return (
    <div>
      <div className={styles.box}>
      <div className={styles.separator}></div>
    
<div>
<div>
        <h1 className={styles.name}>{nickname}</h1>
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
        <h1 className={styles.Money}>Wallet :</h1>
        <h1 className={styles.sale}>On sale</h1>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.leftContent}>
          
          </div>
          <div className={styles.rightContent}>
          <FurnitureCom />
          <FurnitureCom />
          <FurnitureCom />
          <FurnitureCom />
          </div>
        </div>
        
      </div>
      <Link to="Home"><button className={styles.backarrow}>➤</button></Link>
      <h1 className={styles.Mypage}>My Page</h1>

      <img className={styles.heartb} alt="heartb" src="./img/bheart.gif" />
      <img className={styles.heartbb} alt="heartbb" src="./img/bheart.gif" />
    </div>
  );
}

export default Mypage;
