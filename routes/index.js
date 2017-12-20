'use strict'
let config = require('../knexfile')['development']
let knex = require('knex')(config);
let express = require('express');
let router = express.Router();

//get home page
router.get('/',function(req,res){
  let index = '/';
  res.render('index',{index});
});

//get all assassins
router.get('/assassins', function(req, res) {
  knex('assassins')
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


//Get all contracts
router.get('/contracts', function(req, res) {
  knex('contracts')
    .select()
    .then(function(contracts) {
      res.render('contracts', {
        contracts
      });
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
