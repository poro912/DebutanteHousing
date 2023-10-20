import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIpicker, ColorPicker, FilePicker, CustomButton, Tab } from '../components';

import { useSelector, useDispatch } from 'react-redux';
import { resetFurniture } from '../Redux/furnitureSlice';
import { setRoomColor } from '../Redux/userSlice';

import FuItem from './FuItem';

import { place, replace, remove, setColor } from '../apis/room';
import { getNftOwnerList } from "../apis/contract";

import styles from './Customizer.module.css';


const Customizer = () => {
  const snap = useSnapshot(state);
  const dispatch = useDispatch();
  //리덕스에서 가구 리스트 불러오기
  //리덕스에서 유저 정보 불러오기
  const furnitureItems = useSelector((state) => state.furniture);
  const usersItems = useSelector((state) => state.users);

  
  

  const [file, setFile] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState('');
  const [activeEditorTab, setActiveEditorTab] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />;
      case 'filepicker':
        return <FilePicker />;
      case 'aipicker':
        return <AIpicker />;
      default:
        return null;
    }
  };

  const firstFu = furnitureItems.items

  const [fuCode, setFuCode] = useState([]);
  useEffect(() => {
    const updatedFuCode = firstFu.map((el) => el.code);
    setFuCode(updatedFuCode);
    console.log("updatedFuCode", updatedFuCode);
  }, [firstFu]);

  //ipfs로 가구 데이터 불러오기
  

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

    const fetchData = async (url, code) => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        jsonData.code = code;
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
      //console.log(el);
      fetchData(el[1], el[0]);
    });

  }, []);

  useEffect(() => {
    const fetchData = async (url, code) => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        jsonData.code = code;
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
      //console.log(el);
      el.code = 0;
      fetchData(el[1], el[0]);
    });
  }, [nftList])
  
  useEffect(() => {
    console.log(fuItems);
  }, [fuItems]);


  // remove 함수
  async function removeFurniture(roomCode, furnitureCodeArray) {
    return new Promise((resolve, reject) => {
      remove(roomCode, furnitureCodeArray, (error, response) => {
        if (error) {
          reject(error);
        } else {
          alert("초기화 완료")
          resolve(response);
        }
      });
    });
  }

  async function resetHandle(){
    await removeFurniture(usersItems.room_code, fuCode)
    dispatch(resetFurniture())
  }
  
  // place 함수
  async function placeFurniture(roomCode, furnitureArray) {
    return new Promise((resolve, reject) => {
      place(roomCode, furnitureArray, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  // replace 함수
  async function replaceFurniture(roomCode, furnitureArray) {
    return new Promise((resolve, reject) => {
      replace(roomCode, furnitureArray, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }
  //RoomColor 함수
  async function RoomColor(roomCode, color) {
    let newColor = null
    if(isCL){
      if(roomColor <= 0){
        newColor = 4
      }else{
        newColor = color+1
      }
    } 
    else if(isCR) {
      if(roomColor >= 4){
        newColor = 0
      }else{
        newColor = color-1
      }
    }
    else{
      newColor = color
    }
    return new Promise((resolve, reject) => {
      setColor(roomCode, newColor, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
          alert("저장되었습니다.")
        }
      });
    });
  }


  // saveHandle 함수
  async function saveHandle() {
    try {
      const furnitureArray = Array.from(Object.values(furnitureItems.items)); // furnitureItems 배열을 반복 가능한 객체로 변환
      
      // place 함수 호출 및 대기
      const placeResponse = await placeFurniture(usersItems.room_code, furnitureArray);
      //console.log('Place Response:', furnitureArray);
      console.log('Place Response:', placeResponse);

      // replace 함수 호출 및 대기
      const replaceResponse = await replaceFurniture(usersItems.room_code, furnitureArray);
      console.log('Replace Response:', replaceResponse);

      const RoomColorResponse = await RoomColor(usersItems.room_code, roomColor);
      console.log('RoomColor Response:', RoomColorResponse)
      // 서버 응답에 따른 처리를 수행할 수 있습니다.

      console.log(furnitureArray);
      console.log(usersItems);
    } catch (error) {
      console.error('Error:', error);
    }
  }



  //페이지 네이션
  const itemsPerPage = 8;
  const totalItems = fuItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);


  const [roomColor, setroomColor] = useState(usersItems.room_color)
  const [isCL, setIsCL] = useState(false)
  const [isCR, setIsCR] = useState(false)

  const handleColL = () => {
    if(roomColor <= 0){
      setroomColor(4)
    }else{
      setroomColor(roomColor-1)
    }
    console.log(roomColor)
    dispatch(setRoomColor(roomColor))
    setIsCL(true)
  }

  const handleColR = () => {
    if(roomColor >= 4){
      setroomColor(0)
    }else{
      setroomColor(roomColor+1)
    }
    console.log(roomColor)
    dispatch(setRoomColor(roomColor))
    setIsCR(true)
  }

  return (
    <>
      {!snap.intro && (
        <>
          
          <motion.div
            key={'custom'}
            className='absolute top-0 left-0 z-10'
            {...slideAnimation('left')}
          >
            <div className='flex items-center' id={styles.furnitureGridMargin}>
              <div className='editortabs-container'>
                {generateTabContent()}
                <div className={styles.fuListContainer}>
                  <div className={styles.furnitureGrid}>
                    {fuItems.slice(startIndex, endIndex).map((data, index) => (
                      <div key={startIndex + index} className={styles.furniture}>
                        <div className={styles.fuList}>
                          <FuItem Fudata={data}/>
                          {/* <img src={data.image} alt={`Furniture ${startIndex + index + 1}`} />chair */}
                          </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Pagination controls */}
            <div className={styles.pagination}>
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                <div className={styles.leftarrow}> ➤ </div>
              </button>
              <span>
                {currentPage} / {totalPages}
              </span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              <div className={styles.rightarrow}> ➤ </div>
                
              </button>
            </div>
          </motion.div>

          <motion.div className='absolute z-10 top-5 left-5' {...fadeAnimation}>
            <button>
              <div className={styles.backarrow} onClick={() => (state.intro = true)}>
                ➤
              </div>
            </button>
            
          </motion.div>
          <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
            <button className={styles.savebtn}>
              <img
                src='./img/saveicon.png'
                onClick={saveHandle}
                className={styles.backBtn}
                alt="Back Button"
              ></img>
              save
            </button>
          </motion.div>
          <motion.div className='absolute bottom-0 left-20 z-20' {...fadeAnimation}>
            <button onClick={handleColL} className={styles.roomcolL}>
            ➤
            </button>
          </motion.div>
          <motion.div className='absolute bottom-0 right-20 z-20' {...fadeAnimation}>
            <button onClick={handleColR} className={styles.roomcolR}>
            ➤
            </button>
          </motion.div>
          <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
            <button onClick={resetHandle} className={styles.reset}>
              <img src='./img/reset.png' className={styles.resetImg}/>
              reset
            </button>
          </motion.div>
          
        </>
      )}
    </>
  );
};

export default Customizer;
