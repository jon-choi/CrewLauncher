
exports.up = function(knex) {
  return knex.schema.createTable('contracts', table => {
    table.increments('id') // this represents the primary key.
    table.foreign('id', 'package_id').references('id').inTable('packages')
    table.foreign('id', 'client_id').references('id').inTable('clients')
    table.string('address').notNullable() // this is a column.
    table.string('job_notes')
    table.date('start_date').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('contracts')
  
};
