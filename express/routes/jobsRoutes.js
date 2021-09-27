const Express = require('express');
const router = Express.Router();

module.exports = (knex) => {
  
  router.post('/', (req, res) => {
    const job = req.body.data;

      knex("jobs")
      .insert({
        contract_id: job.contract_id,
        crew_id: job.crew_id,
        date: job.date,
        start_time: job.start_time,
        end_time: job.end_time,
        completed: job.completed    
      })
      .then(result => {
          res.json(result);
      })
      .catch(err => {
          console.log(`Error: could not POST /jobs ${err}`);
      });
    });

  return router;
};
