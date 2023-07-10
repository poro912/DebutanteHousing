import {Link} from "react-router-dom"
import styles from "./Login1.module.css"
import { useState } from "react";


function Login1() {
  const [id, setid] = useState();
  const onChangeid = (event) => {
    console.log(id)
    setid(event.target.value);
  }
  const [pass, setpass] = useState();
  const onChangepass = (event) => {
    setpass(event.target.value);
  }

  return <div>
<h1 className={styles.title}>Debutante</h1>
<h1 className={styles.titlee}>Housing</h1>

      <div>
      
     <div>
            <input className={styles.id} 
            type="text" 
            placeholder="ID" 
            name="id"
            value={id}
            onChange={onChangeid} />
            </div>
            <div>
             
            <input className={styles.pass} 
            type="Password" 
            placeholder="PASSWORD"
            name="pass"
            value={pass}
            onChange={onChangepass} />
            <button className={styles.btn} type="submit">Enter</button>
            <h4>{id}</h4><h4>{pass}</h4>
            </div>
            
            
            
  <div>
    <br />
            <Link to="/non"><button className={styles.btn2}>Guest</button></Link>
    <Link to="/Join"><button className={styles.btn3}>Join</button></Link>

    </div>
    <div>
  <img className={styles.background} alt="background" src="./img/background.gif" />
  <img className={styles.ui} alt="ui" src="./img/ui.png" />
  </div>
  </div>
  </div>
}



export default Login1;