const express = require('express')
const app = express()

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'URLs to trust of allow');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if ('OPTIONS' == req.method) {
    res.sendStatus(200);
    } else {
      next();
    }
})

require('dotenv').config()
require('./startup/db')()
require('./startup/router')(app)
require('./startup/validation')()

app.get('/', (req, res) => {
    res.send('Hello, welcome to KS Blog Api!!!')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('listening on port '+ PORT))