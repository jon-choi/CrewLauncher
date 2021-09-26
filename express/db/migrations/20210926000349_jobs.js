
exports.up = function(knex) {
  return knex.schema.createTable('jobs', table => {
    table.increments('id') // this represents the primary key.
    table.foreign('crew_id').references('id').inTable('crews') // this is a column.
    table.foreign('contract_id').references('id').inTable('contracts')
    table.date('date')
    table.time('start_time')
    table.time('end_time')
    table.boolean('completed').defaultTo(false)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('jobs')
  
};
