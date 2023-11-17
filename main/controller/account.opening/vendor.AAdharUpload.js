const SignUp = require("./../../model/account.opening.model/account.opening.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const {promisify} = require('util')
const tokenOBJ = require("./../../utility/token.assigning")
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const multer = require('multer')
const sharp = require('sharp')
const imageProcessingOBJ = require("./../../utility/image.processing")


const  multerStorageAadhar = multer.diskStorage({
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
            console.log(Aadhar)
            cb(null, Aadhar)
            req.body.aadharUploaded = true
            req.body.fileaadharName = Aadhar
            req.body.id = findingUser[0]._id
        
    }
})

exports.uploadAadhar = multer({storage : multerStorageAadhar})

exports.vendorKYCAadharUploading = async(req, res, next)=>{
    console.log(req.body.aadharUploaded)
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
