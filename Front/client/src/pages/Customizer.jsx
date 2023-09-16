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

import { useSelector } from 'react-redux';

import FuItem from './FuItem';

import { place, replace, remove } from '../apis/room';
import { getNftOwnerList } from "../apis/contract";

import styles from './Customizer.module.css';


const Customizer = () => {
  const snap = useSnapshot(state);
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

  //ipfs로 가구 데이터 불러오기
  
  const meataurl = [
    'https://gateway.pinata.cloud/ipfs/QmWvpY9w2DtQbRJcETM3WQuGhXwZYMUGTayCUbRsNNFAmz/1.json',
    'https://gateway.pinata.cloud/ipfs/QmWvpY9w2DtQbRJcETM3WQuGhXwZYMUGTayCUbRsNNFAmz/2.json'
  ]
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

          <div></div>
          <motion.div className='absolute z-10 top-5 left-5' {...fadeAnimation}>
            <button>
              <div className={styles.backarrow} onClick={() => (state.intro = true)}>
                ➤
              </div>
            </button>
          </motion.div>
          <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
            <button>
              <img
                src='./img/saveicon.png'
                onClick={saveHandle}
                className={styles.backBtn}
                alt="Back Button"
              ></img>
              save
            </button>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Customizer;
