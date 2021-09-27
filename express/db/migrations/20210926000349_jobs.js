
exports.up = function(knex) {
  return knex.schema.createTable('jobs', table => {
    table.increments('id').primary() // this represents the primary key.
    table.integer('crew_id').references('crews.id') // this is a foreign key.
    table.integer('contract_id').references('contracts.id')
    table.date('date') // this is a column.
    table.time('start_time')
    table.time('end_time')
    table.boolean('completed').defaultTo(false)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('jobs')
  
};
