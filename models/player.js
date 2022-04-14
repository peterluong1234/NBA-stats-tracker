const mongoose = require('mongoose');

// Create your User Model
const Schema = mongoose.Schema;

const playerSchema = new mongoose.Schema({
    usersFavorited: [],
	firstName: String,
    lastName: String,
    id: Number
  });

module.exports = mongoose.model('Player', playerSchema);