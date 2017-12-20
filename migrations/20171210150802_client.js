exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('client', function(table) {
    table.increments('id');
    table.string('client');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('client');
};
