import CanvasModel from "../canvas"
import Customizer from "../pages/Customizer";
import HomePage from "../pages/HomePage";


function Homec() {
  return (
  
    <div className="app transition-all ease-in">
        <HomePage />
        <CanvasModel />
        <Customizer />
    </div>
  )
}

export default Homec;