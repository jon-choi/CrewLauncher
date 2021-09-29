const Express = require('express');
const router = Express.Router();

module.exports = (knex) => {

  router.get('/crews', (req, res) => {
    knex.select().table('crews')
    .then(result => {
      res.json({ result });
    })
    .catch(err => {
      console.log(`Error: Could not GET /crews ${err.data}`);
    });
  });

  router.get('/contracts', (req, res) => {
    knex.select().table('contracts')
    .then(result => {
      res.json({ result });
    })
    .catch(err => {
      console.log(`Error: Could not GET /contracts ${err.data}`);
    });
  });

  router.get('/clients', (req, res) => {
    knex.select().table('clients')
    .then(result => {
      res.json({ result });
    })
    .catch(err => {
      console.log(`Error: Could not GET /clients ${err.data}`);
    });
  });

  router.get('/packages', (req, res) => {
    knex.select().table('packages')
    .then(result => {
      res.json({ result });
    })
    .catch(err => {
      console.log(`Error: Could not GET /packages ${err.data}`);
    });
  });

  router.get('/jobs', (req, res) => {
    knex.select().table('jobs')
    .then(result => {
      res.json({ result });
    })
    .catch(err => {
      console.log(`Error: Could not GET /jobs ${err.data}`);
    });
  });
  
  return router;
};
