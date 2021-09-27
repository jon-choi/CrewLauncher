
exports.up = function(knex) {
  return knex.schema.createTable('contracts', table => {
    table.increments('id').primary() // this represents the primary key.
    table.integer('package_id').references('packages.id') // this is a foreign key.
    table.integer('client_id').references('clients.id')
    table.string('address').notNullable() // this is a column.
    table.string('job_notes')
    table.date('start_date').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('contracts')
  
};
