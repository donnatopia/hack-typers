// requiring libraries
require('dotenv').config();
const mongoose = require('mongoose');

// connecting to mongoDB
const SERVER_HOST = process.env.SERVER_HOST || 'localhost';
mongoose.connect(`mongodb://${SERVER_HOST}/prompts`);
const db = mongoose.connection;

// checking to connection
db.on('error', () => {
  console.log('Mongoose connection error');
});
db.once('open', () => {
  console.log('Mongoose connected successfully');
})

module.exports = mongoose;