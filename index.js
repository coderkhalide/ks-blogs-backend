const express = require('express')
const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

require('dotenv').config()
require('./startup/db')()
require('./startup/router')(app)
require('./startup/validation')()

app.get('/', (req, res) => {
    res.send('Hello, welcome to KS Blog Api!!!')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('listening on port '+ PORT))