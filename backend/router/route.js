const express = require('express')
const router = express.Router()


const { getTowns, getTown} = require("../controller/town")
const { getMap } = require("../controller/weather")

router.get('/towns/:name', getTowns)
router.get('/town/:name', getTown)
router.get('/showmap/:latitude/:longitude', getMap)

module.exports = router