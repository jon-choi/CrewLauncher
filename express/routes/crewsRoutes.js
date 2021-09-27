const Express = require('express');
const router = Express.router();

module.exports = (knex) => {

  router.post('/', (req, res) => {
    const crew = req.body.data;

    knex("crews")
    .insert({
        foreman_name: crew.foreman_name,
        crew_size: crew.crew_size,
        specialty: crew.specialty,
        details: crew.details,
        is_active: crew.is_active,
        avatar: crew.avatar
    })
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        console.log(`Error: could not POST /crews ${err}`);
    });
  });

  return router;
};