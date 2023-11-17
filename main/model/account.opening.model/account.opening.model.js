const mongoose = require("mongoose")

const signUpSchema = new mongoose.Schema({
    username : {
        type : String,
        trim : true,
        required : true,
    }
    ,
    email : {
        type : String,
        trim : true,
        required : true,
    }
    ,
    password : {
        type : String,
        trim : true,
        required : true,
    }
    ,
    image : {
        type : String
    }
    ,
    tempRole : {
        type : String,
        default : "user",
        enum : ["user", "admin", "vendor"]
    }
    ,
    role : {
        type : String,
        default : "user",
        enum : ["user", "admin", "vendor"]
    }
    ,
    KYCStatus : {
        type : Boolean,
        default : false
    }
    ,
    AadharCard : {
        type : String,
        trim : true
    }
    ,
    panCard : {
        type : String,
        trim : true
    }
    ,
    shopLogo : {
        type : String,
        trim : true
    }

})

const SignUp = mongoose.model("Signup", signUpSchema)

module.exports = SignUp;
