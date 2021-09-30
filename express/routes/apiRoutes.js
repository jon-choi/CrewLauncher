const Express = require('express');
const router = Express.Router();

module.exports = (knex) => {

  router.get('/crews', (req, res) => {
    knex.select().table('crews')
    .then(result => {
      res.json({ result });
    })
    .catch(err => {
      console.log(`Error: Could not GET /crews ${err}`);
      res.error(err);
    });
  });

  router.get('/contracts', (req, res) => {
    knex.select().table('contracts')
    .then(result => {
      res.json({ result });
    })
    .catch(err => {
      console.log(`Error: Could not GET /contracts ${err}`);
      res.error(err);
    });
  });

  router.get('/clients', (req, res) => {
    knex.select().table('clients')
    .then(result => {
      res.json({ result });
    })
    .catch(err => {
      console.log(`Error: Could not GET /clients ${err}`);
      res.error(err);
    });
  });

  router.get('/packages', (req, res) => {
    knex.select().table('packages')
    .then(result => {
      res.json({ result });
    })
    .catch(err => {
      console.log(`Error: Could not GET /packages ${err}`);
      res.error(err);
    });
  });

  router.get('/jobs', (req, res) => {
    knex.select().table('jobs')
    .then(result => {
      res.json({ result });
    })
    .catch(err => {
      console.log(`Error: Could not GET /jobs ${err}`);
      res.error(err);
    });
  });
  
  return router;
};
