import React from "react";
import {Link} from "react-router-dom"

function Login() {
  return <span><h1>데뷔탕트 하우스</h1>
    

    <div className="login-form" />
        <h2>Login</h2>
        <b></b>
            <input 
            type="text" 
            placeholder="id" />
            <input type="text" 
            placeholder="Password" />
            <Link to="/Home"><button>login</button></Link>

  <div>
    <br />
            <Link to="/non"><button>Guest</button></Link>
    <Link to="/Join"><button>Join</button></Link>

    </div>


  </span>;
}




export default Login;