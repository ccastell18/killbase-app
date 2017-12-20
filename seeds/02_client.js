exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('client').del()
    .then(function() {
      // Inserts seed entries
      return knex('client').insert([{
          client: 'Marcellus Wallace',
        },
        {
          client: 'Concerto',
        },
        {
          client: 'Mathilda',
        },
        {
          client: 'Winston',
        },
        {
          client: 'Ray Vargo',
        },
      ]);
    });
};
