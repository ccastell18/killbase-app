'use strict'
let config = require('./knexfile')['development']
let knex = require('knex')(config);
let express = require('express');
let path =
let router = express.Router();

app.use('/public', express.static(path.join(__dirname, '/public')));



//get all assassins
router.get('/assassins', function(req, res) {
  knex('assassins')
    .then(function(assassins) {
      return fetchAssassinCodeNames(assassins);
    })
    .then(function(updatedAssassins) {
      res.render('updatedAssassins',{updatedAssassins});
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
});

// get assassin by id
router.get('/assassins/:id', function(req, res) {
  if (Number.isNaN(req.params.id)) {
    res.sendStatus(404);
  }
  knex('assassins')
    .where('id', req.params.id)
    .then(function(assassins) {
      return fetchAssassinCodeNames(assassins);
    })
    .then(function(updatedAssassins) {
      res.render('updatedAssassins',{updatedAssassins});
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
});

// add assassins
router.post('/assassins', function(req, res) {
  console.log(req.body);
  knex('assassins')
    .returning('id')
    .insert({
      full_name: req.body.full_name,
      weapon: req.body.weapon,
      contact: req.body.contact,
      age: req.body.age,
      price: req.body.price,
      rating: req.body.rating,
      kills: req.body.kills
    }, '*')
    .then(function(assassins) {
      res.render('assassins',{assassins});
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
});

//update assassins
router.patch('/assassins/:id', function(req, res) {
  knex('assassins')
    .where('id', req.params.id)
    .returning('id')
    .update({
      full_name: req.body.full_name,
      weapon: req.body.weapon,
      contact: req.body.contact,
      age: req.body.age,
      price: req.body.price,
      rating: req.body.rating,
      kills: req.body.kills
    }, '*')
    .then(function(assassins) {
      res.render('assassins[0]', {assassins[0]});
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
});

//delete assassins

router.delete('/assassins/:id', function(req, res, next) {
  let assassin;
  knex('assassins')
    .where('id', req.params.id)
    .first()
    .then(function(row) {
      if (!row) {
        return next();
      }
      assassin = row;
      return knex('assassins')
        .del()
        .where('id', req.params.id);
    })
    .then(function() {
      delete assassin.id;
      res.render('assassin',{assassin});
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
});


//get all contracts
router.get('/contracts', function(req, res) {
  knex('contracts')
    .select()
    .then(function(contracts) {
      res.render('contracts', {contracts});
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
});

//get contract by id
router.get('/contracts/:id', function(req, res) {
  if (Number.isNaN(req.params.id)) {
    res.sendStatus(404);
  }
  knex('contracts')
    .where('id', req.params.id)
    .then(function(contracts) {
      res.render('contracts', {contracts});
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
});


//add contracts
router.post('/contracts', function(req, res) {
  knex('contracts')
    .returning('id')
    .insert({
      target_name: req.body.target_name,
      location: req.body.location,
      photo: req.body.photo,
      security: req.body.security,
      budget: req.body.budget,
      completed: req.body.completed,
      client: req.body.client,
      assassins_id: req.body.assassins_id
    }, '*')
    .then(function(contracts) {
      // Now the contract is created, take contract id returned and make contract/assassin object to add to contracts assassins table.
      let contract = contracts[0];
      let assassinContract = {
        assassins_id: req.body.assassins_id,
        contracts_id: contract.id
      }
      return knex('assassins_contracts').insert(assassinContract, '*')
    })
    .then(function(assassin_contracts) {
      res.render('assassin_contracts',{assassin_contracts});
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
});

//update contract
router.patch('/contracts/:id', function(req, res) {
  knex('contracts')
    .where('id', req.params.id)
    .returning('id')
    .update({
      target_name: req.body.target_name,
      location: req.body.location,
      photo: req.body.photo,
      security: req.body.security,
      budget: req.body.budget,
      completed: req.body.completed,
      client: req.body.client,
      assassins_id: req.body.assassins_id
    }, '*')
    .then(function(contracts) {
      let contract = contracts[0];
      let assassinContract = {
        assassins_id: req.body.assassins_id,
        contracts_id: contract.id
      }
      return knex('assassins_contracts').update(assassinContract,'*')
    })
    .then(function(assassins_contracts){
      res.redirect('/assassins/'+ req.params.id);
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
});

//delete contract
router.delete('/contracts/:id', function(req, res, next) {
  let contract;
  if (Number.isNaN(req.params.id)) {
    res.sendStatus(404);
  }
  knex('contracts')
    .where('id', req.params.id)
    .first()
    .then(function(row) {
      if (!row) {
        return next();
      }
      contract = row;
      return knex('contracts')
        .del()
        .where('id', req.params.id);
    })
    .then(function() {
      delete contract.id;
      res.render('contract',{contract});
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get('/assassins_contracts', function(req, res) {
  knex('assassins_contracts')
    .select()
    .then(function(assassins_contracts) {
      res.render('assassins_contracts',{assassins_contracts});
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
});

// MARK: - FUNCTIONS

function fetchAssassins() {
  knex('assassins')
    .then(function(assassin) {
      // Creating an assassin index to quickly find our particular assassin.
      let indexedAssassins = assassins.reduce(function(obj, assassin) {
        obj[assassin.id] = assassin;
        return obj;
      }, {});

      return indexedAssassins;
    });
}

function fetchAssassinCodeNames(assassins) {
  return knex('codename')
    .then(function(codenames) {
      let indexedCodeNames = codenames.reduce(function(obj, codename) {

        // If an array already exists for the current assassin_id, just add the new codename to the array.

        if (obj[codename.assassins_id]) {
          obj[codename.assassins_id].push(codename.codename);

          // If an array does NOT exists for the current assassin_id, create a new array and append the codename.
        } else {
          obj[codename.assassins_id] = [];
          obj[codename.assassins_id].push(codename.codename);
        }

        return obj;
      }, {});
      // Loop over each assassin and add their respective codenames before sending them to the front end.
      let updatedAssassins = assassins.map(function(assassin) {
        let assassinCodeNames = indexedCodeNames[assassin.id];
        assassin.codenames = assassinCodeNames;
        return assassin;
      })
      return updatedAssassins;
    })
}

module.exports = router;
