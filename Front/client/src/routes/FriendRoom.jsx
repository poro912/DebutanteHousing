import CanvasModel from "../canvas"
import Customizer from "../pages/Customizer";
import HomePage from "../pages/HomePage";
import FriendPage from "../pages/FriendPage";
import { Link, useParams } from "react-router-dom"


function FriendRoom() {
    const { id } = useParams();
  return (

    <div className="app transition-all ease-in">
        <FriendPage id = {id}/>
        <CanvasModel />
       
    </div>
    
 
  )
}

export default FriendRoom;