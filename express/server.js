const Express = require('express');
const App = Express();
const knex = require('./db/knex')
const PORT = 8080;

// Express Configuration
App.use(Express.urlencoded({ extended: false }));
App.use(Express.json());
App.use(Express.static('public'));


// Sample GET route
App.get('/api/data', (req, res) => {
  knex('crews')
  .select('foreman_name')
  .where('id', 1)
  .then((data) => {

  res.json({
    data: data,
    message: "Seems to work!"
  })
  })
});

// can we use routers instead or with this
// app.get('/tasks', (req, res) => {
//   // use the knex variable above to create dynamic queries
// });

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
