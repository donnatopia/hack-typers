const routes = require('express').Router();
const { getNumberOfPrompts, getPrompt, addPrompt } = require('./controllers/prompts');

routes.get('/prompts/total', getNumberOfPrompts);
routes.get('/prompts/:id', getPrompt);
routes.post('/prompts', addPrompt);

module.exports = routes;