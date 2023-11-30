const express = require('express')
const accountOpeningController = require("./../../controller/user.product.purchase/user.product.purchase.controller") 
const router = express.Router()

router.route('/add-to-cart').post(accountOpeningController.productsAdditionToCart)
router.route('/dynamic-landing').post(accountOpeningController.displayingUsersRelaventProducts)
router.route('/direct-purchase').post(accountOpeningController.directPurchase)
router.route('/active-billing').get(accountOpeningController.billingOfTheProducts)

module.exports = router;