
exports.up = function(knex) {
  return knex.schema.createTable('jobs', table => {
    table.increments('id').primary() // this represents the primary key.
    table.integer('crew_id')
    table.foreign('crew_id').references('crews.id').onDelete('CASCADE') // this is a foreign key.
    table.integer('contract_id')
    table.foreign('contract_id').references('contracts.id').onDelete('CASCADE')
    table.date('date') // this is a column.
    table.integer('start_time')
    table.integer('end_time')
    table.boolean('completed').defaultTo(false)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('jobs')
  
};
