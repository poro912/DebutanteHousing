import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./Shopdetail.module.css";
import { useDispatch, useSelector } from "react-redux";

import { remove } from '../apis/room';
import { removeFurniture } from '../Redux/furnitureSlice';

import {
  ownerOf,
  tokenURI,
  nftPrice,
  IsSale,
  buyNFT,
  approve,
  saleNFT,
} from "../apis/contract";

function Shopdetail() {
  const { id } = useParams();
  const usersItems = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [price, setPrice] = useState();
  const [owner, setOwner] = useState(false);
  const [isowner, setIsOwner] = useState(false);
  const [nftdata, setNftdata] = useState();
  const [inPrice, setInPrice] = useState();
  const [isSale, setIsSale] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onChangeprice = (event) => {
    setInPrice(event.target.value);
  };

  //가구 데이터 가져오기
  useEffect(() => {
    ownerOf(id, (error, responseData) => {
      if (error) {
        console.error("ownerOf 정보 실패");
      } else {
        console.log("ownerOf 정보 성공: ", responseData.data.owner);
        setOwner(responseData.data.owner);
        if (usersItems.account === responseData.data.owner) {
          setIsOwner(true);
          console.log(isowner);
        } else {
          setIsOwner(false);
          console.log(isowner);
        }
      }
    });
    nftPrice(id, (error, responseData) => {
      if (error) {
        console.error("nftPrice 정보 실패");
      } else {
        console.log("nftPrice 정보 성공: ", responseData.data.nftPrice);
        setPrice(responseData.data.nftPrice);
      }
    });
    IsSale(id, (error, responseData) => {
      if (error) {
        console.error("IsSale 정보 실패");
      } else {
        console.log("IsSale 정보 성공: ", responseData.data.IsSale);
        setIsSale(responseData.data.IsSale);
      }
    });
    const fetchURI = async () => {
      try {
        const URI = await new Promise((resolve, reject) => {
          tokenURI(id, (error, responseData) => {
            if (error) {
              console.error("tokenURI 정보 실패");
              reject(error);
            } else {
              console.log("tokenURI 정보 성공: ", responseData.data.URI);
              resolve(responseData.data.URI);
            }
          });
        });

        const jsonData = await fetchData(URI); // fetchURI가 완료되면 fetchData 호출
        setNftdata(jsonData); // 데이터 설정
      } catch (error) {
        console.error("Error fetching URI:", error);
      }
    };
    fetchURI();
  }, [id]);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      console.log("nft", jsonData); // JSON 데이터를 콘솔에 출력
      setNftdata(jsonData);
      return jsonData;
      // 여기에서 데이터를 처리할 수 있습니다.
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //가구 결제
  async function buyButtonHandle() {
    if (usersItems.token_amount > price) {
      setIsLoading(true); // 로딩 시작
      try {
        await tokenapprove(usersItems.privateKey, price);
        await buyfurniture(usersItems.privateKey, id);
        setIsLoading(false); // 로딩 종료
        alert(`${nftdata.name} 구매 성공`);
        navigate("/shop");
      } catch (error) {
        setIsLoading(false); // 에러 발생 시 로딩 종료
        console.error("에러:", error);
        // 여기에서 발생한 에러를 처리합니다.
      }
    } else {
      setIsLoading(false); // DHT 잔액 부족 시 로딩 종료
      alert("DHT 잔액이 부족합니다");
    }
  }

  async function tokenapprove(key, amount) {
    return new Promise((resolve, reject) => {
      approve(key, amount, (error, responseData) => {
        if (error) {
          console.log("권한 실패");
          console.log(error);
          reject(error);
        } else {
          console.log("권한 성공", responseData);
          resolve(responseData);
        }
      });
    });
  }

  async function buyfurniture(key, tokenId) {
    return new Promise((resolve, reject) => {
      buyNFT(key, tokenId, (error, responseData) => {
        if (error) {
          console.log("구매 실패");
          console.log(error);
          reject(error);
        } else {
          console.log("구매 성공", responseData);
          resolve(responseData);
        }
      });
    });
  }

  async function saleButtonHandle() {
    if (!inPrice) {
      alert("가격을 입력하세요");
      return; // 가격이 비어있으면 함수 종료
    } else {
      setIsLoading(true);
      try {
        await tokensale(usersItems.privateKey, id, inPrice);
        await removeFurnitures(usersItems.room_code, [id])
        dispatch(removeFurniture(id));
        setIsLoading(false); // 로딩 종료
        alert(`${nftdata.name} 판매 성공`);
        navigate("/mypage");
      } catch (error) {
        setIsLoading(false); // 에러 발생 시 로딩 종료
        console.error("에러:", error);
        // 여기에서 발생한 에러를 처리합니다.
      }
    }
  }

  async function tokensale(key, tokenId, price) {
    return new Promise((resolve, reject) => {
      saleNFT(key, tokenId, price, (error, responseData) => {
        if (error) {
          console.log("saleNFT 실패");
          console.log(error);
          reject(error);
        } else {
          console.log("saleNFT 성공", responseData);
          resolve(responseData);
        }
      });
    });
  }

  async function removeFurnitures(roomCode, furnitureCodeArray) {
    return new Promise((resolve, reject) => {
      remove(roomCode, furnitureCodeArray, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  return (
    <div>
      {nftdata ? (
        <div>
          {!isLoading ? (
            <div>
              {!isowner ? (
                <div>
                  <img
                    className={styles.heartp}
                    alt="heartp"
                    src="/img/heartp.gif"
                  />

                  <img className={styles.fu} alt="fu" src={nftdata.image} />
                  <div className={styles.box}>
                    <div className={styles.sbox} />
                    <h1 className={styles.detailtext}>{nftdata.description}</h1>
                    <h1 className={styles.name}>Owner:</h1>
                    <div className={styles.owner}>{owner}</div>
                    <h1 className={styles.price}>Price: {price} DHT</h1>
                    <hr className={styles.hrr} />
                    <hr className={styles.hrrr} />
                    {isSale ? (
                      <button className={styles.buy} onClick={buyButtonHandle}>
                        Buy
                      </button>
                    ) : (
                      <></>
                    )}

                    <div className={styles.text}>{nftdata.name}</div>
                    <div className={styles.titletext}>{nftdata.name}</div>
                  </div>

                  <Link to="/shop">
                    <button className={styles.backarrow}>➤</button>
                  </Link>
                  <h1 className={styles.FurnitureDetails}>Furniture Details</h1>
                
              
                </div>
              ) : (
                <div>
                  <img
                    className={styles.heartp}
                    alt="heartp"
                    src="/img/heartp.gif"
                  />

                  <img className={styles.fu} alt="fu" src={nftdata.image} />
                  <div className={styles.box}>
                    <div className={styles.sbox} />
                    <h1 className={styles.detailtext}>{nftdata.description}</h1>
                    <h1 className={styles.name}>Owner:</h1>
                    <div className={styles.owner}>{owner}</div>
                    <div>
                      <h1 className={styles.price}>Price:</h1>
                      <input
                        className={styles.priceInput}
                        type="number"
                        placeholder=""
                        name="inprice"
                        value={inPrice}
                        onChange={onChangeprice}
                      ></input>
                      <div className={styles.dht}>DHT</div>
                    </div>

                    <hr className={styles.hrr} />
                    <hr className={styles.hrrr} />
                    <button className={styles.buy} onClick={saleButtonHandle}>
                      Sale
                    </button>
                    <div className={styles.text}>{nftdata.name}</div>
                    <div className={styles.titletext}>{nftdata.name}</div>
                  </div>

                  <Link to="/shop">
                    <button className={styles.backarrow}>➤</button>
                  </Link>
                  <h1 className={styles.FurnitureDetails}>Furniture Details</h1>
              
            
                </div>
              )}
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
      ) : (
        <div>
       
      
        </div>
      )}
    </div>
  );
}

export default Shopdetail;
