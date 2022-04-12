const mongoose = require('mongoose');

// Create your User Model
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
	name: String,
	googleId: {
	  type: String,
	  required: true
	},
	email: String,
    favoritePlayer: [{type: Schema.Types.ObjectId, ref: 'Player'}]
  }, 
    {
	timestamps: true
  });

module.exports = mongoose.model('User', userSchema);