const express = require("express")
const vendorProductRevenueDashboard = require("./../../controller/vendor.product.revenue.dashboard/vendor.product.addition.controller")

const router = express.Router()

router.route("/shop-detail").post(vendorProductRevenueDashboard.vendorShopDetails)
router.route("/shop-inventory-filling").post(vendorProductRevenueDashboard.productsAddition)

router.route("/product-images-video-uploading").post(vendorProductRevenueDashboard.creatingProductMediaMASTERDirectory, vendorProductRevenueDashboard.creatingProductMediaDirectory, vendorProductRevenueDashboard.productImagesAndVideo.fields([{name : "image1", maxCount : 1}, {name : "image2", maxCount : 2}, {name : "image3", maxCount : 3}, {name : "image4", maxCount : 4}, {name : "image5", maxCount : 5}, {name : "video1", maxCount : 1}]), vendorProductRevenueDashboard.uploadedImagesOfProductsProcessing,vendorProductRevenueDashboard.addingProductImages)

router.route("/product-image-processing").get(vendorProductRevenueDashboard.uploadedImagesOfProductsProcessing)

module.exports = router