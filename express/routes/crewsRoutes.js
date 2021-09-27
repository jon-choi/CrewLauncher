const Express = require('express');
const router = Express.Router();

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

  router.post('/:id', (req, res) => {
    const crew = req.body.data;

    knex("crews")
    .where("id", req.params.id)
    .update("foreman_name", crew.foreman_name)
    .update("crew_size", crew.crew_size)
    .update("specialty", crew.specialty)
    .update("details", crew.details)
    .update("is_active", crew.is_active)
    .update("avatar", crew.avatar)
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        console.log(`Error: could not post /crews/:${crew.id}`)
    });
  });

  return router;
};