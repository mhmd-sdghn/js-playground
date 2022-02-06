const mongoose = require('mongoose')

function initMongoose () {
    mongoose.connect(process.env.DB_CONNECTION_STRING , {} , (err) => {
        if (err) console.error('DATABASE' , err);
        else console.log('Database conneted')
    })
}

module.exports = initMongoose;