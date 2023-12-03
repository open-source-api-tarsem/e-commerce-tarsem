const mongoose = require('mongoose')
const watchlistCreation = new mongoose.Schema({
    watchlistName : {
        type : "String",
        default : 'Your watchlist'
    }
    ,
    watchListProducts : [{
        product_id : {
            type : mongoose.Schema.ObjectId,
            ref : 'vendorDashboard'
        }
        ,
        vendor_id : {
            type : mongoose.Schema.ObjectId,
            ref : 'vendorDashboard'
        }
        ,
        createdOn : {
            type : String,
            default : `${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}`
        }
        ,
    }]
    ,
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'Signup'
    }
    
})

const WatchList = mongoose.model('WatchList', watchlistCreation)

module.exports = WatchList;