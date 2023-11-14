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
    role : {
        type : String,
        default : "user",
        enum : ["user", "admin", "vendor"]
    }
})

const SignUp = mongoose.model("Signup", signUpSchema)

module.exports = SignUp;
