const Express = require('express');
const router = Express.Router();

module.exports = (knex) => {

  router.post('/', (req, res) => {
    const contract = req.body.data;

    knex("contracts")
    .insert({
        package_id: contract.package_id,
        client_id: contract.client_id,
        address: contract.address,
        job_notes: contract.job_notes,
        start_date: contract.start_date
    })
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        console.log(`Error: could not POST /contracts ${err}`);
    });
  });

  return router;
};