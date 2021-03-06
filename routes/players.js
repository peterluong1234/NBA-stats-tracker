const express = require('express');
const router = express.Router();
// const usersCtrl = require('../controllers/users');
const playersCtrl = require('../controllers/players');
// const request = require('request');
// const rootURL = 'https://www.balldontlie.io/';

// router.get('/', playersCtrl.index);
router.get('/search', playersCtrl.search);
router.get('/:id', playersCtrl.show)
router.post('/search/player', playersCtrl.searchPlayer);
router.post('/:id', playersCtrl.addToFavorites);
router.delete('/:id', playersCtrl.delete);


module.exports = router;