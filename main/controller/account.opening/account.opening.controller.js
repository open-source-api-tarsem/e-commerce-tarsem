const SignUp = require("./../../model/account.opening.model/account.opening.model")

exports.openingAccount = async (req, res, next)=>{
    const {username, email, password} = req.body;
    const signupAcc = await SignUp.create({username, email, password})
    res.status(200).json({
        status : "success",
        data : {
            username,
            email,
            password
        }
    })
}