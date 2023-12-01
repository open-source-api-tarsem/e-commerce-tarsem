const express = require("express")
const app = express()
app.use(express.json())

const accountOpening = require("./routes/account.routes/account.opening.routes")
app.use("/api/v1/user", accountOpening)

const userProductPurchase = require("./routes/account.routes/user.product.purchase.routes")
app.use("/api/v1/user/product", userProductPurchase)

const vendorProductRevenueDashboard = require("./routes/vendor.product.revenue.dashboard.routes/vendor.product.revenue.dashboard.routes")
app.use("/api/v1/vendor", vendorProductRevenueDashboard)

const adminApprovingVendorBills = require("./routes/admin/admins.vendor.bill.approving.routes")
app.use('/api/v1/admin', adminApprovingVendorBills)

module.exports = app