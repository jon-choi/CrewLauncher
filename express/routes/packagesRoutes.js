const Express = require('express');
const router = Express.Router();

module.exports = (knex) => {
  router.post('/', (req, res) => {
    const newPackage = req.body;
    console.log("PKG in router", newPackage)
    knex("packages")
    .insert({
      title: newPackage.title,
      flat_rate: newPackage.flat_rate,
      size_range_string: newPackage.size_range_string,
      description: newPackage.description,
      man_hours_per_visit: newPackage.man_hours_per_visit,
      contract_length_days: newPackage.contract_length_days,
      visit_interval_days: newPackage.visit_interval_days,
      image: newPackage.image
    })
    .then(result => {
      console.log("Successful POST to /packages");
      res.json(result);
    })
    .catch(err => {
        console.log(`Error: could not POST /packages ${err.data}`);
    });
  });

  router.post('/:id', (req, res) => {
    const newPackage = req.body;
    
    knex("packages")
    .where("id", req.params.id)
    .update("title", newPackage.title)
    .update("flat_rate", newPackage.flat_rate)
    .update("size_range_string", newPackage.size_range_string)
    .update("description", newPackage.description)
    .update("man_hours_per_visit", newPackage.man_hours_per_visit)
    .update("contract_length_days", newPackage.contract_length_days)
    .update("visit_interval_days", newPackage.visit_interval_days)
    .update("image", newPackage.image)
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        console.log(`Error: could not post /packages/:${newPackage.id}`)
    });
  });

  return router;
};
