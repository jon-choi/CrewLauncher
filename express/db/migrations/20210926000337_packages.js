
exports.up = function(knex) {
  return knex.schema.createTable('packages', table => {
    table.increments('id') // this represents the primary key.
    table.string('title').notNullable() // this is a column.
    table.float('flat_rate').notNullable()
    table.integer('contract_length_days').notNullable()
    table.integer('visit_interval_days').notNullable()
    table.integer('man_hours_per_visit').notNullable()
    table.string('size_range_string')
    table.string('description')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('packages')
  
};
