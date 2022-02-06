const mongoose = require('mongoose')
const { Schema } = mongoose;

const Search = new Schema({
  chat_id:  Number,
  target: String
});

module.exports = mongoose.model('search', Search)