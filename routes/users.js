const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');

router.get('/', usersCtrl.index);
// router.post('/:id/players', usersCtrl.addToFavorites);

module.exports = router;