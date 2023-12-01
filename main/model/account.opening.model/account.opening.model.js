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
    ,
    orderespurchased : [{
        product_id : {
            type : mongoose.Schema.ObjectId,
            ref : 'vendorDashboard'
        }
        ,
        totalBill : {
            type : String
        }
        ,
        taxOnOrder : {
            type : String
        }
        ,
        addressTobeShipped : {
            type : String
        }
        ,
        orderStatus : {
            type : String
        }
        ,
        orderTrackingUpdate : {
            type : Array
        }
        ,
        quantity : {
            type : Number
        }
        ,
        paymentMode : {
            type : String
        }
        ,
        paymentStatus : {
            type : String,
            enum : ['sucess', 'pending', 'failed'],
            default : 'sucess'
        }
        ,
        refundStatus : {
            type : String,
            enum : ['approved', 'notTaken'],
            default : "notTaken"
        }
        ,
        vendor : {
            type : mongoose.Schema.ObjectId,
            ref : "vendorDashboard"
        }
    }]
    ,
    openBills : [{
        invoiceNumber : {
            type : String,
            trim : true
        }
        ,
        totalTaxApplied : {
            type : Number
        }
        ,
        totalBillAmount : {
            type : Number
        }
        ,
        DateOfBill : {
            type : String,
            default : `${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`
        }
        ,
        shippingAddress : {
            type : String
        }
        ,
        vendor_id : {
            type : mongoose.Schema.ObjectId,
            ref : 'vendorDashboard'
        }
        ,
        product_id : {
            type : Array,
        }
        ,
        vendorAddress : {
            type : String
        }
        ,
        GSTIN : {
            type : String
        }
        ,
        paymentMode : {
            type : String
        }
        ,
        paymentStatus : {
            type : String,
            enum : ['sucess', 'pending', 'failed'],
            default : 'sucess'
        }
        ,
        refundStatus : {
            type : String,
            enum : ['approved', 'notTaken'],
            default : "notTaken"
        }
    }]
})

const SignUp = mongoose.model("Signup", signUpSchema)

module.exports = SignUp;
