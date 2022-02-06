const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const mongoosePaginate = require('mongoose-paginate-v2')

const User = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phoneNumber: String
}, { timestamps: true, toJSON: { virtuals: true } })

/*
  Plugins
*/
User.plugin(mongoosePaginate)

/*
  Vituals
*/

// User.virtual('media', {
//   ref: 'media',
//   localField: '_id',
//   foreignField: 'uploader'
// })

/*
  Methods
*/

User.methods.hashPassword = async function (data) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(data, salt)
  return hash
}

User.methods.login = async function (user, input) {
  if (!bcrypt.compareSync(input, user)) { return false }
  return true
}
module.exports = mongoose.model('user', User)
