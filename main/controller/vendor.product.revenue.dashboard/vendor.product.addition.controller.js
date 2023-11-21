const vendorDashoard = require("./../../model/vendor.product.revenue.dashboard/vendor.product.revenue.dashboard.model")
const tokenDecoder = require("./../../utility/token.decoding")
const multer = require("multer")
const snapnow = require("snapnow")

const fs = require("fs")
exports.vendorShopDetails = async(req, res, next)=>{
    const {shopName,shopCategory,shopProductType,gstinNumber,shopAddress} = req.body;
    const user = await tokenDecoder.decodeTokenForUser()
    const creatingVendorShop = await vendorDashoard.create({shopName,shopCategory,shopProductType,gstinNumber,shopAddress, user : user[0]._id})
    res.status(200).json({
        status : "sucess",
        data : {
            message : "Congratulations! you shop is created, please move forward and add inventory to your store"
        }
    })
}


exports.productsAddition = async(req, res, next)=>{
    const {productTitle, productDescription, productInventory, productCompany, productCatagory,colorOfproduct, discountValue, taxOverProduct, productMaterial, productWeight, numberOfpieces, HSN, productRating, returnDays, dimentionsOfproduct, countryOfOrigin} = req.body;
    const user = await tokenDecoder.decodeTokenForUser()
    const vendorShop = await vendorDashoard.findOne({user : user[0]._id})
    
    vendorShop.product.push(
        {
            productTitle,
            productDescription,
            productInventory,
            productCompany,
            productCatagory,
            colorOfproduct,
            discountValue,
            taxOverProduct,
            productMaterial,
            productWeight,
            numberOfpieces,
            HSN,
            productRating,
            returnDays,
            dimentionsOfproduct,
            countryOfOrigin,
            productOwner: vendorShop._id
        }
    )
    vendorShop.save()
    localStorage.setItem("addedProduct_id", vendorShop.product[vendorShop.product.length - 1]._id)

    res.status(200).json({
        status : 'sucess',
        shop : vendorShop
    }) 
}

exports.creatingProductMediaMASTERDirectory = async (req, res, next)=>{
    const allDirectoryArray = fs.readdirSync("./media/vendorProducts")
    const user = await tokenDecoder.decodeTokenForUser()
    const vendorShop = await vendorDashoard.findOne({user : user[0]._id})
    
    console.log()
    if(allDirectoryArray.includes(String(vendorShop._id))){
        next()
    }else{
        const creatingDirecotry = fs.mkdirSync(`./media/vendorProducts/${vendorShop._id}`)
        next()
    }
}

exports.creatingProductMediaDirectory = async (req, res, next)=>{
    const user = await tokenDecoder.decodeTokenForUser()
    const vendorShop = await vendorDashoard.findOne({user : user[0]._id})
    const creatingDirecotry = fs.mkdirSync(`./media/vendorProducts/${vendorShop._id}/${localStorage.getItem("addedProduct_id")}`)
    next()
}

const multerStrogaeForProduct = multer.diskStorage({
    destination : async(req, file, cb)=>{
        const user = await tokenDecoder.decodeTokenForUser()
        const vendorShop = await vendorDashoard.findOne({user : user[0]._id})
        cb(null, `./media/vendorProducts/${vendorShop._id}/${localStorage.getItem("addedProduct_id")}`)
    }
    ,
    filename : (req,file,cb)=>{
        const naming = `${file.fieldname}.${file.mimetype.split("/")[1]}`
        cb(null, naming)
    }
})

exports.productImagesAndVideo = multer({storage : multerStrogaeForProduct})

exports.addingProductImages = async(req, res)=>{
    res.status(200).json({
        status : 'sucess',
        data : {
            message : "Yeppy! product visuals uploaded sucessfully"
        }
    }) 
}

exports.uploadedImagesOfProductsProcessing = async(req, res, next)=>{
    const user = await tokenDecoder.decodeTokenForUser()
    const vendorShop = await vendorDashoard.findOne({user : user[0]._id})
    const lastProductUploaded = localStorage.getItem("addedProduct_id")
    const directoryRead = fs.readdirSync(`./media/vendorProducts/${vendorShop._id}/${lastProductUploaded}`)

    const creatingProcessedDirectory = fs.mkdirSync(`./media/vendorProducts/${vendorShop._id}/${lastProductUploaded}/processedMedia`)

    directoryRead.forEach(el=>{
        if(el.split(".")[0]=="video1"){
            next()
        }else{
            console.log(el)
            const processingImages = snapnow.processImages(`./media/vendorProducts/${vendorShop._id}/${lastProductUploaded}/${el}`,
            `./media/vendorProducts/${vendorShop._id}/${lastProductUploaded}/processedMedia/${el}`
            ,{scale : true, height : 300, width : 300, fit : "fill"}
            ,{gray : false}
            ,{tint : false, R : 244, G : 206, B : 20}
            ,{rotate : false, angle : 135}
            ,{blur : false, level : 20}
            ,{sharpen : true, level : 20}
            ,{flip : false}
            ,{flop : false}
            ,{text : false})
        }
    })
    next()
    
}


exports.displayAllProductsToUsers = async(req, res, next)=>{
    const vendorProducts = await vendorDashoard.find()
    const allProducts = []
    vendorProducts.forEach(el=>{
        allProducts.push([el.product, el._id])
    })
    const allDistinguishProductArray = []
    allProducts.forEach(el=>{
        allDistinguishProductArray.push(...[...el[0]])
    })
    console.log(allDistinguishProductArray)
    res.status(200).json({
        status : 'sucess',
        data : {
            allDistinguishProductArray
        }
    }) 
}


