const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const documentController = require('../controllers/documentController');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// File filter for markdown files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/markdown' || file.originalname.endsWith('.md')) {
    cb(null, true);
  } else {
    cb(new Error('Only .md files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Routes
router.post('/upload', upload.single('document'), documentController.uploadDocument);
router.get('/', documentController.getAllDocuments);
router.get('/:id/chunks', documentController.getDocumentChunks);

module.exports = router;