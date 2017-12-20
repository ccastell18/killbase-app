'use strict'
let config = require('../knexfile')['development']
let knex = require('knex')(config);
let express = require('express');
let router = express.Router();

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

router.get('/assassins', function(req, res) {
  knex('assassins')
    .then(function(assassins) {
      res.render('assassins',{assassins});
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

module.exports = router;
