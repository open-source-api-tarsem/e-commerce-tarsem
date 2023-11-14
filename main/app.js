const express = require("express")
const app = express()
app.use(express.json())

const accountOpening = require("./routes/account.routes/account.opening.routes")
app.use("/api/v1/user", accountOpening)

module.exports = app