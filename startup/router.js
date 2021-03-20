const blogs = require('../routes/blogs')
const express = require('express')
const users = require('../routes/users')
const auth = require('../routes/auth')
const error = require('../models/error')

module.exports = function(app){
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/blogs', blogs)
    app.use('/users', users)
    app.use('/authtoken', auth)
    app.use(error)
}