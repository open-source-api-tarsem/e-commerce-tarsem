const express = require('express')
const accountOpeningController = require("./../../controller/account.opening/account.opening.controller") 
const aadharUpload = require("./../../controller/account.opening/vendor.AAdharUpload") 
const router = express.Router()

router.route("/new-account").post(accountOpeningController.openingAccount)
router.route("/account-login").post(accountOpeningController.loginToAccount)
router.route("/vendor-account").get(accountOpeningController.vendorAccountOpeningWithoutKYC)
router.route("/vendor-aadhar").post(aadharUpload.uploadAadhar.single('aadhar-card'), aadharUpload.vendorKYCAadharUploading)
// router.route("/vendor-pan").post(accountOpeningController.uploadpan.fields([{name : "aadhar", maxCount : 1}, {name : "pan", maxCount : 1}, {name : "logo", maxCount : 1}]),accountOpeningController.vendorKYCPanUploading)
router.route("/vendor-docs").post(accountOpeningController.uploadDocs.fields([{name : "aadhar", maxCount : 1}, {name : "pan", maxCount : 1}, {name : "logo", maxCount : 1}]),accountOpeningController.imageProcessingDocs,accountOpeningController.vendorKYCDocsUploading)





module.exports = router