const mongoose = require('../db/connection.js');

// defining schema
const Stat = mongoose.model('Stat', new mongoose.Schema({
  user: String,
  wpm: Number,
  prompt: Number
}));

// schema methods
module.exports = {
  getStats: () => {
    return Stat.find({}).exec();
  },

  postStat: (stats) => {
    const entry = new Stat(stats);
    return entry.save();
  }
}