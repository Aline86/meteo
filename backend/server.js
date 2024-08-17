var http = require("http");
const express = require('express')
const cors = require('cors')
const {readdirSync} = require("fs")
const port = 3000;
const app = express()
const { getTowns, getTown} = require("./controller/town")
const { getMap } = require("./controller/weather")

http.createServer(function(req, res) {
    res.get('/towns/:name', getTowns)
    res.get('/town/:name', getTown)
    res.get('/showmap/:latitude/:longitude', getMap)
}).listen(3000, "localhost");

