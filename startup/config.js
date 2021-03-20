module.exports = function(){
    if(!process.env.jwtToken){
        throw new Error('FATAL ERROR: jwtToken not defined!')
    }
}