const { Prompt } = require('../db/connection.js');

module.exports = {
  getPrompts: () => {
    return Prompt
      .find({})
      .exec();
  },

  addPrompt: (prompt) => {
    return new Prompt.save(prompt);
  }
}