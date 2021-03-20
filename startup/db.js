const mongoose = require('mongoose')

module.exports = function(){
    mongoose.connect(process.env.CONNECTION_STRING , 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        .then(_ => console.log('Connect to mongodb'))
        .catch(_ => console.log('Unable Connect to mongodb'))
}