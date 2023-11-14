const jwt = require('jsonwebtoken')

class tokenProvider{
    tokenSign(id){
        const tokenForcookie = jwt.sign({id : id}, process.env.STRING)
        return tokenForcookie
    }
}

const tokenOBJ = new tokenProvider()

module.exports = tokenOBJ
