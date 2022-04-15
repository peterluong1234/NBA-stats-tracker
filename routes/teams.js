const express = require('express');
const router = express.Router();
const teamsCtrl = require('../controllers/teams');

// router.get('/', playersCtrl.index);
// router.get('/search', playersCtrl.search);
// router.post('/search/player', playersCtrl.searchPlayer);
router.get('/', teamsCtrl.index)
// router.post('/:id', playersCtrl.addToFavorites);
// router.delete('/:id', playersCtrl.delete);


module.exports = router;