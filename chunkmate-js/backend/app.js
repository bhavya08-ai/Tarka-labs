const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically if needed
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import and use routes
const documentRoutes = require('./src/routes/documentRoutes');
app.use('/api/documents', documentRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to ChunkMate API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});