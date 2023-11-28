import { useState } from 'react';
import styles from "./Upload.module.css"

function Nonmem() {
    const [selectedFile, setSelectedFile] = useState(null);
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setSelectedFile(file);
    };
  
    const handleUpload = () => {
      if (selectedFile) {
        // 파일을 업로드하거나 필요한 작업을 수행할 수 있는 로직을 여기에 추가
        console.log('Uploading file:', selectedFile.name);
      } else {
        console.log('No file selected');
      }
    };
  
    return (
      <div>
        <h1>File Upload</h1>
        <input type="file" onChange={handleFileChange} />
        <button className={styles.Upload} onClick={handleUpload}>Upload</button>
  
        {selectedFile && (
          <div>
            <p>Selected File: {selectedFile.name}</p>
            <p>File Type: {selectedFile.type}</p>
            <p>File Size: {selectedFile.size} bytes</p>
          </div>
        )}
      </div>
    );
  }

export default Nonmem;