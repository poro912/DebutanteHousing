import { useState } from 'react';
import styles from "./Upload.module.css"
import {Link} from "react-router-dom"

function Upload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageURL, setImageURL] = useState(null);
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setSelectedFile(file);
  
      if (file) {
        // 선택한 파일의 미리보기 이미지를 생성
        const reader = new FileReader();
        reader.onload = (e) => {
          setImageURL(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImageURL(null);
      }
    };
  
    return (
      <div>
        <Link to="/Home"><button className={styles.backarrow}>➤</button></Link>
        <h1 className={styles.Uploading_Furniture}>Uploading Furniture</h1>
        <div className={styles.box}>
        <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
        <button className={styles.Upload} onClick={() => document.querySelector('input[type="file"]').click()}>Upload</button>
  
        {selectedFile && (
          <div>
            <p>Selected File: {selectedFile.name}</p>
            <p>File Type: {selectedFile.type}</p>
            <p>File Size: {selectedFile.size} bytes</p>
          </div>
        )}
  
        {imageURL && (
          <div>
            <img src={imageURL} alt="Selected" style={{ maxWidth: '100px' }} />
          </div>
        )}
        <button className={styles.sell}>확인</button>
      </div>
      </div>
    );
  }
export default Upload;