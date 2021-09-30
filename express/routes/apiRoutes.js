const Express = require('express');
const router = Express.Router();

module.exports = (knex) => {

  router.get('/crews', (req, res) => {
    knex.select().table('crews')
    .then(result => {
      console.log(`Successful GET /crews`);
      res.json({ result });
    })
    .catch(err => {
      console.log(`Error: Could not GET /crews ${err}`);
      res.send(err);
    });
  });

  router.get('/contracts', (req, res) => {
    knex.select().table('contracts')
    .then(result => {
      console.log(`Successful GET /contracts`);
      res.json({ result });
    })
    .catch(err => {
      console.log(`Error: Could not GET /contracts ${err}`);
      res.send(err);
    });
  });

  router.get('/clients', (req, res) => {
    knex.select().table('clients')
    .then(result => {
      console.log(`Successful GET /clients`);
      res.json({ result });
    })
    .catch(err => {
      console.log(`Error: Could not GET /clients ${err}`);
      res.send(err);
    });
  });

  router.get('/packages', (req, res) => {
    knex.select().table('packages')
    .then(result => {
      console.log(`Successful GET /packages`);
      res.json({ result });
    })
    .catch(err => {
      console.log(`Error: Could not GET /packages ${err}`);
      res.send(err);
    });
  });

  router.get('/jobs', (req, res) => {
    knex.select().table('jobs')
    .then(result => {
      console.log(`Successful GET /jobs`);
      res.json({ result });
    })
    .catch(err => {
      console.log(`Error: Could not GET /jobs ${err}`);
      res.send(err);
    });
  });
  
  return router;
};
