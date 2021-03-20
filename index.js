const express = require('express')
const app = express()

require('dotenv').config()
require('./startup/db')()
require('./startup/router')(app)
require('./startup/validation')()

app.get('/', (req, res) => {
    res.send('Hello, welcome to KS Blog Api!!!')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('listening on port '+ PORT))