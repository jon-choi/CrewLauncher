
exports.up = function(knex) {
  return knex.schema.createTable('contracts', table => {
    table.increments('id').primary() // this represents the primary key.
    table.integer('package_id')
    table.foreign('package_id').references('packages.id').onDelete('CASCADE') // this is a foreign key.
    table.integer('client_id')
    table.foreign('client_id').references('clients.id').onDelete('CASCADE')
    table.string('address').notNullable() // this is a column.
    table.string('job_notes')
    table.date('start_date').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('contracts')
  
};
