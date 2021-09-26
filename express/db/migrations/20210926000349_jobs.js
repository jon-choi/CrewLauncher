
exports.up = function(knex) {
  return knex.schema.createTable('jobs', table => {
    table.increments('id').primary() // this represents the primary key.
    table.foreign('id', 'crew_id').references('id').inTable('crews') // this is a column.
    table.integer('contract_id').references('id').inTable('contracts')
    table.date('date')
    table.time('start_time')
    table.time('end_time')
    table.boolean('completed').defaultTo(false)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('jobs')
  
};
