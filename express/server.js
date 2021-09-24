const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const knex = require('./db/knex')
const PORT = 8080;


// Express Configuration
App.use(Express.urlencoded({ extended: false }));
App.use(Express.json());
App.use(Express.static('public'));

// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

// can we use routers instead or with this
// app.get('/tasks', (req, res) => {
//   // use the knex variable above to create dynamic queries
// });

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
