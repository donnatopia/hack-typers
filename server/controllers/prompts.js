const models = require('../models/prompts.js');

module.exports = {
  getPrompts: (req, res) => {
    models.getPrompts()
      .then((result) => {
        res.send(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },

  addPrompt: (req, res) => {
    models.addPrompt(req.body)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  }
}