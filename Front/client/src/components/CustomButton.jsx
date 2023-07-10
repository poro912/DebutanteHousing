import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'

const CustomButton = ({ type, title, customStyles, handleClick, src }) => {
    const snap = useSnapshot(state);
    const generateStyle = (type) => {
        if(type === "filled") {
            return {
                backgroundColor : snap.color,
                color: '#fff'
            }
        }
    }
  return (
    <img
        src={src}
        className={customStyles}
        // style={generateStyle(type)}
        onClick={handleClick}
    > 
    </img>
  )
}

export default CustomButton