const mongoose = require('mongoose');

// Create your User Model
const Schema = mongoose.Schema;

const teamSchema = new mongoose.Schema({
    usersFavorited: [],
    id: Number,
    abbreviation: String,
	city: String,
    name: String,
    fullName: String,
    conference: String,
    division: String
  });

module.exports = mongoose.model('Team', teamSchema);