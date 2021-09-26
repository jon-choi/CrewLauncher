
exports.up = function(knex) {
  return knex.schema.createTable('clients', table => {
    table.increments('id') // this represents the primary key.
    table.string('name').notNullable() // this is a column.
    table.string('phone')
    table.string('email').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  
  return knex.schema.dropTableIfExists('clients')
};
