'use strict'
let config = require('../knexfile')['development']
let knex = require('knex')(config);
let express = require('express');
let router = express.Router();


//get contract form
router.get("/create", function(req, res){
  res.render('contract_form');
});


//update contracts
router.get('/:id/update', function(req, res) {
  let id = req.params.id;
  let updateData= req.body;
  if(Number.isNaN(req.params.id)){
    res.sendStatus(404);
  }
  knex('contracts')
  .where({id})
  .then(function(updateData){
    res.render('contract_form2',updateData[0])
  })

    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
});

//get all contracts
router.get('/', function(req, res) {
  knex('contracts')
    .then(function(contracts) {
      res.render('contracts', {contracts});
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
});

//get contract by id
router.get('/:id', function(req, res) {

  if (Number.isNaN(req.params.id)) {
    res.sendStatus(404);
  }
  knex('contracts')
    .where('id', req.params.id)
    .then(function(contracts) {
      res.render('contracts');
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
});

//add contracts
router.post('/', function(req, res) {
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

//update form
router.get('/update/:id', function(req, res){
  res.render('contract_form');
});

//update contract
router.patch('/:id', function(req, res) {
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
router.delete('/delete/:id', function(req, res, next) {
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


module.exports = router;
