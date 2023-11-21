const express = require('express')
const accountOpeningController = require("./../../controller/user.product.purchase/user.product.purchase.controller") 
const router = express.Router()

router.route('/add-to-cart').post(accountOpeningController.productsAdditionToCart)
router.route('/dynamic-landing').post(accountOpeningController.displayingUsersRelaventProducts)


module.exports = router;