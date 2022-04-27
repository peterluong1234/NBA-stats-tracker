const mongoose = require('mongoose');

// Create your User Model
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  user: {type: Schema.Types.ObjectId},
  content: String,
}, {
  timestamps: true
});

const playerSchema = new mongoose.Schema({
    usersFavorited: [],
  	firstName: String,
    lastName: String,
    id: Number,
    team: String,
    city: String,
    position: String,
    comments: [commentSchema]
  });

module.exports = mongoose.model('Player', playerSchema);