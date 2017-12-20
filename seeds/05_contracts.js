exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contracts').del()
    .then(function() {
      // Inserts seed entries
      return knex('contracts').insert([{
          target_name: 'Butch Coolidge',
          location: 'Los Angeles',
          photo: 'https://goo.gl/LCquZj',
          security: 3,
          budget: 40,
          completed: false,
          client: 'Marcellus Wallace',
        },
        {
          target_name: 'The Jaguar',
          location: 'Russian Embassy',
          photo: 'https://goo.gl/6JWsiv',
          security: 9,
          budget: 70,
          client: 'Concerto',
        },
        {
          target_name: 'Norman Stansfield',
          location: 'Manhattan',
          photo: 'https://i.imgur.com/mdIk33E.jpg',
          security: 7,
          budget: 35,
          client: 'Mathilda',
        },
        {
          target_name: 'Santino D\'Antonio',
          location: 'Continental Hotel',
          photo: 'https://goo.gl/fUPkYy',
          security: 10,
          budget: 25,
          client: 'Winston',
        },
        {
          target_name: 'Sonny Valerio',
          location: 'Queens',
          photo: 'https://goo.gl/8DHYUS',
          security: 4,
          budget: 10,
          client: 'Ray Vargo',
        },
      ]);
    });
};
