const Express = require('express');
const router = Express.Router();

module.exports = (knex) => {

  router.post('/', (req, res) => {
    const contract = req.body;

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

  router.post('/:id', (req, res) => {
    const contract = req.body;

    knex("contracts")
    .where("id", req.params.id)
    .update("package_id", contract.package_id)
    .update("client_id", contract.client_id)
    .update("address", contract.address)
    .update("job_notes", contract.job_notes)
    .update("start_date", contract.start_date)
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        console.log(`Error: could not post /contracts/:${contract.id}`)
    });
  });



  return router;
};