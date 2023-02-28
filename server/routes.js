const routes = require('express').Router();
const { getPrompt, addPrompt } = require('./controllers/prompts');

routes.get('/prompts/:id', getPrompt);
routes.post('/prompts', addPrompt);

module.exports = routes;