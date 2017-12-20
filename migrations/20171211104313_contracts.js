exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('contracts', function(table) {
    table.increments('id');
    table.string('target_name');
    table.string('location');
    table.string('photo');
    table.integer('security');
    table.integer('budget');
    table.boolean('completed').notNullable().defaultTo(false);
    table.string('client');
    table.integer('assassins_id').references('assassins.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('contracts');
};
