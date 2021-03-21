const express = require('express')
const router = express.Router()
const {Users, validateUser, validateObjectId} = require('../models/user')
const md5 = require('md5')
const auth = require('../middlewares/auth')

router.get('/', function (req, res){
    Users.find().select('name email avatar')
        .then(user => res.send(user))
})

router.post('/', (req, res) => {
    const error = validateUser(req.body)
    if(error) return res.status(400).send({message: error.message})

    let grav_url = "https://www.gravatar.com/avatar/" + md5(req.body.email)

    let user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar: grav_url
    })
    
    user.save()
        .then(response => {
            const token = response.generateAuthToken()
            res.status(200).send({id: user._id, name: response.name, email: response.email, avatar: response.avatar, token: token})
        })
        .catch(error => {
            if(error.code === 11000 || error.code === 12582 || error.code === 11001) res.status(400).send({message: 'This User Already Exist!'})
            else res.status(500).send({message: 'Something went wrong :('})
        })
})

router.get('/:id', (req, res) => {
    const error = validateObjectId(req.params)
    if(error) return res.status(400).send({message: error.message})
    
    Users.findById(req.params.id).select('name email avatar')
        .then(user => user ? res.status(200).send(user) : res.status(400).send({message: 'Invalid User ID :('}))
        .catch(_ => res.status(400).send({message: 'Invalid User ID :('}))
})

router.put('/:id', auth, (req, res) => {
    const error = validateObjectId(req.params)
    if(error) return res.status(400).send({message: error.message})

    const bodyError = validateUser(req.body)
    if(bodyError) return res.status(400).send({message: bodyError.message})

    Users.findByIdAndUpdate(req.params.id, { $set: {
        name: req.body.name
    } }, { new: true })
        .then(user => res.send({id: user._id, name: user.name, email: user.email, avatar: user.avatar}))
        .catch(_ => res.status(400).send({message: "The id you given is wrong"}))
})

router.delete('/:id', auth, (req, res) => {
    const error = validateObjectId(req.params)
    if(error) return res.status(400).send({message: error.message})

    if(req.user.role === 'admin'){
        Users.findByIdAndRemove(req.params.id)
            .then(response => res.status(200).send({id: response._id, name: response.name, email: response.email, avatar: response.avatar}))
            .catch(_ => res.status(400).send({message: "Wrong Id Given!"}))
    }else if(req.user.role === 'user'){
        Users.findById(req.params.id)
            .then(user => {
                if(!user){
                    res.status(400).send("Wrong id given!")
                }else if(user._id == req.user._id){
                    Users.findByIdAndRemove(req.params.id)
                        .then(response => res.status(200).send({id: response._id, name: response.name, email: response.email, avatar: response.avatar}))
                        .catch(_ => res.status(500).send({message: "something went wrong"}))
                }else{
                    res.status(401).send({message: 'Acccess denied!'})
                }
            })
            .catch(_ => res.status(400).send({message: "Wrong id given!"}))
    }else{
        res.status(401).send({message: 'Acccess denied!'})
    }
})

module.exports = router