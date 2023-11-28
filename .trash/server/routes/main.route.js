const express = require('express');
const router = express.Router();
const multer = require('multer'); // Import multer for handling file uploads

const controller = require('../controllers/main.controller');

// Initialize multer with desired options
const upload = multer({ dest: 'uploads/' });

router.get('/', controller.main_get);

// Create a new route for handling file uploads
router.post('/upload', upload.single('file'), controller.uploadFileToIPFS);

module.exports = router;
