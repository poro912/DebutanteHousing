import styles from "./Mypage.module.css"
import {Link} from "react-router-dom"
import { useState } from "react";

function Mypage() {
  const [copied, setCopied] = useState(false);

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
      <div className={styles.box}></div>
      <Link to="Home">
        <button className={styles.backarrow}>➤</button>
      </Link>
      <h1 className={styles.Mypage}>My Page</h1>
      <div className={styles.sbox} />
      <h1 className={styles.name}>Gayeon</h1>
      <h1 className={styles.Money}>Wallet :</h1>
      <img className={styles.heartp} alt="heartp" src="./img/heartp.gif"/>
      <img className={styles.heartb} alt="heartb" src="./img/bheart.gif" />
      <img className={styles.heartbb} alt="heartbb" src="./img/bheart.gif"/>
      <img onClick={handleCopyClick} title="지갑주소 복사하기" className={styles.copy} alt="copy" src="./img/copy.gif"/>
      {copied}
    </div>
  );
}

export default Mypage;