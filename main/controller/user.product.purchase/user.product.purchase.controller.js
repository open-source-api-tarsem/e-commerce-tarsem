const SignUp = require("./../../model/account.opening.model/account.opening.model")
const tokenDecoder = require("./../../utility/token.decoding")
const vendorDashoard = require("./../../model/vendor.product.revenue.dashboard/vendor.product.revenue.dashboard.model")




exports.displayingUsersRelaventProducts = async(req, res, next)=>{
    const {productSearch, anyCompany, anySpecifications} = req.body;
    const user = await tokenDecoder.decodeTokenForUser()

    const vendorProducts = await vendorDashoard.find()
    const allProducts = []
    vendorProducts.forEach(el=>{
        allProducts.push([el.product, el._id])
    })
    const allDistinguishProductArray = []
    allProducts.forEach(el=>{
        allDistinguishProductArray.push(...[...el[0]])
    })

    allDistinguishProductArray.forEach(el=>{
        console.log(el.productCatagory)
        console.log(el.productCompany)
        console.log(productSearch)
        console.log(anyCompany)

        // produts that are matched based on catagory
        if(el.productCatagory==productSearch){
            user[0].products_Array_To_be_Displayed_On_LandingPage.push({productToshow : el})
        }
        if(el.productCatagory==productSearch && el.productCompany==anyCompany){
            user[0].products_Array_To_be_Displayed_On_LandingPage_with_company_and_catagory.push({productToshow : el})
        }
    })
    user[0].usersBrowsedProducts.push({
        productSearch,
        anyCompany,
        anySpecifications,
        
    })
    
    user[0].save()
    res.status(200).json({
        status : "success",
        data : {
            message : "added"
        }
    })
}


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