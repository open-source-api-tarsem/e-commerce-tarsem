const SignUp = require("./../../model/account.opening.model/account.opening.model")
const tokenDecoder = require("./../../utility/token.decoding")
const vendorDashoard = require("./../../model/vendor.product.revenue.dashboard/vendor.product.revenue.dashboard.model")

exports.productsAdditionToCart = async(req, res, next)=>{
    let {product_id, quantity} = req.body;
    const user = await tokenDecoder.decodeTokenForUser()
    const addingProductTocart = user[0].cartProducts.push({product_id, quantity})


    const vendorProducts = await vendorDashoard.find()
    const allProducts = []
    vendorProducts.forEach(el=>{
        allProducts.push([el.product, el._id])
    })
    const allDistinguishProductArray = []
    allProducts.forEach(el=>{
        allDistinguishProductArray.push(...[...el[0]])
    })
    const selectedProducts = []
    user[0].cartProducts.forEach(el=>{
        allDistinguishProductArray.forEach(prod=>{
            if(String(el.product_id) == String(prod._id)){
                selectedProducts.push([prod, {quantity}])
            }
        })

    })

    user[0].save()
    res.status(200).json({
        status : "success",
        data : {
            message : selectedProducts
        }
    })
}