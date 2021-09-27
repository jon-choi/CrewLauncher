const Express = require('express');
const router = Express.Router();

module.exports = (knex) => {

  router.post('/', (req, res) => {
    const client = req.body.data;

    knex("clients")
    .insert({
        name: client.name,
        phone: client.phone,
        email: client.email
    })
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        console.log(`Error: could not POST /clients ${err}`);
    });
  });

  router.post('/:id', (req, res) => {
    const client = req.body.data;

    knex("clients")
    .where("id", req.params.id)
    .update("name", client.name)
    .update("phone", client.phone)
    .update("email", client.email)
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        console.log(`Error: could not post /clients/:${client.id}`)
    });
  });


  return router;
};
