exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('codename', function(table) {
    table.integer('assassins_id').references('assassins.id');
    table.string('codename').notNullable().defaultTo('unknown');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('codename');
};
