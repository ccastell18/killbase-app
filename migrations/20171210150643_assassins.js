exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('assassins', function(table) {
    table.increments('id');
    table.string('full_name').notNullable().defaultTo('unknown');
    table.string('codename').notNullable().defaultTo('unknown'),
    table.string('weapon');
    table.string('contact');
    table.integer('age');
    table.integer('price');
    table.float('rating');
    table.integer('kills');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('assassins');
};
