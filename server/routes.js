const routes = require('express').Router();
const prompts = require('./controllers/prompts');
const stats = require('./controllers/stats');

routes.get('/prompts/total', prompts.getNumberOfPrompts);
routes.get('/prompts/:id', prompts.getPrompt);
routes.post('/prompts', prompts.addPrompt);

routes.get('/stats', stats.getStats);
routes.post('/stats', stats.postStat)

module.exports = routes;