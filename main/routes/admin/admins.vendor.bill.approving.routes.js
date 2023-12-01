const express = require('express')
const router = express.Router()
const vendorBillApprovingController = require('./../../controller/admin.invoice.handler/admin.approving.vendor.invoices.controller')

router.route('/approving-bills').get(vendorBillApprovingController.approvingBillsToVendors)

module.exports = router