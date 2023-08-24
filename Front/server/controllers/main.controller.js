const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const JWT = process.env.PINATA_JWT;
module.exports = {
  main_get: async (req, res, next) => {
    try {
      res.status(200).send("HI🍨");
    } catch (e) {
      throw Error(e);
    }
  },

  uploadFileToIPFS: async (req, res, next) => {
    try {
      const uploadedFile = req.file;
      const formData = new FormData();
      console.log(formData)
      formData.append('file', uploadedFile.buffer, {
        filename: uploadedFile.filename, // Provide a filename
      });

      formData.append('pinataMetadata', JSON.stringify({
        name: uploadedFile.originalname,
      }));

      formData.append('pinataOptions', JSON.stringify({
        cidVersion: 0,
      }));

      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: JWT,
          },
        }
      );

      const ipfsHash = response.data.IpfsHash;
      res.status(200).json({ ipfsHash });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },
};
