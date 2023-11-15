const SignUp = require("./../../model/account.opening.model/account.opening.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const {promisify} = require('util')
const tokenOBJ = require("./../../utility/token.assigning")
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const multer = require('multer')
const sharp = require('sharp')
// const aadhar = require("")


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


exports.loginToAccount = async(req, res, next)=>{
    const {passwordFromUser} = req.body;
    const token = localStorage.getItem("token")
    const tokenVerification = await promisify(jwt.verify)(token,process.env.STRING)
    const findingUser = await SignUp.find({_id : tokenVerification.id})

    // password comaprision
    const passwordCheck = await bcrypt.compare(passwordFromUser,findingUser[0].password)
    if(!passwordCheck){
        res.status(200).json({
            status : "success",
            data : {
               message : "email or password incorrect"
            }
        })
        return
    }

    // re-assigning the token
    // token providing
    const newToken = tokenOBJ.tokenSign(findingUser[0]._id)

    // sending token to cookie
    const cookieOptions = {}
    res.cookie("token", token, cookieOptions)

    // sending token to localstorage
    const tokenSendingToBrowser = localStorage.setItem('token', token)

    res.status(200).json({
        status : "success",
        data : {
           token,
           message : "Login sucessfull"
        }
    })
}


exports.vendorAccountOpeningWithoutKYC = async(req, res, next)=>{
    const token = localStorage.getItem("token")
    const tokenVerification = await promisify(jwt.verify)(token,process.env.STRING)
    const findingUser = await SignUp.find({_id : tokenVerification.id})
    findingUser[0].tempRole = "vendor"
    findingUser[0].save()
    res.status(200).json({
        status : "success",
        data : {
           token,
           message : "Your are temperory shifted to vendor account ,please complete KYC for excess of full account"
        }
    })
}

const multerStorageAadhar = multer.diskStorage({
    destination : function(req, file, cb){
        if(file.mimetype.split("/")[1]!="pdf"){
            cb(null, "./media/aadhar")
        }else{
            cb(new Error('invalid')) // this is done on global error handler function
        }
    }
    ,
    filename :  async function(req, file, cb){
            const token = localStorage.getItem("token")
            const tokenVerification = await promisify(jwt.verify)(token,process.env.STRING)
            const findingUser = await SignUp.find({_id : tokenVerification.id})
            const Aadhar = `${findingUser[0].username}-${findingUser[0]._id}-aadhar-card.png`
            cb(null, Aadhar)
            req.body.aadharUploaded = true
            req.body.fileaadharName = Aadhar
            req.body.id = findingUser[0]._id
        
    }
})

exports.uploadAadhar = multer({storage : multerStorageAadhar})

exports.vendorKYCAadharUploading = async(req, res, next)=>{
    
    

    if(req.body.aadharUploaded){
        const UserAadharSaving = await SignUp.findOne({_id : req.body.id})
        UserAadharSaving.AadharCard = req.body.fileaadharName
        UserAadharSaving.save()
        res.status(200).json({
            status : "success",
            data : {
               
               message : "aadhar uploaded"
            }
        })
    } else{
        res.status(200).json({
            status : "success",
            data : {
               message : "aadhar card is not uploaded, please try again after some time, upload aadhar in only allowed format"
            }
        })
    }
    
}


const multerStoragePan = multer.diskStorage({
    destination : function(req, file, cb){
        if(file.mimetype.split("/")[1]!="pdf"){
            cb(null, "./media/pan")
        }else{
            cb(new Error('invalid')) // this is done on global error handler function
        }
    }
    ,
    filename :  async function(req, file, cb){
            const token = localStorage.getItem("token")
            const tokenVerification = await promisify(jwt.verify)(token,process.env.STRING)
            const findingUser = await SignUp.find({_id : tokenVerification.id})
            const pan = `${findingUser[0].username}-${findingUser[0]._id}-pan-card.png`
            cb(null, pan)
            req.body.panUploaded = true
            req.body.filepanName = pan
            req.body.idpan = findingUser[0]._id
        
    }
})

exports.uploadpan= multer({storage : multerStoragePan})

exports.vendorKYCPanUploading = async(req, res, next)=>{
    console.log(req.body.panUploaded)
    if(req.body.panUploaded){
        const UserPanSaving = await SignUp.findOne({_id : req.body.idpan})
        UserPanSaving.panCard = req.body.filepanName
        UserPanSaving.save()
        res.status(200).json({
            status : "success",
            data : {
               
               message : "pan uploaded"
            }
        })
    } else{
        res.status(200).json({
            status : "success",
            data : {
               message : "pan card is not uploaded, please try again after some time, upload pan in only allowed format"
            }
        })
    }
}




const multerStorageLogo = multer.diskStorage({
    destination : function(req, file, cb){
        if(file.mimetype.split("/")[1]!="pdf"){
            cb(null, "./media/shoplogo")
        }else{
            cb(new Error('invalid')) // this is done on global error handler function
        }
    }
    ,
    filename :  async function(req, file, cb){
            const token = localStorage.getItem("token")
            const tokenVerification = await promisify(jwt.verify)(token,process.env.STRING)
            const findingUser = await SignUp.find({_id : tokenVerification.id})
            cb(null, `${findingUser[0].username}-${findingUser[0]._id}-Shop-Logo.png`)
            req.body.logoUploaded = true
            req.body.logoName = `${findingUser[0].username}-${findingUser[0]._id}-Shop-Logo.png`
        
    }
})

exports.uploadLogo= multer({storage : multerStorageLogo})

exports.vendorKYCLogoUploading = async(req, res, next)=>{
    console.log(req.body.logoUploaded)
    if(req.body.logoUploaded){
        res.status(200).json({
            status : "success",
            data : {
               
               message : "Logo uploaded"
            }
        })
    } else{
        res.status(200).json({
            status : "success",
            data : {
               message : "Logo is not uploaded, please try again after some time, upload Logo in only allowed format"
            }
        })
    }
    next()
}


exports.imageProcessing = async(req, res, next)=>{
    console.log(req.body.logoName)
    const processing = await sharp(`./media/shoplogo/${req.body.logoName}`).resize(200,200, {fit : "fill"}).png({quality : 100}).toFile(`./media/logo-processed/${req.body.logoName}`)
    next()
}