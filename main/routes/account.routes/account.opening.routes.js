const express = require('express')
const accountOpeningController = require("./../../controller/account.opening/account.opening.controller") 
const router = express.Router()

router.route("/new-account").post(accountOpeningController.openingAccount)

module.exports = router