const express = require('express')
const auth = require('../middlewares/auth')
const router = express.Router()
const {Blogs, validateBlog, validateObjectId} = require('../models/blog')

router.get('/', function (req, res){
    Blogs.find().sort('createdAt').populate('user', 'name email avatar')
        .then(blogs => res.send(blogs))
        .catch(_ => res.status(500).send("Something went wrong"))
})

router.post('/', auth, (req, res) => {
    const error = validateBlog(req.body)
    if(error) return res.status(400).send(error.message)
    let blog = new Blogs({
        title: req.body.title,
        categorys: req.body.categorys,
        thumbnail: req.body.thumbnail,
        user: req.body.user,
        blocks: req.body.blocks,
    })
    blog.save()
        .then(response => res.status(200).send(response))
        .catch(_ => res.status(500).send("Something went wrong"))
})

router.get('/:id', (req, res) => {
    const error = validateObjectId(req.params)
    if(error) return res.status(400).send(error.message)

    Blogs.findById(req.params.id).populate('user', 'name email avatar')
        .then(response => res.status(200).send(response))
        .catch(_ => res.status(400).send("Wrong Id Given!"))
})

router.put('/:id', auth, (req, res) => {
    const error = validateObjectId(req.params)
    if(error) return res.status(400).send(error.message)

    const bodyError = validateBlog(req.body)
    if(bodyError) return res.status(400).send(bodyError.message)

    Blogs.findByIdAndUpdate(req.params.id, { $set: {
        title: req.body.title,
        categorys: req.body.categorys,
        thumbnail: req.body.thumbnail,
        user: req.body.user,
        blocks: req.body.blocks
    } }, { new: true })
        .then(gen => res.send(gen))
        .catch(_ => res.status(400).send("The id you given is wrong"))
})

router.delete('/:id', auth, (req, res) => {
    const error = validateObjectId(req.params)
    if(error) return res.status(400).send(error.message)

    Blogs.findByIdAndRemove(req.params.id)
        .then(response => res.status(200).send(response))
        .catch(_ => res.status(400).send("Wrong Id Given!"))
})

module.exports = router