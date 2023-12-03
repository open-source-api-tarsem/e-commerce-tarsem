const express = require('express')
const accountOpeningController = require("./../../controller/user.product.purchase/user.product.purchase.controller") 
const userWatchListCreation = require('./../../controller/user.product.purchase/user.product.watchlist.controller')
const router = express.Router()

router.route('/add-to-cart').post(accountOpeningController.productsAdditionToCart)
router.route('/dynamic-landing').post(accountOpeningController.displayingUsersRelaventProducts)
router.route('/direct-purchase').post(accountOpeningController.directPurchase)
router.route('/active-billing').get(accountOpeningController.billingOfTheProducts)
router.route('/create-watchlist').post(userWatchListCreation.creatingWatchning)
router.route('/display-watchlist').post(userWatchListCreation.displayWatchlistProducts)
module.exports = router;