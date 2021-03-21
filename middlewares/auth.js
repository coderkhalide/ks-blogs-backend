const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).send({ message: 'Acccess denied. No token("x-auth-token") provided!'})
    try{
        const decode = jwt.verify(token, process.env.jwtToken)
        req.user = decode
        next()
    }catch(e){
        res.status(400).send({message: 'Invalid token'})
    }
}