const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const SignUp = require("./../model/account.opening.model/account.opening.model")
const {promisify} = require("util")
const jwt = require("jsonwebtoken")
class tokenDecoding{
    async decodeTokenForUser(){
        const token = localStorage.getItem("token")
        const tokenVerification = await promisify(jwt.verify)(token,process.env.STRING)
        const findingUser = await SignUp.find({_id : tokenVerification.id})
        return findingUser
    }
}

const tokenDecoder = new tokenDecoding()

module.exports = tokenDecoder