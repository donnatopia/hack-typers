const mongoose = require('../db/connection.js');

// defining schema
const Prompt = mongoose.model('Prompt', new mongoose.Schema({
  id: Number,
  text: String,
  difficulty: Number
}));

// schema methods
module.exports = {
  getNumberOfPrompts: () => {
    return Prompt.countDocuments().exec();
  },

  getPrompt: ( id ) => {
    return Prompt.findOne({ id }).exec();
  },

  addPrompt: (prompt) => {
    const entry = new Prompt(prompt);
    return entry.save();
  }
}