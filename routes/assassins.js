'use strict'
let config = require('../knexfile')['development']
let knex = require('knex')(config);
let express = require('express');
let router = express.Router();

//gets Post section
router.get('/create', function(req, res) {
  res.render('assassin_form');
});

//get Update section
router.get('/:id/update', function(req, res) {
  let id = req.params.id;
  let updateData = req.body;
  if (Number.isNaN(req.params.id)) {
    res.sendStatus(404);
  }
  knex('assassins')
    .where({id})
    .then(function(updateData) {
      res.render('assassins_form2', updateData[0]);
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
});

//get all assassins
router.get('/', function(req, res) {
  knex('assassins')
    .then(function(assassins) {
      res.render('assassins', {
        assassins: assassins
      });
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
});


// get assassin by id
router.get('/:id', function(req, res) {
  let id = req.params.id;
  if (Number.isNaN(req.params.id)) {
    res.sendStatus(404);
  }
  knex('assassins')
    .where({id})
    .then(function(assassins) {
      res.render('assassins', {
        assassins
      });
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
});

// add assassins
router.post('/', function(req, res) {
  knex('assassins')
    .insert({
      full_name: req.body.full_name,
      codename: req.body.codename,
      weapon: req.body.weapon,
      contact: req.body.contact,
      age: req.body.age,
      price: req.body.price,
      rating: req.body.rating,
      kills: req.body.kills,
    }, '*')

    .then(function(assassins) {
      res.redirect('/assasssins');
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
});

//update assassins
router.put('/:id', function(req, res) {
  let id = req.params.id;
  knex('assassins')
    .where({
      id: id
    })
    .returning(id)
    .update({
      full_name: req.body.full_name,
      codename: req.body.codename,
      weapon: req.body.weapon,
      contact: req.body.contact,
      age: req.body.age,
      price: req.body.price,
      rating: req.body.rating,
      kills: req.body.kills
    }, '*')
    .then(function(updateData) {
      res.redirect("/assassins");
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
});

//delete assassins

router.get('/:id', function(req, res) {
  res.render('assassins_delete',{'id':req.body.id});
});

router.delete('/:id', function(req, res, next){
  let assassin;
  let id = req.body.id;
  knex('assassins')
    .where(
      {'id': id}
    )
    .first()
    .then(function(row) {
      if (!row) {
        return next();
      }
      assassin = row;
      return knex('assassins')
        .del()
        .where('id', id);
    })
    .then(function() {
      res.redirect('/assassins');
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
});

// MARK: - FUNCTIONS

/*function fetchAssassins() {
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
}*/

module.exports = router;
