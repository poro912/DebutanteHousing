import React from "react";
import {Link} from "react-router-dom"

function Join() {
  return <span>
    <Link to="/"><button>뒤로가기</button></Link>

    회원가입 페이지

    <div className="join-form">
            <b>ID: </b>
            <span class="placehold-text">
              <input type="text" /></span>
        </div>
        <div>
            <b>PASSWORD: </b>
            <input type="text" 
            placeholder="" />
            <Link to="/Home"><button>Join</button></Link>
         </div>
           
        </span>;
}

export default Join;