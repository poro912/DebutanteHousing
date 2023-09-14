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

import FuItem from './FuItem';

import styles from './Customizer.module.css';


const Customizer = () => {
  const snap = useSnapshot(state);

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
    console.log(fuItems);
  }, [fuItems]);
  
  

  const images = [
    `./img/furniture/chair.png`,
    `./img/furniture/chair.png`,
    `./img/furniture/chair.png`,
    `./img/furniture/chair.png`,
    `./img/furniture/chair.png`,
    `./img/furniture/chair.png`,
    `./img/furniture/chair.png`,
    `./img/furniture/chair.png`,
    `./img/furniture/chair.png`,
    `./img/furniture/chair.png`,
    `./img/furniture/chair.png`,
    `./img/furniture/chair.png`,
    `./img/furniture/chair.png`,
    `./img/furniture/chair.png`,
    `./img/furniture/chair.png`,
    `./img/furniture/chair.png`,
    `./img/furniture/chair.png`,
    `./img/furniture/chair.png`,
    `./img/furniture/chair.png`,
    `./img/furniture/chair.png`,
    `./img/furniture/chair.png`,
    `./img/furniture/chair.png`,

  ];

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

    useEffect(() => {
      console.log('Component Rendered');
    });

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
                <img src='.\img\arrowPu.png' className={styles.leftarrow}></img>
              </button>
              <span>
                {currentPage} / {totalPages}
              </span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                <img src='.\img\arrowPu.png' className={styles.rightarrow}></img>
              </button>
            </div>
          </motion.div>

          <div></div>
          <motion.div className='absolute z-10 top-5 left-5' {...fadeAnimation}>
            <img
              src='./img/arrowPu.png'
              onClick={() => (state.intro = true)}
              className={styles.backBtn}
              alt="Back Button"
            />
          </motion.div>
          <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
            <img
              src='./img/arrowPu.png'
              onClick={() => (state.intro = true)}
              className={styles.backBtn}
              alt="Back Button"
            />
          </motion.div>
        </>
      )}
    </>
  );
};

export default Customizer;
