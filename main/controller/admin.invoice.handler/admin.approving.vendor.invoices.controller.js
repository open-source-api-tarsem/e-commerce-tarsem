const vendorDashboard = require("./../../model/vendor.product.revenue.dashboard/vendor.product.revenue.dashboard.model")
const SignUp = require("./../../model/account.opening.model/account.opening.model")
const tokenDecoder = require("./../../utility/token.decoding")

exports.approvingBillsToVendors = async (req, res, next)=>{
    const user = await SignUp.find()

    user.forEach(el=>{
        if(el.openBills.length==0) {
            console.log("no bill")
        }
        else{
            el.openBills.forEach(async bill=>{
                if(bill.paymentStatus=='sucess'  && bill.refundStatus=='notTaken'){
                    const vendorFinding = await vendorDashboard.find({_id : bill.vendor_id})
                    console.log(vendorFinding)
                    vendorFinding[0].productSold.push({
                        product_id : [...bill.product_id],
                        RevenueGenerated : bill.totalBillAmount,
                        taxCollected : bill.totalTaxApplied,

                    })
                    vendorFinding[0].save()
                }else{
                    console.log("currenlty in waiting state")
                }
                console.log(bill.vendor_id)
            })
        }
    })

    res.status(200).json({
        status : 'sucess',
        data : {
            message : "All bills approved"
        }
    })
}