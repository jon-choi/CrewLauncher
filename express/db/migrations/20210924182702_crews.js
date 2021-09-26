
exports.up = function(knex) {
  return knex.schema.createTable('crews', table => {
    table.increments('id').primary() // this represents the primary key.
    table.string('foreman_name') // this is a column.
    table.integer('crew_size')
    table.boolean('is_active').defaultTo(true)
    table.string('details')
    table.string('specialty')
  }) 
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('crews')
  
};
