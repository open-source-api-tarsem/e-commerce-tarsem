const WatchList = require('./../../model/user.product.activities.model/user.watchlist.model')
const allProducts = require('./../../utility/getting.allProducts')
const tokenDecoder = require('./../../utility/token.decoding')
const vendorDashboard = require('./../../model/vendor.product.revenue.dashboard/vendor.product.revenue.dashboard.model')

exports.creatingWatchning = async (req, res, next)=>{
    const {product_id,vendor_id,watchlistName} = req.body;
    const user = await tokenDecoder.decodeTokenForUser()

    const watchListProducts = {
        product_id,
        vendor_id,
    }

    let creatingWatchlist;
    const allWatchlists = await WatchList.find()
    if(allWatchlists.length==0){
        creatingWatchlist = await WatchList.create({watchlistName,product_id,vendor_id,watchListProducts,user : user[0]._id})
    }else{
        let watchlistnameArray = []
        allWatchlists.forEach(el=>{
            watchlistnameArray.push(el.watchlistName)
        })
        console.log(watchlistnameArray)

        let count=0;
        allWatchlists.forEach(async prod=>{
            if(String(prod.user)===String(user[0]._id) && prod.watchlistName==watchlistName){
                creatingWatchlist = await WatchList.find({watchlistName,user : user[0]._id})
                creatingWatchlist[0].watchListProducts.push(watchListProducts)
                creatingWatchlist[0].save()
            }else if(String(prod.user)===String(user[0]._id)){
                if(!(watchlistnameArray.includes(watchlistName))){
                    count++;
                    if(count==1){
                        creatingWatchlist = await WatchList.create({watchlistName,product_id,vendor_id,watchListProducts,user : user[0]._id})
                    }
                }
            }
        })
    }
    

    res.status(200).json({
        status : 'sucess',
        data : {
            message : 'product added sucessfully into watchlist'
        }
    })
}

exports.displayWatchlistProducts = async(req, res, next)=>{
    const user = await tokenDecoder.decodeTokenForUser()
    const {watchlistName} = req.body;
    const allWatchlists = await WatchList.find()
    const watchlistProducts = []
    for(let i = 0; i<allWatchlists.length; i++){
        if(allWatchlists[i].user = user[0]._id && allWatchlists[i].watchlistName == watchlistName){
            watchlistProducts.push([...allWatchlists[i].watchListProducts])
        }
    }
    
    let completeProductArray = []
    watchlistProducts.forEach(async el=>{
        const vendor = await vendorDashboard.findOne(el.vendor_id)
        const completeProductDetials = vendor.product.filter(item=>{
            console.log(String(item._id) == String(el[0].product_id))
            return String(item._id) == String(el[0].product_id)
        })
        completeProductArray.push(...completeProductDetials)
    })

    res.status(200).json({
        status : 'sucess',
        data : {
            message : completeProductArray
        }
    })
}