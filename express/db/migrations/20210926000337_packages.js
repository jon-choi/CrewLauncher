
exports.up = function(knex) {
  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('packages')
  
};
