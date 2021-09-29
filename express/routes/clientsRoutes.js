const Express = require('express');
const router = Express.Router();

module.exports = (knex) => {

  router.post('/', (req, res) => {
    const client = req.body;
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
        console.log(`Error: could not POST to /clients ${err.data}`);
    });
  });

  router.post('/:id', (req, res) => {
    const client = req.body;
    knex("clients")
    .where("id", req.params.id)
    .update("name", client.name)
    .update("phone", client.phone)
    .update("email", client.email)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(`Error: could not POST to /clients/${req.params.id} ${err.data}`)
    });
  });

  return router;
};
