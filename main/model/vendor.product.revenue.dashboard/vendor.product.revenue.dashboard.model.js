const mongoose = require('mongoose')

const productAdd = new mongoose.Schema({
    shopName:{
        type: String,
        required: true,
        trim:true
    },
    shopCategory:{
        type: String,
        required: true,
        trim:true,
        enum:[]
    },
    shopProductType:{
        type:String,
        required:true,
        trim:true
    },
    kycStatus:{
        type:Boolean,
        default:false
    },
    gstinNumber:{
        type:Number,
        trim:true
    },
    isAdApplied:{
        type:Boolean,
        default:false
    },
    shopAddress:{
        type:String,
        required:true,
        trim:true,
        max:[50,"Address must be less than 50 characters"]
    },
    product:[{
        productTitle:{
            type:String,
            required:true,
            trim:true,
            max:[50,"Address must be less than 50 characters"]
        },
        productDescription:{
            type:String,
            required:true,
            trim:true,
            max:[100,"Address must be less than 50 characters"]
        },
        productInventory:{
            type:Number,
            default:0
        },
        productCompany:{
            type : String
        }
        ,
        priceForProduct : {
            type : Number
        }
        ,
        productCatagory : {
            type : String
        }
        ,
        colorOfproduct : {
            type : String
        }
        ,
        discountValue : {
            type : Number,
            default : 0
        }
        ,
        taxOverProduct : {
            type : Number,
        }
        ,
        productMaterial: {
            type : String
        }
        ,
        productWeight : {
            type : String
        }
        ,
        numberOfpieces : {
            type : Number
        }
        ,
        HSN : {
            type : String
        }
        ,
        productRating : {
            type : Number
        }
        
        ,
        returnDays : {
            type : Number
        }
        ,
       
        dimentionsOfproduct : [{
            height : {
                type : Number
            }
            ,
            width : {
                type : Number
            }
        }]
        ,
        productReview : [{
            rate : {
                type : Number
            }
            ,
            comment : {
                type : String
            }
            ,
            userWhoGIvedTheReview : {
                type : mongoose.Schema.ObjectId,
                ref : "SignUp"
            }
        }]
        ,
        countryOfOrigin : {
            type : String
        }
        ,
        specialFeatures : {
            type : String
        }
        ,
        productOwner : {
            type : mongoose.Schema.ObjectId  ,
            ref : "vendorDashoard"
        }
        ,
        productImages:[{
            image1:{
                type:String
            },
            image2:{
                type:String
            },
            image3:{
                type:String
            },
            image4:{
                type:String
            },
            image5:{
                type:String
            }
        }],
        productVideo:[{
            video1:{
                type:String,
            }
        }]
        
    }],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"Signup",
    }
    ,
    productSold : [{
        product_id : {
            type : Array
        }
        ,
        RevenueGenerated : {
            type : Number
        }
        ,
        taxCollected : {
            type : Number
        }
        ,
        DateOfInvoiceApproval : {
            type : String,
            default : `${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`
        }
        
    }]
    ,
    dailyRevenue:[{
        Monday:[{
            date:{
                type:Date,
                default:`${new Date().getDays}/${new Date().getMonth()}/${new Date().getYear()}`
            },
            productsSoldToday:[{
                productSold:{
                    type:Array
                }
            }],
            totalRevenue:{
                type:Number,
                default:0,   
            },
            grossRevnue:{
                type:Number,
                default:0,
            },
            netProfit:{
                type:Number,
                default:0,
            },

        }],
        Tuesday:[{
            date:{
                type:Date,
                default:`${new Date().getDays}/${new Date().getMonth()}/${new Date().getYear()}`
            },
            productsSoldToday:[{
                productSold:{
                    type:Array
                }
            }],
            totalRevenue:{
                type:Number,
                default:0,   
            },
            grossRevnue:{
                type:Number,
                default:0,
            },
            netProfit:{
                type:Number,
                default:0,
            },

        }],
        Wednesday:[{
            date:{
                type:Date,
                default:`${new Date().getDays}/${new Date().getMonth()}/${new Date().getYear()}`
            },
            productsSoldToday:[{
                productSold:{
                    type:Array
                }
            }],
            totalRevenue:{
                type:Number,
                default:0,   
            },
            grossRevnue:{
                type:Number,
                default:0,
            },
            netProfit:{
                type:Number,
                default:0,
            },

        }],
        Thrusday:[{
            date:{
                type:Date,
                default:`${new Date().getDays}/${new Date().getMonth()}/${new Date().getYear()}`
            },
            productsSoldToday:[{
                productSold:{
                    type:Array
                }
            }],
            totalRevenue:{
                type:Number,
                default:0,   
            },
            grossRevnue:{
                type:Number,
                default:0,
            },
            netProfit:{
                type:Number,
                default:0,
            },

        }],
        Friday:[{
            date:{
                type:Date,
                default:`${new Date().getDays}/${new Date().getMonth()}/${new Date().getYear()}`
            },
            productsSoldToday:[{
                productSold:{
                    type:Array
                }
            }],
            totalRevenue:{
                type:Number,
                default:0,   
            },
            grossRevnue:{
                type:Number,
                default:0,
            },
            netProfit:{
                type:Number,
                default:0,
            },

        }],
        Saturday:[{
            date:{
                type:Date,
                default:`${new Date().getDays}/${new Date().getMonth()}/${new Date().getYear()}`
            },
            productsSoldToday:[{
                productSold:{
                    type:Array
                }
            }],
            totalRevenue:{
                type:Number,
                default:0,   
            },
            grossRevnue:{
                type:Number,
                default:0,
            },
            netProfit:{
                type:Number,
                default:0,
            },

        }],
        Sunday:[{
            date:{
                type:Date,
                default:`${new Date().getDays}/${new Date().getMonth()}/${new Date().getYear()}`
            },
            productsSoldToday:[{
                productSold:{
                    type:Array
                }
            }],
            totalRevenue:{
                type:Number,
                default:0,   
            },
            grossRevnue:{
                type:Number,
                default:0,
            },
            netProfit:{
                type:Number,
                default:0,
            },

        }]
    }],
    weeklyRevenue:[{
        week1:{
            type:Number,
            default:0
        },
        week:{
            type:Number,
            default:0
        },
        week3:{
            type:Number,
            default:0
        },
        week4:{
            type:Number,
            default:0
        }
    }],
    monthlyRevenue:[{
        Jan:{
            type:Number,
            default:0
        },
        Feb:{
            type:Number,
            default:0
        },
        Mar:{
            type:Number,
            default:0
        },
        Apr:{
            type:Number,
            default:0
        },
        June:{
            type:Number,
            default:0
        },
        July:{
            type:Number,
            default:0
        },
        Aug:{
            type:Number,
            default:0
        },
        Sep:{
            type:Number,
            default:0
        },
        Oct:{
            type:Number,
            default:0
        },
        Nov:{
            type:Number,
            default:0
        },
        Dec:{
            type:Number,
            default:0
        },
    }],
    yearlyRevenue:{
        type:Number,
        default:0
    }
})


const vendorDashoard = mongoose.model("vendorDashoard", productAdd)

module.exports = vendorDashoard;
