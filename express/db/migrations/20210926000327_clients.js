
exports.up = function(knex) {
  return knex.schema.createTable('clients', table => {
    table.increments('id') // this represents the primary key.
    table.string('name') // this is a column.
    table.integer('phone')
    table.string('email')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  
  return knex.schema.dropTableIfExists('clients')
};
