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
    <div className={styles.sbox}>
    <h4 className={styles.ID}>ID :</h4>
    <h4 className={styles.PASS}>PASS :</h4>
    <h4 className={styles.NAME}>NAME :</h4>
    <button className={styles.btn2}>Join</button>
    <button className={styles.btn3}>Login</button>
    <h1 className={styles.Login}>Login</h1>
        
        <form onSubmit={LogSubmit}>
            <input className={styles.id}
            type="text" 
            placeholder=""
            name="id"
            value={id}
            onChange={onChangeid} />

            <input className={styles.nname}
            type="text" 
            placeholder=""
            name=""
            value={nname}
            onChange={onChangenname} />
            
            <input className={styles.pass}
            type="text" 
            placeholder=""
            name="pass"
            value={pass}
            onChange={onChangepass} />
            <button className={styles.btn}>Join</button>
            
            </form>
            
            </div>
          
            </div>
         </div>
           
      
}

export default Join;