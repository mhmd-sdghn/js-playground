const mongoose = require('mongoose')
const { Schema } = mongoose;

const Chat = new Schema({
  chat_id:  Number,
  code: String,
  first_name: String,
  username: String,
  type: String,
  photo: {
    small_file_id: String,
    small_file_unique_id: String,
    big_file_id: String,
    big_file_unique_id: String
  }
} , { timestamps: true });

module.exports = mongoose.model('chat', Chat)