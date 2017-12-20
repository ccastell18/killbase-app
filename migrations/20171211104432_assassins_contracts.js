exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('assassins_contracts', function(table) {
    table.integer('assassins_id').references('assassins.id');
    table.integer('contracts_id').references('contracts.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('assassins_contracts');
};
