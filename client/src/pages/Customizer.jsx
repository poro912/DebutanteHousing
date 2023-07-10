import React, {useState, useEffect} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation,slideAnimation } from '../config/motion';
import { AIpicker, ColorPicker, FilePicker, CustomButton, Tab } from '../components';

import styles from "./Home.module.css"


const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');

  const [prompt, setPrompt] = useState("")
  const [generatingImg, setGeneratingImg] = useState('');
  
  const [activeEditorTab, setActiveEditorTab] = useState('')
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt : true,
    stylishShirt : false,
  })

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker" :
        return <ColorPicker />
      case "filepicker" :
        return <FilePicker />
      case "aipicker" :
        return <AIpicker />
      default :
        return null;
    }
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div 
            key={"custom"}
            className='absolute top-0 left-0 z-10'
            {...slideAnimation("left")}>
              <div className='flex items-center min-h-screen'>
                <div className='editortabs-container tabs'>
                  {EditorTabs.map((tab) => (
                    <Tab
                      key={tab.name}
                      tab={tab}
                      handleClick={() => setActiveEditorTab(tab.name)} /> 
                  ))}
                  {generateTabContent()}
                </div>
              </div>
          </motion.div>

          <motion.div
            className='absolute z-10 top-5 right-5'
            {...fadeAnimation} 
          >
            <img
              src = ".\img\back.png"
              onClick={() => state.intro = true}
              className = {styles.backImg}
            >
            </img>
          </motion.div>

          {/* <motion.div
            className='filtertabs-container'
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab=""
                handleClick={() => {}} /> 
            ))}

          </motion.div> */}

        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer