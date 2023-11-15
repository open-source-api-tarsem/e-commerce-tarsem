const express = require('express')
const accountOpeningController = require("./../../controller/account.opening/account.opening.controller") 
const router = express.Router()

router.route("/new-account").post(accountOpeningController.openingAccount)
router.route("/account-login").post(accountOpeningController.loginToAccount)
router.route("/vendor-account").get(accountOpeningController.vendorAccountOpeningWithoutKYC)
router.route("/vendor-aadhar").post(accountOpeningController.uploadAadhar.single('aadhar-card'), accountOpeningController.vendorKYCAadharUploading)
router.route("/vendor-pan").post(accountOpeningController.uploadpan.single('pan-card'), accountOpeningController.vendorKYCPanUploading)
router.route("/vendor-logo").post(accountOpeningController.uploadLogo.single('shop-logo'), accountOpeningController.imageProcessing,accountOpeningController.vendorKYCLogoUploading)





module.exports = router