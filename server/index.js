require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

// creating an express server
const server = express();

// serving static files and generated assets in ../client/dist
server.use(express.static(path.join(__dirname, '../client/dist')));

// middleware
server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

// server listening at port
const PORT = process.env.PORT || 3000;
const SERVER_HOST = process.env.SERVER_HOST || 'localhost'

server.listen(PORT, (err) => {
  if (err) {
    console.log('Error connecting server to port', err);
  } else {
    console.log(`Server listening at http://${process.env.SERVER_HOST}:${PORT}`);
  }
});