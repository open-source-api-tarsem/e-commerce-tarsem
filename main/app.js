const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
const accountOpening = require("./routes/account.routes/account.opening.routes")
app.use("/api/v1/user", accountOpening)

module.exports = app