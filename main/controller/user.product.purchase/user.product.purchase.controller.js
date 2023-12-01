const SignUp = require("./../../model/account.opening.model/account.opening.model")
const tokenDecoder = require("./../../utility/token.decoding")
const vendorDashoard = require("./../../model/vendor.product.revenue.dashboard/vendor.product.revenue.dashboard.model")
const gettingAllProductsfromVendors = require("./../../utility/getting.allProducts")
const PDFDocument = require('pdfkit');
const doc = new PDFDocument;
const fs = require('fs')
const bill = require("billing-tar")
var {parse} = require('node-html-parser');


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


exports.directPurchase = async(req, res, next)=>{
    const {product_id, addressTobeShipped, quantity } = req.body;
    const allProducts = await gettingAllProductsfromVendors.getAllProducts();
    let taxAndPrice = []

    allProducts.forEach(el=>{
        if(String(el._id)==product_id){
            taxAndPrice.push([el.taxOverProduct, el.priceForProduct, el.productOwner])
        }
    })
    console.log(taxAndPrice)

    const user = await tokenDecoder.decodeTokenForUser()

    // adding product to listing - id there is no pevious product in the box
    if(user[0].orderespurchased.length == 0){
        user[0].orderespurchased.push({
            product_id, 
            addressTobeShipped, 
            quantity,
            totalBill : (taxAndPrice[0][1] + (taxAndPrice[0][0]*taxAndPrice[0][1])/100)*quantity,
            taxOnOrder : ((taxAndPrice[0][0]*taxAndPrice[0][1])/100)*quantity,
            // paymentStatus : true,
            vendor : taxAndPrice[0][2],
        })
    }else{

        // adding same product again - we have to avoid the addition so same product again but increase the value of that product
        // preparing product id array 
        let productIDLIST = []
        user[0].orderespurchased.forEach(el=> productIDLIST.push(String(el.product_id)))
        console.log(productIDLIST)

        user[0].orderespurchased.forEach(el=>{
            if(String(el.product_id) == String(product_id)){
                el.quantity = el.quantity + quantity;
                el.totalBill = Number(el.totalBill) + Number((taxAndPrice[0][1] + (taxAndPrice[0][0]*taxAndPrice[0][1])/100)*quantity)
                el.taxOnOrder = Number(el.taxOnOrder) + Number(((taxAndPrice[0][0]*taxAndPrice[0][1])/100)*quantity)
            }else{
                if(!(productIDLIST.includes(String(product_id)))){
                    user[0].orderespurchased.push({
                        product_id, 
                        addressTobeShipped, 
                        quantity,
                        totalBill : (taxAndPrice[0][1] + (taxAndPrice[0][0]*taxAndPrice[0][1])/100)*quantity,
                        taxOnOrder : ((taxAndPrice[0][0]*taxAndPrice[0][1])/100)*quantity,
                        // paymentStatus : true,
                        vendor : taxAndPrice[0][2]
                    })
                    productIDLIST.push(product_id)
                }
            }
        })
    }

    user[0].save()

    res.status(200).json({
        status : "success",
        data : {
            message : user[0].orderespurchased
        }
    })

}

exports.billingOfTheProducts = async(req, res, next)=>{
    const user = await tokenDecoder.decodeTokenForUser()
    let invoiceNumber,totalTaxApplied,totalBillAmount,shippingAddress,vendorAddress,GSTIN,paymentMode,vendor_id;
    let product_id = []  
    let billSum = 0
    let taxSum = 0

    const userBillForActiveInvoice = user[0].orderespurchased.forEach(el=>{
        invoiceNumber = `INV - ${user[0]._id} - ${Math.trunc(Math.random()*9999999)}`
        billSum = billSum + Number(el.totalBill)
        taxSum = taxSum + Number(el.taxOnOrder)
        
        // shippingAddress = user[0].address
        // const vendor = await vendorDashoard.find({_id : el.})
        paymentMode = 'UPI'
        vendor_id = el.vendor
        product_id.push(el.product_id) 

    })
    
    
    const act = {invoiceNumber, totalTaxApplied:Number(taxSum).toFixed(2), totalBillAmount: Number(billSum).toFixed(2),paymentMode, vendor_id, product_id}
    user[0].openBills.push(act)
    user[0].save()


    res.status(200).json({
        status : "success",
        data : {
            message : "hello"
        }
    })
}