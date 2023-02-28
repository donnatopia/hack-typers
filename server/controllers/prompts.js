const models = require('../models/prompts.js');

module.exports = {
  getPrompt: (req, res) => {
    models.getPrompt(req.params.id)
      .then((result) => {
        res.status(200).json(result);
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