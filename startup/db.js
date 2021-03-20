const mongoose = require('mongoose')

module.exports = function(){
    mongoose.connect(process.env.CONNECTION_STRING)
        .then(_ => console.log('Connect to mongodb'))
        .catch(_ => console.log('Unable Connect to mongodb'))
}