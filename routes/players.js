const express = require('express');
const router = express.Router();
// const usersCtrl = require('../controllers/users');
const playersCtrl = require('../controllers/players');
// const request = require('request');
// const rootURL = 'https://www.balldontlie.io/';

// router.get('/', playersCtrl.index);
router.get('/search', playersCtrl.search);
router.post('/search/player', playersCtrl.searchPlayer);
router.get('/:id', playersCtrl.show)


module.exports = router;