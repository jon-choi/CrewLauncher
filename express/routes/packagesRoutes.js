const Express = require('express');
const router = Express.Router();

module.exports = (knex) => {
  router.post('/', (req, res) => {
    const package = req.body.data;

    knex("packages")
    .insert({
      title: package.title,
      flat_rate: package.flat_rate,
      size_range_string: package.size_range_string,
      description: package.description,
      man_hrs_per_visit: package.man_hrs_per_visit,
      contract_length_days: package.contract_length_days,
      visit_interval_days: package.visit_interval_days,
      package_image: package.image
    })
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        console.log(`Error: could not POST /packages ${err}`);
    });
  });

  router.patch('/:id', (req, res) => {
    const package = req.body.data;

    knex("packages")
    .where("id", req.params.id)
    .update("title", package.title)
    .update("flat_rate", package.flat_rate)
    .update("size_range_string", package.size_range_string)
    .update("description", package.description)
    .update("man_hrs_per_visit", package.man_hrs_per_visit)
    .update("contract_length_days", package.contract_length_days)
    .update("visit_interval_days", package.visit_interval_days)
    .update("package_image", package.image)
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        console.log(`Error: could not post /packages/:${package.id}`)
    });
  });

  return router;
};
