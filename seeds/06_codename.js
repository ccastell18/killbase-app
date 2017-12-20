exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('codename').del()
    .then(function() {
      // Inserts seed entries
      return knex('codename').insert([{
          assassins_id: 1,
          codename: 'The Jackal',
        },
        {
          assassins_id: 2,
          codename: 'Old Man',
        },
        {
          assassins_id: 3,
          codename: 'Ghost Dog',
        },
        {
          assassins_id: 4,
        },
        {
          assassins_id: 5,
          codename: 'Baba Yaga',
        },
        {
          assassins_id: 6,
        },
        {
          assassins_id: 7,
          codename: 'The Professional',
        },
        {
          assassins_id: 8,
          codename: 'Nikita',
        },
        {
          assassins_id: 8,
          codename: 'La Femme Nikita',
        },
        {
          assassins_id: 9,
          codename: 'Solenya',
        },
      ]);
    });
};
