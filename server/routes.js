const routes = require('express').Router();
const { getPrompts, addPrompt } = require('./controllers/prompts');

routes.get('/prompts', getPrompts);
routes.post('/prompts', addPrompt);

module.exports = routes;