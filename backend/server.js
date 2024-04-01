const express = require('express')
const cors = require('cors')
const {readdirSync} = require("fs")
const port = 3000;
const app = express()

app.use(cors())
app.set('trust proxy', 1) // trust first proxy
readdirSync('./router').map((r) => app.use("/", require("./router/" + r)))
// port

app.listen(port)