import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Join.module.css";

import { signup } from "../apis/user";
import { SingupTransfer, sendEther } from "../apis/contract";

function Join() {
  const navigate = useNavigate();

  const [id, setid] = useState();
  const onChangeid = (event) => {
    setid(event.target.value);
  };
  const [nname, setnname] = useState();
  const onChangenname = (event) => {
    setnname(event.target.value);
  };

  const [pass, setpass] = useState();
  const onChangepass = (event) => {
    setpass(event.target.value);
  };

  const [isLoding, setIsLoding] = useState(false);

  async function signups(inid, inpass, inname) {
    try {
	setIsLoding(true);
      await new Promise((resolve, reject) => {
        signup(
          inid,
          inpass,
          inname,
          inname,
          `${id}@email.com`,
          "01012345678",
          (error, responseData) => {
            if (error) {
              console.error("회원가입 실패");
              reject(error);
              alert("회원가입 실패");
              setIsLoding(false);
            } else {
              console.log("회원가입 성공: ", responseData);
              console.log("회원가입 성공: ", responseData.wallet.account);
			        addressfuc(responseData.wallet.account);
              resolve(responseData);
              setIsLoding(false);
              navigate("/test");
            }
          }
        );
      });
    } catch (error) {
      console.error("에러 발생:", error);
      setIsLoding(false);
      // 에러 처리를 원하는 대로 수행합니다.
    }
  }

  async function addressfuc (recipient) {
	await tokenTransfer(recipient)
	await sendEthers(recipient)
  }

  async function tokenTransfer(recipient) {
    try {
      await new Promise((resolve, reject) => {
        SingupTransfer(recipient, 30, (error, responseData) => {
          if (error) {
            console.error("SingupTransfer 실패");
            reject(error);
          } else {
            console.log("SingupTransfer 성공: ", responseData);
            resolve(responseData);
          }
        });
      });
      console.log(recipient);
    } catch (error) {
      console.error("에러 발생:", error);
      // 에러 처리를 원하는 대로 수행합니다.
    }
  }

  async function sendEthers(recipient) {
    try {
      await new Promise((resolve, reject) => {
        sendEther(recipient, (error, responseData) => {
          if (error) {
            console.error("sendEther 실패");
            reject(error);
          } else {
            console.log("sendEther 성공: ", responseData);
            resolve(responseData);
          }
        });
      });
      console.log(recipient);
    } catch (error) {
      console.error("에러 발생:", error);
      // 에러 처리를 원하는 대로 수행합니다.
    }
  }

  async function singupButton() {
    await signups(id, pass, nname);
  }

  const LogSubmit = (event) => {
    singupButton();
    event.preventDefault();
  };


  return (
    <div className={styles.background}>
      {!isLoding ? (
        <div>
          <Link to="/">
            <button className={styles.backarrow}>➤</button>
          </Link>
          <div>
          <div className={styles.sbox}>
          <h1 className={styles.Login}>Login</h1>
          <button className={styles.btn2}>Join</button>
    <button className={styles.btn3}>Login</button>
    <h1 className={styles.Join}>Join</h1>
    
  
  <div>
   
  </div>
 

              <form onSubmit={LogSubmit}>
                <input
                  className={styles.id}
                  type="text"
                  placeholder="ID"
                  name="id"
                  value={id}
                  onChange={onChangeid}
                />

                <input
                  className={styles.pass}
                  type="Password"
                  placeholder="PASSWORD"
                  name="pass"
                  value={pass}
                  onChange={onChangepass}
                />
                
                 <input
                  className={styles.nname}
                  type="text"
                  placeholder="NAME"
                  name=""
                  value={nname}
                  onChange={onChangenname}
                />
                <button className={styles.btn}>Join</button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div>
          
			<img
                className={styles.heartloding}
                alt="heartp"
                src="/img/heartp.gif"
              />
		</div>
      )}
    </div>
  );
}

export default Join;
