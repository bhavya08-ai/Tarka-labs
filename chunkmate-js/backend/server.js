import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// PostgreSQL connection setup
const pool = new Pool({
  user: 'pregres',          
  host: 'localhost',
  database: 'chunkmate-js',    
  password: 'Bhavya@08',     
  port: 5432,
});

// Middleware, routes...

app.listen(PORT, () => {
  console.log('Server running on port ${PORT}');
});
