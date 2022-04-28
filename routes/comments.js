const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const playersCtrl = require('../controllers/players');
const isLoggedIn = require('../config/auth');
// const request = require('request');
// const rootURL = 'https://www.balldontlie.io/';

// router.get('/', playersCtrl.index);
router.post('/players/:id/comments', isLoggedIn, commentsCtrl.create);
router.get('/comments/:id', isLoggedIn, commentsCtrl.show);
router.delete('/comments/:id', isLoggedIn, commentsCtrl.delete);
router.put('/comments/:id', isLoggedIn, commentsCtrl.update);

module.exports = router;