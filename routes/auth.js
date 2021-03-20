const express = require('express')
const { validateAuthBody } = require('../models/auth')
const router = express.Router()
const {Users} = require('../models/user')

router.post('/', (req, res) => {
    const error = validateAuthBody(req.body)
    if(error) return res.status(400).send(error.message)

    Users.findOne({ email: req.body.email })
        .then(user => {
            if(!user) return res.status(400).send({ message: 'No such user found!'})
            if(user.password !== req.body.password) return res.status(400).send({ message: 'Invalid password!'})

            const token = user.generateAuthToken()
            res.send({token})
        })
        .catch(_ => res.status(500).send({ message: 'Something went wrong!'}))
})

module.exports = router