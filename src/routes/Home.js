import React from "react";
import {Link} from "react-router-dom"

function Home() {
  return <span>
    <div>
    메인페이지
    </div>
    <Link to="/storage"><button>창고</button></Link>
    <Link to="/shop"><button>상점</button></Link>
    <Link to="/friends"><button>친구 방문</button></Link>
  </span>;
}

export default Home;