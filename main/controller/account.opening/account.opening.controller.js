const SignUp = require("./../../model/account.opening.model/account.opening.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const tokenOBJ = require("./../../utility/token.assigning")
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');


exports.openingAccount = async (req, res, next)=>{
    const {username, email, password} = req.body;

    const passwordSplit = password.split('')
    let capitalLetterArray = []
    let lowerLetterArray = []
    let specialLetterArray = []
    let numericLetterArray = []


    passwordSplit.forEach(el=>{
        if(el.charCodeAt()>=65 && el.charCodeAt()<=90){
            capitalLetterArray.push(el) 
        }

        if(el.charCodeAt()>=97 && el.charCodeAt()<=122){
            lowerLetterArray.push(el)
        }

        if((el.charCodeAt()>=32 && el.charCodeAt()<=47) || (el.charCodeAt()>=58 && el.charCodeAt()<=64) || (el.charCodeAt()>=91 && el.charCodeAt()<=96) || (el.charCodeAt()>=123 && el.charCodeAt()<=126)  ){
            specialLetterArray.push(el)
        }

        if(el.charCodeAt()>=48 && el.charCodeAt()<=57){
            numericLetterArray.push(el)
        }        
    })

    if(!(capitalLetterArray.length>=2)){
        console.log("Not a valid password, capital letter missing !!!")
    }else{
        console.log("Password capital check cleared")
    }

    if(!(lowerLetterArray.length>=2)){
        console.log("Not a valid password, Lower letter missing !!!")
    }else{
        console.log("Password lower check cleared")
    }

    if(!(specialLetterArray.length>=2)){
        console.log("Not a valid password, special letter missing !!!")
    }else{
        console.log("Password special check cleared")
    }

    if(!(numericLetterArray.length>=2)){
        console.log("Not a valid password, numric letter missing !!!")
    }else{
        console.log("Password numeric check cleared")
    }

    // crypting the password
    const cryptedPassword = await bcrypt.hash(password, 12)
    // creating the user from the data into the database    
    const openingAcc = await SignUp.create({username,email,password:cryptedPassword})
    // token providing
    const token = tokenOBJ.tokenSign(openingAcc._id)

    // sending token to cookie
    const cookieOptions = {}
    res.cookie("token", token, cookieOptions)

    // sending token to localstorage
    const tokenSendingToBrowser = localStorage.setItem('token', token)


    res.status(200).json({
        status : "success",
        data : {
            token,
            username,
            email,
            password
        }
    })
}