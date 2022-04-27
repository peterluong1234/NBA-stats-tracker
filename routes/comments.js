const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const playersCtrl = require('../controllers/players');
// const request = require('request');
// const rootURL = 'https://www.balldontlie.io/';

// router.get('/', playersCtrl.index);
router.post('/players/:id/comments', commentsCtrl.create);


module.exports = router;