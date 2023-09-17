import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addFurniture } from '../Redux/furnitureSlice'


function FuItem( {Fudata} ) {
  const dispatch = useDispatch();
  const furnitureItems = useSelector((state) => state.furniture);

  const ClickHandler = ()=>{
    dispatch(addFurniture({ code: Fudata.code, name:Fudata.name, url: Fudata.animation_url, pos: [0, -0.2, 0], rot: [0, 0, 0] }));
  }

  return (
    <div onClick={ClickHandler}>
        <div><img src={Fudata.image}></img></div>
        <div>{Fudata.name}</div>
    </div>
  )
    
           
      
}

export default FuItem;