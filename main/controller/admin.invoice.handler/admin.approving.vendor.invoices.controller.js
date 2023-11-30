const vendorDashboard = require("./../../model/vendor.product.revenue.dashboard/vendor.product.revenue.dashboard.model")
const SignUp = require("./../../model/account.opening.model/account.opening.model")
const tokenDecoder = require("./../../utility/token.decoding")

exports.approvingBillsToVendors = async(req, res, next)=>{
    const user = await SignUp.find()
    
}