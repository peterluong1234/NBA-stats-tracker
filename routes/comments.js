const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const playersCtrl = require('../controllers/players');
// const request = require('request');
// const rootURL = 'https://www.balldontlie.io/';

// router.get('/', playersCtrl.index);
router.post('/players/:id/comments', commentsCtrl.create);
router.delete('/comments/:id', commentsCtrl.delete )
router.put('/comments/:id', commentsCtrl.update)

module.exports = router;