const SignUp = require("./../../model/account.opening.model/account.opening.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const {promisify} = require('util')
const tokenOBJ = require("./../../utility/token.assigning")
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const multer = require('multer')
const sharp = require('sharp')
const snapnow = require("snapnow")
const imageProcessingOBJ = require("./../../utility/image.processing")
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

exports.imageProcessingPan = async(req, res, next)=>{
    let processing = imageProcessingOBJ.processImages(
    `./media/pan/${req.body.filepanName}`
    ,`./media/pan-processed/${req.body.filepanName}`
    ,{scale : true, height : 600, width : 300, fit : "fill"}
    ,{gray : true}
    ,{tint : false, R : 244, G : 206, B : 20}
    ,{rotate : false, angle : 135}
    ,{blur : false, level : 20}
    ,{sharpen : false, level : 50}
    ,{flip : false}
    ,{flop : false}
    ,{text : false})
    next()
}




const multerStorageKYCDocs = multer.diskStorage({
    destination : function(req, file, cb){
        if(file.mimetype.split("/")[1]!="pdf"){
            cb(null, "./media/docs")
        }else{
            cb(new Error('invalid')) // this is done on global error handler function
        }
    }
    ,
    filename :  async function(req, file, cb){
            const token = localStorage.getItem("token")
            const tokenVerification = await promisify(jwt.verify)(token,process.env.STRING)
            const findingUser = await SignUp.find({_id : tokenVerification.id})
            cb(null, `${findingUser[0].username}-${findingUser[0]._id}-${file.originalname.split(".")[0]}-${file.fieldname}.png`)
            req.body.logoUploaded = true
            req.body.logoName = `${findingUser[0].username}-${findingUser[0]._id}-Shop-Logo.png`
        
    }
})

exports.uploadDocs= multer({storage : multerStorageKYCDocs})

exports.vendorKYCDocsUploading = async(req, res, next)=>{
    if(req.body.logoUploaded){
        res.status(200).json({
            status : "success",
            data : {
               message : "The KYC Documents are uploaded sucessfuly it will take 24 hrs to approve your KYC"
            }
        })
    } else{
        res.status(200).json({
            status : "success",
            data : {
               message : "Documents are not uploaded, please check the format of documents or try after some time."
            }
        })
    }
    next()
}
const fs = require('fs')
exports.imageProcessingDocs = async(req, res, next)=>{
    const token = localStorage.getItem("token")
    const tokenVerification = await promisify(jwt.verify)(token,process.env.STRING)
    const findingUser = await SignUp.find({_id : tokenVerification.id})

    const readfile = fs.readdirSync("./media/docs")
    let imagesneedsToBeProcessed = []
    readfile.forEach(el=>{
        if(el.split("-")[1]===tokenVerification.id){
            imagesneedsToBeProcessed.push(el)
            let processing = snapnow.processImages(`./media/docs/${el}`,
            `./media/processedDocs/${el}`
            ,{scale : true, height : 500, width : 500, fit : "fill"}
            ,{gray : true}
            ,{tint : false, R : 244, G : 206, B : 20}
            ,{rotate : false, angle : 135}
            ,{blur : false, level : 20}
            ,{sharpen : false, level : 50}
            ,{flip : false}
            ,{flop : false}
            ,{text : false})
        }
        
        // storing essential data of docs to the schema
        if(el.split("-")[3].split(".")[0]==="aadhar"){
            findingUser[0].AadharCard = el
        }

        if(el.split("-")[3].split(".")[0]==="pan"){
            findingUser[0].panCard = el
        }

        if(el.split("-")[3].split(".")[0]==="logo"){
            findingUser[0].shopLogo = el
        }


    })
    findingUser[0].save()

    next()
}
