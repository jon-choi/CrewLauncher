const Express = require('express');
const router = Express.Router();

module.exports = (knex) => {
  
  router.post('/', (req, res) => {
    const job = req.body;
    console.log("JOB in jobsRoutes.js :", job);
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
        console.log(`Error: could not POST to /jobs ${err}`);
      });
    });

    router.post('/:id', (req, res) => {
      const job = req.body;
      knex("jobs")
      .where("id", req.params.id)
      .update("contract_id", job.contract_id)
      .update("crew_id", job.crew_id)
      .update("date", job.date)
      .update("start_time", job.start_time)
      .update("end_time", job.end_time)
      .update("completed", job.completed)
      .then(result => {
        console.log("success")
        res.json(result);
      })
      .catch(err => {
        console.log(`Error: could not POST to /jobs/${req.params.id} ${err}`)
      });
    });

  return router;
};
