const express = require("express")
const app = express()
app.use(express.json())

const accountOpening = require("./routes/account.routes/account.opening.routes")
app.use("/api/v1/user", accountOpening)

const vendorProductRevenueDashboard = require("./routes/vendor.product.revenue.dashboard.routes/vendor.product.revenue.dashboard.routes")
app.use("/api/v1/vendor", vendorProductRevenueDashboard)

module.exports = app