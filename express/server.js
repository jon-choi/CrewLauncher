const knex = require('./db/knex');
const http = require('http');
const Express = require('express');
const socket = require('./socket');

const App = Express();

const httpServer = http.Server(App);
const PORT = 8080;

// Express Configuration
App.use(Express.urlencoded({ extended: false }));
App.use(Express.json());
App.use(Express.static('public'));

const apiRoutes = require('./routes/apiRoutes');
const crewsRoutes = require('./routes/crewsRoutes');
const jobsRoutes = require('./routes/jobsRoutes');
const contractsRoutes = require('./routes/contractsRoutes');
const packagesRoutes = require('./routes/packagesRoutes');
const clientsRoutes = require('./routes/clientsRoutes');

App.use("/api", apiRoutes(knex));
App.use('/crews', crewsRoutes(knex));
App.use('/jobs', jobsRoutes(knex));
App.use('/contracts', contractsRoutes(knex));
App.use('/packages', packagesRoutes(knex));
App.use('/clients', clientsRoutes(knex));


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

// Handle webSocket connections
socket.start(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// App.listen(PORT, () => {
//   // eslint-disable-next-line no-console
//   console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
// });
