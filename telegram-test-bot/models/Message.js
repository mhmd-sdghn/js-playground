const mongoose = require('mongoose')
const { Schema } = mongoose;

const Message = new Schema({
 from: Number,
 to: Number,
 message: String,
 isReply: Boolean
} , { timestamps: true });

module.exports = mongoose.model('message', Message)