import { useState } from "react";
import {Link} from "react-router-dom"
import styles from "./Join.module.css"

function Join() {
  const [id, setid] = useState();
  const onChangeid = (event) => {
    setid(event.target.value);
  }
  const [nname, setnname] = useState();
  const onChangenname = (event) => {
    setnname(event.target.value);
  }
  const [pass, setpass] = useState();
  const onChangepass = (event) => {
    setpass(event.target.value);
  }

  const LogSubmit = (event) => {
    event.preventDefault();
  }
  return <div>

    <div>
    <Link to="/"><button className={styles.backarrow}>➤</button></Link>
    <div>
    <div className={styles.sbox}>
    <h1 className={styles.Join}>Join</h1>
 
    <button className={styles.btn2}>Join</button>
    <button className={styles.btn3}>Login</button>
    <h1 className={styles.Login}>Login</h1>
        
        <form onSubmit={LogSubmit}>
            <input className={styles.id}
            type="text" 
            placeholder="ID"
            name="id"
            value={id}
            onChange={onChangeid} />

            <input className={styles.nname}
            type="text" 
            placeholder="NAME"
            name=""
            value={nname}
            onChange={onChangenname} />
            
            <input className={styles.pass}
            type="Password" 
            placeholder="PASSWORD"
            name="pass"
            value={pass}
            onChange={onChangepass} />
            <button className={styles.btn}>Join</button>
            
            </form>
            </div>
            </div>
          
            </div>
         </div>
           
      
}

export default Join;