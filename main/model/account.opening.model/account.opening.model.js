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
    ,
    cartProducts : [{
        product_id : {
            type : mongoose.Schema.ObjectId,
            ref : "vendorDashboard.products"
        }
        ,
        quantity : {
            type : Number
        }
    }]
    ,
    usersBrowsedProducts : [{
        productSearch : {
            type : String
        }
        ,
        anyCompany : {
            type : String
        }
        ,
        anySpecifications : {
            type : String
        }
        
        
    }]
    ,
    products_Array_To_be_Displayed_On_LandingPage : [{
        productToshow : {
            type : Object
        }
    }]
    ,
    products_Array_To_be_Displayed_On_LandingPage_with_company_and_catagory : [{
        productToshow : {
            type : Object
        }
    }]
})

const SignUp = mongoose.model("Signup", signUpSchema)

module.exports = SignUp;
