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

// Handle webSocket connections
socket.start(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server ( with websockets ;) ) listening on http://localhost:${PORT}`);
});
