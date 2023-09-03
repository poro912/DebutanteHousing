import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';


const UploadAndDisplayGLB = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    console.log('Uploaded file:', uploadedFile);

    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const ipfsHash = response.data.ipfsHash;
      console.log('IPFS Hash from Backend:', ipfsHash);
      setUploadedFile(ipfsHash);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
        <input {...getInputProps()} />
        <p>Drag and drop or click to upload GLB file to IPFS using Pinata</p>
      </div>
      {uploadedFile && (
        <div style={{ marginTop: '20px' }}>
          <p>Uploaded to IPFS with hash: {uploadedFile}</p>
        </div>
      )}
    </div>
  );
};

export default UploadAndDisplayGLB;
